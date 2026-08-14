import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Định dạng tiền tệ VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Tránh việc click vào thẻ click của Link
    if (!user) {
      alert('Vui lòng đăng nhập để thêm món ăn vào giỏ hàng.');
      window.location.href = '/login';
      return;
    }
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Container Ảnh & Badges */}
      <div className="relative pt-[75%] bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <img
          src={product.image ? `http://localhost:5000${product.image}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500';
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBest && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              Bán chạy 🔥
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              Món mới 🌟
            </span>
          )}
          {product.isSale && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              Giảm giá 🏷️
            </span>
          )}
        </div>
      </div>

      {/* Nội dung chi tiết */}
      <div className="flex-grow p-4 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-primary/80 dark:text-primary-light uppercase tracking-wider">
            {product.category?.name || 'Món ngon'}
          </span>
          <h3 className="font-semibold text-slate-800 dark:text-white line-clamp-1 group-hover:text-primary transition-colors text-base mt-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-2 h-8 leading-relaxed">
            {product.description || 'Hương vị thơm ngon đậm đà chuẩn vị.'}
          </p>
        </div>

        {/* Giá bán và nút Thêm giỏ */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            {product.salePrice ? (
              <>
                <span className="text-sm font-bold text-red-500">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white dark:bg-slate-700 dark:text-primary-light dark:hover:bg-primary transition-all duration-200"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
