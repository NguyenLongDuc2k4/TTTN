import React from 'react';

const AboutSection = ({ title, description, quote, quoteAuthor, imageUrl, cards }) => {
  return (
    <section id="gioi-thieu" className="py-16 lg:py-24 bg-white">
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="w-full h-full flex items-center justify-center order-2 md:order-1 relative">
            <div className="relative p-3 w-full">
              <div className="absolute -inset-4 bg-[#ccfbf1] rounded-3xl transform -translate-x-4 translate-y-4"></div>
              <img 
                src={imageUrl || 'https://beta.hexagon.xyz/assets/images/VPX16.jpg'} 
                alt="Văn phòng Hexagon" 
                className="relative rounded-3xl shadow-xl object-cover w-full aspect-[4/3] z-10"
              />
            </div>
            
            <div className="absolute -bottom-6 right-0 md:-right-8 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(217,119,6,0.15)] max-w-[300px] z-20">
              <p className="text-base italic text-gray-900 font-medium leading-relaxed mb-3">
                "{quote || 'Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^'}"
              </p>
              <p className="text-yellow-500 text-xs font-bold uppercase tracking-wider text-right">
                — {quoteAuthor || 'HEXAGON CULTURE'}
              </p>
            </div>
          </div>

          <div className="text-left order-1 md:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {title || 'Về Hexagon'}
            </h2>
            <p className="text-gray-600 mb-8 text-base leading-relaxed">
              {description || 'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.'}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards?.map((card, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <h3 className="font-bold text-[#1D6A49] text-lg mb-2">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default AboutSection;
