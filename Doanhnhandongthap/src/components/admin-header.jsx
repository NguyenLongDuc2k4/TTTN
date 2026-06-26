import React, { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Atom – Desktop Nav Link  (hover underline màu #E91E8C)
// ─────────────────────────────────────────────────────────────────────────────
const NavLink = ({ label, url }) => (
  <a
    href={url}
    style={{
      color: '#e5e7eb',
      fontSize: '15px',
      fontWeight: 500,
      textDecoration: 'none',
      transition: 'color 0.2s ease',
      whiteSpace: 'nowrap',
      fontFamily: "'Be Vietnam Pro', sans-serif",
    }}
    onMouseEnter={(e) => { e.target.style.color = '#E91E8C'; }}
    onMouseLeave={(e) => { e.target.style.color = '#e5e7eb'; }}
  >
    {label}
  </a>
);

// ─────────────────────────────────────────────────────────────────────────────
// Atom – Mobile Nav Link
// ─────────────────────────────────────────────────────────────────────────────
const MobileNavLink = ({ label, url, onClick }) => (
  <a
    href={url}
    onClick={onClick}
    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    className="block py-3 px-6 text-base font-medium text-gray-800 hover:text-[#E91E8C] hover:bg-gray-50 transition-colors"
  >
    {label}
  </a>
);

// ─────────────────────────────────────────────────────────────────────────────
// Atom – VN/EN Language Toggle (gold gradient pill – khớp với demo)
// ─────────────────────────────────────────────────────────────────────────────
const LangToggle = ({ activeLang, onToggle }) => (
  <div
    onClick={onToggle}
    style={{
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(180deg, #CBA359 0%, #FAF390 18%, #FBC944 65%, #FCAF14 94%)',
      borderRadius: '50px',
      padding: '3px 5px',
      gap: '2px',
      cursor: 'pointer',
      flexShrink: 0,
      transition: 'box-shadow 0.3s, filter 0.3s',
      boxShadow: '0 2px 8px rgba(203, 163, 89, 0.35)',
    }}
  >
    <span
      title="Tiếng Việt"
      style={{
        fontSize: '12px',
        fontWeight: 700,
        color: activeLang === 'vi' ? '#c8860a' : '#7a4e00',
        cursor: 'pointer',
        letterSpacing: '0.06em',
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: activeLang === 'vi' ? '#5a3200' : 'transparent',
        flexShrink: 0,
        transition: 'all 0.2s',
      }}
    >
      VN
    </span>
    <span
      title="English"
      style={{
        fontSize: '12px',
        fontWeight: 700,
        color: activeLang === 'en' ? '#c8860a' : '#7a4e00',
        cursor: 'pointer',
        letterSpacing: '0.04em',
        lineHeight: 1,
        paddingLeft: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: activeLang === 'en' ? '#5a3200' : 'transparent',
        transition: 'all 0.2s',
      }}
    >
      EN
    </span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Organism – AdminHeader  (khớp demo: fixed, 80px, #2465B3 / scroll #002F96)
// ─────────────────────────────────────────────────────────────────────────────
export const AdminHeader = ({
  logoUrl,
  logoAlt,
  logoTextLine1,
  logoTextLine2,
  menuItems,
  showLangToggle,
  transparentOnHome,
}) => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeLang,  setActiveLang]  = useState('vi');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerBg = scrolled
    ? '#002F96'
    : (transparentOnHome ? 'transparent' : '#2465B3');

  const headerBlur = scrolled ? 'blur(18px)' : 'blur(0px)';
  const headerShadow = scrolled
    ? '0 4px 24px rgba(0, 0, 0, 0.18)'
    : 'none';
  const headerBorderBottom = scrolled
    ? '1px solid rgba(255, 255, 255, 0.1)'
    : '1px solid transparent';

  return (
    <>
      {/* ── Fixed Header ──────────────────────────────── */}
      <header
        id="navbar"
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          width:          '100%',
          zIndex:         50,
          height:         '80px',
          display:        'flex',
          alignItems:     'center',
          background:     headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          borderBottom:   headerBorderBottom,
          boxShadow:      headerShadow,
          transition:     'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          fontFamily:     "'Be Vietnam Pro', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth:       '1750px',
            margin:         '0 auto',
            width:          '100%',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
          }}
          className="px-4 md:px-12 lg:px-20"
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display:     'flex',
              alignItems:  'center',
              gap:         '12px',
              flexShrink:  0,
              textDecoration: 'none',
            }}
          >
            <img
              src={logoUrl}
              alt={logoAlt}
              className="h-10 sm:h-12 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/160x48/2465B3/ffffff?text=CLB+DNT';
              }}
            />
            {(logoTextLine1 || logoTextLine2) && (
              <div className="hidden lg:flex flex-col" style={{ lineHeight: 'tight', gap: '3px' }}>
                {logoTextLine1 && (
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', textAlign: 'left', letterSpacing: '0.02em' }}>
                    {logoTextLine1}
                  </span>
                )}
                {logoTextLine2 && (
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', textAlign: 'left', opacity: 0.9 }}>
                    {logoTextLine2}
                  </span>
                )}
              </div>
            )}
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden xl:flex items-center justify-center flex-1"
            style={{ gap: '28px' }}
          >
            {Array.isArray(menuItems) &&
              menuItems.map((item, i) => (
                <NavLink key={i} label={item.label} url={item.url} />
              ))}
          </nav>

          {/* Right: Lang toggle + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Lang toggle – Desktop */}
            {showLangToggle && (
              <div className="hidden xl:block">
                <LangToggle
                  activeLang={activeLang}
                  onToggle={() => setActiveLang(activeLang === 'vi' ? 'en' : 'vi')}
                />
              </div>
            )}

            {/* Hamburger – Mobile */}
            <button
              className="xl:hidden text-white focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ──────────────────────────── */}
        <div
          className={`xl:hidden fixed w-full bg-white shadow-2xl border-t border-gray-100 z-40 transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          style={{ top: '80px', left: 0 }}
        >
          <div className="py-4">
            {Array.isArray(menuItems) &&
              menuItems.map((item, i) => (
                <MobileNavLink
                  key={i}
                  label={item.label}
                  url={item.url}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
            {showLangToggle && (
              <div className="flex justify-center px-6 pt-4 mt-2 pb-2 border-t border-gray-100">
                <LangToggle
                  activeLang={activeLang}
                  onToggle={() => setActiveLang(activeLang === 'vi' ? 'en' : 'vi')}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spacer to push content below fixed header */}
      <div style={{ height: '80px' }} />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Default Props
// ─────────────────────────────────────────────────────────────────────────────
AdminHeader.defaultProps = {
  logoUrl: 'https://webdemo.hexagon.xyz/medias/logo 2.png',
  logoAlt: 'Logo CLB Doanh nhân Đồng Tháp',
  logoTextLine1: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
  logoTextLine2: 'TẠI TP.HỒ CHÍ MINH',
  showLangToggle: true,
  transparentOnHome: false,
  menuItems: [
    { label: 'Trang chủ',          url: '/'           },
    { label: 'Giới thiệu',         url: '/gioi-thieu' },
    { label: 'Hội viên',           url: '/hoi-vien'   },
    { label: 'Hoạt động Ban',      url: '/'           },
    { label: 'Tin tức & Sự kiện',  url: '#tin-tuc'    },
    { label: 'Liên hệ',            url: '#lien-he'    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Puck Field Definitions
// ─────────────────────────────────────────────────────────────────────────────
export const adminHeaderFields = {
  logoUrl: {
    type: 'text',
    label: 'URL Logo',
  },
  logoAlt: {
    type: 'text',
    label: 'Alt text Logo',
  },
  logoTextLine1: {
    type: 'text',
    label: 'Dòng chữ logo 1',
  },
  logoTextLine2: {
    type: 'text',
    label: 'Dòng chữ logo 2',
  },
  showLangToggle: {
    type: 'radio',
    label: 'Hiển thị chuyển ngôn ngữ VN/EN',
    options: [
      { label: 'Có',    value: true  },
      { label: 'Không', value: false },
    ],
  },
  transparentOnHome: {
    type: 'radio',
    label: 'Header trong suốt (trang chủ)',
    options: [
      { label: 'Có',    value: true  },
      { label: 'Không', value: false },
    ],
  },
  menuItems: {
    type: 'array',
    label: 'Danh sách menu',
    arrayFields: {
      label: { type: 'text', label: 'Tên mục' },
      url:   { type: 'text', label: 'Đường dẫn' },
    },
    defaultItemProps: { label: 'Mục mới', url: '#' },
  },
};
