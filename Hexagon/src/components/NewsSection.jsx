import React from 'react';

const NewsSection = ({ title, subtitle, items, buttonText, buttonLink }) => {
  return (
    <section id="tin-tuc" className="py-16 bg-white">
      <div className="container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
            {title || 'Tin tức'}
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            {subtitle || 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.'}
          </p>
          <div className="w-16 h-1 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={item.imageUrl || 'https://via.placeholder.com/800x600'} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                  <a href={item.link || '#'}>{item.title}</a>
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center text-gray-400 text-xs">
                    <svg className="w-4 h-4 mr-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {item.date}
                  </div>
                  <a href={item.link || '#'} className="text-yellow-600 text-xs font-bold hover:text-yellow-700">
                    Xem chi tiết →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href={buttonLink || '#'} className="inline-flex items-center justify-center px-8 py-3 bg-[#5cb85c] hover:bg-[#4cae4c] text-white font-bold rounded-full transition-colors shadow-sm">
            {buttonText || 'Xem tất cả bài viết >'}
          </a>
        </div>

      </div>
    </section>
  );
};
export default NewsSection;
