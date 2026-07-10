import React from 'react';

const HexagonHeader = ({ lang, title, logo, links, onLangChange }) => {
  return (
    <header id="navbar" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1A6B49]">
      <nav className="mx-auto py-2 flex justify-between items-center" style={{ paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}>
        
        <div className="flex items-center space-x-2">
          <div className="w-16 h-16">
            <a href="/" className="block">
              {logo ? (
                <img src={logo} alt="Hexagon Logo" className="w-full h-full object-contain" />
              ) : (
                <img src="https://beta.hexagon.xyz/assets/images/logo-hhc.png" alt="Hexagon Logo" className="w-full h-full object-contain" />
              )}
            </a>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">{title || 'HEXAGON'}</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {links?.map((link, idx) => (
            <a key={idx} href={link.url} className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              {link.label}
            </a>
          ))}
          
          <div className="lang-switcher flex items-center gap-2 ml-4">
            <button 
              type="button" 
              title="Tiếng Việt" 
              onClick={() => onLangChange && onLangChange('vi')}
              className={`transition-opacity duration-200 cursor-pointer bg-none border-none p-0 ${lang === 'vi' ? 'opacity-100' : 'opacity-45 hover:opacity-75'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-6 h-4 object-cover rounded-sm">
                <defs><clipPath id="vn-a"><path fillOpacity=".7" d="M-85.3 0h682.6v512H-85.3z"></path></clipPath></defs>
                <g fillRule="evenodd" clipPath="url(#vn-a)" transform="translate(80)scale(.9375)">
                  <path fill="#da251d" d="M-128 0h768v512h-768z"></path>
                  <path fill="#ff0" d="M349.6 381 260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z"></path>
                </g>
              </svg>
            </button>
            <button 
              type="button" 
              title="English" 
              onClick={() => onLangChange && onLangChange('en')}
              className={`transition-opacity duration-200 cursor-pointer bg-none border-none p-0 ${lang === 'en' ? 'opacity-100' : 'opacity-45 hover:opacity-75'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-6 h-4 object-cover rounded-sm">
                <path fill="#012169" d="M0 0h640v480H0z"></path>
                <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"></path>
                <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"></path>
                <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"></path>
                <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <button id="menu-btn" className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HexagonHeader;
