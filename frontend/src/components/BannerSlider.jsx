import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BannerSlider = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển banner sau mỗi 5 giây
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  if (!banners || banners.length === 0) {
    return (
      <div className="w-full h-48 md:h-[350px] bg-gradient-to-r from-primary to-orange-400 rounded-3xl flex items-center justify-center text-white p-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2">Quán Cơm Sài Gòn Kính Chào Quý Khách</h2>
          <p className="text-sm md:text-lg opacity-90">Đặt món ngay hôm nay để nhận nhiều ưu đãi giảm giá đặc sắc!</p>
        </div>
      </div>
    );
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative group w-full h-56 md:h-[400px] overflow-hidden rounded-3xl shadow-lg bg-slate-100">
      {/* Slider Images */}
      <div
        className="w-full h-full flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <img
              src={`http://localhost:5000${banner.image}`}
              alt={banner.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200';
              }}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
              <h2 className="text-xl md:text-4xl font-bold tracking-tight mb-2 max-w-2xl drop-shadow-md">
                {banner.title}
              </h2>
              {banner.link && (
                <Link
                  to={banner.link}
                  className="mt-2 bg-primary hover:bg-primary-dark text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full w-fit shadow-md transition-all transform hover:scale-105"
                >
                  Khám Phá Ngay
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Nút Điều Hướng Trái / Phải */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 dark:bg-black/30 hover:bg-white/60 dark:hover:bg-black/60 text-slate-800 dark:text-white p-2 rounded-full hidden group-hover:flex transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 dark:bg-black/30 hover:bg-white/60 dark:hover:bg-black/60 text-slate-800 dark:text-white p-2 rounded-full hidden group-hover:flex transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-primary w-6'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BannerSlider;
