const prisma = require('../utils/prisma');

// Lấy tất cả banners
const getBanners = async (req, res) => {
  try {
    const { status } = req.query;

    const where = {};
    if (status !== undefined) {
      where.status = status === 'true';
    }

    const banners = await prisma.banner.findMany({
      where,
      orderBy: { id: 'desc' },
    });

    return res.json(banners);
  } catch (error) {
    console.error('Lỗi lấy banners:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Lấy chi tiết banner
const getBannerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const banner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      return res.status(404).json({ message: 'Không tìm thấy banner.' });
    }

    return res.json(banner);
  } catch (error) {
    console.error('Lỗi lấy chi tiết banner:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Tạo banner mới
const createBanner = async (req, res) => {
  try {
    const { title, link, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Tiêu đề banner là bắt buộc.' });
    }

    let image = null;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: 'Vui lòng upload hình ảnh banner.' });
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        image,
        link,
        status: status === 'false' ? false : true,
      },
    });

    return res.status(201).json({
      message: 'Tạo banner thành công.',
      banner,
    });
  } catch (error) {
    console.error('Lỗi tạo banner:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Cập nhật banner
const updateBanner = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, link, status } = req.body;

    const bannerExists = await prisma.banner.findUnique({
      where: { id },
    });

    if (!bannerExists) {
      return res.status(404).json({ message: 'Không tìm thấy banner.' });
    }

    let image = bannerExists.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedBanner = await prisma.banner.update({
      where: { id },
      data: {
        title: title || bannerExists.title,
        image,
        link: link !== undefined ? link : bannerExists.link,
        status: status !== undefined ? (status === 'true' || status === true) : bannerExists.status,
      },
    });

    return res.json({
      message: 'Cập nhật banner thành công.',
      banner: updatedBanner,
    });
  } catch (error) {
    console.error('Lỗi cập nhật banner:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Xóa banner
const deleteBanner = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const bannerExists = await prisma.banner.findUnique({
      where: { id },
    });

    if (!bannerExists) {
      return res.status(404).json({ message: 'Không tìm thấy banner.' });
    }

    await prisma.banner.delete({
      where: { id },
    });

    return res.json({ message: 'Xóa banner thành công.' });
  } catch (error) {
    console.error('Lỗi xóa banner:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

module.exports = {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
};
