import React from 'react';

// ─── SECTION HEADING dùng chung ──────────────────────────────────────────────
function SectionHeading({ text }) {
  return (
    <div style={{ position: 'relative', width: 'fit-content', marginBottom: 28 }}>
      <div style={{ width: '100%', height: 14, background: '#ffd000', position: 'absolute', bottom: 2, left: 0, zIndex: 0 }} />
      <p style={{ fontWeight: 900, fontSize: 22, color: '#48a842', margin: 0, position: 'relative', zIndex: 1, fontFamily: 'Lato, sans-serif', textTransform: 'uppercase' }}>
        {text}
      </p>
    </div>
  );
}

// ─── ABOUT METIK ─────────────────────────────────────────────────────────────
// Layout thực tế: 2 cột xen kẽ ảnh + text giống metik.vn/gioi-thieu
export function AdminAbout({ sectionTitle, intro, rows = [] }) {
  return (
    <section style={{ padding: '36px 30px', fontFamily: 'Lato, sans-serif', background: 'transparent', maxWidth: 1250, margin: '0 auto' }}>
      <SectionHeading text={sectionTitle || 'GIỚI THIỆU VỀ METIK'} />

      {/* Intro text */}
      {intro && (
        <p style={{ fontSize: '1.3rem', color: '#4a4a4a', marginBottom: 32, lineHeight: 1.7 }}>{intro}</p>
      )}

      {/* Rows: mỗi row là { imageLeft: bool, imageUrl, text/list } */}
      {rows.map((row, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          alignItems: 'center',
          marginBottom: 40,
        }}>
          {/* Image */}
          <div style={{ order: row.imageLeft === false ? 2 : 1 }}>
            <img src={row.imageUrl} alt={`Ảnh ${i + 1}`}
              style={{ width: '100%', borderRadius: '0 40px', objectFit: 'cover', display: 'block' }}
            />
          </div>
          {/* Text */}
          <div style={{ order: row.imageLeft === false ? 1 : 2 }}>
            <p style={{ fontSize: '1.3rem', color: '#4a4a4a', lineHeight: 1.8, margin: 0 }}>{row.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export const adminAboutFields = {
  sectionTitle: { type: 'text', label: 'Tiêu đề khu vực' },
  intro: { type: 'textarea', label: 'Đoạn giới thiệu chính' },
  rows: {
    type: 'array', label: 'Khối ảnh + nội dung',
    arrayFields: {
      imageUrl:   { type: 'text', label: 'URL hình ảnh' },
      imageLeft:  { type: 'radio', label: 'Ảnh bên', options: [{ label: 'Trái', value: true }, { label: 'Phải', value: false }] },
      text:       { type: 'textarea', label: 'Nội dung đoạn văn' },
    },
    getItemSummary: (_, i) => `Khối ${i + 1}`,
  },
};

export default AdminAbout;
