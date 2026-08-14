import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Search, Calendar, ArrowRight, RefreshCw } from 'lucide-react';

const News = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const params = {
          page,
          limit: 6,
        };
        if (search) params.search = search;

        const res = await axios.get('http://localhost:5000/api/news', { params });
        setNews(res.data.news || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.error('Lỗi tải tin tức:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Header & Thanh tìm kiếm */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <BookOpen className="text-primary" /> Góc Chia Sẻ & Tin Tức
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-0.5">Cập nhật tin tức ẩm thực, ưu đãi mới nhất từ Quán Cơm Sài Gòn</p>
        </div>

        {/* Form tìm kiếm */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-primary focus:outline-none rounded-2xl shadow-sm transition-all"
          />
          <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
        </form>
      </div>

      {/* Grid danh sách tin tức */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] text-slate-500">
          <RefreshCw className="animate-spin text-primary mb-2" size={24} />
          <p>Đang chuẩn bị trang tin...</p>
        </div>
      ) : news.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl text-center border border-slate-100 dark:border-slate-700 shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-lg">Không tìm thấy bài viết nào.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Ảnh bài viết */}
                <div className="relative pt-[56.25%] overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img
                    src={`http://localhost:5000${article.image}`}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500';
                    }}
                  />
                </div>

                {/* Nội dung bài viết */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={14} />
                      <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors text-base line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {article.content}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-primary dark:text-primary-light flex items-center gap-1 mt-4">
                    Đọc chi tiết <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all ${
                    page === p
                      ? 'bg-primary border-primary text-white shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-350'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default News;
