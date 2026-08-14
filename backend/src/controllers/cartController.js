const prisma = require('../utils/prisma');

// Lấy giỏ hàng của người dùng hiện tại
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Tìm giỏ hàng hoặc tạo mới nếu chưa có
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return res.json(cart);
  } catch (error) {
    console.error('Lỗi lấy giỏ hàng:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'ProductId là bắt buộc.' });
    }

    // Kiểm tra sản phẩm tồn tại
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại.' });
    }

    // Tìm giỏ hàng
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: product.id,
        },
      },
    });

    let cartItem;
    if (existingItem) {
      // Cập nhật số lượng
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + parseInt(quantity),
        },
      });
    } else {
      // Tạo item mới
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity: parseInt(quantity),
        },
      });
    }

    return res.json({
      message: 'Đã thêm sản phẩm vào giỏ hàng.',
      cartItem,
    });
  } catch (error) {
    console.error('Lỗi thêm giỏ hàng:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'ProductId và số lượng là bắt buộc.' });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng.' });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: parseInt(productId),
        },
      },
    });

    if (!existingItem) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm này trong giỏ hàng.' });
    }

    if (parseInt(quantity) <= 0) {
      // Xóa sản phẩm khỏi giỏ hàng nếu số lượng <= 0
      await prisma.cartItem.delete({
        where: { id: existingItem.id },
      });
      return res.json({ message: 'Đã xóa sản phẩm khỏi giỏ hàng.' });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: parseInt(quantity),
      },
    });

    return res.json({
      message: 'Cập nhật số lượng thành công.',
      cartItem: updatedItem,
    });
  } catch (error) {
    console.error('Lỗi cập nhật giỏ hàng:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.productId);

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng.' });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!existingItem) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng.' });
    }

    await prisma.cartItem.delete({
      where: { id: existingItem.id },
    });

    return res.json({ message: 'Đã xóa sản phẩm khỏi giỏ hàng.' });
  } catch (error) {
    console.error('Lỗi xóa sản phẩm khỏi giỏ hàng:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Xóa sạch giỏ hàng
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng.' });
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return res.json({ message: 'Đã xóa sạch giỏ hàng.' });
  } catch (error) {
    console.error('Lỗi làm sạch giỏ hàng:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
