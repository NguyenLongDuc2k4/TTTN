import React, { useRef, useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const categoryColors = {
  'Tin tức':      'bg-[#0B5077]/10 text-[#0B5077]',
  'Sự kiện':      'bg-pink-100 text-pink-700',
  'Hội viên':     'bg-emerald-100 text-emerald-700',
  'Kinh doanh':   'bg-amber-100 text-amber-700',
  'Chính sách':   'bg-rose-100 text-rose-700',
  'default':      'bg-gray-100 text-gray-600',
};
const getCategoryClass = (cat) => categoryColors[cat] || categoryColors['default'];

// ─────────────────────────────────────────────────────────────────────────────
// Atom – Category Badge
// ─────────────────────────────────────────────────────────────────────────────
const CategoryBadge = ({ category }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCategoryClass(category)}`}>
    {category}
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// Atom – Arrow icon
// ─────────────────────────────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Molecule – News Card (supports standard or wide layout via spans)
// ─────────────────────────────────────────────────────────────────────────────
const NewsCard = ({ article, readMoreLabel, isLarge }) => (
  <div 
    className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100/80 transition-all duration-500 hover:-translate-y-1.5 flex flex-col ${
      isLarge ? 'md:col-span-3' : 'md:col-span-2'
    }`}
  >
    {/* Image */}
    <div className={`relative overflow-hidden ${isLarge ? 'h-56 sm:h-64' : 'h-48'}`}>
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/600x300/e2e8f0/64748b?text=${encodeURIComponent(article.title?.slice(0, 15) || 'Tin tức')}`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
      <div className="absolute top-4 left-4">
        <CategoryBadge category={article.category} />
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <h3 className={`font-bold text-gray-900 group-hover:text-[#E91E8C] transition-colors duration-300 leading-snug mb-3 line-clamp-2 ${
        isLarge ? 'text-lg md:text-xl' : 'text-base'
      }`}>
        {article.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2 flex-1">
        {article.excerpt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0B5077] to-[#0B355B] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {article.author?.charAt(0) || 'H'}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700 leading-none">{article.author}</p>
            <p className="text-xs text-gray-400 mt-0.5">{article.date}</p>
          </div>
        </div>

        <a
          href={article.url || '#'}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B5077] hover:text-[#E91E8C] transition-colors group/link"
        >
          {readMoreLabel}
          <span className="group-hover/link:translate-x-1 transition-transform duration-200">
            <ArrowIcon />
          </span>
        </a>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Organism – AdminNewsGrid
// ─────────────────────────────────────────────────────────────────────────────
export const AdminNewsGrid = ({
  sectionTitle,
  sectionSubtitle,
  badgeText,
  showBadge,
  articles,
  readMoreLabel,
  viewAllLabel,
  viewAllUrl,
  showViewAll,
}) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (!Array.isArray(articles) || articles.length === 0) return null;

  // We organize articles in a 6-column grid:
  // Top 2 items take col-span-3 each
  // Remaining items take col-span-2 each
  return (
    <section ref={sectionRef} className="bg-slate-50/50 py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0B5077]/5 rounded-full -translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/5 rounded-full translate-x-40 translate-y-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            {showBadge && badgeText && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B5077]/10 text-[#0B5077] text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                {badgeText}
              </span>
            )}
            {sectionTitle && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                {sectionTitle}
              </h2>
            )}
            {sectionSubtitle && (
              <p className="mt-2 text-gray-500 text-base max-w-xl">
                {sectionSubtitle}
              </p>
            )}
          </div>

          {showViewAll && viewAllLabel && (
            <a
              href={viewAllUrl || '#'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-[#0B5077] text-sm font-semibold hover:border-[#0B5077] hover:bg-[#0B5077] hover:text-white transition-all duration-300 shadow-sm shrink-0"
            >
              {viewAllLabel}
              <ArrowIcon />
            </a>
          )}
        </div>

        {/* 6-Column Grid Layout */}
        <div className={`grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {articles.map((article, idx) => {
            // First two take 3 columns each, rest take 2 columns each
            const isLarge = idx < 2;
            return (
              <NewsCard
                key={idx}
                article={article}
                readMoreLabel={readMoreLabel}
                isLarge={isLarge}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Default Props
// ─────────────────────────────────────────────────────────────────────────────
AdminNewsGrid.defaultProps = {
  showBadge: true,
  badgeText: 'Tin tức mới nhất',
  sectionTitle: 'Tin tức & Sự kiện',
  sectionSubtitle: 'Cập nhật những hoạt động mới nhất của Hội Doanh nhân Đồng Tháp.',
  readMoreLabel: 'Đọc tiếp',
  showViewAll: true,
  viewAllLabel: 'Xem tất cả',
  viewAllUrl: '/tin-tuc',
  articles: [
    {
      title: 'Hội nghị kết nối doanh nghiệp Đồng Tháp 2025 thu hút hơn 300 đại biểu',
      excerpt: 'Sự kiện quy tụ lãnh đạo doanh nghiệp, nhà đầu tư và chuyên gia kinh tế hàng đầu khu vực Đồng bằng sông Cửu Long.',
      category: 'Sự kiện',
      author: 'Ban Biên tập',
      date: '20/06/2025',
      imageUrl: 'https://placehold.co/800x400/1d4ed8/ffffff?text=Hội+nghị+kết+nối+2025',
      url: '#',
    },
    {
      title: 'Chương trình hỗ trợ vay vốn ưu đãi cho hội viên năm 2025',
      excerpt: 'Hội Doanh nhân Đồng Tháp phối hợp với ngân hàng triển khai gói vay ưu đãi lên đến 500 triệu đồng.',
      category: 'Chính sách',
      author: 'Phòng Hội viên',
      date: '18/06/2025',
      imageUrl: 'https://placehold.co/400x200/4f46e5/ffffff?text=Hỗ+trợ+vay+vốn',
      url: '#',
    },
    {
      title: 'Tổng kết hoạt động quý II/2025 và định hướng quý III',
      excerpt: 'Báo cáo kết quả hoạt động và các chỉ tiêu phát triển hội viên trong 6 tháng đầu năm 2025.',
      category: 'Tin tức',
      author: 'Ban Thư ký',
      date: '15/06/2025',
      imageUrl: 'https://placehold.co/600x300/0369a1/ffffff?text=Tổng+kết+Q2',
      url: '#',
    },
    {
      title: 'Đoàn doanh nhân Đồng Tháp tham quan và học hỏi mô hình ở Nhật Bản',
      excerpt: 'Chuyến công tác học hỏi kinh nghiệm quản trị doanh nghiệp và mô hình kinh doanh tiên tiến tại Nhật Bản.',
      category: 'Hội viên',
      author: 'Phòng Đối ngoại',
      date: '10/06/2025',
      imageUrl: 'https://placehold.co/600x300/047857/ffffff?text=Công+tác+Nhật+Bản',
      url: '#',
    },
    {
      title: 'Khai mạc khóa đào tạo kỹ năng lãnh đạo cho doanh nhân trẻ',
      excerpt: 'Chương trình bồi dưỡng năng lực quản trị, kỹ năng lãnh đạo và tư duy chiến lược cho thế hệ doanh nhân kế tiếp.',
      category: 'Kinh doanh',
      author: 'Ban Đào tạo',
      date: '05/06/2025',
      imageUrl: 'https://placehold.co/600x300/b45309/ffffff?text=Đào+tạo+lãnh+đạo',
      url: '#',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Puck Field Definitions
// ─────────────────────────────────────────────────────────────────────────────
export const adminNewsGridFields = {
  showBadge: {
    type: 'radio',
    label: 'Hiện badge nhãn',
    options: [
      { label: 'Có', value: true },
      { label: 'Không', value: false },
    ],
  },
  badgeText: {
    type: 'text',
    label: 'Nội dung badge',
  },
  sectionTitle: {
    type: 'text',
    label: 'Tiêu đề section',
  },
  sectionSubtitle: {
    type: 'textarea',
    label: 'Mô tả phụ',
  },
  readMoreLabel: {
    type: 'text',
    label: 'Nhãn nút "Đọc tiếp"',
  },
  showViewAll: {
    type: 'radio',
    label: 'Hiện nút Xem tất cả',
    options: [
      { label: 'Có', value: true },
      { label: 'Không', value: false },
    ],
  },
  viewAllLabel: {
    type: 'text',
    label: 'Nhãn nút Xem tất cả',
  },
  viewAllUrl: {
    type: 'text',
    label: 'URL trang tin tức',
  },
  articles: {
    type: 'array',
    label: 'Danh sách bài viết',
    arrayFields: {
      title:    { type: 'text',     label: 'Tiêu đề bài viết' },
      excerpt:  { type: 'textarea', label: 'Tóm tắt'          },
      category: { type: 'text',     label: 'Danh mục'         },
      author:   { type: 'text',     label: 'Tác giả'          },
      date:     { type: 'text',     label: 'Ngày đăng'        },
      imageUrl: { type: 'text',     label: 'URL ảnh bìa'      },
      url:      { type: 'text',     label: 'URL bài viết'     },
    },
    defaultItemProps: {
      title:    'Tiêu đề bài viết mới',
      excerpt:  'Nội dung tóm tắt bài viết...',
      category: 'Tin tức',
      author:   'Ban Biên tập',
      date:     '01/01/2025',
      imageUrl: 'https://placehold.co/600x300/e2e8f0/64748b?text=Tin+tức',
      url:      '#',
    },
  },
};
