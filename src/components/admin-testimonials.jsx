import React from 'react';
import { SectionTitle } from './admin-product-card.jsx';

function StarRating({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5 text-[#ffdd00]">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function AdminTestimonials({ title, testimonials = [] }) {
  const list = testimonials.length ? testimonials : [
    {
      name: 'Sinh viên Huỳnh Vĩnh, TP.HCM',
      text: 'Snack metik ăn vừa giòn, vừa ngon vừa cuốn miệng. Em thường lựa chọn để mang theo tới trường.',
      avatar: 'https://metik.vn/wp-content/uploads/2021/05/huynhvinh.webp'
    },
    {
      name: 'Bạn Mỹ Duyên, Đồng Tháp',
      text: 'metik gợi nhớ cho em rất nhiều kỉ niệm thời thơ ấu. Hy vọng nhãn hàng trong tương lai sẽ ra nhiều sản phẩm độc đáo hơn nữa.',
      avatar: 'https://metik.vn/wp-content/uploads/2021/05/myduyen.webp'
    }
  ];

  return (
    <section className="w-full py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {title && <SectionTitle text={title} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {list.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 bg-white/70 backdrop-blur-sm rounded-tr-[30px] rounded-bl-[30px] border border-orange-100 shadow-sm">
              <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img
                  src={item.avatar || 'https://placehold.co/150'}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <StarRating />
                <p className="text-slate-600 text-sm italic leading-relaxed">
                  "{item.text}"
                </p>
                <h4 className="text-xs font-bold text-[#48a842] uppercase tracking-wider mt-1">
                  — {item.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const adminTestimonialsFields = {
  title: { type: 'text', label: 'Tiêu đề mục' },
  testimonials: {
    type: 'array',
    label: 'Đánh giá chi tiết',
    arrayFields: {
      name: { type: 'text', label: 'Tên người dùng' },
      text: { type: 'textarea', label: 'Nội dung phản hồi' },
      avatar: { type: 'text', label: 'URL Ảnh chân dung' },
    },
    defaultItemProps: {
      name: 'Khách hàng',
      text: 'Bánh snack Metik ăn giòn và cuốn lắm!',
      avatar: '',
    },
  },
};

AdminTestimonials.defaultProps = {
  title: 'Khách hàng nói gì?',
  testimonials: [],
};

export default AdminTestimonials;
