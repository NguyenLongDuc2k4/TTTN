import React from 'react';

const AdminDepartment = ({ title, subtitle, cards = [], background = {} }) => {
  const getBackgroundStyle = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#e0e7ff'}, ${bg.gradientTo || '#f3e8ff'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (bg.type === 'color') {
      return { backgroundColor: bg.color || '#f3f4f6' };
    }
    return { backgroundColor: 'transparent' };
  };

  return (
    <div className="py-16 px-4" style={getBackgroundStyle()}>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {title && <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-2 uppercase text-center">{title}</h2>}
        {subtitle && <p className="text-base md:text-lg font-semibold text-[#3b82f6] mb-12 uppercase text-center tracking-wide">{subtitle}</p>}
        
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center justify-center text-center p-8 shadow-lg hover:-translate-y-1 transition-all w-full sm:w-72"
              style={{
                borderRadius: card.cardBorderRadius || '64px 8px 64px 8px',
                background: `linear-gradient(to bottom, ${card.cardBgGradientFrom || '#3b82f6'}, ${card.cardBgGradientTo || '#1e3a8a'})`
              }}
            >
              {card.icon && (
                <div className="mb-4 flex items-center justify-center h-16">
                  {/* Using filter brightness-0 invert to ensure any black icon turns white */}
                  <img src={card.icon} alt={card.name} className="w-16 h-16 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
              )}
              
              <h3 className="text-lg font-bold text-white mb-6 h-14 flex items-center justify-center">{card.name}</h3>
              
              {(card.buttonText || card.link) && (
                <a 
                  href={card.link || '#'} 
                  className="mt-auto inline-block text-sm font-medium py-2 px-6 hover:opacity-80 transition-opacity border border-white/30 backdrop-blur-sm"
                  style={{
                    borderRadius: card.buttonBorderRadius || '9999px',
                    backgroundColor: card.buttonBgColor || 'rgba(255,255,255,0.15)',
                    color: card.buttonTextColor || '#ffffff'
                  }}
                >
                  {card.buttonText || 'Xem hoạt động ->'}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDepartment;

