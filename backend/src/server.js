require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const newsRoutes = require('./routes/newsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const settingRoutes = require('./routes/settingRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Định nghĩa thư mục tĩnh để truy cập ảnh đã upload
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Route kiểm tra trạng thái server
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hệ thống Quán Cơm API đang hoạt động ổn định!' });
});

// Xử lý Route không tìm thấy (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Không tìm thấy API yêu cầu.' });
});

// Middleware xử lý lỗi tập trung
app.use((err, req, res, next) => {
  console.error('Lỗi Server:', err.stack);
  res.status(500).json({ message: err.message || 'Đã xảy ra lỗi hệ thống nghiêm trọng.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SERVER] Đang chạy tại cổng http://localhost:${PORT}`);
});
