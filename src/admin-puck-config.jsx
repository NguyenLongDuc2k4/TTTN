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
// Puck Config – Metik (Đã loại bỏ Banner tiêu đề trang)
// ─────────────────────────────────────────────────────────────────────────────
export const config = {
  components: {
    // 1. Grid sản phẩm
    AdminProductCard: {
      label: 'Grid sản phẩm',
      fields: adminProductCardFields,
      defaultProps: AdminProductCard.defaultProps,
      render: AdminProductCard,
    },

    // 2. Form liên hệ
    AdminContactForm: {
      label: 'Form liên hệ',
      fields: adminContactFormFields,
      defaultProps: AdminContactForm.defaultProps,
      render: AdminContactForm,
    },

    // 3. Banner chính (Hero Slider)
    AdminHeroSlider: {
      label: 'Banner chính (Hero Slider)',
      fields: adminHeroSliderFields,
      defaultProps: AdminHeroSlider.defaultProps,
      render: AdminHeroSlider,
    },

    // 4. Giới thiệu Metik
    AdminAbout: {
      label: 'Giới thiệu Metik',
      fields: adminAboutFields,
      defaultProps: AdminAbout.defaultProps,
      render: AdminAbout,
    },

    // 5. Video & Review
    AdminVideoReview: {
      label: 'Video & Review',
      fields: adminVideoReviewFields,
      defaultProps: AdminVideoReview.defaultProps,
      render: AdminVideoReview,
    },

    // 6. Đánh giá khách hàng
    AdminTestimonials: {
      label: 'Đánh giá khách hàng',
      fields: adminTestimonialsFields,
      defaultProps: AdminTestimonials.defaultProps,
      render: AdminTestimonials,
    },

    // 7. Menu điều hướng
    AdminHeader: {
      label: 'Menu điều hướng',
      fields: adminHeaderFields,
      defaultProps: AdminHeader.defaultProps,
      render: AdminHeader,
    },

    // 8. Footer liên hệ
    AdminFooter: {
      label: 'Footer liên hệ',
      fields: adminFooterFields,
      defaultProps: AdminFooter.defaultProps,
      render: AdminFooter,
    },
  },

  // ── Chia nhóm trong sidebar ──
  categoryGroups: [
    {
      name: 'Điều hướng & Chân trang',
      items: ['AdminHeader', 'AdminFooter'],
    },
    {
      name: 'Banner & Trình chiếu',
      items: ['AdminHeroSlider'],
    },
    {
      name: 'Nội dung & Sản phẩm',
      items: ['AdminAbout', 'AdminProductCard', 'AdminVideoReview', 'AdminTestimonials'],
    },
    {
      name: 'Biểu mẫu',
      items: ['AdminContactForm'],
    },
  ],
};

export default config;