import React from 'react';

const AdminProfile = ({ background = {}, cards = [] }) => {
  const getBackgroundStyle = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#fdf4ff'}, ${bg.gradientTo || '#e0e7ff'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (bg.type === 'color') {
      return { backgroundColor: bg.color || '#fdf4ff' };
    }
    return { backgroundColor: 'transparent' };
  };

  const renderProfiles = (card) => {
    const profiles = [];
    for (let i = 1; i <= 5; i++) {
      if (card[`p${i}_name`]) {
        profiles.push({
          avatar: card[`p${i}_avatar`],
          name: card[`p${i}_name`],
          clubRole: card[`p${i}_clubRole`],
          entRole: card[`p${i}_entRole`],
          entName: card[`p${i}_entName`],
        });
      }
    }

    return (
      <div className="flex flex-col gap-6">
        {profiles.map((p, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
              {p.avatar ? (
                <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Ảnh</div>
              )}
            </div>
            <div className="flex flex-col text-sm text-gray-700">
              <p><span className="font-bold text-[#1e3a8a]">Họ tên:</span> {p.name}</p>
              {p.clubRole && <p><span className="font-bold text-[#1e3a8a]">Chức vụ CLB:</span> {p.clubRole}</p>}
              {p.entRole && <p><span className="font-bold text-[#1e3a8a]">Chức vụ Doanh nghiệp:</span> {p.entRole}</p>}
              {p.entName && <p><span className="font-bold text-[#1e3a8a]">Doanh nghiệp:</span> {p.entName}</p>}
            </div>
          </div>
        ))}
        {/* Mock Pagination */}
        {profiles.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-4 text-[#3b82f6]">
            <button className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">{'<'}</button>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-200"></div>
              <div className="w-6 h-2 rounded-full bg-[#1e3a8a]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-200"></div>
            </div>
            <button className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">{'>'}</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-20 px-4 min-h-[600px] flex items-center justify-center" style={getBackgroundStyle()}>
      <div className="max-w-7xl mx-auto w-full flex flex-wrap justify-center items-stretch gap-8">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className="flex-1 min-w-[320px] max-w-[500px] bg-white rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden flex flex-col"
          >
            <h3 className="text-xl md:text-2xl font-bold text-[#1e3a8a] mb-6 uppercase">
              {card.title}
            </h3>
            
            {card.type === 'about' && (
              <div className="flex-1 flex flex-col relative z-10">
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {card.description}
                </p>
                {card.bottomImage && (
                  <div className="mt-8 flex justify-center lg:justify-start lg:absolute lg:bottom-0 lg:-left-4 lg:w-[120%] opacity-90 pointer-events-none">
                    <img src={card.bottomImage} alt="Illustration" className="w-64 md:w-80 object-contain" />
                  </div>
                )}
              </div>
            )}

            {card.type === 'profiles' && (
              <div className="flex-1 z-10">
                {renderProfiles(card)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProfile;
