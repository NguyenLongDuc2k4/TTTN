import React from 'react';

// ─── HERO SLIDER ─────────────────────────────────────────────────────────────
// Giống slider thực tế trên metik.vn: toàn màn, ảnh banner, có prev/next dots
export function AdminHeroSlider({ slides = [] }) {
  const [current, setCurrent] = React.useState(0);
  const list = slides.length > 0 ? slides : [
    { backgroundImage: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik.webp' },
    { backgroundImage: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik-2-1-scaled.webp' },
  ];

  // Auto play
  React.useEffect(() => {
    if (list.length <= 1) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % list.length), 4000);
    return () => clearInterval(t);
  }, [list.length]);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>
      {/* Slides */}
      {list.map((slide, i) => (
        <div key={i} style={{
          display: i === current ? 'block' : 'none',
          position: 'relative',
          width: '100%',
        }}>
          <img
            src={slide.backgroundImage}
            alt={slide.title || `Banner ${i + 1}`}
            style={{ width: '100%', display: 'block', maxHeight: 500, objectFit: 'cover' }}
          />
          {/* Overlay text nếu có */}
          {(slide.title || slide.subtitle) && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,.35)', padding: '0 20px', textAlign: 'center',
            }}>
              {slide.title && <h1 style={{ color: '#fff', fontSize: 42, fontWeight: 900, margin: '0 0 12px', fontFamily: 'Lato,sans-serif', textShadow: '0 2px 8px rgba(0,0,0,.5)' }}>{slide.title}</h1>}
              {slide.subtitle && <p style={{ color: '#fff', fontSize: 20, margin: '0 0 24px', fontFamily: 'Lato,sans-serif' }}>{slide.subtitle}</p>}
              {slide.primaryBtnText && (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a href={slide.primaryBtnLink || '#'} style={{ background: '#f4851a', color: '#fff', padding: '12px 28px', borderRadius: 4, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                    {slide.primaryBtnText}
                  </a>
                  {slide.secondaryBtnText && (
                    <a href={slide.secondaryBtnLink || '#'} style={{ background: '#48a842', color: '#fff', padding: '12px 28px', borderRadius: 4, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                      {slide.secondaryBtnText}
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Prev / Next */}
      {list.length > 1 && (
        <>
          <button onClick={() => setCurrent(c => (c - 1 + list.length) % list.length)}
            style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.7)', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 18, cursor: 'pointer', zIndex: 10 }}>‹</button>
          <button onClick={() => setCurrent(c => (c + 1) % list.length)}
            style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.7)', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 18, cursor: 'pointer', zIndex: 10 }}>›</button>
          {/* Dots */}
          <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
            {list.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 10, height: 10, borderRadius: 5, background: i === current ? '#f4851a' : '#fff', border: 'none', cursor: 'pointer', padding: 0, transition: 'width .3s' }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export const adminHeroSliderFields = {
  slides: {
    type: 'array', label: 'Danh sách slide',
    arrayFields: {
      backgroundImage:  { type: 'text', label: 'URL ảnh banner' },
      title:            { type: 'text', label: 'Tiêu đề (tuỳ chọn)' },
      subtitle:         { type: 'text', label: 'Mô tả (tuỳ chọn)' },
      primaryBtnText:   { type: 'text', label: 'Nút chính – text' },
      primaryBtnLink:   { type: 'text', label: 'Nút chính – link' },
      secondaryBtnText: { type: 'text', label: 'Nút phụ – text' },
      secondaryBtnLink: { type: 'text', label: 'Nút phụ – link' },
    },
    getItemSummary: (item) => item.title || item.backgroundImage || 'Slide',
  },
};

export default AdminHeroSlider;
