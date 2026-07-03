import React from 'react';

const AdminDepartment = ({ cards = [], background = {} }) => {
  const getRadiusClass = (radius) => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'full': return 'rounded-full';
      default: return 'rounded-full';
    }
  };

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
    <div className="py-12 px-4" style={getBackgroundStyle()}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="block bg-white shadow-sm hover:shadow-md transition-shadow p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center">
            {card.icon && <img src={card.icon} alt={card.name} className="w-16 h-16 object-contain mb-4" />}
            <h3 className="text-xl font-bold text-gray-800 mb-4">{card.name}</h3>
            
            {(card.buttonText || card.link) && (
              <a 
                href={card.link || '#'} 
                className={`mt-auto inline-block bg-blue-600 text-white font-medium py-2 px-6 hover:bg-blue-700 transition-colors ${getRadiusClass(card.buttonRadius)}`}
              >
                {card.buttonText || 'Xem chi tiết'}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDepartment;
