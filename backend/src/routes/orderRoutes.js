const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  checkOrderPayment,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Các route cần đăng nhập
router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id/check-payment', checkOrderPayment);
router.get('/:id', getOrderById);

// Các route của admin/editor
router.get('/', authorize('SuperAdmin', 'Admin', 'Editor'), getAllOrders);
router.put('/:id/status', authorize('SuperAdmin', 'Admin', 'Editor'), updateOrderStatus);

module.exports = router;
