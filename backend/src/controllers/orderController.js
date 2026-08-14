const prisma = require('../utils/prisma');

// Tạo đơn hàng mới từ giỏ hàng
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, phone, paymentMethod } = req.body;

    if (!shippingAddress || !phone) {
      return res.status(400).json({ message: 'Vui lòng cung cấp địa chỉ giao hàng và số điện thoại.' });
    }

    // 1. Tìm giỏ hàng hiện tại
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng của bạn đang trống.' });
    }

    // 2. Tính tổng tiền và kiểm tra số lượng tồn kho
    let totalAmount = 0;
    const itemsToCreate = [];

    for (const item of cart.items) {
      const product = item.product;
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Sản phẩm "${product.name}" trong kho chỉ còn ${product.quantity} phần, không đủ số lượng bạn cần.`,
        });
      }

      // Giá bán thực tế (ưu tiên salePrice)
      const price = product.salePrice !== null ? product.salePrice : product.price;
      totalAmount += price * item.quantity;

      itemsToCreate.push({
        productId: product.id,
        price: price,
        quantity: item.quantity,
      });
    }

    // 3. Sử dụng Transaction để tạo đơn hàng, trừ kho và xóa giỏ hàng
    const result = await prisma.$transaction(async (tx) => {
      // a. Tạo đơn hàng
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          shippingAddress,
          phone,
          status: 'Pending',
          paymentMethod: paymentMethod || 'COD',
          paymentStatus: paymentMethod === 'BankTransfer' ? 'Unpaid' : 'Paid',
          items: {
            create: itemsToCreate.map((item) => ({
              productId: item.productId,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // b. Trừ số lượng tồn kho của các sản phẩm
      for (const item of itemsToCreate) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      // c. Xóa sạch các món trong giỏ hàng
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return order;
    });

    return res.status(201).json({
      message: 'Đặt hàng thành công.',
      order: result,
    });
  } catch (error) {
    console.error('Lỗi tạo đơn hàng:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Lấy danh sách đơn hàng của người dùng hiện tại
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(orders);
  } catch (error) {
    console.error('Lỗi lấy đơn hàng cá nhân:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Chi tiết đơn hàng
const getOrderById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
    }

    // Bảo mật: Chỉ cho phép chủ đơn hàng hoặc Admin/Editor/SuperAdmin xem
    if (
      order.userId !== req.user.id &&
      !['SuperAdmin', 'Admin', 'Editor'].includes(req.user.role)
    ) {
      return res.status(403).json({ message: 'Bạn không có quyền xem đơn hàng này.' });
    }

    return res.json(order);
  } catch (error) {
    console.error('Lỗi lấy chi tiết đơn hàng:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Lấy tất cả đơn hàng (Admin/Editor)
const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const skip = (parsedPage - 1) * parsedLimit;

    const where = {};
    if (status) {
      where.status = status;
    }

    const totalOrders = await prisma.order.count({ where });
    const totalPages = Math.ceil(totalOrders / parsedLimit);

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: parsedLimit,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return res.json({
      orders,
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
      totalOrders,
    });
  } catch (error) {
    console.error('Lỗi lấy tất cả đơn hàng:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Cập nhật trạng thái đơn hàng (Admin/Editor)
const updateOrderStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Trạng thái đơn hàng là bắt buộc.' });
    }

    const orderExists = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!orderExists) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
    }

    // Nếu chuyển sang trạng thái Hủy (Cancelled) và đơn hàng trước đó chưa hủy, ta có thể hoàn kho
    const updatedOrder = await prisma.$transaction(async (tx) => {
      // Nếu hủy đơn hàng, ta hoàn trả sản phẩm lại kho (chỉ khi đơn chưa ở trạng thái hoàn thành/hủy trước đó)
      if (status === 'Cancelled' && orderExists.status !== 'Cancelled') {
        for (const item of orderExists.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              quantity: {
                increment: item.quantity,
              },
            },
          });
        }
      }

      // Cập nhật trạng thái
      return await tx.order.update({
        where: { id },
        data: { status },
      });
    });

    return res.json({
      message: 'Cập nhật trạng thái đơn hàng thành công.',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái đơn hàng:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

const checkOrderPayment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
    }

    // Mô phỏng: Khi client gửi yêu cầu check, hệ thống Techcombank API giả lập tự động nhận được tiền
    // và cập nhật paymentStatus sang 'Paid', đồng thời chuyển trạng thái đơn hàng sang 'Processing'
    if (order.paymentMethod === 'BankTransfer' && order.paymentStatus === 'Unpaid') {
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          paymentStatus: 'Paid',
          status: 'Processing', // Tự động duyệt đơn hàng khi thanh toán thành công
        },
      });
      return res.json({
        paid: true,
        message: 'Thanh toán chuyển khoản Techcombank thành công! Đơn hàng đã tự động được xác nhận.',
        order: updatedOrder,
      });
    }

    return res.json({
      paid: order.paymentStatus === 'Paid',
      order,
    });
  } catch (error) {
    console.error('Lỗi kiểm tra thanh toán:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  checkOrderPayment,
};
