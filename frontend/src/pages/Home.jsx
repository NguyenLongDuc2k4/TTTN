import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BannerSlider from '../components/BannerSlider';
import ProductCard from '../components/ProductCard';
import { ArrowRight, BookOpen, Utensils, Award, Sparkles, RefreshCw } from 'lucide-react';

const Home = () => {
  const { config } = useSelector((state) => state.setting);

  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        // Tải banners hoạt động
        const bannerRes = await axios.get('http://localhost:5000/api/banners?status=true');
        setBanners(bannerRes.data);

        // Tải danh mục hoạt động
        const catRes = await axios.get('http://localhost:5000/api/categories?status=true');
        setCategories(catRes.data);

        // Tải các món ăn theo phân nhóm
        const productPromises = [];
        
        // Món mới
        productPromises.push(axios.get('http://localhost:5000/api/products?isNew=true&limit=4'));
        // Bán chạy
        productPromises.push(axios.get('http://localhost:5000/api/products?isBest=true&limit=4'));
        // Giảm giá
        productPromises.push(axios.get('http://localhost:5000/api/products?isSale=true&limit=4'));
        // Tin tức mới
        productPromises.push(axios.get('http://localhost:5000/api/news?limit=2'));

        const [newRes, bestRes, saleRes, newsRes] = await Promise.all(productPromises);

        setNewProducts(newRes.data.products);
        setBestProducts(bestRes.data.products);
        setSaleProducts(saleRes.data.products);
        setLatestNews(newsRes.data.news);
      } catch (error) {
        console.error('Lỗi tải dữ liệu trang chủ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500">
        <RefreshCw className="animate-spin text-primary mb-2" size={32} />
        <p>Đang dọn món ăn ngon, chờ chút nhé...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Banner Section */}
      <section>
        <BannerSlider banners={banners} />
      </section>

      {/* Danh mục món ăn */}
      <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2">
            <Utensils className="text-primary" /> Danh Mục Thực Đơn
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-xs md:text-sm mt-1">
            Lựa chọn món ăn theo sở thích của bạn
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?categoryId=${cat.id}`}
              className="flex flex-col items-center p-5 rounded-2xl bg-slate-50 hover:bg-primary/5 border border-transparent hover:border-primary/20 dark:bg-slate-700 dark:hover:bg-slate-750 hover:shadow-md transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-slate-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                🍛
              </div>
              <span className="font-semibold text-slate-800 dark:text-white text-sm group-hover:text-primary transition-colors">
                {cat.name}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-1">
                {cat.description || 'Hương vị thơm ngon'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Món ăn giảm giá (isSale) */}
      {config.showSaleProducts === 'true' && saleProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Award className="text-red-500" /> Ưu Đãi Giảm Giá Cực Sốc
              </h2>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-0.5">
                Món ngon giá hời cho bữa cơm hoàn hảo
              </p>
            </div>
            <Link to="/products?isSale=true" className="text-sm font-semibold text-primary hover:text-primary-dark dark:text-primary-light flex items-center gap-1 group">
              Xem tất cả <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {saleProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Món ăn bán chạy nhất (isBest) */}
      {config.showBestProducts === 'true' && bestProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Award className="text-amber-500" /> Món Ăn Bán Chạy Nhất (Best Seller)
              </h2>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-0.5">
                Hương vị độc đáo được đông đảo thực khách ưa thích
              </p>
            </div>
            <Link to="/products?isBest=true" className="text-sm font-semibold text-primary hover:text-primary-dark dark:text-primary-light flex items-center gap-1 group">
              Xem tất cả <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Món ăn mới nhất (isNew) */}
      {config.showNewProducts === 'true' && newProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Sparkles className="text-emerald-500" /> Món Ăn Mới Lên Kệ
              </h2>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-0.5">
                Khám phá hương vị mới mẻ hằng ngày của quán
              </p>
            </div>
            <Link to="/products?isNew=true" className="text-sm font-semibold text-primary hover:text-primary-dark dark:text-primary-light flex items-center gap-1 group">
              Xem tất cả <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Tin tức mới */}
      {config.showNews === 'true' && latestNews.length > 0 && (
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BookOpen className="text-sky-500" /> Góc Chia Sẻ & Tin Tức Mới
              </h2>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-0.5">
                Bí quyết nấu ăn ngon và các câu chuyện từ Quán Cơm Sài Gòn
              </p>
            </div>
            <Link to="/news" className="text-sm font-semibold text-primary hover:text-primary-dark dark:text-primary-light flex items-center gap-1 group">
              Xem tất cả tin tức <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestNews.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-full sm:w-40 h-40 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={`http://localhost:5000${article.image}`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500';
                    }}
                  />
                </div>
                <div className="flex flex-col justify-between py-1 flex-grow">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors text-base line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                      Ngày đăng: {new Date(article.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                    <p className="text-xs text-slate-555 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {article.content}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-primary dark:text-primary-light flex items-center gap-1 mt-2">
                    Đọc tiếp <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
