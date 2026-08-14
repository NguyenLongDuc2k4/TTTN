const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Route công khai để client tải logo và màu sắc
router.get('/', getSettings);

// Route yêu cầu quyền lực
router.put('/', protect, authorize('SuperAdmin', 'Admin', 'Editor'), updateSettings);

module.exports = router;
