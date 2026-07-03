import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Component imports – Global
// ─────────────────────────────────────────────────────────────────────────────
import { AdminHeader,      adminHeaderFields      } from './components/admin-header.jsx';
import { AdminFooter,      adminFooterFields      } from './components/admin-footer.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Component imports – Trang chủ
// ─────────────────────────────────────────────────────────────────────────────
import { AdminHeroBanner,  adminHeroBannerFields  } from './components/admin-hero-banner.jsx';
import { AdminStats,       adminStatsFields       } from './components/admin-stats.jsx';
import { AdminNewsGrid,    adminNewsGridFields    } from './components/admin-news-grid.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Component imports – Sản phẩm
// ─────────────────────────────────────────────────────────────────────────────
import { AdminProductCard, adminProductCardFields } from './components/admin-product-card.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Component imports – Trang con
// ─────────────────────────────────────────────────────────────────────────────
import { AdminContactForm, adminContactFormFields } from './components/admin-contact-form.jsx';
import { AdminPageBanner,  adminPageBannerFields  } from './components/admin-page-banner.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Puck Config – Metik / Doanhnhandongthap
// ─────────────────────────────────────────────────────────────────────────────
export const config = {
  components: {

    // ── Global ─────────────────────────────────────────────────────────────
    AdminHeader: {
      label: 'Header – Điều hướng',
      fields: adminHeaderFields,
      defaultProps: AdminHeader.defaultProps,
      render: AdminHeader,
    },

    AdminFooter: {
      label: 'Footer – Chân trang',
      fields: adminFooterFields,
      defaultProps: AdminFooter.defaultProps,
      render: AdminFooter,
    },

    // ── Trang chủ ──────────────────────────────────────────────────────────
    AdminHeroBanner: {
      label: 'Hero Banner – Banner chính',
      fields: adminHeroBannerFields,
      defaultProps: AdminHeroBanner.defaultProps,
      render: AdminHeroBanner,
    },

    AdminStats: {
      label: 'Khối thống kê',
      fields: adminStatsFields,
      defaultProps: AdminStats.defaultProps,
      render: AdminStats,
    },

    AdminNewsGrid: {
      label: 'Khối tin tức',
      fields: adminNewsGridFields,
      defaultProps: AdminNewsGrid.defaultProps,
      render: AdminNewsGrid,
    },

    // ── Sản phẩm ───────────────────────────────────────────────────────────
    AdminProductCard: {
      label: 'Grid sản phẩm',
      fields: adminProductCardFields,
      defaultProps: AdminProductCard.defaultProps,
      render: AdminProductCard,
    },

    // ── Trang con ──────────────────────────────────────────────────────────
    AdminContactForm: {
      label: 'Form liên hệ',
      fields: adminContactFormFields,
      defaultProps: AdminContactForm.defaultProps,
      render: AdminContactForm,
    },

    AdminPageBanner: {
      label: 'Banner tiêu đề trang',
      fields: adminPageBannerFields,
      defaultProps: AdminPageBanner.defaultProps,
      render: AdminPageBanner,
    },
  },

  // ── Sidebar grouping ──────────────────────────────────────────────────────
  categoryGroups: [
    {
      name: 'Global',
      items: ['AdminHeader', 'AdminFooter'],
    },
    {
      name: 'Trang chủ',
      items: ['AdminHeroBanner', 'AdminStats', 'AdminNewsGrid'],
    },
    {
      name: 'Sản phẩm',
      items: ['AdminProductCard'],
    },
    {
      name: 'Trang con',
      items: ['AdminContactForm', 'AdminPageBanner'],
    },
  ],
};