import React, { useState, useEffect, useRef } from 'react';

const CreatePageModal = ({ isOpen, onClose, onCreate, isSlugTaken }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [lang, setLang] = useState('vi');
  const [errors, setErrors] = useState([]);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const titleRef = useRef(null);

  // Auto-focus title input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setSlug('');
      setLang('vi');
      setErrors([]);
      setSlugManuallyEdited(false);
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      const generated = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setSlug(generated);
    }
  }, [title, slugManuallyEdited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!title.trim()) newErrors.push('Tiêu đề không được để trống.');
    if (!slug.trim()) newErrors.push('Slug không được để trống.');
    else if (isSlugTaken(slug)) newErrors.push(`Slug "/${slug}" đã tồn tại.`);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onCreate(title.trim(), slug.trim(), lang);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A6B49] to-[#2a9d6e] px-6 py-5">
          <h3 className="text-xl font-bold text-white">Tạo trang mới</h3>
          <p className="text-emerald-100 text-sm mt-1">Điền thông tin để tạo một trang nội dung mới</p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              {errors.map((err, i) => (
                <p key={i} className="text-red-600 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {err}
                </p>
              ))}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Tiêu đề trang <span className="text-red-500">*</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Trang chủ, Giới thiệu..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow text-gray-900"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Slug (đường dẫn) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManuallyEdited(true);
                }}
                placeholder="duong-dan-trang"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow text-gray-900 font-mono text-sm"
              />
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ngôn ngữ</label>
            <div className="flex gap-3">
              <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 rounded-lg cursor-pointer transition-all ${lang === 'vi' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                <input type="radio" name="lang" value="vi" checked={lang === 'vi'} onChange={() => setLang('vi')} className="sr-only" />
                <span className="text-lg">🇻🇳</span>
                <span className="font-medium text-sm">Tiếng Việt</span>
              </label>
              <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 rounded-lg cursor-pointer transition-all ${lang === 'en' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                <input type="radio" name="lang" value="en" checked={lang === 'en'} onChange={() => setLang('en')} className="sr-only" />
                <span className="text-lg">🇬🇧</span>
                <span className="font-medium text-sm">English</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#1A6B49] hover:bg-[#15583c] rounded-lg transition-colors shadow-sm"
            >
              Tạo và mở chỉnh sửa →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePageModal;
