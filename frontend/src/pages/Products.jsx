import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State lưu danh sách dữ liệu
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // State phục vụ việc hiển thị UI lọc
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [categoryId, setCategoryId] = useState(searchParams.get('categoryId') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [isSale, setIsSale] = useState(searchParams.get('isSale') || '');
  const [isNew, setIsNew] = useState(searchParams.get('isNew') || '');
  const [isBest, setIsBest] = useState(searchParams.get('isBest') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [loading, setLoading] = useState(true);

  // Tải danh mục món ăn một lần duy nhất
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories?status=true');
        setCategories(res.data);
      } catch (err) {
        console.error('Lỗi tải danh mục:', err);
      }
    };
    fetchCats();
  }, []);

  // Tải danh sách sản phẩm mỗi khi params thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {
          page,
          limit: 8,
        };

        if (searchParams.get('search')) params.search = searchParams.get('search');
        if (searchParams.get('categoryId')) params.categoryId = searchParams.get('categoryId');
        if (searchParams.get('minPrice')) params.minPrice = searchParams.get('minPrice');
        if (searchParams.get('maxPrice')) params.maxPrice = searchParams.get('maxPrice');
        if (searchParams.get('isSale')) params.isSale = searchParams.get('isSale');
        if (searchParams.get('isNew')) params.isNew = searchParams.get('isNew');
        if (searchParams.get('isBest')) params.isBest = searchParams.get('isBest');
        if (searchParams.get('sort')) params.sort = searchParams.get('sort');

        const res = await axios.get('http://localhost:5000/api/products', { params });
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.error('Lỗi tải món ăn:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, page]);

  // Cập nhật params lên URL khi nhấn Tìm kiếm/Lọc
  const handleApplyFilter = (e) => {
    if (e) e.preventDefault();
    
    const newParams = {};
    if (search) newParams.search = search;
    if (categoryId) newParams.categoryId = categoryId;
    if (minPrice) newParams.minPrice = minPrice;
    if (maxPrice) newParams.maxPrice = maxPrice;
    if (isSale) newParams.isSale = isSale;
    if (isNew) newParams.isNew = isNew;
    if (isBest) newParams.isBest = isBest;
    if (sort) newParams.sort = sort;
    
    setPage(1); // Reset về trang 1
    newParams.page = 1;

    setSearchParams(newParams);
  };

  const handleResetFilter = () => {
    setSearch('');
    setCategoryId('');
    setMinPrice('');
    setMaxPrice('');
    setIsSale('');
    setIsNew('');
    setIsBest('');
    setSort('');
    setPage(1);
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    
    // Giữ nguyên các params cũ chỉ thay đổi page
    const currentParams = {};
    searchParams.forEach((value, key) => {
      currentParams[key] = value;
    });
    currentParams.page = newPage;
    setSearchParams(currentParams);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Bộ Lọc */}
      <aside className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 h-fit space-y-6 shadow-sm">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-150 dark:border-slate-700">
          <Filter size={18} className="text-primary" />
          <h2 className="font-bold text-lg text-slate-800 dark:text-white">Bộ Lọc Tìm Kiếm</h2>
        </div>

        <form onSubmit={handleApplyFilter} className="space-y-4">
          {/* Tìm kiếm */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Từ khóa</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm món ăn..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none transition-colors"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            </div>
          </div>

          {/* Danh mục */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Danh mục</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none transition-colors"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Khoảng giá */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Khoảng giá (VND)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Từ"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none transition-colors"
              />
              <span className="text-slate-400 text-sm">-</span>
              <input
                type="number"
                placeholder="Đến"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Đánh dấu đặc trưng */}
          <div className="space-y-2 pt-2 border-t border-slate-150 dark:border-slate-700">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-350 cursor-pointer">
              <input
                type="checkbox"
                checked={isSale === 'true'}
                onChange={(e) => setIsSale(e.target.checked ? 'true' : '')}
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <span>Đang giảm giá 🏷️</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-350 cursor-pointer">
              <input
                type="checkbox"
                checked={isNew === 'true'}
                onChange={(e) => setIsNew(e.target.checked ? 'true' : '')}
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <span>Món ăn mới 🌟</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-350 cursor-pointer">
              <input
                type="checkbox"
                checked={isBest === 'true'}
                onChange={(e) => setIsBest(e.target.checked ? 'true' : '')}
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <span>Món bán chạy 🔥</span>
            </label>
          </div>

          {/* Sắp xếp */}
          <div className="space-y-1.5 pt-2 border-t border-slate-150 dark:border-slate-700">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sắp xếp theo</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none transition-colors"
            >
              <option value="">Mới nhất</option>
              <option value="price_asc">Giá: Thấp đến Cao</option>
              <option value="price_desc">Giá: Cao đến Thấp</option>
              <option value="name_asc">Tên: A - Z</option>
              <option value="name_desc">Tên: Z - A</option>
            </select>
          </div>

          {/* Nút bấm */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={handleResetFilter}
              className="w-1/2 py-2.5 text-sm font-semibold border border-slate-200 hover:bg-slate-55 text-slate-600 dark:border-slate-700 dark:hover:bg-slate-750 dark:text-slate-300 rounded-xl transition-all"
            >
              Thiết lập lại
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 text-sm font-semibold bg-primary hover:bg-primary-dark text-white rounded-xl shadow-sm hover:shadow transition-all"
            >
              Lọc món
            </button>
          </div>
        </form>
      </aside>

      {/* Grid danh sách món ăn */}
      <main className="lg:col-span-3 space-y-8">
        <div className="flex justify-between items-center bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            Hiển thị trang <span className="font-bold text-slate-850 dark:text-white">{page}</span> trên tổng số <span className="font-bold text-slate-850 dark:text-white">{totalPages}</span> trang
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-slate-400" />
            <span className="text-xs text-slate-400 font-semibold uppercase">Thực đơn</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[30vh] text-slate-500">
            <RefreshCw className="animate-spin text-primary mb-2" size={24} />
            <p>Đang chuẩn bị danh sách món ngon...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl text-center border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-lg">Không tìm thấy món ăn nào phù hợp với bộ lọc.</p>
            <button
              onClick={handleResetFilter}
              className="mt-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all"
            >
              Quay lại thực đơn đầy đủ
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 disabled:opacity-50 text-slate-600 dark:text-slate-350 transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all ${
                      page === p
                        ? 'bg-primary border-primary text-white shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-350'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 disabled:opacity-50 text-slate-600 dark:text-slate-350 transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Products;
