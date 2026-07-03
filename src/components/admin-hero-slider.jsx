import React from 'react';

export function AdminHeroSlider({ slides = [] }) {
  const list = slides.length ? slides : [
    { image: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik.webp', alt: 'Banner Metik 1' },
    { image: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik-2-1-scaled.webp', alt: 'Banner Metik 2' },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-slate-100">
      {/* Slider Carousel Simple Container */}
      <div className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth">
        {list.map((slide, idx) => (
          <div key={idx} className="w-full shrink-0 snap-start relative aspect-[1920/450] min-h-[220px] md:min-h-[450px]">
            <img
              src={slide.image}
              alt={slide.alt || 'Metik Slide'}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
        {list.map((_, i) => (
          <span key={i} className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-[#f4851a]' : 'bg-white/60'}`} />
        ))}
      </div>
    </section>
  );
}

export const adminHeroSliderFields = {
  slides: {
    type: 'array',
    label: 'Danh sách Slide ảnh',
    arrayFields: {
      image: { type: 'text', label: 'URL Ảnh Slide (tỷ lệ rộng)' },
      alt: { type: 'text', label: 'Mô tả (Alt text)' },
    },
    defaultItemProps: {
      image: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik.webp',
      alt: 'Banner Metik',
    },
  },
};

AdminHeroSlider.defaultProps = {
  slides: [],
};

export default AdminHeroSlider;
