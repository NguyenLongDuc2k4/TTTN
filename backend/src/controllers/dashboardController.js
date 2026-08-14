const prisma = require('../utils/prisma');

// Lấy thông tin thống kê dashboard
const getDashboardStats = async (req, res) => {
  try {
    // 1. Đếm số lượng các thực thể
    const totalProducts = await prisma.product.count();
    const totalCategories = await prisma.category.count();
    const totalOrders = await prisma.order.count();
    const totalUsers = await prisma.user.count();

    // 2. Tính tổng doanh thu từ các đơn hàng đã hoàn thành (Completed)
    const completedOrders = await prisma.order.findMany({
      where: { status: 'Completed' },
      select: { totalAmount: true },
    });

    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // 3. Thống kê doanh thu theo tháng (trong vòng 6 tháng gần nhất)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1); // Bắt đầu từ ngày đầu tiên của tháng đó

    const ordersForStats = await prisma.order.findMany({
      where: {
        status: 'Completed',
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        totalAmount: true,
        createdAt: true,
      },
    });

    // Tạo mảng thống kê 6 tháng gần nhất
    const monthlyStats = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthLabel = `${d.getMonth() + 1}/${d.getFullYear()}`;
      
      // Lọc các đơn hàng trong tháng này
      const monthlyOrders = ordersForStats.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === d.getMonth() && orderDate.getFullYear() === d.getFullYear();
      });

      const revenue = monthlyOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const count = monthlyOrders.length;

      monthlyStats.push({
        month: monthLabel,
        revenue,
        orders: count,
      });
    }

    return res.json({
      summary: {
        totalProducts,
        totalCategories,
        totalOrders,
        totalUsers,
        totalRevenue,
      },
      chartData: monthlyStats,
    });
  } catch (error) {
    console.error('Lỗi lấy thống kê dashboard:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trên máy chủ.' });
  }
};

module.exports = {
  getDashboardStats,
};
