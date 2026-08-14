import React from 'react';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="text-primary mr-2">🍛</span> Website Bán Đồ Ăn
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Mang đến những bữa ăn ngon sạch, đầy đủ dinh dưỡng, đảm bảo vệ sinh an toàn thực phẩm. Cam kết nguyên liệu tươi sạch 100% mỗi ngày.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Thông tin liên hệ</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center text-slate-400">
              <Phone size={16} className="text-primary mr-2" />
              <span>Hotline: 0934099949</span>
            </li>
            <li className="flex items-center text-slate-400">
              <MapPin size={16} className="text-primary mr-2" />
              <span>Địa chỉ: 161 Phạm Văn Chiêu, Phường An Hội Tây, Thành Phố Hồ Chí Minh</span>
            </li>
            <li className="flex items-center text-slate-400">
              <Clock size={16} className="text-primary mr-2" />
              <span>Mở cửa: 09:00 - 21:00 (Hằng ngày)</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Chính sách của chúng tôi</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-primary transition-colors">Chính sách giao hàng nhanh</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Đảm bảo an toàn thực phẩm</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Chính sách hoàn tiền / Đổi trả món</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Website Bán Đồ Ăn. All rights reserved.</p>
        <p className="flex items-center">
          Made with <Heart size={12} className="text-primary mx-1 fill-primary" /> for a delicious meal.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
