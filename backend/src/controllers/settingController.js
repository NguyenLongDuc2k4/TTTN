const prisma = require('../utils/prisma');

// Lấy tất cả các cài đặt giao diện
const getSettings = async (req, res) => {
  try {
    const settingsList = await prisma.setting.findMany();
    // Chuyển danh sách [{key: 'logo', value: 'url'}] thành dạng object {logo: 'url'}
    const settingsObject = settingsList.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    // Trả về các cấu hình mặc định nếu chưa được setup trong database
    const defaultSettings = {
      logo: '',
      themeColor: '#FF6B6B', // Đỏ cam đặc trưng quán cơm
      showNewProducts: 'true',
      showBestProducts: 'true',
      showSaleProducts: 'true',
      showNews: 'true',
      ...settingsObject
    };

    return res.json(defaultSettings);
  } catch (error) {
    console.error('Lỗi lấy cài đặt:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

// Cập nhật cấu hình cài đặt (Admin)
const updateSettings = async (req, res) => {
  try {
    const settingsData = req.body; // Một Object { key1: value1, key2: value2 }

    if (!settingsData || typeof settingsData !== 'object') {
      return res.status(400).json({ message: 'Dữ liệu cấu hình không hợp lệ.' });
    }

    const keys = Object.keys(settingsData);
    
    // Sử dụng Transaction để cập nhật/tạo mới đồng thời nhiều cấu hình
    await prisma.$transaction(
      keys.map((key) =>
        prisma.setting.upsert({
          where: { key },
          update: { value: String(settingsData[key]) },
          create: { key, value: String(settingsData[key]) },
        })
      )
    );

    return res.json({ message: 'Cập nhật cấu hình giao diện thành công.' });
  } catch (error) {
    console.error('Lỗi cập nhật cài đặt:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
