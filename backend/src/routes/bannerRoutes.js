const express = require('express');
const router = express.Router();
const {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} = require('../controllers/bannerController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Route công khai
router.get('/', getBanners);
router.get('/:id', getBannerById);

// Route yêu cầu quyền lực
router.post(
  '/',
  protect,
  authorize('SuperAdmin', 'Admin', 'Editor'),
  upload.single('image'),
  createBanner
);
router.put(
  '/:id',
  protect,
  authorize('SuperAdmin', 'Admin', 'Editor'),
  upload.single('image'),
  updateBanner
);
router.delete('/:id', protect, authorize('SuperAdmin', 'Admin'), deleteBanner);

module.exports = router;
