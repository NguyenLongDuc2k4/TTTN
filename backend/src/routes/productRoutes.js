const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Route công khai (khách hàng xem danh sách và chi tiết)
router.get('/', getProducts);
router.get('/:id', getProductById);

// Route yêu cầu quyền lực (SuperAdmin, Admin, Editor)
router.post(
  '/',
  protect,
  authorize('SuperAdmin', 'Admin', 'Editor'),
  upload.single('image'),
  createProduct
);
router.put(
  '/:id',
  protect,
  authorize('SuperAdmin', 'Admin', 'Editor'),
  upload.single('image'),
  updateProduct
);
router.delete('/:id', protect, authorize('SuperAdmin', 'Admin'), deleteProduct); // Chỉ SuperAdmin, Admin được xóa

module.exports = router;
