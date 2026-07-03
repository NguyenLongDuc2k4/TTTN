import React, { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// AdminContactForm – Form liên hệ đẹp mắt, responsive
// ─────────────────────────────────────────────────────────────────────────────

const InputField = ({ id, label, type = 'text', placeholder, value, onChange, required }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-semibold text-slate-700">
      {label}
      {required && <span className="text-amber-500 ml-0.5">*</span>}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none ring-0 transition-all duration-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 hover:border-slate-300"
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
    // TODO: kết nối API gửi mail
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">

        {/* ── Section heading ─────────────────────────────── */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            {heading || 'Liên hệ với chúng tôi'}
          </h2>
          {subheading && (
            <p className="mt-2 text-slate-500 text-sm md:text-base max-w-xl mx-auto">
              {subheading}
            </p>
          )}
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-amber-500" />
        </div>

        {/* ── Two-column layout ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ── Left: contact info + optional map ─────────── */}
          <aside className="lg:col-span-2 flex flex-col gap-6">
            {/* Info cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: 'Địa chỉ',
                  value: addressLine || '123 Đường ABC, TP. Cao Lãnh, Đồng Tháp',
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Email',
                  value: emailLine || 'contact@example.com',
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: 'Điện thoại',
                  value: phoneLine || '0900 000 000',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-slate-700 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Embedded map */}
            {showMap && (
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-48 lg:flex-1">
                <iframe
                  src={mapEmbedUrl || 'https://maps.google.com/maps?q=dong+thap&output=embed'}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ"
                />
              </div>
            )}
          </aside>

          {/* ── Right: form ────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6 md:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <span className="w-16 h-16 flex items-center justify-center rounded-full bg-green-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-slate-700 font-semibold text-lg">Gửi thành công!</p>
                  <p className="text-slate-400 text-sm">Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      id="cf-name"
                      label="Họ và tên"
                      placeholder={namePlaceholder || 'Nguyễn Văn A'}
                      value={form.name}
                      onChange={set('name')}
                      required
                    />
                    <InputField
                      id="cf-phone"
                      label="Số điện thoại"
                      type="tel"
                      placeholder={phonePlaceholder || '0900 000 000'}
                      value={form.phone}
                      onChange={set('phone')}
                    />
                  </div>

                  <InputField
                    id="cf-email"
                    label="Email"
                    type="email"
                    placeholder={emailPlaceholder || 'example@email.com'}
                    value={form.email}
                    onChange={set('email')}
                    required
                  />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-message" className="text-sm font-semibold text-slate-700">
                      Nội dung <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      id="cf-message"
                      rows={5}
                      placeholder={messagePlaceholder || 'Nhập nội dung tin nhắn của bạn…'}
                      value={form.message}
                      onChange={set('message')}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 hover:border-slate-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full sm:w-auto sm:self-end inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {buttonText || 'Gửi tin nhắn'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
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

// ── Puck field definitions ───────────────────────────────────────────────────
export const adminContactFormFields = {
  heading:          { type: 'text', label: 'Tiêu đề mục' },
  subheading:       { type: 'text', label: 'Mô tả phụ' },
  namePlaceholder:  { type: 'text', label: 'Placeholder – Họ tên' },
  emailPlaceholder: { type: 'text', label: 'Placeholder – Email' },
  phonePlaceholder: { type: 'text', label: 'Placeholder – Điện thoại' },
  messagePlaceholder: { type: 'text', label: 'Placeholder – Nội dung' },
  buttonText:       { type: 'text', label: 'Nhãn nút gửi' },
  addressLine:      { type: 'text', label: 'Địa chỉ' },
  emailLine:        { type: 'text', label: 'Email hiển thị' },
  phoneLine:        { type: 'text', label: 'Số điện thoại hiển thị' },
  showMap: {
    type: 'radio',
    label: 'Hiển thị bản đồ',
    options: [
      { label: 'Có', value: true },
      { label: 'Không', value: false },
    ],
  },
  mapEmbedUrl: { type: 'text', label: 'URL nhúng Google Maps' },
};

// ── Default props ────────────────────────────────────────────────────────────
AdminContactForm.defaultProps = {
  heading:            'Liên hệ với chúng tôi',
  subheading:         'Hãy để lại thông tin, chúng tôi sẽ liên hệ lại trong 24 giờ.',
  namePlaceholder:    'Nguyễn Văn A',
  emailPlaceholder:   'example@email.com',
  phonePlaceholder:   '0900 000 000',
  messagePlaceholder: 'Nhập nội dung tin nhắn của bạn…',
  buttonText:         'Gửi tin nhắn',
  addressLine:        '123 Đường ABC, TP. Cao Lãnh, Đồng Tháp',
  emailLine:          'contact@example.com',
  phoneLine:          '0900 000 000',
  showMap:            true,
  mapEmbedUrl:        'https://maps.google.com/maps?q=dong+thap&output=embed',
};

export default AdminContactForm;
