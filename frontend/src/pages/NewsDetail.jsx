import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, ArrowLeft, RefreshCw } from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`http://localhost:5000/api/news/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error('Lỗi tải bài viết:', err);
        setError(err.response?.data?.message || 'Không thể tải bài viết này.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500">
        <RefreshCw className="animate-spin text-primary mb-2" size={32} />
        <p>Đang chuẩn bị trang đọc tin...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Không tìm thấy bài viết</h2>
        <p className="text-slate-500 dark:text-slate-400">{error || 'Bài viết không tồn tại hoặc đã bị gỡ bỏ.'}</p>
        <Link to="/news" className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-full transition-all">
          Quay lại tin tức
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Nút quay lại */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-350 dark:hover:text-primary-light transition-colors"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>

      {/* Chi tiết bài viết */}
      <article className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden p-6 md:p-10 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <Calendar size={14} />
            <span>Đăng ngày: {new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Ảnh bìa */}
        <div className="relative pt-[50%] bg-slate-100 dark:bg-slate-700 rounded-2xl overflow-hidden">
          <img
            src={`http://localhost:5000${article.image}`}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800';
            }}
          />
        </div>

        {/* Nội dung bài viết */}
        <div className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line pt-4 border-t border-slate-100 dark:border-slate-700">
          {article.content}
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
