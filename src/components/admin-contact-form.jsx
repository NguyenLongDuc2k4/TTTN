import React, { useState } from 'react';
import { SectionTitle } from './admin-product-card.jsx';

const InputField = ({ id, label, type = 'text', placeholder, value, onChange, required }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label htmlFor={id} className="text-sm font-bold text-slate-700">
      {label} {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-tr-[15px] rounded-bl-[15px] border border-orange-200 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#48a842] focus:ring-2 focus:ring-green-100 hover:border-orange-300"
    />
  </div>
);

export function AdminContactForm({
  heading,
  subheading,
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  messagePlaceholder,
  buttonText,
  showMap,
  mapEmbedUrl,
  addressLine,
  emailLine,
  phoneLine,
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="w-full py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {heading && <SectionTitle text={heading} />}
        {subheading && <p className="mb-8 text-slate-500 -mt-6 text-sm">{subheading}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Thông tin liên hệ */}
          <aside className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {[
                { label: 'Địa chỉ', value: addressLine, icon: 'M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                { label: 'Email', value: emailLine, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { label: 'Điện thoại', value: phoneLine, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11 1 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 rounded-tr-[20px] rounded-bl-[20px] bg-white border border-orange-100 shadow-sm">
                  <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-tr-[12px] rounded-bl-[12px] bg-[#f4851a]/10 text-[#f4851a]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-sm text-slate-700 font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {showMap && (
              <div className="rounded-tr-[30px] rounded-bl-[30px] overflow-hidden border border-orange-100 shadow-sm h-48 lg:flex-1">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Metik Map"
                />
              </div>
            )}
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-tr-[40px] rounded-bl-[40px] shadow-md border border-orange-100 p-6 md:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <span className="w-16 h-16 flex items-center justify-center rounded-full bg-green-50 text-green-500">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-slate-700 font-bold text-lg">Gửi thành công!</p>
                  <p className="text-slate-400 text-sm">Cảm ơn bạn đã đóng góp ý kiến về sản phẩm bánh snack Metik.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField id="name" label="Họ và tên" placeholder={namePlaceholder} value={form.name} onChange={set('name')} required />
                    <InputField id="phone" label="Số điện thoại" type="tel" placeholder={phonePlaceholder} value={form.phone} onChange={set('phone')} />
                  </div>
                  <InputField id="email" label="Email" type="email" placeholder={emailPlaceholder} value={form.email} onChange={set('email')} required />
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-bold text-slate-700">Nội dung liên hệ <span className="text-red-500">*</span></label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder={messagePlaceholder}
                      value={form.message}
                      onChange={set('message')}
                      required
                      className="w-full rounded-tr-[20px] rounded-bl-[20px] border border-orange-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#48a842] focus:ring-2 focus:ring-green-100 resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full sm:w-auto sm:self-end bg-[#f3a508] hover:bg-[#e09500] text-white font-bold text-sm px-8 py-3.5 rounded-tr-[15px] rounded-bl-[15px] transition-colors shadow-sm">
                    {buttonText}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const adminContactFormFields = {
  heading: { type: 'text', label: 'Tiêu đề mục' },
  subheading: { type: 'text', label: 'Mô tả phụ' },
  namePlaceholder: { type: 'text', label: 'Placeholder Họ tên' },
  emailPlaceholder: { type: 'text', label: 'Placeholder Email' },
  phonePlaceholder: { type: 'text', label: 'Placeholder Điện thoại' },
  messagePlaceholder: { type: 'text', label: 'Placeholder Nội dung' },
  buttonText: { type: 'text', label: 'Nhãn nút' },
  addressLine: { type: 'text', label: 'Địa chỉ' },
  emailLine: { type: 'text', label: 'Email' },
  phoneLine: { type: 'text', label: 'Điện thoại liên hệ' },
  showMap: {
    type: 'radio',
    label: 'Hiển thị bản đồ',
    options: [{ label: 'Có', value: true }, { label: 'Không', value: false }]
  },
  mapEmbedUrl: { type: 'text', label: 'URL bản đồ nhúng' }
};

AdminContactForm.defaultProps = {
  heading: 'Thông tin liên hệ',
  subheading: 'Hãy gửi đóng góp ý kiến hoặc phản hồi của bạn về chất lượng dịch vụ của Metik.',
  namePlaceholder: 'Nguyễn Văn A',
  emailPlaceholder: 'info@metik.vn',
  phonePlaceholder: '0797213333',
  messagePlaceholder: 'Bạn cần tư vấn hoặc hợp tác đại lý...',
  buttonText: 'Gửi liên hệ',
  addressLine: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM',
  emailLine: 'info@metik.vn',
  phoneLine: '079 721 3333',
  showMap: true,
  mapEmbedUrl: 'https://maps.google.com/maps?q=Tan+Phu+Trung+Industrial+Park&output=embed'
};

export default AdminContactForm;
