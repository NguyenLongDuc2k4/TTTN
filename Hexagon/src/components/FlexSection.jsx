import React from 'react';

const FlexSection = ({ 
  animate, 
  background, 
  gradientDirection, 
  title, 
  content, 
  buttons,
  imageUrl
}) => {
  let bgClass = '';
  let customStyle = {};

  if (background === 'color') {
    bgClass = 'bg-[#196849]'; // Fallback solid color similar to Hexagon
  } else if (background === 'gradient') {
    const directionMap = {
      'to right': 'bg-gradient-to-r from-[#135237] via-[#196B49] to-[#41b67d]',
      'to left': 'bg-gradient-to-l from-[#135237] via-[#196B49] to-[#41b67d]',
      'to bottom': 'bg-gradient-to-b from-[#135237] via-[#196B49] to-[#41b67d]',
      'to bottom right': 'bg-gradient-to-br from-[#135237] via-[#196B49] to-[#41b67d]',
      'to bottom left': 'bg-gradient-to-bl from-[#135237] via-[#196B49] to-[#41b67d]',
    };
    bgClass = directionMap[gradientDirection] || 'bg-gradient-to-br from-[#135237] via-[#196B49] to-[#41b67d]';
    customStyle = { backgroundColor: '#196849' };
  } else if (background === 'image') {
    bgClass = 'bg-cover bg-center';
    customStyle = { backgroundImage: `url(${imageUrl || 'https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp'})` };
  } else if (background === 'image+gradient') {
    const directionMap = {
      'to right': 'to right',
      'to left': 'to left',
      'to bottom': 'to bottom',
      'to bottom right': 'to bottom right',
      'to bottom left': 'to bottom left',
    };
    const dir = directionMap[gradientDirection] || 'to bottom right';
    bgClass = 'bg-cover bg-center';
    customStyle = { 
      backgroundImage: `linear-gradient(${dir}, rgba(19,82,55,0.85), rgba(65,182,125,0.85)), url(${imageUrl || 'https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp'})` 
    };
  } else if (background === 'image+color') {
    bgClass = 'bg-[#196849] bg-blend-multiply bg-cover bg-center';
    customStyle = { 
      backgroundImage: `url(${imageUrl || 'https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp'})` 
    };
  }

  return (
    <section className={`fullscreen-section relative flex items-center pt-32 pb-12 overflow-hidden ${bgClass} min-h-[90vh]`} style={customStyle}>
      <div className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-start text-left space-y-6 lg:pr-8">
            <div className={`inline-block px-4 py-1.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 backdrop-blur-sm ${animate ? 'animate-[fadeIn_1s_ease-out]' : ''}`}>
              <span className="text-yellow-500 text-sm font-bold tracking-wider uppercase">Công nghệ tương lai</span>
            </div>
            
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.15] tracking-tight ${animate ? 'animate-[fadeIn_1s_ease-out_0.2s_both]' : ''}`}>
              <span className="inline-block mt-2" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #a8e6d8 55%, #F7931E 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
                {title}
              </span>
            </h1>
            
            <p className={`text-gray-200 text-base sm:text-lg leading-relaxed max-w-xl ${animate ? 'animate-[fadeIn_1s_ease-out_0.4s_both]' : ''}`}>
              {content}
            </p>
            
            {buttons && buttons.length > 0 && (
              <div className={`flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto ${animate ? 'animate-[fadeIn_1s_ease-out_0.6s_both]' : ''}`}>
                {buttons.map((btn, idx) => {
                  if (idx === 0) {
                    return (
                      <a 
                        key={idx} 
                        href={btn.url || '#'}
                        className="px-8 py-3.5 rounded-lg transition-all shadow-lg text-center shadow-yellow-500/30 hover:brightness-110 !text-white font-medium"
                        style={{ background: btn.bgColor || 'linear-gradient(to right,#ff9902,#f2d337)', color: btn.textColor || '#ffffff' }}
                      >
                        {btn.label}
                      </a>
                    );
                  }
                  return (
                    <a 
                      key={idx} 
                      href={btn.url || '#'}
                      className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 !text-white rounded-lg transition-colors backdrop-blur-sm text-center font-medium"
                      style={{ color: btn.textColor || '#ffffff' }}
                    >
                      {btn.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Image container layout matching Hexagon */}
          <div className={`relative w-full flex justify-center ${animate ? 'animate-[fadeIn_1s_ease-out_0.8s_both]' : ''}`}>
            <div className="relative w-full max-w-none aspect-square">
              <img 
                src={imageUrl || 'https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp'} 
                alt="Section Image" 
                className="w-full h-full object-contain" 
                loading="lazy" 
              />
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll down bounce icon */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center animate-bounce z-20">
        <a href="#gioi-thieu" className="text-gray-300 hover:text-white flex flex-col items-center gap-1 transition-colors">
          <span className="text-sm font-medium tracking-wide">Cuộn xuống để khám phá</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default FlexSection;
