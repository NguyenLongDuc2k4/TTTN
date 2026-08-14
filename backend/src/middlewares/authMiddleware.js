const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

// Middleware xác thực token JWT
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Lấy token từ header
      token = req.headers.authorization.split(' ')[1];

      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Lấy thông tin user từ database (loại bỏ mật khẩu)
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: 'Người dùng không tồn tại hoặc đã bị xóa.' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Lỗi xác thực JWT:', error);
      return res.status(401).json({ message: 'Không được phép truy cập, token không hợp lệ.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Không được phép truy cập, không tìm thấy token.' });
  }
};

// Middleware phân quyền
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Bạn không có quyền thực hiện hành động này. Yêu cầu một trong các quyền: ${roles.join(', ')}`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
