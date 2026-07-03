import React from 'react';

// Tiêu đề với dải highlight vàng lệch đặc trưng ở chân chữ
function AboutSectionTitle({ text }) {
  return (
    <div className="relative inline-block mb-4">
      <div 
        style={{
          position: 'absolute',
          bottom: '2px',
          right: '0px',
          width: '200px',
          height: '15px',
          backgroundColor: '#ffd000',
          zIndex: 1,
        }} 
      />
      <h2 
        className="text-2xl font-black uppercase tracking-wide relative"
        style={{
          color: 'rgb(72, 168, 66)',
          zIndex: 2,
        }}
      >
        {text}
      </h2>
    </div>
  );
}

export function AdminAbout({
  sectionTitle,
  topDescription,
  
  // Hàng 1
  row1Image,
  row1Text,
  
  // Hàng 2
  row2Points = [],
  row2Image,
  
  // Hàng 3
  row3Image,
  row3Text,
}) {
  
  const defaultPoints = row2Points.length ? row2Points : [
    'Sử dụng nguyên liệu có nguồn gốc rõ ràng, phù hợp với tiêu chuẩn sản xuất thực phẩm.',
    'Quy trình sản xuất hiện đại, khép kín và đảm bảo vệ sinh an toàn thực phẩm.',
    'Kiểm soát chất lượng chặt chẽ trong từng công đoạn, từ nguyên liệu đầu vào đến thành phẩm.',
  ];

  return (
    <section className="w-full py-10 px-4 md:px-8 bg-transparent">
      <div className="max-w-5xl mx-auto flex flex-col gap-14">
        
        {/* ── PHẦN ĐẦU: TIÊU ĐỀ & MÔ TẢ TRÊN CÙNG ── */}
        <div className="flex flex-col items-start">
          {sectionTitle && <AboutSectionTitle text={sectionTitle} />}
          {topDescription && (
            <p className="text-slate-600 text-[1.1rem] leading-relaxed mt-2 text-justify">
              {topDescription}
            </p>
          )}
        </div>

        {/* ── HÀNG 1: Ảnh trái (snack) · Chữ phải ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="overflow-hidden rounded-tr-[40px] rounded-bl-[40px] shadow-sm border border-slate-100 bg-white">
            <img
              src={row1Image || 'https://metik.vn/wp-content/uploads/2021/05/hinh3.webp'}
              alt="Giới thiệu Metik"
              className="w-full h-auto object-cover aspect-[5/3]"
            />
          </div>
          <div className="text-slate-700 text-[1.1rem] leading-relaxed text-justify">
            {row1Text || 'Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt. METIK tập trung phát triển các dòng snack giòn, nhẹ, dễ ăn và phù hợp với nhiều nhóm khách hàng. Sản phẩm được nghiên cứu với nhiều hương vị hấp dẫn như rong biển, bắp, phô mai, BBQ và các hương vị đặc trưng khác.'}
          </div>
        </div>

        {/* ── HÀNG 2: Chữ trái (gạch đầu dòng) · Ảnh phải (nhà máy) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <ul className="flex flex-col gap-4 text-slate-700 text-[1.1rem] leading-relaxed">
              {defaultPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-justify">
                  <span className="text-xl leading-none text-slate-800 shrink-0 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 overflow-hidden rounded-tr-[40px] rounded-bl-[40px] shadow-sm border border-slate-100 bg-white">
            <img
              src={row2Image || 'https://metik.vn/wp-content/uploads/2021/05/hinh0003.webp'}
              alt="Nhà máy OCHAO"
              className="w-full h-auto object-cover aspect-[5/2.1]"
            />
          </div>
        </div>

        {/* ── HÀNG 3: Ảnh trái (bạn nữ) · Chữ phải ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="overflow-hidden rounded-tr-[40px] rounded-bl-[40px] shadow-sm border border-slate-100 bg-white">
            <img
              src={row3Image || 'https://metik.vn/wp-content/uploads/2021/05/hinh2.jpg'}
              alt="Phong cách Metik"
              className="w-full h-auto object-cover aspect-[5/3.2]"
            />
          </div>
          <div className="text-slate-700 text-[1.1rem] leading-relaxed text-justify">
            {row3Text || 'Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.'}
          </div>
        </div>

      </div>
    </section>
  );
}

export const adminAboutFields = {
  sectionTitle: { type: 'text', label: 'Tiêu đề mục' },
  topDescription: { type: 'textarea', label: 'Mô tả trên cùng' },
  
  row1Image: { type: 'text', label: 'Hàng 1: URL Ảnh (trái)' },
  row1Text: { type: 'textarea', label: 'Hàng 1: Văn bản (phải)' },
  
  row2Image: { type: 'text', label: 'Hàng 2: URL Ảnh nhà máy (phải)' },
  row2Points: {
    type: 'array',
    label: 'Hàng 2: Danh sách gạch đầu dòng (trái)',
    arrayFields: {
      text: { type: 'text', label: 'Nội dung' }
    },
    defaultItemProps: 'Nội dung tiêu chuẩn mới',
  },
  
  row3Image: { type: 'text', label: 'Hàng 3: URL Ảnh bạn nữ (trái)' },
  row3Text: { type: 'textarea', label: 'Hàng 3: Văn bản (phải)' },
};

AdminAbout.defaultProps = {
  sectionTitle: 'GIỚI THIỆU VỀ METIK',
  topDescription: 'metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.',
  
  row1Image: 'https://metik.vn/wp-content/uploads/2021/05/hinh3.webp',
  row1Text: '',
  
  row2Image: 'https://metik.vn/wp-content/uploads/2021/05/hinh0003.webp',
  row2Points: [],
  
  row3Image: 'https://metik.vn/wp-content/uploads/2021/05/hinh2.jpg',
  row3Text: '',
};

export default AdminAbout;
