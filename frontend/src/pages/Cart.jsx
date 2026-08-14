import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { Trash2, ShoppingBag, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Định dạng tiền tệ
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Tính tổng tiền của toàn bộ giỏ hàng
  const totalAmount = items.reduce((sum, item) => {
    const price = item.product.salePrice !== null ? item.product.salePrice : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const handleQtyChange = (productId, currentQty, amount) => {
    const newQty = currentQty + amount;
    dispatch(updateCartItem({ productId, quantity: newQty }));
  };

  const handleRemove = (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa món này khỏi giỏ hàng?')) {
      dispatch(removeFromCart(productId));
    }
  };

  const handleClear = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
      dispatch(clearCart());
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mx-auto text-2xl">
          🍛
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Vui lòng đăng nhập</h2>
        <p className="text-slate-500 dark:text-slate-400">Bạn cần đăng nhập để quản lý và xem giỏ hàng cá nhân.</p>
        <Link to="/login" className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-full transition-all">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center rounded-full mx-auto">
          <ShoppingBag size={24} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Giỏ hàng trống rỗng</h2>
        <p className="text-slate-500 dark:text-slate-400">Có vẻ như bạn chưa chọn được món cơm ưng ý nào.</p>
        <Link to="/products" className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-full transition-all">
          Khám phá thực đơn ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
          Giỏ Hàng Của Bạn <span className="text-sm font-normal text-slate-400">({items.length} món)</span>
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-0.5">Kiểm tra lại thực đơn trước khi tiến hành thanh toán</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {items.map((item) => {
                const product = item.product;
                const unitPrice = product.salePrice !== null ? product.salePrice : product.price;
                const itemTotal = unitPrice * item.quantity;

                return (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    {/* Ảnh sản phẩm */}
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={product.image ? `http://localhost:5000${product.image}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150';
                        }}
                      />
                    </div>

                    {/* Chi tiết tên, giá */}
                    <div className="flex-grow text-center sm:text-left">
                      <Link to={`/products/${product.id}`} className="font-bold text-slate-850 dark:text-white hover:text-primary transition-colors text-base">
                        {product.name}
                      </Link>
                      <p className="text-xs text-primary/80 dark:text-primary-light font-semibold mt-0.5">
                        {product.category?.name || 'Món chính'}
                      </p>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        Đơn giá: {formatPrice(unitPrice)}
                      </p>
                    </div>

                    {/* Điều chỉnh số lượng */}
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-750">
                      <button
                        onClick={() => handleQtyChange(product.id, item.quantity, -1)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-sm text-slate-800 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQtyChange(product.id, item.quantity, 1)}
                        disabled={item.quantity >= product.quantity}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-650 dark:text-slate-350 disabled:opacity-30 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Thành tiền & Nút xóa */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-800 dark:text-white">
                          {formatPrice(itemTotal)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                        aria-label="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Các nút bấm phụ */}
          <div className="flex justify-between items-center">
            <Link to="/products" className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
              <ArrowLeft size={16} /> Thêm món ăn khác
            </Link>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} /> Xóa sạch giỏ hàng
            </button>
          </div>
        </div>

        {/* Tổng kết giỏ hàng */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 h-fit space-y-6 shadow-sm">
          <h3 className="font-bold text-lg text-slate-850 dark:text-white pb-3 border-b border-slate-150 dark:border-slate-700">
            Hóa Đơn Tạm Tính
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Tạm tính ({items.length} món):</span>
              <span className="font-semibold text-slate-800 dark:text-white">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Phí vận chuyển:</span>
              <span className="font-semibold text-emerald-500">Miễn phí 🛵</span>
            </div>
            <div className="pt-3 border-t border-slate-150 dark:border-slate-700 flex justify-between text-base font-bold text-slate-800 dark:text-white">
              <span>Tổng thanh toán:</span>
              <span className="text-xl text-primary">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            Tiến Hành Thanh Toán <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
