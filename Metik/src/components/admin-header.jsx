import React from 'react';

// ─── HEADER ──────────────────────────────────────────────────────────────────
export const AdminHeader = ({ logoUrl, menuItems, showTopBar, topBarText, phone }) => {
  const navItems = menuItems || [];
  return (
    <header style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Top bar xanh lá */}
      {showTopBar && (
        <div style={{ background: '#48aa43', padding: '6px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#fff', fontSize: 13 }}>{topBarText || 'Hotline: 1800 1234 | info@metik.vn'}</span>
          <div style={{ display: 'flex', gap: 10 }}>
            {/* Facebook */}
            <a href="https://www.facebook.com/banhmetik" target="_blank" rel="noopener noreferrer"
              style={{ background: '#f4851a', color: '#fff', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, textDecoration: 'none' }}>f</a>
            {/* TikTok */}
            <a href="https://www.tiktok.com/@metik_333" target="_blank" rel="noopener noreferrer"
              style={{ background: '#000', color: '#fff', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, textDecoration: 'none' }}>tt</a>
          </div>
        </div>
      )}

      {/* Main nav */}
      <div style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,.08)', padding: '0 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          {logoUrl
            ? <img src={logoUrl} alt="METIK" style={{ height: 60, maxWidth: 200, objectFit: 'contain' }} />
            : <span style={{ fontSize: 28, fontWeight: 900, color: '#f4851a', letterSpacing: 2 }}>METIK</span>
          }
        </a>

        {/* Nav links */}
        <nav>
          <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map((item, i) => (
              <li key={i}>
                <a href={item.url || '#'} style={{ color: '#4a4a4a', textDecoration: 'none', fontWeight: 700, fontSize: 15, textTransform: 'uppercase', letterSpacing: 0.5, transition: 'color .2s' }}
                  onMouseEnter={e => e.target.style.color = '#f4851a'}
                  onMouseLeave={e => e.target.style.color = '#4a4a4a'}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Cart / Phone */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {phone && <span style={{ color: '#f4851a', fontWeight: 700, fontSize: 15 }}>📞 {phone}</span>}
        </div>
      </div>
    </header>
  );
};

export const adminHeaderFields = {
  logoUrl: { type: 'text', label: 'URL Logo' },
  showTopBar: { type: 'radio', label: 'Hiển thị top bar', options: [{ label: 'Có', value: true }, { label: 'Không', value: false }] },
  topBarText: { type: 'text', label: 'Nội dung top bar' },
  phone: { type: 'text', label: 'Số điện thoại' },
  menuItems: {
    type: 'array', label: 'Menu',
    arrayFields: {
      label: { type: 'text', label: 'Tên menu' },
      url:   { type: 'text', label: 'Đường dẫn' },
    },
    getItemSummary: (item) => item.label,
  },
};

export default AdminHeader;
