const bcrypt = require('bcryptjs');
const prisma = require('./prisma');

async function main() {
  console.log('[SEED] Đang khởi chạy seed dữ liệu...');

  // 1. Tạo tài khoản SuperAdmin và Admin mẫu
  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('123456', salt);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@gmail.com',
      password: adminPassword,
      role: 'SuperAdmin',
    },
  });

  // Đảm bảo SuperAdmin có giỏ hàng
  await prisma.cart.upsert({
    where: { userId: superAdmin.id },
    update: {},
    create: {
      userId: superAdmin.id,
    },
  });

  const editorUser = await prisma.user.upsert({
    where: { email: 'editor@gmail.com' },
    update: {},
    create: {
      name: 'Editor Quán',
      email: 'editor@gmail.com',
      password: adminPassword,
      role: 'Editor',
    },
  });

  await prisma.cart.upsert({
    where: { userId: editorUser.id },
    update: {},
    create: {
      userId: editorUser.id,
    },
  });

  console.log('[SEED] Đã khởi tạo người dùng: admin@gmail.com / 123456');

  // 2. Tạo danh mục mẫu
  const categories = [
    { name: 'Cơm Đĩa', description: 'Các món cơm đĩa truyền thống, đầy đủ dinh dưỡng.' },
    { name: 'Món Xào & Luộc', description: 'Rau xào, rau luộc ăn kèm thanh mát.' },
    { name: 'Món Canh', description: 'Canh nóng hổi hằng ngày.' },
    { name: 'Nước Giải Khát', description: 'Nước ngọt, trà sữa, trà đá giải nhiệt.' },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const c = await prisma.category.upsert({
      where: { id: categories.indexOf(cat) + 1 }, // upsert theo id giả lập
      update: {},
      create: {
        name: cat.name,
        description: cat.description,
        status: true,
      },
    });
    createdCategories.push(c);
  }
  console.log('[SEED] Đã khởi tạo các danh mục món ăn.');

  // 3. Tạo sản phẩm mẫu (món ăn)
  const categoryMap = createdCategories.reduce((acc, cat) => {
    acc[cat.name] = cat.id;
    return acc;
  }, {});

  const products = [
    {
      categoryId: categoryMap['Cơm Đĩa'],
      name: 'Cơm Sườn Nướng Lu Phủ Mỡ Hành',
      price: 45000,
      salePrice: 39000,
      quantity: 50,
      description: 'Cơm tấm dẻo thơm kết hợp sườn non nướng lu đậm vị, phủ thêm mỡ hành thơm ngậy và nước mắm chua ngọt đặc trưng.',
      isNew: true,
      isSale: true,
      isBest: true,
      image: '/uploads/com-suon-nuong.webp'
    },
    {
      categoryId: categoryMap['Cơm Đĩa'],
      name: 'Cơm Gà Xối Mỡ Da Giòn',
      price: 40000,
      salePrice: null,
      quantity: 40,
      description: 'Đùi gà lớn xối mỡ nóng hổi giòn rụm bên ngoài, thịt mềm ẩm bên trong ăn cùng cơm chiên hồng và dưa leo chua ngọt.',
      isNew: false,
      isSale: false,
      isBest: true,
      image: '/uploads/com-ga-xoi-mo.webp'
    },
    {
      categoryId: categoryMap['Cơm Đĩa'],
      name: 'Cơm Bò Xào Bông Thiên Lý',
      price: 50000,
      salePrice: 45000,
      quantity: 30,
      description: 'Thịt bò mềm xào nhanh tay với bông thiên lý tươi ngọt, ăn cùng cơm trắng nóng hổi và nước tương tỏi ớt.',
      isNew: true,
      isSale: true,
      isBest: false,
      image: '/uploads/com-bo-xao.webp'
    },
    {
      categoryId: categoryMap['Món Xào & Luộc'],
      name: 'Rau Muống Xào Tỏi',
      price: 15000,
      salePrice: null,
      quantity: 100,
      description: 'Rau muống xanh giòn xào cùng tỏi đập dập thơm lừng, món ăn kèm không thể thiếu.',
      isNew: false,
      isSale: false,
      isBest: false,
      image: '/uploads/rau-muong-xao.webp'
    },
    {
      categoryId: categoryMap['Món Canh'],
      name: 'Canh Khổ Qua Nhồi Thịt',
      price: 20000,
      salePrice: 18000,
      quantity: 35,
      description: 'Canh khổ qua giải nhiệt nhồi thịt nạc băm nhuyễn và nấm mèo, vị đắng nhẹ thanh mát.',
      isNew: false,
      isSale: true,
      isBest: true,
      image: '/uploads/canh-kho-qua.webp'
    },
    {
      categoryId: categoryMap['Nước Giải Khát'],
      name: 'Trà Đá Sả Chanh',
      price: 10000,
      salePrice: 8000,
      quantity: 200,
      description: 'Trà xanh mát lạnh, thơm sả và có vị chua dịu của chanh tươi.',
      isNew: true,
      isSale: true,
      isBest: false,
      image: '/uploads/tra-da.webp'
    },
    {
      categoryId: categoryMap['Nước Giải Khát'],
      name: 'Coca Cola Mát Lạnh',
      price: 15000,
      salePrice: null,
      quantity: 150,
      description: 'Nước ngọt có ga lon 320ml mát lạnh sảng khoái.',
      isNew: false,
      isSale: false,
      isBest: false,
      image: '/uploads/coca.webp'
    }
  ];

  for (const prod of products) {
    await prisma.product.create({
      data: prod,
    });
  }
  console.log('[SEED] Đã khởi tạo các món ăn mẫu.');

  // 4. Tạo Banners mẫu
  const banners = [
    {
      title: 'Khai Trương Quán Cơm - Đồng Giá 39K',
      image: '/uploads/banner-1.webp',
      link: '/products?isSale=true',
      status: true,
    },
    {
      title: 'Món Mới Cuối Tuần - Cơm Sườn Khổng Lồ',
      image: '/uploads/banner-2.webp',
      link: '/products',
      status: true,
    }
  ];

  for (const ban of banners) {
    await prisma.banner.create({
      data: ban,
    });
  }
  console.log('[SEED] Đã khởi tạo Banners mẫu.');

  // 5. Tạo News mẫu
  const newsList = [
    {
      title: 'Bí Quyết Làm Sườn Nướng Mềm Ngon Chuẩn Quán Cơm',
      image: '/uploads/news-1.webp',
      content: 'Để miếng sườn cốt lết nướng không bị khô, bí quyết nằm ở khâu chọn sườn có một chút mỡ riềm, ướp cùng sữa đặc, mật ong và một chút nước ngọt có ga trong tối thiểu 4 tiếng trước khi nướng lu. Nướng ở nhiệt độ trung bình và quét mỡ hành liên tục giúp miếng sườn giữ được độ ẩm và màu sắc bắt mắt...',
    },
    {
      title: 'Các Món Canh Giải Nhiệt Cho Ngày Hè Nóng Bức',
      image: '/uploads/news-2.webp',
      content: 'Mùa hè nắng nóng làm cơ thể dễ mệt mỏi và chán ăn. Canh khổ qua nhồi thịt, canh cua rau đay mồng tơi hay canh bầu nấu tôm là những lựa chọn tuyệt vời vừa cung cấp chất xơ, vitamin lại có tác dụng làm mát cơ thể, kích thích vị giác hiệu quả cho thực khách...',
    }
  ];

  for (const news of newsList) {
    await prisma.news.create({
      data: news,
    });
  }
  console.log('[SEED] Đã khởi tạo bài viết Tin Tức mẫu.');

  // 6. Khởi tạo cấu hình UI mặc định
  const defaultSettings = [
    { key: 'logo', value: '/uploads/logo-quan-com.png' },
    { key: 'themeColor', value: '#FF6B6B' },
    { key: 'showNewProducts', value: 'true' },
    { key: 'showBestProducts', value: 'true' },
    { key: 'showSaleProducts', value: 'true' },
    { key: 'showNews', value: 'true' },
  ];

  for (const set of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: set.key },
      update: { value: set.value },
      create: { key: set.key, value: set.value },
    });
  }
  console.log('[SEED] Đã khởi tạo Cấu hình UI mặc định.');

  // 7. Tạo đơn hàng giả để hiển thị biểu đồ Dashboard (6 tháng gần nhất)
  console.log('[SEED] Đang tạo dữ liệu đơn hàng giả cho biểu đồ...');

  const allProducts = await prisma.product.findMany();
  const allUsers = await prisma.user.findMany();
  const seedUser = allUsers[0]; // Dùng tài khoản SuperAdmin

  // Hàm lấy ngày ngẫu nhiên trong tháng
  function randomDateInMonth(year, month) {
    const day = Math.floor(Math.random() * 28) + 1;
    return new Date(year, month, day, 10, 0, 0);
  }

  // Dữ liệu đơn hàng mẫu theo từng tháng (tháng hiện tại - 5 đến hiện tại)
  const now = new Date();
  const fakeOrdersPerMonth = [8, 12, 10, 15, 20, 18]; // số đơn mỗi tháng

  for (let i = 5; i >= 0; i--) {
    const targetDate = new Date(now);
    targetDate.setMonth(now.getMonth() - i);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const numOrders = fakeOrdersPerMonth[5 - i];

    for (let j = 0; j < numOrders; j++) {
      // Chọn 1-3 món ngẫu nhiên
      const numItems = Math.floor(Math.random() * 3) + 1;
      const chosenProducts = allProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, numItems);

      let totalAmount = 0;
      const orderItemsData = chosenProducts.map((p) => {
        const qty = Math.floor(Math.random() * 3) + 1;
        const price = p.salePrice || p.price;
        totalAmount += price * qty;
        return {
          productId: p.id,
          quantity: qty,
          price: price,
        };
      });

      const orderDate = randomDateInMonth(year, month);

      await prisma.order.create({
        data: {
          userId: seedUser.id,
          totalAmount,
          status: 'Completed',
          shippingAddress: `${j + 1} Đường Lê Lợi, Quận ${(j % 5) + 1}, TP.HCM`,
          phone: `090${Math.floor(1000000 + Math.random() * 9000000)}`,
          createdAt: orderDate,
          updatedAt: orderDate,
          items: {
            create: orderItemsData,
          },
        },
      });
    }
    console.log(`[SEED]  -> Tháng ${month + 1}/${year}: đã tạo ${numOrders} đơn hàng`);
  }

  console.log('[SEED] Quá trình seed dữ liệu hoàn tất thành công!');
}

main()
  .catch((e) => {
    console.error('[SEED] Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
