import React from 'react';

export const AdminFooter = ({ description, phone, email, address, copyrightText }) => {
  return (
    <footer className="w-full bg-[#f4851a] text-white">
      {/* Khối màu vàng trên */}
      <div className="w-full bg-[#f2bf09] py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-900">
          {/* Cột Trái - Brand */}
          <div className="flex flex-col gap-4">
            <img
              src="https://metik.vn/wp-content/uploads/2026/06/logometik.png"
              alt="Metik Logo"
              className="w-36 h-auto object-contain"
            />
            <p className="text-sm font-bold leading-relaxed max-w-sm">
              {description || 'METIK - một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây, hương vị trẻ trung, đầy cảm hứng để mỗi ngày đều căng tràn sức sống.'}
            </p>
          </div>

          {/* Cột Phải - Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-black text-[#0b7f3e] uppercase">
              Thông tin liên hệ
            </h3>
            <ul className="flex flex-col gap-3 text-sm font-bold">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${phone}`} className="hover:underline">{phone || '(+84) 79 721 3333'}</a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href={`mailto:${email}`} className="hover:underline">{email || 'info@metik.vn'}</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>{address || 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM.'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dải bản quyền dưới cùng */}
      <div className="w-full py-4 text-center text-xs font-bold bg-[#f4851a]">
        {copyrightText || 'Copyright 2026 © METIK. All rights reserved'}
      </div>
    </footer>
  );
};

export const adminFooterFields = {
  description: { type: 'textarea', label: 'Mô tả ngắn' },
  phone: { type: 'text', label: 'Số điện thoại liên hệ' },
  email: { type: 'text', label: 'Email liên hệ' },
  address: { type: 'text', label: 'Địa chỉ nhà máy' },
  copyrightText: { type: 'text', label: 'Văn bản bản quyền' },
};

AdminFooter.defaultProps = {
  description: '',
  phone: '',
  email: '',
  address: '',
  copyrightText: '',
};

export default AdminFooter;
