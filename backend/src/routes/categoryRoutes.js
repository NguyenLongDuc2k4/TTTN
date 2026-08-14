const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Route công khai (khách hàng có thể xem)
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// Route yêu cầu quyền lực (SuperAdmin, Admin, Editor)
router.post('/', protect, authorize('SuperAdmin', 'Admin', 'Editor'), createCategory);
router.put('/:id', protect, authorize('SuperAdmin', 'Admin', 'Editor'), updateCategory);
router.delete('/:id', protect, authorize('SuperAdmin', 'Admin'), deleteCategory); // Chỉ SuperAdmin, Admin được xóa

module.exports = router;
