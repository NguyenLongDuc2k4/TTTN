import React, { useState, useEffect } from 'react';

export const AdminHeader = ({ logoUrl, menuItems }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top green bar */}
      <div className="w-full h-8 bg-[#48aa43] flex items-center justify-between px-6 text-white text-[11px] font-bold">
        <span>OCHAO FOODS - HUNGHAU FMCG</span>
        <div className="flex gap-4">
          <a href="https://www.facebook.com/banhmetik" target="_blank" rel="noreferrer" className="hover:text-amber-300">Facebook</a>
          <a href="https://www.tiktok.com/@metik_333" target="_blank" rel="noreferrer" className="hover:text-amber-300">TikTok</a>
        </div>
      </div>

      {/* Main navigation */}
      <div className={`w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="block w-40">
            <img
              src={logoUrl || 'https://metik.vn/wp-content/uploads/2026/06/logometik.png'}
              alt="Metik Logo"
              className="w-full h-auto object-contain"
            />
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.url || '#'}
                className="text-sm font-black text-[#f4851a] hover:text-[#48a842] uppercase tracking-wider transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export const adminHeaderFields = {
  logoUrl: { type: 'text', label: 'URL Logo' },
  menuItems: {
    type: 'array',
    label: 'Danh sách Menu',
    arrayFields: {
      label: { type: 'text', label: 'Tên mục' },
      url: { type: 'text', label: 'Đường dẫn' },
    },
    defaultItemProps: { label: 'Menu mới', url: '#' },
  },
};

AdminHeader.defaultProps = {
  logoUrl: 'https://metik.vn/wp-content/uploads/2026/06/logometik.png',
  menuItems: [
    { label: 'Trang chủ', url: '/' },
    { label: 'Giới thiệu', url: '/gioi-thieu' },
    { label: 'Sản phẩm', url: '/san-pham' },
    { label: 'Tin tức', url: '/tin-tuc' },
    { label: 'Liên hệ', url: '/lien-he' },
  ],
};

export default AdminHeader;
