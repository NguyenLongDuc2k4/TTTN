import React from 'react';

// ─── FOOTER ──────────────────────────────────────────────────────────────────
// 2 lớp footer: footer-1 vàng chanh (#eeee22) + footer-2 vàng đậm (#f2bf09)
// + absolute-footer cam (#f4851a) → giống hệt CSS metik.vn
export const AdminFooter = ({ description, phone, email, address, copyrightText, menuLinks = [] }) => {
  return (
    <footer style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* footer-1: thông tin liên hệ */}
      <div style={{ background: '#eeee22', padding: '48px 30px 32px' }}>
        <div style={{ maxWidth: 1250, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40 }}>

          {/* Logo + mô tả */}
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#f4851a', marginBottom: 12, letterSpacing: 2 }}>METIK</div>
            <p style={{ color: '#4a4a4a', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px' }}>{description}</p>
            {/* Social */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://www.facebook.com/banhmetik" target="_blank" rel="noopener noreferrer"
                style={{ background: '#f4851a', color: '#fff', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 700 }}>f</a>
              <a href="https://www.tiktok.com/@metik_333" target="_blank" rel="noopener noreferrer"
                style={{ background: '#000', color: '#fff', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 11 }}>TT</a>
              <a href="https://www.linkedin.com/company/112466083/" target="_blank" rel="noopener noreferrer"
                style={{ background: '#0077b5', color: '#fff', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 11 }}>in</a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h4 style={{ color: '#f4851a', fontWeight: 700, textTransform: 'uppercase', marginBottom: 16, fontSize: 16 }}>Liên kết nhanh</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {(menuLinks.length > 0 ? menuLinks : [
                { label: 'Trang chủ', url: '/' },
                { label: 'Giới thiệu', url: '/gioi-thieu' },
                { label: 'Sản phẩm', url: '/san-pham' },
                { label: 'Tin tức', url: '/category/tin-tuc' },
                { label: 'Liên hệ', url: '/lien-he' },
              ]).map((item, i) => (
                <li key={i} style={{ marginBottom: 8 }}>
                  <a href={item.url || '#'} style={{ color: '#4a4a4a', textDecoration: 'none', fontSize: 14 }}
                    onMouseEnter={e => e.target.style.color = '#f4851a'}
                    onMouseLeave={e => e.target.style.color = '#4a4a4a'}>
                    › {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h4 style={{ color: '#f4851a', fontWeight: 700, textTransform: 'uppercase', marginBottom: 16, fontSize: 16 }}>Liên hệ</h4>
            {phone   && <p style={{ color: '#4a4a4a', fontSize: 14, margin: '0 0 10px' }}>📞 {phone}</p>}
            {email   && <p style={{ color: '#4a4a4a', fontSize: 14, margin: '0 0 10px' }}>✉️ {email}</p>}
            {address && <p style={{ color: '#4a4a4a', fontSize: 14, margin: 0 }}>📍 {address}</p>}
          </div>
        </div>
      </div>

      {/* footer-2: cam nhẹ */}
      <div style={{ background: '#f2bf09', padding: '14px 30px' }}>
        <div style={{ maxWidth: 1250, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ color: '#4a4a4a', fontSize: 13, margin: 0 }}>
            {copyrightText || '© 2024 METIK. Tất cả quyền được bảo lưu.'}
          </p>
        </div>
      </div>

      {/* absolute-footer cam */}
      <div style={{ background: '#f4851a', height: 8 }} />
    </footer>
  );
};

export const adminFooterFields = {
  description:   { type: 'textarea', label: 'Mô tả thương hiệu' },
  phone:         { type: 'text', label: 'Số điện thoại' },
  email:         { type: 'text', label: 'Email' },
  address:       { type: 'text', label: 'Địa chỉ' },
  copyrightText: { type: 'text', label: 'Bản quyền' },
  menuLinks: {
    type: 'array', label: 'Liên kết nhanh',
    arrayFields: {
      label: { type: 'text', label: 'Tên' },
      url:   { type: 'text', label: 'URL' },
    },
    getItemSummary: (item) => item.label,
  },
};

export default AdminFooter;
