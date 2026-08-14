const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Chỉ dành cho SuperAdmin, Admin và Editor xem dashboard
router.get('/stats', protect, authorize('SuperAdmin', 'Admin', 'Editor'), getDashboardStats);

module.exports = router;
