import React from 'react';
import { SectionTitle } from './admin-product-card.jsx';

export function AdminVideoReview({ title, description, videoUrl }) {
  const defaultVideo = 'https://metik.vn/wp-content/uploads/2026/06/METIK-ChamMeTit.mp4';

  return (
    <section className="w-full py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {title && <SectionTitle text={title} />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-6">
          {/* Cột Video dùng thẻ video HTML5 thuần, bo góc đặc trưng Metik */}
          <div className="rounded-tr-[30px] rounded-bl-[30px] overflow-hidden border-4 border-white shadow-lg aspect-video bg-black relative">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              src={videoUrl || defaultVideo}
            />
          </div>

          {/* Cột Nội dung mô tả */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-black text-[#48a842] uppercase tracking-wide">
              Chạm Mê Tít - Snap into Joy
            </h3>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              {description || `Với tinh thần “Chạm mê tít – Snap into Joy”, metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, metik mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.`}
            </p>
            <p className="text-slate-600 text-sm italic font-medium">
              metik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export const adminVideoReviewFields = {
  title: { type: 'text', label: 'Tiêu đề mục' },
  description: { type: 'textarea', label: 'Mô tả chi tiết' },
  videoUrl: { type: 'text', label: 'URL Video MP4' },
};

AdminVideoReview.defaultProps = {
  title: 'Về Chúng Tôi',
  description: '',
  videoUrl: '',
};

export default AdminVideoReview;
