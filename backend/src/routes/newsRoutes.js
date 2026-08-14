const express = require('express');
const router = express.Router();
const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Route công khai
router.get('/', getNews);
router.get('/:id', getNewsById);

// Route yêu cầu quyền lực
router.post(
  '/',
  protect,
  authorize('SuperAdmin', 'Admin', 'Editor'),
  upload.single('image'),
  createNews
);
router.put(
  '/:id',
  protect,
  authorize('SuperAdmin', 'Admin', 'Editor'),
  upload.single('image'),
  updateNews
);
router.delete('/:id', protect, authorize('SuperAdmin', 'Admin'), deleteNews);

module.exports = router;
