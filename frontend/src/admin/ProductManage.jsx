import React, { useState, useEffect } from 'react';
import API from '../services/api';
import axios from 'axios';
import { Plus, Edit, Trash2, Search, RefreshCw, X, Upload } from 'lucide-react';

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // State lọc tìm kiếm
  const [search, setSearch] = useState('');
  const [categoryIdFilter, setCategoryIdFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // State Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  // Form Fields
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [isBest, setIsBest] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Tải danh mục
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories?status=true');
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCats();
  }, []);

  // Tải sản phẩm
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 5, // Mỗi trang hiển thị 5 món
      };
      if (search) params.search = search;
      if (categoryIdFilter) params.categoryId = categoryIdFilter;

      const res = await axios.get('http://localhost:5000/api/products', { params });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, categoryIdFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const resetForm = () => {
    setName('');
    setCategoryId('');
    setPrice('');
    setSalePrice('');
    setQuantity('');
    setDescription('');
    setIsNew(false);
    setIsSale(false);
    setIsBest(false);
    setImageFile(null);
    setImagePreview('');
    setCurrentProductId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setIsEditMode(true);
    setCurrentProductId(product.id);
    setName(product.name);
    setCategoryId(product.categoryId);
    setPrice(product.price);
    setSalePrice(product.salePrice || '');
    setQuantity(product.quantity);
    setDescription(product.description || '');
    setIsNew(product.isNew);
    setIsSale(product.isSale);
    setIsBest(product.isBest);
    setImagePreview(product.image ? `http://localhost:5000${product.image}` : '');
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
    if (!name || !categoryId || !price || quantity === '') {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('categoryId', categoryId);
      formData.append('price', price);
      formData.append('salePrice', salePrice);
      formData.append('quantity', quantity);
      formData.append('description', description);
      formData.append('isNew', isNew);
      formData.append('isSale', isSale);
      formData.append('isBest', isBest);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (isEditMode) {
        await API.put(`/products/${currentProductId}`, formData, config);
        alert('Cập nhật món ăn thành công.');
      } else {
        await API.post('/products', formData, config);
        alert('Thêm món ăn thành công.');
      }

      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Có lỗi xảy ra.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa món ăn này không?')) {
      try {
        await API.delete(`/products/${id}`);
        alert('Xóa món ăn thành công.');
        fetchProducts();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Không thể xóa món ăn này.');
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Thanh công cụ hành động */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm tên món ăn..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none transition-colors"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          </div>

          <select
            value={categoryIdFilter}
            onChange={(e) => {
              setCategoryIdFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 text-slate-805 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none transition-colors"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button type="submit" className="hidden">Lọc</button>
        </form>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-sm transition-all"
        >
          <Plus size={18} /> Thêm Món Ăn Mới
        </button>
      </div>

      {/* Danh sách dạng Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <RefreshCw className="animate-spin text-primary mb-2" size={24} />
            <p>Đang tìm danh sách món ăn...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Không tìm thấy món ăn nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-755 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                  <th className="py-4 px-6">Hình ảnh</th>
                  <th className="py-4 px-6">Tên món</th>
                  <th className="py-4 px-6">Danh mục</th>
                  <th className="py-4 px-6">Giá gốc / Bán</th>
                  <th className="py-4 px-6">Kho</th>
                  <th className="py-4 px-6">Đặc trưng</th>
                  <th className="py-4 px-6 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-200">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <img
                          src={prod.image ? `http://localhost:5000${prod.image}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-850 dark:text-white">
                      {prod.name}
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs font-medium">
                        {prod.category?.name}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {prod.salePrice ? (
                        <div className="flex flex-col">
                          <span className="font-bold text-red-500">{formatPrice(prod.salePrice)}</span>
                          <span className="text-xs text-slate-400 line-through">{formatPrice(prod.price)}</span>
                        </div>
                      ) : (
                        <span className="font-bold">{formatPrice(prod.price)}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-semibold">
                      {prod.quantity}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {prod.isBest && <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Bán chạy</span>}
                        {prod.isNew && <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Món mới</span>}
                        {prod.isSale && <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Giảm giá</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors"
                          aria-label="Edit product"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                          aria-label="Delete product"
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

      {/* Modal Form Thêm/Sửa Món Ăn */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 dark:border-slate-700 flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-850 dark:text-white">
                {isEditMode ? 'Cập Nhật Món Ăn' : 'Thêm Món Ăn Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Tên món ăn *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập tên món ăn..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-850 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Danh mục *</label>
                  <select
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-850 dark:text-white"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Giá gốc (VND) *</label>
                  <input
                    type="number"
                    required
                    placeholder="Ví dụ: 30000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-850 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Giá khuyến mãi (VND)</label>
                  <input
                    type="number"
                    placeholder="Để trống nếu không giảm"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-850 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Số lượng tồn kho *</label>
                  <input
                    type="number"
                    required
                    placeholder="Số lượng phần sẵn sàng..."
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-850 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-350 block">Hình ảnh món ăn</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 px-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-xs font-semibold text-slate-500 transition-colors">
                      <Upload size={14} /> Tải ảnh lên
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    {imagePreview && (
                      <div className="w-10 h-10 rounded bg-slate-100 overflow-hidden">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Mô tả món ăn</label>
                <textarea
                  rows={2}
                  placeholder="Thành phần, hương vị, dinh dưỡng..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 border border-transparent rounded-xl focus:border-primary focus:outline-none text-slate-850 dark:text-white"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-1.5 text-sm cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>Món mới 🌟</span>
                </label>
                <label className="flex items-center gap-1.5 text-sm cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={isBest}
                    onChange={(e) => setIsBest(e.target.checked)}
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>Bán chạy 🔥</span>
                </label>
                <label className="flex items-center gap-1.5 text-sm cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={isSale}
                    onChange={(e) => setIsSale(e.target.checked)}
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>Giảm giá 🏷️</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-sm"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-sm"
                >
                  {isEditMode ? 'Lưu thay đổi' : 'Thêm món ăn'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManage;
