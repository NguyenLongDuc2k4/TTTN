import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Edit, Trash2, Search, RefreshCw, X, Upload } from 'lucide-react';

const NewsManage = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchNews = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 5,
      };
      if (search) params.search = search;

      const res = await API.get('/news', { params });
      setNews(res.data.news || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchNews();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImageFile(null);
    setImagePreview('');
    setCurrentId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (article) => {
    setIsEditMode(true);
    setCurrentId(article.id);
    setTitle(article.title);
    setContent(article.content);
    setImagePreview(`http://localhost:5000${article.image}`);
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
    if (!title || !content || (!imageFile && !isEditMode)) {
      alert('Vui lòng điền tiêu đề, nội dung và chọn ảnh cho bài viết.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      if (isEditMode) {
        await API.put(`/news/${currentId}`, formData, config);
        alert('Cập nhật bài viết thành công.');
      } else {
        await API.post('/news', formData, config);
        alert('Đăng bài viết thành công.');
      }

      setIsModalOpen(false);
      resetForm();
      fetchNews();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Có lỗi xảy ra.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      try {
        await API.delete(`/news/${id}`);
        alert('Xóa bài viết thành công.');
        fetchNews();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Không thể xóa.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Tools */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Tìm tiêu đề tin tức..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 text-slate-850 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none transition-colors w-full"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
        </form>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-sm transition-all"
        >
          <Plus size={18} /> Đăng Bài Viết Mới
        </button>
      </div>

      {/* Bảng Tin Tức */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <RefreshCw className="animate-spin text-primary mb-2" size={24} />
            <p>Đang lục tìm các trang tin...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Chưa có bài viết nào được đăng.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-755 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                  <th className="py-4 px-6">Hình ảnh</th>
                  <th className="py-4 px-6">Tiêu đề bài viết</th>
                  <th className="py-4 px-6">Nội dung tóm tắt</th>
                  <th className="py-4 px-6">Ngày đăng</th>
                  <th className="py-4 px-6 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-200">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-16 h-10 rounded bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <img src={`http://localhost:5000${item.image}`} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-850 dark:text-white max-w-xs truncate">{item.title}</td>
                    <td className="py-4 px-6 text-xs text-slate-400 dark:text-slate-500 max-w-xs truncate">{item.content}</td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors"
                          aria-label="Edit news"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                          aria-label="Delete news"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                  page === p
                    ? 'bg-primary border-primary text-white'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-650 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-350'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-855 dark:text-white">
                {isEditMode ? 'Cập Nhật Bài Viết' : 'Đăng Bài Viết Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-grow overflow-y-auto">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bí quyết nấu cơm ngon chuẩn vị Bắc..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-850 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-350 block">Ảnh bìa bài viết *</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 px-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-xs font-semibold text-slate-500 transition-colors">
                    <Upload size={14} /> Chọn ảnh bìa
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                  {imagePreview && (
                    <div className="w-16 h-10 rounded bg-slate-100 overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Nội dung bài viết *</label>
                <textarea
                  rows={8}
                  required
                  placeholder="Nhập nội dung chia sẻ chi tiết tại đây..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-55 dark:bg-slate-755 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-855 dark:text-white leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 hover:bg-slate-55 dark:border-slate-700 dark:hover:bg-slate-750 text-slate-650 dark:text-slate-300 font-bold rounded-xl text-sm"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-sm"
                >
                  {isEditMode ? 'Lưu thay đổi' : 'Đăng tin tức'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManage;
