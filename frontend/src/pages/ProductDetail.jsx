import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../store/slices/cartSlice';
import ProductCard from '../components/ProductCard';
import { ShoppingCart, Heart, Plus, Minus, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        setQuantity(1);

        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data.product);
        setRelatedProducts(res.data.relatedProducts || []);
      } catch (err) {
        console.error('Lỗi tải chi tiết món ăn:', err);
        setError(err.response?.data?.message || 'Không thể tải thông tin món ăn.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleIncrement = () => {
    if (product && quantity < product.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCartClick = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thực hiện hành động này.');
      navigate('/login');
      return;
    }
    if (!product) return;
    
    dispatch(addToCart({ productId: product.id, quantity }));
    alert(`Đã thêm ${quantity} phần "${product.name}" vào giỏ hàng thành công!`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500">
        <RefreshCw className="animate-spin text-primary mb-2" size={32} />
        <p>Đang chuẩn bị mâm cơm, đợi chút nhé...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <AlertCircle size={48} className="text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Không tìm thấy món ăn</h2>
        <p className="text-slate-500 dark:text-slate-400">{error || 'Món ăn không tồn tại hoặc đã bị ngừng phục vụ.'}</p>
        <Link to="/products" className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-full transition-all">
          Quay lại thực đơn
        </Link>
      </div>
    );
  }

  const actualPrice = product.salePrice !== null ? product.salePrice : product.price;

  return (
    <div className="space-y-16">
      {/* Nút quay lại */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-650 hover:text-primary dark:text-slate-350 dark:hover:text-primary-light transition-colors"
        >
          <ArrowLeft size={16} /> Quay lại thực đơn
        </button>
      </div>

      {/* Thông tin chi tiết món ăn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
        {/* Khối hình ảnh */}
        <div className="relative pt-[75%] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700">
          <img
            src={product.image ? `http://localhost:5000${product.image}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
            }}
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {product.isBest && <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">Bán chạy 🔥</span>}
            {product.isNew && <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">Món mới 🌟</span>}
            {product.isSale && <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Giảm giá 🏷️</span>}
          </div>
        </div>

        {/* Khối thông tin */}
        <div className="flex flex-col justify-between py-2">
          <div className="space-y-4">
            <span className="bg-primary/10 text-primary dark:text-primary-light text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category?.name || 'Món ngon'}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Khối giá */}
            <div className="flex items-center gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-2xl md:text-3xl font-black text-red-500">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Trạng thái kho */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Trạng thái:</span>
              {product.quantity > 0 ? (
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Còn hàng (còn {product.quantity} phần)
                </span>
              ) : (
                <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
                  Hết hàng tạm thời
                </span>
              )}
            </div>

            {/* Mô tả chi tiết */}
            <div className="pt-4 border-t border-slate-150 dark:border-slate-700">
              <h3 className="font-bold text-sm text-slate-650 dark:text-slate-350">Mô tả chi tiết:</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {product.description || 'Hương vị món ăn đậm đà, được nêm nếm kỹ lưỡng chuẩn vị truyền thống gia đình Việt. Đảm bảo vệ sinh an toàn thực phẩm.'}
              </p>
            </div>
          </div>

          {/* Chọn số lượng & Nút thêm giỏ */}
          <div className="pt-6 border-t border-slate-150 dark:border-slate-700 space-y-4">
            {product.quantity > 0 ? (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-550">Số lượng đặt:</span>
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-750 overflow-hidden w-fit">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-slate-150 dark:hover:bg-slate-700 disabled:opacity-30 text-slate-600 dark:text-slate-400 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-slate-800 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= product.quantity}
                      className="p-2 hover:bg-slate-150 dark:hover:bg-slate-700 disabled:opacity-30 text-slate-600 dark:text-slate-400 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCartClick}
                    className="flex-grow flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                  >
                    <ShoppingCart size={20} /> Thêm Vào Giỏ Hàng - {formatPrice(actualPrice * quantity)}
                  </button>
                  <button
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-red-200 dark:border-slate-700 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/10 text-slate-400 hover:text-red-500 transition-all"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={20} />
                  </button>
                </div>
              </>
            ) : (
              <button
                disabled
                className="w-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-bold py-3.5 px-6 rounded-2xl cursor-not-allowed text-center"
              >
                Hết hàng tạm thời
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-850 dark:text-white">Gợi Ý Món Ăn Liên Quan</h2>
            <p className="text-slate-400 dark:text-slate-500 text-xs md:text-sm mt-0.5">Thực khách thường đặt các món ăn này cùng nhau</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
