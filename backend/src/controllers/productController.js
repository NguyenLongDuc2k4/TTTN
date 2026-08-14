const prisma = require('../utils/prisma');

// Lấy danh sách sản phẩm (kèm tìm kiếm, lọc, sắp xếp, phân trang)
const getProducts = async (req, res) => {
  try {
    const {
      search,
      categoryId,
      minPrice,
      maxPrice,
      isNew,
      isSale,
      isBest,
      sort,
      page = 1,
      limit = 8,
    } = req.query;

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const skip = (parsedPage - 1) * parsedLimit;

    // Xây dựng điều kiện tìm kiếm/lọc
    const where = {};

    if (search) {
      where.name = {
        contains: search,
      };
    }

    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    if (isNew !== undefined) {
      where.isNew = isNew === 'true';
    }

    if (isSale !== undefined) {
      where.isSale = isSale === 'true';
    }

    if (isBest !== undefined) {
      where.isBest = isBest === 'true';
    }

    // Lọc theo giá
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice);
      }
    }

    // Xây dựng sắp xếp
    let orderBy = { createdAt: 'desc' }; // Mặc định sản phẩm mới tạo lên trước
    if (sort) {
      if (sort === 'price_asc') {
        orderBy = { price: 'asc' };
      } else if (sort === 'price_desc') {
        orderBy = { price: 'desc' };
      } else if (sort === 'name_asc') {
        orderBy = { name: 'asc' };
      } else if (sort === 'name_desc') {
        orderBy = { name: 'desc' };
      }
    }

    // Đếm tổng số sản phẩm thỏa mãn điều kiện
    const totalProducts = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalProducts / parsedLimit);

    // Lấy danh sách sản phẩm kèm thông tin danh mục
    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: parsedLimit,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.json({
      products,
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    console.error('Lỗi lấy danh sách sản phẩm:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Lấy thông tin chi tiết một sản phẩm
const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy món ăn này.' });
    }

    // Lấy các sản phẩm liên quan (cùng danh mục, loại trừ sản phẩm hiện tại, lấy tối đa 4 món)
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
      },
      take: 4,
      orderBy: { createdAt: 'desc' },
    });

    return res.json({
      product,
      relatedProducts,
    });
  } catch (error) {
    console.error('Lỗi lấy chi tiết sản phẩm:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const {
      categoryId,
      name,
      price,
      salePrice,
      quantity,
      description,
      isNew,
      isSale,
      isBest,
    } = req.body;

    if (!categoryId || !name || price === undefined) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ danh mục, tên sản phẩm và giá.' });
    }

    // Xử lý ảnh upload
    let image = null;
    if (req.file) {
      // Đường dẫn tương đối từ thư mục static uploads
      image = `/uploads/${req.file.filename}`;
    }

    const product = await prisma.product.create({
      data: {
        categoryId: parseInt(categoryId),
        name,
        image,
        price: parseFloat(price),
        salePrice: salePrice ? parseFloat(salePrice) : null,
        quantity: quantity ? parseInt(quantity) : 0,
        description,
        isNew: isNew === 'true' || isNew === true,
        isSale: isSale === 'true' || isSale === true,
        isBest: isBest === 'true' || isBest === true,
      },
    });

    return res.status(201).json({
      message: 'Thêm món ăn thành công.',
      product,
    });
  } catch (error) {
    console.error('Lỗi tạo sản phẩm:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      categoryId,
      name,
      price,
      salePrice,
      quantity,
      description,
      isNew,
      isSale,
      isBest,
    } = req.body;

    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      return res.status(404).json({ message: 'Không tìm thấy món ăn này.' });
    }

    // Xử lý ảnh mới nếu có
    let image = productExists.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        categoryId: categoryId ? parseInt(categoryId) : productExists.categoryId,
        name: name || productExists.name,
        image,
        price: price !== undefined ? parseFloat(price) : productExists.price,
        salePrice: salePrice !== undefined ? (salePrice ? parseFloat(salePrice) : null) : productExists.salePrice,
        quantity: quantity !== undefined ? parseInt(quantity) : productExists.quantity,
        description: description !== undefined ? description : productExists.description,
        isNew: isNew !== undefined ? (isNew === 'true' || isNew === true) : productExists.isNew,
        isSale: isSale !== undefined ? (isSale === 'true' || isSale === true) : productExists.isSale,
        isBest: isBest !== undefined ? (isBest === 'true' || isBest === true) : productExists.isBest,
      },
    });

    return res.json({
      message: 'Cập nhật món ăn thành công.',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Lỗi cập nhật sản phẩm:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      return res.status(404).json({ message: 'Không tìm thấy món ăn này.' });
    }

    await prisma.product.delete({
      where: { id },
    });

    return res.json({ message: 'Xóa món ăn thành công.' });
  } catch (error) {
    console.error('Lỗi xóa sản phẩm:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
