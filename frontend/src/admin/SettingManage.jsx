import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettingsThunk } from '../store/slices/settingSlice';
import API from '../services/api';
import { Palette, Upload, RefreshCw, CheckCircle } from 'lucide-react';

const SettingManage = () => {
  const dispatch = useDispatch();
  const { config } = useSelector((state) => state.setting);

  // States cục bộ cho form
  const [themeColor, setThemeColor] = useState(config.themeColor || '#FF6B6B');
  const [showNewProducts, setShowNewProducts] = useState(config.showNewProducts === 'true');
  const [showBestProducts, setShowBestProducts] = useState(config.showBestProducts === 'true');
  const [showSaleProducts, setShowSaleProducts] = useState(config.showSaleProducts === 'true');
  const [showNews, setShowNews] = useState(config.showNews === 'true');

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(config.logo ? `http://localhost:5000${config.logo}` : '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setThemeColor(config.themeColor || '#FF6B6B');
    setShowNewProducts(config.showNewProducts === 'true');
    setShowBestProducts(config.showBestProducts === 'true');
    setShowSaleProducts(config.showSaleProducts === 'true');
    setShowNews(config.showNews === 'true');
    setLogoPreview(config.logo ? `http://localhost:5000${config.logo}` : '');
  }, [config]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let logoUrl = config.logo;
      if (logoFile) {
        const formData = new FormData();
        formData.append('image', logoFile);
        
        const uploadRes = await API.post('/products/upload-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        logoUrl = uploadRes.data.imageUrl;
      }

      const settingsData = {
        logo: logoUrl,
        themeColor,
        showNewProducts: showNewProducts.toString(),
        showBestProducts: showBestProducts.toString(),
        showSaleProducts: showSaleProducts.toString(),
        showNews: showNews.toString(),
      };

      await dispatch(updateSettingsThunk(settingsData)).unwrap();
      alert('Cập nhật cấu hình UI động thành công!');
    } catch (err) {
      console.error(err);
      alert('Cập nhật cấu hình thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-150 dark:border-slate-700">
        <Palette className="text-primary" size={20} />
        <h2 className="font-extrabold text-lg text-slate-850 dark:text-white">Cấu Hình Giao Diện Động (Dynamic UI)</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-650 dark:text-slate-350 block">Logo Cửa Hàng</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 px-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-xs font-semibold text-slate-500 transition-colors">
                <Upload size={14} /> Thay logo
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
              </label>
              {logoPreview && (
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-700 overflow-hidden flex items-center justify-center border border-slate-205 dark:border-slate-600">
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-650 dark:text-slate-350 block">Màu sắc chủ đạo (Theme Color)</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-10 h-10 border-0 p-0 rounded-lg cursor-pointer overflow-hidden bg-transparent"
              />
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{themeColor}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-150 dark:border-slate-700">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider text-[11px] text-slate-400">Ẩn / Hiện các mục hiển thị trang chủ</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-750">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Khối sản phẩm giảm giá (Sale)</span>
              <input
                type="checkbox"
                checked={showSaleProducts}
                onChange={(e) => setShowSaleProducts(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-5 w-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-750">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Khối sản phẩm bán chạy nhất (Best Sellers)</span>
              <input
                type="checkbox"
                checked={showBestProducts}
                onChange={(e) => setShowBestProducts(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-5 w-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-750">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Khối sản phẩm mới lên kệ (New Arrivals)</span>
              <input
                type="checkbox"
                checked={showNewProducts}
                onChange={(e) => setShowNewProducts(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-5 w-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-750">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Khối bài viết Tin tức & Góc chia sẻ</span>
              <input
                type="checkbox"
                checked={showNews}
                onChange={(e) => setShowNews(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-5 w-5 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="animate-spin" size={18} /> Đang lưu cấu hình...
            </>
          ) : (
            <>
              <CheckCircle size={18} /> Lưu Cấu HÌnh Giao Diện
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SettingManage;
