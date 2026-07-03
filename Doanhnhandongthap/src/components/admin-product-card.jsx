import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// AdminProductCard – Grid sản phẩm responsive (1 → 2 → 3 → 4 cột)
// Dùng với Puck type: 'array', sub-fields: image | name | price | link
// ─────────────────────────────────────────────────────────────────────────────

const PLACEHOLDER_IMG =
  'https://placehold.co/400x300/e2e8f0/94a3b8?text=Sản+phẩm';

// ── Single card ──────────────────────────────────────────────────────────────
function ProductItem({ image, name, price, link }) {
  const imgSrc = image || PLACEHOLDER_IMG;

  return (
    <a
      href={link || '#'}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      aria-label={name || 'Xem sản phẩm'}
    >
      {/* ── Thumbnail ──────────────────────────────────────── */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50">
        <img
          src={imgSrc}
          alt={name || 'Sản phẩm'}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMG; }}
        />
        {/* Badge mới */}
        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
          Mới
        </span>
      </div>

      {/* ── Info ───────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors duration-200">
          {name || 'Tên sản phẩm'}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-base font-bold text-amber-600">
            {price
              ? `${Number(price).toLocaleString('vi-VN')} ₫`
              : 'Liên hệ'}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-white bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded-full transition-colors duration-200">
            Xem ngay
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Grid wrapper ─────────────────────────────────────────────────────────────
export function AdminProductCard({ sectionTitle, products = [] }) {
  const list = products.length
    ? products
    : [
        { image: '', name: 'Sản phẩm mẫu 1', price: '250000', link: '#' },
        { image: '', name: 'Sản phẩm mẫu 2', price: '380000', link: '#' },
        { image: '', name: 'Sản phẩm mẫu 3', price: '120000', link: '#' },
        { image: '', name: 'Sản phẩm mẫu 4', price: '',        link: '#' },
      ];

  return (
    <section className="w-full py-12 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* ── Section heading ─────────────────────────────── */}
        {sectionTitle && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              {sectionTitle}
            </h2>
            <div className="mt-2 mx-auto w-16 h-1 rounded-full bg-amber-500" />
          </div>
        )}

        {/* ── Responsive grid: 1 → 2 → 3 → 4 cols ───────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {list.map((item, idx) => (
            <ProductItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Puck field definitions ───────────────────────────────────────────────────
export const adminProductCardFields = {
  sectionTitle: {
    type: 'text',
    label: 'Tiêu đề mục',
  },
  products: {
    type: 'array',
    label: 'Danh sách sản phẩm',
    arrayFields: {
      image: {
        type: 'text',
        label: 'URL ảnh',
      },
      name: {
        type: 'text',
        label: 'Tên sản phẩm',
      },
      price: {
        type: 'text',
        label: 'Giá (số, VD: 250000)',
      },
      link: {
        type: 'text',
        label: 'Đường dẫn',
      },
    },
    defaultItemProps: {
      image: '',
      name: 'Tên sản phẩm',
      price: '0',
      link: '#',
    },
  },
};

// ── Default props ────────────────────────────────────────────────────────────
AdminProductCard.defaultProps = {
  sectionTitle: 'Sản phẩm nổi bật',
  products: [
    { image: '', name: 'Sản phẩm mẫu 1', price: '250000', link: '#' },
    { image: '', name: 'Sản phẩm mẫu 2', price: '380000', link: '#' },
    { image: '', name: 'Sản phẩm mẫu 3', price: '120000', link: '#' },
    { image: '', name: 'Sản phẩm mẫu 4', price: '',        link: '#' },
  ],
};

export default AdminProductCard;
