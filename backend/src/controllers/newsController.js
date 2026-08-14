const prisma = require('../utils/prisma');

// Lấy tất cả tin tức (hỗ trợ phân trang và tìm kiếm tiêu đề)
const getNews = async (req, res) => {
  try {
    const { search, page = 1, limit = 6 } = req.query;

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const skip = (parsedPage - 1) * parsedLimit;

    const where = {};
    if (search) {
      where.title = {
        contains: search,
      };
    }

    const totalNews = await prisma.news.count({ where });
    const totalPages = Math.ceil(totalNews / parsedLimit);

    const newsList = await prisma.news.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: parsedLimit,
    });

    return res.json({
      news: newsList,
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
      totalNews,
    });
  } catch (error) {
    console.error('Lỗi lấy tin tức:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Chi tiết tin tức
const getNewsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newsItem = await prisma.news.findUnique({
      where: { id },
    });

    if (!newsItem) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết này.' });
    }

    return res.json(newsItem);
  } catch (error) {
    console.error('Lỗi lấy chi tiết tin tức:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Tạo tin tức mới
const createNews = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Tiêu đề và nội dung là bắt buộc.' });
    }

    let image = null;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const newsItem = await prisma.news.create({
      data: {
        title,
        content,
        image: image || '/uploads/default-news.jpg', // Đặt ảnh mặc định nếu không upload
      },
    });

    return res.status(201).json({
      message: 'Đăng bài viết mới thành công.',
      news: newsItem,
    });
  } catch (error) {
    console.error('Lỗi tạo bài viết:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Cập nhật tin tức
const updateNews = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;

    const newsExists = await prisma.news.findUnique({
      where: { id },
    });

    if (!newsExists) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết này.' });
    }

    let image = newsExists.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title: title || newsExists.title,
        content: content || newsExists.content,
        image,
      },
    });

    return res.json({
      message: 'Cập nhật bài viết thành công.',
      news: updatedNews,
    });
  } catch (error) {
    console.error('Lỗi cập nhật bài viết:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Xóa tin tức
const deleteNews = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const newsExists = await prisma.news.findUnique({
      where: { id },
    });

    if (!newsExists) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết này.' });
    }

    await prisma.news.delete({
      where: { id },
    });

    return res.json({ message: 'Xóa bài viết thành công.' });
  } catch (error) {
    console.error('Lỗi xóa bài viết:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
