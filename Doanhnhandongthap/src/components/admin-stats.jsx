import React, { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Hook – Animated Counter
// ─────────────────────────────────────────────────────────────────────────────
const useCountUp = (target, duration = 1800, shouldStart = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    const numericStr = String(target).replace(/[^0-9.]/g, '');
    const end = parseFloat(numericStr) || 0;
    if (end === 0) { setCount(target); return; }

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, shouldStart]);

  return count;
};

// ─────────────────────────────────────────────────────────────────────────────
// Atom – Stat Card
// ─────────────────────────────────────────────────────────────────────────────
const StatCard = ({ number, label, icon, accentColor, delay, isVisible }) => {
  const suffix = String(number).replace(/[0-9.]/g, '');
  const rawNum = String(number).replace(/[^0-9.]/g, '');
  const hasComma = String(number).includes('.');

  const counted = useCountUp(
    parseFloat(rawNum) || 0,
    1800,
    isVisible
  );

  const displayNum = isVisible
    ? counted.toLocaleString('vi-VN')
    : '0';

  // Gradient accents tailored to the system
  const accentClasses = {
    blue:   'from-blue-400 to-cyan-400',
    indigo: 'from-pink-400 to-rose-400',
    sky:    'from-amber-400 to-orange-400',
    cyan:   'from-emerald-400 to-teal-400',
  };
  const gradient = accentClasses[accentColor] || accentClasses.blue;

  return (
    <div
      className="relative group bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col items-center text-center hover:bg-white/15 hover:border-white/20 hover:-translate-y-1.5 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      {icon && (
        <div className={`mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          <span className="text-2xl leading-none">{icon}</span>
        </div>
      )}

      {/* Counter with Georgia Serif as in demo */}
      <div className="flex items-end gap-0.5 leading-none mb-2 font-serif text-white">
        <span className="text-4xl xl:text-5xl font-bold tracking-tight tabular-nums">
          {displayNum}
        </span>
        {suffix && (
          <span className="text-2xl xl:text-3xl font-bold mb-0.5">
            {suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 leading-snug">
        {label}
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Organism – AdminStats
// ─────────────────────────────────────────────────────────────────────────────
export const AdminStats = ({
  sectionTitle,
  sectionSubtitle,
  badgeText,
  showBadge,
  stats,
  bgStyle,
}) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0B355B] via-[#081D33] to-[#030e1b] text-white"
    >
      {/* Background Hoa Lotus (Đồng Tháp style) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <path d="M50 0 C60 30, 90 40, 100 50 C90 60, 60 70, 50 100 C40 70, 10 60, 0 50 C10 40, 40 30, 50 0 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        {(sectionTitle || sectionSubtitle) && (
          <div className={`text-center mb-16 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700`}>
            {showBadge && badgeText && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                {badgeText}
              </span>
            )}

            {sectionTitle && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                {sectionTitle}
              </h2>
            )}

            {sectionSubtitle && (
              <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-gray-300">
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}

        {/* Stats grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-200`}>
          {Array.isArray(stats) &&
            stats.map((item, idx) => (
              <StatCard
                key={idx}
                number={item.number}
                label={item.label}
                icon={item.icon}
                accentColor={item.accentColor || ['blue', 'indigo', 'sky', 'cyan'][idx % 4]}
                delay={idx * 80}
                isVisible={isVisible}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Default Props
// ─────────────────────────────────────────────────────────────────────────────
AdminStats.defaultProps = {
  showBadge: true,
  badgeText: 'Con số ấn tượng',
  sectionTitle: 'Chúng tôi trong những con số',
  sectionSubtitle:
    'Hội Doanh nhân Đồng Tháp – nơi kết nối và phát triển cộng đồng kinh doanh tỉnh nhà suốt hơn 20 năm.',
  bgStyle: 'gradient',
  stats: [
    { number: '500+',   label: 'Hội viên tích cực',     icon: '👥', accentColor: 'blue'   },
    { number: '20+',    label: 'Năm hình thành',         icon: '🏛️', accentColor: 'indigo' },
    { number: '1.000+', label: 'Cơ hội kết nối',         icon: '🤝', accentColor: 'sky'   },
    { number: '100+',   label: 'Chương trình sự kiện',   icon: '🎯', accentColor: 'cyan'  },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Puck Field Definitions
// ─────────────────────────────────────────────────────────────────────────────
export const adminStatsFields = {
  showBadge: {
    type: 'radio',
    label: 'Hiện badge nhãn',
    options: [
      { label: 'Có',    value: true  },
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
  stats: {
    type: 'array',
    label: 'Danh sách thống kê',
    arrayFields: {
      number: {
        type: 'text',
        label: 'Số / Giá trị (vd: 500+, 1.000+)',
      },
      label: {
        type: 'text',
        label: 'Nhãn mô tả',
      },
      icon: {
        type: 'text',
        label: 'Icon (emoji)',
      },
      accentColor: {
        type: 'select',
        label: 'Màu accent',
        options: [
          { label: 'Blue',   value: 'blue'   },
          { label: 'Indigo', value: 'indigo' },
          { label: 'Sky',    value: 'sky'    },
          { label: 'Cyan',   value: 'cyan'   },
        ],
      },
    },
    defaultItemProps: {
      number: '0+',
      label: 'Mục mới',
      icon: '⭐',
      accentColor: 'blue',
    },
  },
};
