import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Component imports
// ─────────────────────────────────────────────────────────────────────────────
import { AdminHeader,     adminHeaderFields     } from './components/admin-header.jsx';
import { AdminFooter,     adminFooterFields     } from './components/admin-footer.jsx';
import { AdminHeroBanner, adminHeroBannerFields } from './components/admin-hero-banner.jsx';
import { AdminStats,      adminStatsFields      } from './components/admin-stats.jsx';
import { AdminNewsGrid,   adminNewsGridFields   } from './components/admin-news-grid.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Puck Config – Doanhnhandongthap
// ─────────────────────────────────────────────────────────────────────────────
export const config = {
  components: {

    // ── Global ───────────────────────────────────────────
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

    // ── Trang chủ ────────────────────────────────────────
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
  },

  // ── Sidebar grouping ──────────────────────────────────
  categoryGroups: [
    {
      name: 'Global',
      items: ['AdminHeader', 'AdminFooter'],
    },
    {
      name: 'Trang chủ',
      items: ['AdminHeroBanner', 'AdminStats', 'AdminNewsGrid'],
    },
  ],
};