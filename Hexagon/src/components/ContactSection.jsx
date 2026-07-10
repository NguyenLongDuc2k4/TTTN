import React from 'react';

const ContactSection = ({ title, subtitle, address, email, phone, socials, mapUrl }) => {
  return (
    <section id="lien-he" className="py-16 bg-white">
      <div className="container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="flex flex-col lg:mt-4 gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {title || 'Liên hệ với chúng tôi'}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed max-w-md">
                {subtitle || 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.'}
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-teal-200 bg-teal-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">Trụ sở chính</p>
                  <p className="text-gray-600 text-sm">{address || '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-teal-200 bg-teal-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">Email</p>
                  <p className="text-gray-600 text-sm">{email || 'info@hexagon.xyz'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-teal-200 bg-teal-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">Hotline</p>
                  <p className="text-gray-600 text-sm">{phone || '096 446 0333'}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-8 pt-8 border-t border-gray-100">
              {socials?.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-1.5 bg-[#e0f8f5] hover:bg-[#c9f2ec] text-[#0d9488] font-bold rounded-full transition-colors border border-[#a7f3d0] text-sm"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 p-1 bg-gray-50">
            <iframe 
              className="w-full h-full rounded-xl" 
              src={mapUrl || "https://maps.google.com/maps?width=600&height=400&hl=en&q=615%20%C3%82u%20C%C6%A1&t=p&z=14&ie=UTF8&iwloc=B&output=embed"}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};
export default ContactSection;
