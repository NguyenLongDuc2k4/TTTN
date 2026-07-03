import React from 'react';

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';

// Tiêu đề gạch vàng độc quyền dưới chân chữ của Metik.vn
export function SectionTitle({ text }) {
  return (
    <div className="relative inline-block mb-10">
      <div className="absolute bottom-1 left-0 w-[180px] h-[12px] bg-[#ffd000] -z-10" />
      <h2 className="text-2xl md:text-3xl font-black text-[#48a842] uppercase tracking-wide">
        {text}
      </h2>
    </div>
  );
}

function ProductItem({ image, name, price, link }) {
  const imgSrc = image || PLACEHOLDER_IMG;

  return (
    <div className="group flex flex-col bg-white/70 backdrop-blur-sm border border-orange-100 rounded-tr-[30px] rounded-bl-[30px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <a href={link || '#'} className="relative block aspect-square overflow-hidden bg-slate-50">
        <img
          src={imgSrc}
          alt={name || 'Sản phẩm'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </a>
      <div className="flex flex-col flex-1 p-4 text-center items-center justify-between gap-3">
        <h3 className="text-base font-bold text-[#f4851a] hover:text-[#48a842] transition-colors line-clamp-2">
          <a href={link || '#'}>{name || 'Tên sản phẩm'}</a>
        </h3>
        
        <div className="flex flex-col gap-2 w-full mt-auto">
          {price && (
            <span className="text-base font-extrabold text-slate-800">
              {Number(price).toLocaleString('vi-VN')} ₫
            </span>
          )}
          <a
            href={link || '#'}
            className="inline-block bg-[#f3a508] hover:bg-[#e09500] text-white font-bold text-xs py-2 px-4 rounded-tr-[15px] rounded-bl-[15px] transition-colors shadow-sm"
          >
            Chi tiết
          </a>
        </div>
      </div>
    </div>
  );
}

export function AdminProductCard({ sectionTitle, products = [] }) {
  const list = products.length ? products : [
    { image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg', name: 'Snack vị Tảo biển', price: '', link: '#' },
    { image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bbq.jpg', name: 'Snack vị BBQ', price: '', link: '#' },
    { image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bap.jpg', name: 'Snack vị Bắp', price: '', link: '#' },
    { image: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-pho-mai.webp', name: 'Snack vị Phô mai', price: '', link: '#' },
  ];

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-6xl mx-auto text-left">
        {sectionTitle && <SectionTitle text={sectionTitle} />}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {list.map((item, idx) => (
            <ProductItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const adminProductCardFields = {
  sectionTitle: { type: 'text', label: 'Tiêu đề mục' },
  products: {
    type: 'array',
    label: 'Danh sách sản phẩm',
    arrayFields: {
      image: { type: 'text', label: 'URL ảnh' },
      name: { type: 'text', label: 'Tên sản phẩm' },
      price: { type: 'text', label: 'Giá tiền (nếu có)' },
      link: { type: 'text', label: 'Đường dẫn' },
    },
    defaultItemProps: {
      image: '',
      name: 'Snack Metik mới',
      price: '',
      link: '#',
    },
  },
};

AdminProductCard.defaultProps = {
  sectionTitle: 'Sản phẩm mới',
  products: [],
};

export default AdminProductCard;
