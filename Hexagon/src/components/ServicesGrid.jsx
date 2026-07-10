import React from 'react';

const ServicesGrid = ({ title, subtitle, items }) => {
  return (
    <section id="dich-vu" className="py-16 bg-[#fafbfc]">
      <div className="container max-w-[1300px] mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[34px] font-bold text-[#000000] mb-3">
            {title || 'Lĩnh vực hoạt động'}
          </h2>
          <p className="text-gray-600 text-[15px] max-w-2xl mx-auto">
            {subtitle || 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items?.map((item, idx) => (
            <div 
              key={idx} 
              className="relative rounded-[20px] overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:shadow-[0_15px_30px_rgba(21,133,47,0.3)] hover:-translate-y-2 h-[420px]"
              style={{
                background: 'linear-gradient(180deg, #9ae287 0%, #1d882f 45%, #054511 100%)'
              }}
            >
              {/* Text - Left Aligned exactly like image */}
              <div className="pt-8 px-6 relative z-10 w-full text-left">
                <h3 className="text-[#ffb100] font-bold text-[18px] drop-shadow-sm leading-snug">
                  {item.title}
                </h3>
              </div>
              
              {/* Image - Placed perfectly at the bottom */}
              <div className="absolute bottom-0 left-0 w-full h-[70%] flex items-end justify-center pointer-events-none pb-4">
                <img 
                  src={item.imageUrl || 'https://placehold.co/400x400/transparent/FFF?text=Tech'} 
                  alt={item.title} 
                  className="w-[95%] h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default ServicesGrid;
