import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Component Imports
// ─────────────────────────────────────────────────────────────────────────────
import { AdminHeader,       adminHeaderFields       } from './components/admin-header.jsx';
import { AdminFooter,       adminFooterFields       } from './components/admin-footer.jsx';
import { AdminProductCard,  adminProductCardFields  } from './components/admin-product-card.jsx';
import { AdminContactForm,  adminContactFormFields  } from './components/admin-contact-form.jsx';
import { AdminHeroSlider,   adminHeroSliderFields   } from './components/admin-hero-slider.jsx';
import { AdminAbout,        adminAboutFields        } from './components/admin-about.jsx';
import { AdminVideoReview,  adminVideoReviewFields  } from './components/admin-video-review.jsx';
import { AdminTestimonials, adminTestimonialsFields } from './components/admin-testimonials.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Puck Config – Metik (8 Components, dữ liệu thực từ metik.vn)
// ─────────────────────────────────────────────────────────────────────────────
export const puckConfig = {
  components: {

    // 1. Menu điều hướng
    AdminHeader: {
      label: 'Menu điều hướng',
      fields: adminHeaderFields,
      defaultProps: {
        logoUrl: 'https://metik.vn/wp-content/uploads/2026/06/logometik.png',
        showTopBar: true,
        topBarText: 'Hotline: 1800 1234 | info@metik.vn',
        phone: '1800 1234',
        menuItems: [
          { label: 'Trang chủ',  url: '/' },
          { label: 'Giới thiệu', url: '/gioi-thieu' },
          { label: 'Sản phẩm',  url: '/san-pham' },
          { label: 'Tin tức',   url: '/category/tin-tuc' },
          { label: 'Liên hệ',   url: '/lien-he' },
        ],
      },
      render: (props) => <AdminHeader {...props} />,
    },

    // 2. Banner chính (Hero Slider)
    AdminHeroSlider: {
      label: 'Banner chính (Hero Slider)',
      fields: adminHeroSliderFields,
      defaultProps: {
        slides: [
          { backgroundImage: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik.webp' },
          { backgroundImage: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik-2-1-scaled.webp' },
        ],
      },
      render: (props) => <AdminHeroSlider {...props} />,
    },

    // 3. Sản phẩm mới
    AdminProductCard: {
      label: 'Grid sản phẩm',
      fields: adminProductCardFields,
      defaultProps: {
        sectionTitle: 'SẢN PHẨM MỚI',
        products: [
          { name: 'Snack vị Tảo biển', price: '',  image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg',  link: 'https://metik.vn/san-pham/snack-vi-tao-bien/' },
          { name: 'Snack vị BBQ',      price: '',  image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bbq.jpg',       link: 'https://metik.vn/san-pham/snack-vi-bbq/' },
          { name: 'Snack vị Bắp',      price: '',  image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bap.jpg',       link: 'https://metik.vn/san-pham/snack-vi-bap/' },
          { name: 'Snack vị Phô mai',  price: '',  image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-pho-mai.webp',  link: 'https://metik.vn/san-pham/snack-vi-pho-mai/' },
        ],
      },
      render: (props) => <AdminProductCard {...props} />,
    },

    // 4. Giới thiệu Metik
    AdminAbout: {
      label: 'Giới thiệu Metik',
      fields: adminAboutFields,
      defaultProps: {
        sectionTitle: 'GIỚI THIỆU VỀ METIK',
        intro: 'metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.',
        rows: [
          {
            imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/hinh3.webp',
            imageLeft: true,
            text: 'Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt. METIK tập trung phát triển các dòng snack giòn, nhẹ, dễ ăn và phù hợp với nhiều nhóm khách hàng.',
          },
          {
            imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/hinh2.jpg',
            imageLeft: false,
            text: 'Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.',
          },
        ],
      },
      render: (props) => <AdminAbout {...props} />,
    },

    // 5. Video & Review
    AdminVideoReview: {
      label: 'Video & Review',
      fields: adminVideoReviewFields,
      defaultProps: {
        title: 'Video Giới Thiệu METIK',
        description: 'Xem ngay video về hành trình tạo ra những sản phẩm snack tuyệt vời của METIK – thương hiệu Việt Nam chất lượng cao.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      render: (props) => <AdminVideoReview {...props} />,
    },

    // 6. Đánh giá khách hàng
    AdminTestimonials: {
      label: 'Đánh giá khách hàng',
      fields: adminTestimonialsFields,
      defaultProps: {
        title: 'Khách Hàng Nói Gì Về METIK',
        testimonials: [
          { name: 'Nguyễn Thị Lan',  role: 'Khách hàng thân thiết', avatar: 'https://i.pravatar.cc/80?img=1', rating: 5, text: 'Snack METIK ngon lắm! Con mình rất thích vị tảo biển, ăn hoài không ngấy.' },
          { name: 'Trần Văn Nam',    role: 'Khách hàng mới',        avatar: 'https://i.pravatar.cc/80?img=3', rating: 5, text: 'Chất lượng tốt, giao hàng nhanh. Sẽ tiếp tục ủng hộ thương hiệu Việt!' },
          { name: 'Lê Thị Hoa',     role: 'Đại lý phân phối',      avatar: 'https://i.pravatar.cc/80?img=5', rating: 5, text: 'Làm đại lý cho METIK được 2 năm, khách hàng rất hài lòng và quay lại thường xuyên.' },
        ],
      },
      render: (props) => <AdminTestimonials {...props} />,
    },

    // 7. Form liên hệ
    AdminContactForm: {
      label: 'Form liên hệ',
      fields: adminContactFormFields,
      defaultProps: {
        title:    'Liên Hệ Với Chúng Tôi',
        subtitle: 'Hãy để lại thông tin, chúng tôi sẽ liên hệ lại trong 24 giờ.',
        phone:    '1800 1234',
        email:    'info@metik.vn',
        address:  '123 Đường ABC, Quận 1, TP. Hồ Chí Minh',
      },
      render: (props) => <AdminContactForm {...props} />,
    },

    // 8. Footer liên hệ
    AdminFooter: {
      label: 'Footer liên hệ',
      fields: adminFooterFields,
      defaultProps: {
        description:   'METIK – Thương hiệu snack Việt Nam chất lượng cao, đồng hành cùng gia đình Việt.',
        phone:         '1800 1234',
        email:         'info@metik.vn',
        address:       '123 Đường ABC, Quận 1, TP. Hồ Chí Minh',
        copyrightText: '© 2024 METIK – Chạm mê tít. Tất cả quyền được bảo lưu.',
        menuLinks: [
          { label: 'Trang chủ',  url: '/' },
          { label: 'Giới thiệu', url: '/gioi-thieu' },
          { label: 'Sản phẩm',  url: '/san-pham' },
          { label: 'Tin tức',   url: '/category/tin-tuc' },
          { label: 'Liên hệ',   url: '/lien-he' },
        ],
      },
      render: (props) => <AdminFooter {...props} />,
    },
  },

  // ── Nhóm sidebar ──
  categoryGroups: [
    { title: 'Điều hướng & Footer', components: ['AdminHeader', 'AdminFooter'] },
    { title: 'Banner & Giới thiệu', components: ['AdminHeroSlider', 'AdminAbout'] },
    { title: 'Sản phẩm & Nội dung', components: ['AdminProductCard', 'AdminVideoReview', 'AdminTestimonials'] },
    { title: 'Biểu mẫu',           components: ['AdminContactForm'] },
  ],

  root: {
    render: ({ children }) => (
      <div style={{ minHeight: '100vh', fontFamily: 'Lato, sans-serif',
        background: 'radial-gradient(circle at top right, rgba(255,153,0,.18), transparent 32%), radial-gradient(circle at bottom left, rgba(255,193,7,.12), transparent 36%), linear-gradient(180deg, #ffffff 0%, #f7f7f7 35%, #fff6e8 70%, #ffe2b8 100%)'
      }}>{children}</div>
    ),
  },
};

export default puckConfig;
