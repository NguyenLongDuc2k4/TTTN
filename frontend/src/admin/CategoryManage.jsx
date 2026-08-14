import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Edit, Trash2, RefreshCw, X, AlertTriangle } from 'lucide-react';

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // State Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setName('');
    setDescription('');
    setStatus(true);
    setCurrentId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setIsEditMode(true);
    setCurrentId(cat.id);
    setName(cat.name);
    setDescription(cat.description || '');
    setStatus(cat.status);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert('Vui lòng nhập tên danh mục.');
      return;
    }

    try {
      const data = { name, description, status };
      if (isEditMode) {
        await API.put(`/categories/${currentId}`, data);
        alert('Cập nhật danh mục thành công.');
      } else {
        await API.post('/categories', data);
        alert('Thêm danh mục thành công.');
      }

      setIsModalOpen(false);
      resetForm();
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Có lỗi xảy ra.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('CẢNH BÁO: Xóa danh mục này sẽ xóa toàn bộ món ăn thuộc danh mục đó! Bạn vẫn muốn tiếp tục chứ?')) {
      try {
        await API.delete(`/categories/${id}`);
        alert('Xóa danh mục thành công.');
        fetchCategories();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Không thể xóa danh mục này.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Nút thêm mới */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-sm text-slate-400 font-bold uppercase tracking-wider">Danh mục thực đơn</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-sm transition-all"
        >
          <Plus size={18} /> Thêm Danh Mục Mới
        </button>
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <RefreshCw className="animate-spin text-primary mb-2" size={24} />
            <p>Đang tìm danh mục món cơm...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Không có danh mục nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-750 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Tên danh mục</th>
                  <th className="py-4 px-6">Mô tả</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-200">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30 transition-colors">
                    <td className="py-4 px-6 font-semibold">{cat.id}</td>
                    <td className="py-4 px-6 font-bold text-slate-850 dark:text-white">{cat.name}</td>
                    <td className="py-4 px-6 text-xs text-slate-400 dark:text-slate-500 max-w-xs truncate">
                      {cat.description || 'Chưa có mô tả'}
                    </td>
                    <td className="py-4 px-6">
                      {cat.status ? (
                        <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2 py-0.5 rounded-full">
                          Hoạt động
                        </span>
                      ) : (
                        <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">
                          Đang ẩn
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors"
                          aria-label="Edit category"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                          aria-label="Delete category"
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
      </div>

      {/* Modal Form Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-850 dark:text-white">
                {isEditMode ? 'Cập Nhật Danh Mục' : 'Thêm Danh Mục Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Tên danh mục *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cơm sườn, Cơm gà..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-850 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Mô tả ngắn</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả tóm tắt cho danh mục này..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-850 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-750">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bật hiển thị thực đơn</span>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-5 w-5 cursor-pointer"
                />
              </div>

              {isEditMode && (
                <div className="flex gap-2 p-3.5 bg-yellow-55 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 border border-yellow-205 dark:border-yellow-900/30 rounded-xl text-xs">
                  <AlertTriangle size={16} className="flex-shrink-0" />
                  <span>Cập nhật trạng thái ẩn sẽ tạm thời giấu mọi món ăn thuộc danh mục này khỏi phía Client.</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 hover:bg-slate-55 dark:border-slate-700 dark:hover:bg-slate-755 text-slate-655 dark:text-slate-300 font-bold rounded-xl text-sm"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-sm"
                >
                  {isEditMode ? 'Lưu thay đổi' : 'Thêm danh mục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManage;
