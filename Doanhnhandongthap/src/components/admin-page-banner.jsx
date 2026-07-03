import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// AdminPageBanner – Banner tiêu đề trang (sub-page hero)
// Hỗ trợ: ảnh nền, gradient overlay, breadcrumb, tiêu đề + mô tả
// ─────────────────────────────────────────────────────────────────────────────

const FALLBACK_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80';

// ── Breadcrumb item ──────────────────────────────────────────────────────────
function Crumb({ label, href, isLast }) {
  if (isLast) {
    return (
      <li className="flex items-center gap-1.5">
        <span className="text-amber-300 text-sm font-medium">{label}</span>
      </li>
    );
  }
  return (
    <li className="flex items-center gap-1.5">
      <a
        href={href || '/'}
        className="text-white/70 hover:text-white text-sm transition-colors duration-150"
      >
        {label}
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3.5 h-3.5 text-white/40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </li>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export function AdminPageBanner({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity,
  breadcrumbs,
  textAlign,
  minHeight,
}) {
  const bgUrl  = backgroundImage || FALLBACK_BG;
  const opacity = overlayOpacity ?? 60;
  const align   = textAlign || 'center';
  const height  = minHeight || '320px';

  const alignClass = {
    left:   'items-start text-left',
    center: 'items-center text-center',
    right:  'items-end text-right',
  }[align] || 'items-center text-center';

  const crumbs = breadcrumbs?.length
    ? breadcrumbs
    : [
        { label: 'Trang chủ', href: '/' },
        { label: title || 'Trang hiện tại', href: '#' },
      ];

  return (
    <section
      className="relative w-full flex items-center overflow-hidden"
      style={{ minHeight: height }}
      aria-label="Page banner"
    >
      {/* ── Background image ──────────────────────────────── */}
      <img
        src={bgUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        onError={(e) => { e.currentTarget.src = FALLBACK_BG; }}
      />

      {/* ── Gradient overlay ─────────────────────────────── */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800/90 to-slate-900/60"
        style={{ opacity: opacity / 100 }}
      />

      {/* ── Decorative bottom wave ────────────────────────── */}
      <svg
        className="absolute bottom-0 left-0 w-full text-white"
        style={{ height: '40px' }}
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
      </svg>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 flex flex-col gap-4">
        <div className={`flex flex-col gap-3 w-full ${alignClass}`}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              {crumbs.map((c, i) => (
                <Crumb
                  key={i}
                  label={c.label}
                  href={c.href}
                  isLast={i === crumbs.length - 1}
                />
              ))}
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
            {title || 'Tiêu đề trang'}
          </h1>

          {/* Divider */}
          <div className="w-16 h-1 rounded-full bg-amber-400 mt-1" />

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-1 text-white/75 text-base md:text-lg max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Puck field definitions ───────────────────────────────────────────────────
export const adminPageBannerFields = {
  title:           { type: 'text', label: 'Tiêu đề trang' },
  subtitle:        { type: 'text', label: 'Mô tả phụ' },
  backgroundImage: { type: 'text', label: 'URL ảnh nền' },
  overlayOpacity: {
    type: 'number',
    label: 'Độ mờ overlay (%)',
    min: 0,
    max: 100,
  },
  textAlign: {
    type: 'radio',
    label: 'Căn chỉnh văn bản',
    options: [
      { label: 'Trái',   value: 'left' },
      { label: 'Giữa',   value: 'center' },
      { label: 'Phải',   value: 'right' },
    ],
  },
  minHeight:    { type: 'text', label: 'Chiều cao tối thiểu (VD: 320px)' },
  breadcrumbs: {
    type: 'array',
    label: 'Breadcrumb',
    arrayFields: {
      label: { type: 'text', label: 'Nhãn' },
      href:  { type: 'text', label: 'Đường dẫn' },
    },
    defaultItemProps: { label: 'Mục', href: '/' },
  },
};

// ── Default props ────────────────────────────────────────────────────────────
AdminPageBanner.defaultProps = {
  title:           'Tiêu đề trang',
  subtitle:        'Mô tả ngắn gọn về nội dung trang này.',
  backgroundImage: FALLBACK_BG,
  overlayOpacity:  60,
  textAlign:       'center',
  minHeight:       '320px',
  breadcrumbs: [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tiêu đề trang', href: '#' },
  ],
};

export default AdminPageBanner;
