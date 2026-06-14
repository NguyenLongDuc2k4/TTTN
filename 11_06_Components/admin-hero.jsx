import React from 'react';

// Hero component — banner với title, subtitle, buttons.
const AdminHero = ({ title, subtitle, contentBlock = {}, buttons = [], background = {}, layout = {} }) => {
  const boxAlignFlex = layout.alignment === 'left' ? 'justify-start' : layout.alignment === 'right' ? 'justify-end' : 'justify-center';
  const textAlignClass = layout.align === 'left' ? 'text-left' : layout.align === 'right' ? 'text-right' : 'text-center';
  const alignItems = layout.align === 'left' ? 'items-start' : layout.align === 'right' ? 'items-end' : 'items-center';
  const buttonFlex = layout.align === 'left' ? 'justify-start' : layout.align === 'right' ? 'justify-end' : 'justify-center';

  const getBackgroundStyle = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#667eea'}, ${bg.gradientTo || '#764ba2'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#ffffff' };
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden" style={getBackgroundStyle()}>
      <div className={`relative mx-auto max-w-7xl flex ${boxAlignFlex}`}>
        <div 
          className={`backdrop-blur-md bg-white/20 border border-white/30 p-8 flex flex-col ${alignItems} ${textAlignClass} max-w-2xl`}
          style={{
            borderRadius: contentBlock.borderRadius || '16px',
            color: contentBlock.textColor || '#ffffff'
          }}
        >
          {title && (
            <h1 
              className="font-bold mb-4" 
              style={{ fontSize: contentBlock.titleSize || '2.25rem', color: 'inherit' }}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p 
              className="mb-6 opacity-90 max-w-3xl" 
              style={{ fontSize: contentBlock.subtitleSize || '1.125rem', color: 'inherit' }}
            >
              {subtitle}
            </p>
          )}
          {buttons && buttons.length > 0 && (
            <div className={`flex flex-wrap ${buttonFlex} gap-4 mb-8`}>
              {buttons.map((btn, idx) => (
                <a 
                  key={idx} 
                  href={btn.url || '#'} 
                  className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all hover:opacity-90"
                  style={{
                    backgroundColor: btn.bgColor || '#2563eb',
                    color: btn.textColor || '#ffffff',
                    borderRadius: btn.borderRadius || '8px'
                  }}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminHero;
