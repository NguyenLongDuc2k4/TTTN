const prisma = require('../utils/prisma');

// Lấy danh sách người dùng (Admin)
const getUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 10 } = req.query;

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const skip = (parsedPage - 1) * parsedLimit;

    const where = {};
    if (role) {
      where.role = role;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const totalUsers = await prisma.user.count({ where });
    const totalPages = Math.ceil(totalUsers / parsedLimit);

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parsedLimit,
    });

    return res.json({
      users,
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
      totalUsers,
    });
  } catch (error) {
    console.error('Lỗi lấy danh sách user:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Cập nhật quyền hạn (Role) người dùng (Chỉ SuperAdmin và Admin)
const updateUserRole = async (req, res) => {
  try {
    const targetUserId = parseInt(req.params.id);
    const { role } = req.body;

    const validRoles = ['SuperAdmin', 'Admin', 'Editor', 'User'];
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Vai trò không hợp lệ.' });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng này.' });
    }

    // Luật phân quyền
    const currentUserRole = req.user.role;

    if (targetUser.role === 'SuperAdmin' && currentUserRole !== 'SuperAdmin') {
      return res.status(403).json({ message: 'Bạn không có quyền sửa đổi tài khoản SuperAdmin.' });
    }

    if (role === 'SuperAdmin' && currentUserRole !== 'SuperAdmin') {
      return res.status(403).json({ message: 'Chỉ SuperAdmin mới được bổ nhiệm một SuperAdmin khác.' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return res.json({
      message: 'Cập nhật vai trò người dùng thành công.',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Lỗi cập nhật vai trò:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  try {
    const targetUserId = parseInt(req.params.id);

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng này.' });
    }

    // Bảo mật:
    // 1. Không tự xóa chính mình.
    if (targetUserId === req.user.id) {
      return res.status(400).json({ message: 'Bạn không thể tự xóa tài khoản của chính mình.' });
    }
    // 2. Admin thường không thể xóa SuperAdmin.
    if (targetUser.role === 'SuperAdmin' && req.user.role !== 'SuperAdmin') {
      return res.status(403).json({ message: 'Bạn không có quyền xóa tài khoản SuperAdmin.' });
    }

    await prisma.user.delete({
      where: { id: targetUserId },
    });

    return res.json({ message: 'Xóa người dùng thành công.' });
  } catch (error) {
    console.error('Lỗi xóa người dùng:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

module.exports = {
  getUsers,
  updateUserRole,
  deleteUser,
};
