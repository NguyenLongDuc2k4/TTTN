import React from 'react';

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
// Section heading giống metik.vn: gạch vàng bên dưới, chữ xanh lá

function SectionHeading({ text }) {
  return (
    <div style={{ position: 'relative', width: 'fit-content', marginBottom: 32 }}>
      {/* Gạch vàng nền */}
      <div style={{ width: '100%', height: 14, background: '#ffd000', position: 'absolute', bottom: 2, left: 0, zIndex: 0 }} />
      <p style={{ fontWeight: 900, fontSize: 22, color: '#48a842', margin: 0, position: 'relative', zIndex: 1, fontFamily: 'Lato, sans-serif', textTransform: 'uppercase' }}>
        {text}
      </p>
    </div>
  );
}

export function AdminProductCard({ sectionTitle, products = [] }) {
  return (
    <section style={{ padding: '36px 30px', fontFamily: 'Lato, sans-serif', background: 'transparent' }}>
      <SectionHeading text={sectionTitle || 'SẢN PHẨM MỚI'} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
        {products.map((p, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,.08)',
            transition: 'box-shadow .25s, transform .25s',
            cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(244,133,26,.25)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.08)'; e.currentTarget.style.transform = 'none'; }}>
            {/* Product image */}
            <div style={{ overflow: 'hidden' }}>
              <img src={p.image} alt={p.name}
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', transition: 'transform .3s' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>

            {/* Info */}
            <div style={{ padding: '14px 16px 18px' }}>
              <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 15, color: '#f4851a', lineHeight: 1.4 }}>
                <a href={p.link || '#'} style={{ color: '#f4851a', textDecoration: 'none' }}>{p.name}</a>
              </p>
              {p.price && (
                <p style={{ margin: '0 0 12px', color: '#4a4a4a', fontSize: 14 }}>{p.price}</p>
              )}
              <a href={p.link || '#'} style={{
                display: 'inline-block', background: '#f3a508', color: '#fff',
                padding: '7px 18px', borderRadius: 4, fontSize: 13, fontWeight: 700, textDecoration: 'none',
              }}>
                Xem sản phẩm
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const adminProductCardFields = {
  sectionTitle: { type: 'text', label: 'Tiêu đề khu vực' },
  products: {
    type: 'array', label: 'Danh sách sản phẩm',
    arrayFields: {
      name:  { type: 'text', label: 'Tên sản phẩm' },
      price: { type: 'text', label: 'Giá' },
      image: { type: 'text', label: 'URL hình ảnh' },
      link:  { type: 'text', label: 'Link sản phẩm' },
    },
    getItemSummary: (item) => item.name || 'Sản phẩm',
  },
};

export default AdminProductCard;
