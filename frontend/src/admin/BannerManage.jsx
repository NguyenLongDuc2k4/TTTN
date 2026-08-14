import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Edit, Trash2, RefreshCw, X, Upload } from 'lucide-react';

const BannerManage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await API.get('/banners');
      setBanners(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const resetForm = () => {
    setTitle('');
    setLink('');
    setStatus(true);
    setImageFile(null);
    setImagePreview('');
    setCurrentId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (banner) => {
    setIsEditMode(true);
    setCurrentId(banner.id);
    setTitle(banner.title);
    setLink(banner.link || '');
    setStatus(banner.status);
    setImagePreview(`http://localhost:5000${banner.image}`);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || (!imageFile && !isEditMode)) {
      alert('Vui lòng điền tiêu đề và chọn ảnh cho banner.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('link', link);
      formData.append('status', status);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      if (isEditMode) {
        await API.put(`/banners/${currentId}`, formData, config);
        alert('Cập nhật banner thành công.');
      } else {
        await API.post('/banners', formData, config);
        alert('Thêm banner thành công.');
      }

      setIsModalOpen(false);
      resetForm();
      fetchBanners();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Có lỗi xảy ra.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này không?')) {
      try {
        await API.delete(`/banners/${id}`);
        alert('Xóa banner thành công.');
        fetchBanners();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Không thể xóa.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Tools */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-sm text-slate-400 font-bold uppercase tracking-wider">Danh sách banner</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-sm transition-all"
        >
          <Plus size={18} /> Thêm Banner Mới
        </button>
      </div>

      {/* Grid Banners */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <RefreshCw className="animate-spin text-primary mb-2" size={24} />
          <p>Đang tìm danh sách banner quảng cáo...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="p-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center text-slate-500">Chưa có banner nào.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((bn) => (
            <div key={bn.id} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative pt-[45%] bg-slate-100 dark:bg-slate-700">
                <img src={`http://localhost:5000${bn.image}`} alt={bn.title} className="absolute inset-0 w-full h-full object-cover" />
                <span className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full border shadow ${
                  bn.status ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-red-500 border-red-500 text-white'
                }`}>
                  {bn.status ? 'Đang bật' : 'Đang ẩn'}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-base text-slate-850 dark:text-white line-clamp-1">{bn.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 truncate"><span className="font-bold">Liên kết:</span> {bn.link || 'Không có'}</p>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => openEditModal(bn)}
                    className="flex items-center gap-1 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-blue-600 dark:border-slate-700 dark:hover:bg-slate-750 dark:text-blue-400 font-bold rounded-xl text-xs"
                  >
                    <Edit size={14} /> Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDelete(bn.id)}
                    className="flex items-center gap-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/40 dark:text-red-400 font-bold rounded-xl text-xs"
                  >
                    <Trash2 size={14} /> Xóa bỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-855 dark:text-white">
                {isEditMode ? 'Cập Nhật Banner' : 'Thêm Banner Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Tiêu đề banner *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Giảm giá cơm trưa 20%..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-850 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-605 dark:text-slate-350">Đường dẫn liên kết (Link)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: /products?isSale=true..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-855 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-350 block">Hình ảnh banner *</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 px-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-xs font-semibold text-slate-500 transition-colors">
                    <Upload size={14} /> Chọn ảnh
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                  {imagePreview && (
                    <div className="w-16 h-10 rounded bg-slate-100 overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-750">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bật hiển thị trang chủ</span>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-5 w-5 cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-750 text-slate-650 dark:text-slate-300 font-bold rounded-xl text-sm"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-sm"
                >
                  {isEditMode ? 'Lưu thay đổi' : 'Thêm banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManage;
