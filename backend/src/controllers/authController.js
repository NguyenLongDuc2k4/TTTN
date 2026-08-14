const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

// Hàm tạo JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Đăng ký người dùng mới
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ tên, email và mật khẩu.' });
    }

    // Kiểm tra email tồn tại
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ message: 'Email đã được sử dụng.' });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Xác định role mặc định là User. Nếu database chưa có ai, người đầu tiên sẽ là SuperAdmin.
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? 'SuperAdmin' : 'User';

    // Tạo user mới
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Tạo giỏ hàng trống cho user mới
    await prisma.cart.create({
      data: {
        userId: user.id,
      },
    });

    return res.status(201).json({
      message: 'Đăng ký tài khoản thành công.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Đăng nhập người dùng
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu.' });
    }

    // Tìm kiếm user theo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Đảm bảo user có giỏ hàng (nếu chưa có thì tạo mới để tránh lỗi)
      const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
      });
      if (!cart) {
        await prisma.cart.create({
          data: { userId: user.id },
        });
      }

      return res.json({
        message: 'Đăng nhập thành công.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user.id, user.role),
      });
    } else {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
    }
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Lấy thông tin tài khoản hiện tại
const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Lỗi lấy thông tin user:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
