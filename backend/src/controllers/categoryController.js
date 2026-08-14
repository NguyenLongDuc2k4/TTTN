const prisma = require('../utils/prisma');

// Lấy danh sách danh mục
const getCategories = async (req, res) => {
  try {
    const { status } = req.query;
    
    const where = {};
    if (status !== undefined) {
      where.status = status === 'true';
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: { id: 'asc' },
    });

    return res.json(categories);
  } catch (error) {
    console.error('Lỗi lấy danh mục:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Chi tiết danh mục
const getCategoryById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
    }

    return res.json(category);
  } catch (error) {
    console.error('Lỗi lấy chi tiết danh mục:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Tạo danh mục mới
const createCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Tên danh mục là bắt buộc.' });
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        status: status !== undefined ? status : true,
      },
    });

    return res.status(201).json({
      message: 'Tạo danh mục thành công.',
      category,
    });
  } catch (error) {
    console.error('Lỗi tạo danh mục:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Cập nhật danh mục
const updateCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, status } = req.body;

    const categoryExists = await prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        status: status !== undefined ? status : categoryExists.status,
      },
    });

    return res.json({
      message: 'Cập nhật danh mục thành công.',
      category,
    });
  } catch (error) {
    console.error('Lỗi cập nhật danh mục:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Xóa danh mục
const deleteCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const categoryExists = await prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
    }

    await prisma.category.delete({
      where: { id },
    });

    return res.json({ message: 'Xóa danh mục thành công.' });
  } catch (error) {
    console.error('Lỗi xóa danh mục:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ. Danh mục có thể đang chứa món ăn.' });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
