import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Atoms
// ─────────────────────────────────────────────────────────────────────────────
const FooterLink = ({ label, url }) => (
  <li>
    <a
      href={url}
      className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-all duration-300"
    >
      <span className="h-[2px] w-0 bg-pink-500 group-hover:w-3 transition-all duration-300 rounded-full" />
      {label}
    </a>
  </li>
);

const ContactRow = ({ icon, text, href }) => (
  <li>
    <a
      href={href || '#'}
      className="flex items-start gap-3 text-gray-400 hover:text-white text-sm transition-all duration-300 group"
    >
      <span className="mt-0.5 text-pink-500 group-hover:text-pink-400 transition-colors shrink-0 text-base">
        {icon}
      </span>
      <span className="leading-relaxed">{text}</span>
    </a>
  </li>
);

const SocialBtn = ({ platform, url, icon }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    title={platform}
    className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-pink-600 text-gray-400 hover:text-white border border-white/10 hover:border-pink-500 transition-all duration-300 hover:-translate-y-1 shadow-md"
  >
    {icon}
  </a>
);

// Social icons (inline SVG to not require dependencies)
const icons = {
  facebook: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  youtube: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  ),
  zalo: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5H9.5v-1.25H11v-4.5H9.5V9.5H13v7zm2.5 0h-1.25v-9H15.5v9z" />
    </svg>
  ),
  tiktok: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.21 8.21 0 004.8 1.53V6.82a4.85 4.85 0 01-1.03-.13z" />
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Organism – AdminFooter
// ─────────────────────────────────────────────────────────────────────────────
export const AdminFooter = ({
  companyName,
  description,
  address,
  phone,
  email,
  website,
  quickLinks,
  copyrightText,
  facebookUrl,
  youtubeUrl,
  zaloUrl,
  tiktokUrl,
  showNewsletter,
  newsletterTitle,
  newsletterPlaceholder,
}) => (
  <footer className="bg-[#081D33] text-white relative overflow-hidden border-t border-white/5">
    {/* Decorative background shapes */}
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#0B5077] rounded-full filter blur-[120px] -translate-x-40 -translate-y-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 rounded-full filter blur-[150px] translate-x-48 translate-y-48" />
    </div>

    {/* ── Main Content ────────────────────────────────── */}
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Column 1 – Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-bold text-white mb-4 tracking-wide uppercase">
            {companyName}
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
            {description}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 flex-wrap">
            {facebookUrl && <SocialBtn platform="Facebook" url={facebookUrl} icon={icons.facebook} />}
            {youtubeUrl  && <SocialBtn platform="YouTube"  url={youtubeUrl}  icon={icons.youtube}  />}
            {zaloUrl     && <SocialBtn platform="Zalo"     url={zaloUrl}     icon={icons.zalo}     />}
            {tiktokUrl   && <SocialBtn platform="TikTok"   url={tiktokUrl}   icon={icons.tiktok}   />}
          </div>
        </div>

        {/* Column 2 – Quick Links */}
        <div className="lg:pl-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2px] after:bg-pink-500">
            Liên kết nhanh
          </h3>
          <ul className="space-y-4">
            {Array.isArray(quickLinks) &&
              quickLinks.map((link, i) => (
                <FooterLink key={i} label={link.label} url={link.url} />
              ))}
          </ul>
        </div>

        {/* Column 3 – Contact */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2px] after:bg-pink-500">
            Liên hệ
          </h3>
          <ul className="space-y-4">
            {address && <ContactRow icon="📍" text={address} />}
            {phone   && <ContactRow icon="📞" text={phone}   href={`tel:${phone.replace(/\s/g, '')}`} />}
            {email   && <ContactRow icon="✉️" text={email}   href={`mailto:${email}`} />}
            {website && <ContactRow icon="🌐" text={website} href={website} />}
          </ul>
        </div>

        {/* Column 4 – Newsletter */}
        {showNewsletter && (
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2px] after:bg-pink-500">
              {newsletterTitle}
            </h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Nhận thông tin mới nhất về các sự kiện và cơ hội kết nối cộng đồng doanh nghiệp.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder={newsletterPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:bg-white/10 transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white text-sm font-semibold hover:from-pink-500 hover:to-rose-500 transition-all duration-300 shadow-lg shadow-pink-950/20 active:scale-[0.98]"
              >
                Đăng ký ngay
              </button>
            </form>
          </div>
        )}
      </div>
    </div>

    {/* ── Divider ─────────────────────────────────────── */}
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-px bg-white/10" />
    </div>

    {/* ── Bottom Bar ──────────────────────────────────── */}
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-xs text-center sm:text-left">
          {copyrightText}
        </p>
        <div className="flex items-center gap-4">
          <a href="/chinh-sach-bao-mat" className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-200">
            Chính sách bảo mật
          </a>
          <span className="text-gray-700">·</span>
          <a href="/dieu-khoan" className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-200">
            Điều khoản sử dụng
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────────────────────
// Default Props
// ─────────────────────────────────────────────────────────────────────────────
AdminFooter.defaultProps = {
  companyName: 'Hội Doanh nhân Đồng Tháp',
  description:
    'Tổ chức đại diện cho cộng đồng doanh nhân tỉnh Đồng Tháp, kết nối và phát triển kinh doanh bền vững.',
  address: '123 Đường Nguyễn Huệ, TP. Cao Lãnh, Đồng Tháp',
  phone: '0277 1234 567',
  email: 'info@doanhnhandongthap.vn',
  website: 'www.doanhnhandongthap.vn',
  quickLinks: [
    { label: 'Trang chủ',  url: '/' },
    { label: 'Giới thiệu', url: '/gioi-thieu' },
    { label: 'Hội viên',   url: '/hoi-vien' },
    { label: 'Tin tức',    url: '/tin-tuc' },
    { label: 'Liên hệ',   url: '/lien-he' },
  ],
  copyrightText: '© 2025 Hội Doanh nhân Đồng Tháp. All rights reserved.',
  facebookUrl: 'https://facebook.com',
  youtubeUrl:  'https://youtube.com',
  zaloUrl:     '#',
  tiktokUrl:   '#',
  showNewsletter: true,
  newsletterTitle: 'Đăng ký nhận tin',
  newsletterPlaceholder: 'Email của bạn...',
};

// ─────────────────────────────────────────────────────────────────────────────
// Puck Field Definitions
// ─────────────────────────────────────────────────────────────────────────────
export const adminFooterFields = {
  companyName: {
    type: 'text',
    label: 'Tên tổ chức',
  },
  description: {
    type: 'textarea',
    label: 'Mô tả ngắn',
  },
  address: {
    type: 'text',
    label: 'Địa chỉ',
  },
  phone: {
    type: 'text',
    label: 'Số điện thoại',
  },
  email: {
    type: 'text',
    label: 'Email',
  },
  website: {
    type: 'text',
    label: 'Website',
  },
  quickLinks: {
    type: 'array',
    label: 'Liên kết nhanh',
    arrayFields: {
      label: { type: 'text', label: 'Tên liên kết' },
      url:   { type: 'text', label: 'URL' },
    },
    defaultItemProps: { label: 'Liên kết mới', url: '#' },
  },
  facebookUrl: {
    type: 'text',
    label: 'Facebook URL',
  },
  youtubeUrl: {
    type: 'text',
    label: 'YouTube URL',
  },
  zaloUrl: {
    type: 'text',
    label: 'Zalo URL',
  },
  tiktokUrl: {
    type: 'text',
    label: 'TikTok URL',
  },
  showNewsletter: {
    type: 'radio',
    label: 'Hiện khung đăng ký nhận tin',
    options: [
      { label: 'Có',    value: true  },
      { label: 'Không', value: false },
    ],
  },
  newsletterTitle: {
    type: 'text',
    label: 'Tiêu đề newsletter',
  },
  newsletterPlaceholder: {
    type: 'text',
    label: 'Placeholder ô email',
  },
  copyrightText: {
    type: 'text',
    label: 'Văn bản bản quyền',
  },
};
