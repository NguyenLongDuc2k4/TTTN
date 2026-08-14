const express = require('express');
const router = express.Router();
const { getUsers, updateUserRole, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Chỉ cho phép SuperAdmin và Admin truy cập vào quản lý user
router.use(protect, authorize('SuperAdmin', 'Admin'));

router.get('/', getUsers);
router.put('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);

module.exports = router;
