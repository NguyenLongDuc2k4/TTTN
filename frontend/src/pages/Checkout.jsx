import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import API from '../services/api';
import { resetCart } from '../store/slices/cartSlice';
import { ArrowLeft, CheckCircle, CreditCard, RefreshCw } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  
  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' hoặc 'BankTransfer'
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);

  // Định dạng tiền tệ
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const totalAmount = items.reduce((sum, item) => {
    const price = item.product.salePrice !== null ? item.product.salePrice : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  // Bắt đầu kiểm tra trạng thái thanh toán chuyển khoản tự động
  const startPaymentChecking = (orderId) => {
    setVerifyingPayment(true);
    const interval = setInterval(async () => {
      try {
        const res = await API.get(`/orders/${orderId}/check-payment`);
        if (res.data.paid) {
          setPaymentVerified(true);
          setVerifyingPayment(false);
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Lỗi kiểm tra thanh toán tự động:', err);
      }
    }, 4000); // Polling mỗi 4 giây
  };

  // Xác nhận giao dịch chuyển khoản thủ công bằng nút bấm
  const handleCheckPaymentManually = async () => {
    if (!createdOrder) return;
    try {
      setVerifyingPayment(true);
      const res = await API.get(`/orders/${createdOrder.id}/check-payment`);
      if (res.data.paid) {
        setPaymentVerified(true);
        setVerifyingPayment(false);
      } else {
        alert('Hệ thống chưa nhận được giao dịch. Vui lòng đợi thêm hoặc thử kiểm tra lại.');
      }
    } catch (err) {
      console.error(err);
      alert('Không thể kết nối đến hệ thống kiểm tra thanh toán.');
    } finally {
      setVerifyingPayment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !phone) {
      alert('Vui lòng cung cấp đầy đủ số điện thoại và địa chỉ giao hàng.');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post('/orders', {
        shippingAddress: address,
        phone,
        paymentMethod,
      });

      setCreatedOrder(res.data.order);
      setSuccess(true);
      dispatch(resetCart());

      // Nếu chọn chuyển khoản thì bắt đầu tự động xác nhận
      if (paymentMethod === 'BankTransfer') {
        startPaymentChecking(res.data.order.id);
      }
    } catch (error) {
      console.error('Lỗi đặt hàng:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra trong quá trình đặt hàng.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Vui lòng đăng nhập</h2>
        <Link to="/login" className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-full">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  if (success) {
    if (createdOrder?.paymentMethod === 'BankTransfer') {
      return (
        <div className="max-w-md mx-auto text-center py-10 space-y-6 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
          {!paymentVerified ? (
            <>
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <RefreshCw size={36} className="text-primary animate-spin absolute" />
                <div className="w-16 h-16 bg-primary/10 rounded-full animate-ping"></div>
              </div>
              <h2 className="text-xl font-black text-slate-800 dark:text-white">Đang Chờ Chuyển Khoản...</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Vui lòng quét mã QR dưới đây hoặc chuyển khoản chính xác thông tin. Hệ thống sẽ tự động nhận diện giao dịch và duyệt đơn của bạn.
              </p>

              {/* VietQR Code */}
              <div className="p-3 bg-slate-550 dark:bg-slate-750 rounded-2xl border border-slate-150 dark:border-slate-700 inline-block">
                <img
                  src={`https://img.vietqr.io/image/techcombank-19073443633012-compact.png?amount=${createdOrder.totalAmount}&addInfo=DH${createdOrder.id}&accountName=Nguyen%20Long%20Duc`}
                  alt="Techcombank VietQR"
                  className="w-52 h-52 mx-auto rounded-xl shadow-sm"
                />
              </div>

              {/* Thông tin chuyển khoản */}
              <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-xl text-left text-xs space-y-2 text-slate-700 dark:text-slate-305">
                <p><span className="font-bold text-slate-400">Ngân hàng:</span> TECHCOMBANK</p>
                <p><span className="font-bold text-slate-400">Số tài khoản:</span> <span className="font-mono font-bold text-slate-800 dark:text-white text-sm select-all">19073443633012</span></p>
                <p><span className="font-bold text-slate-400">Chủ tài khoản:</span> NGUYEN LONG DUC</p>
                <p><span className="font-bold text-slate-400">Số tiền:</span> <span className="text-primary font-bold text-sm">{formatPrice(createdOrder.totalAmount)}</span></p>
                <p><span className="font-bold text-slate-400">Nội dung CK:</span> <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-mono font-bold select-all">DH{createdOrder.id}</span></p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleCheckPaymentManually}
                  disabled={verifyingPayment}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <RefreshCw size={16} className={verifyingPayment ? 'animate-spin' : ''} />
                  {verifyingPayment ? 'Đang kiểm tra...' : 'Tôi đã chuyển tiền'}
                </button>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 animate-pulse">
                  Tự động kiểm tra và xác nhận chuyển khoản sau 3-5 giây...
                </p>
              </div>
            </>
          ) : (
            <>
              <CheckCircle size={64} className="text-emerald-500 mx-auto animate-bounce" />
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">Thanh Toán Thành Công!</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Ngân hàng Techcombank đã ghi nhận giao dịch chuyển khoản thành công của bạn. Đơn hàng đã được duyệt tự động vào bếp.
              </p>
              <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-xl text-left text-xs space-y-2 text-slate-650 dark:text-slate-350">
                <p><span className="font-bold">Mã đơn hàng:</span> #{createdOrder.id}</p>
                <p><span className="font-bold">Phương thức:</span> Chuyển khoản TECHCOMBANK</p>
                <p><span className="font-bold">Trạng thái:</span> <span className="text-emerald-500 font-bold">Đã thanh toán (Đang chế biến)</span></p>
                <p><span className="font-bold">Tổng tiền:</span> {formatPrice(createdOrder.totalAmount)}</p>
              </div>
              <div className="flex gap-4 pt-2">
                <Link
                  to="/products"
                  className="w-1/2 py-3 border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-sm transition-all"
                >
                  Tiếp tục mua sắm
                </Link>
                <Link
                  to="/profile"
                  className="w-1/2 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Lịch sử đơn hàng
                </Link>
              </div>
            </>
          )}
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-6 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <CheckCircle size={64} className="text-emerald-500 mx-auto animate-bounce" />
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Đặt Hàng Thành Công!</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          Đơn hàng của bạn đang được nhà bếp tiếp nhận và chế biến. Bạn có thể theo dõi trạng thái giao hàng trong trang lịch sử đơn hàng.
        </p>
        <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-xl text-left text-xs space-y-2 text-slate-650 dark:text-slate-350">
          <p><span className="font-bold">Mã đơn hàng:</span> #{createdOrder?.id}</p>
          <p><span className="font-bold">Tổng tiền:</span> {formatPrice(createdOrder?.totalAmount)}</p>
          <p><span className="font-bold">Số điện thoại nhận:</span> {createdOrder?.phone}</p>
          <p><span className="font-bold">Địa chỉ giao:</span> {createdOrder?.shippingAddress}</p>
        </div>
        <div className="flex gap-4 pt-2">
          <Link
            to="/products"
            className="w-1/2 py-3 border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-sm transition-all"
          >
            Tiếp tục mua sắm
          </Link>
          <Link
            to="/profile"
            className="w-1/2 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all"
          >
            Lịch sử đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-850 dark:text-white">Chưa có sản phẩm để thanh toán</h2>
        <Link to="/products" className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-full">
          Xem thực đơn
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/cart" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Quay lại giỏ hàng
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mt-4">
          Xác Nhận Đơn Hàng
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-0.5">Nhập địa chỉ giao cơm nóng hổi tận nơi</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Điền thông tin giao hàng */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white pb-3 border-b border-slate-150 dark:border-slate-700">
            Thông Tin Vận Chuyển
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-650 dark:text-slate-350">Họ và tên người nhận</label>
              <input
                type="text"
                disabled
                value={user.name}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl border border-transparent focus:outline-none cursor-not-allowed text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-650 dark:text-slate-350">Số điện thoại nhận cơm *</label>
              <input
                type="tel"
                required
                placeholder="Nhập số điện thoại của bạn..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-650 dark:text-slate-350">Địa chỉ nhận cơm chi tiết *</label>
              <textarea
                required
                rows={3}
                placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-650 dark:text-slate-350">Phương thức thanh toán</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-xl border text-left text-xs md:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === 'COD'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-355 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CreditCard size={18} className={paymentMethod === 'COD' ? 'text-primary' : 'text-slate-400'} />
                    Thanh toán khi nhận hàng (COD)
                  </span>
                  {paymentMethod === 'COD' && <CheckCircle size={16} className="text-primary flex-shrink-0" />}
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('BankTransfer')}
                  className={`p-4 rounded-xl border text-left text-xs md:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === 'BankTransfer'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-355 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CreditCard size={18} className={paymentMethod === 'BankTransfer' ? 'text-primary' : 'text-slate-400'} />
                    Chuyển khoản TECHCOMBANK
                  </span>
                  {paymentMethod === 'BankTransfer' && <CheckCircle size={16} className="text-primary flex-shrink-0" />}
                </button>
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
                <RefreshCw className="animate-spin" size={18} /> Đang xử lý...
              </>
            ) : (
              `Xác Nhận Đặt Cơm - ${formatPrice(totalAmount)}`
            )}
          </button>
        </form>

        {/* Tóm tắt đơn hàng */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 h-fit space-y-6 shadow-sm">
          <h3 className="font-bold text-lg text-slate-850 dark:text-white pb-3 border-b border-slate-150 dark:border-slate-700">
            Tóm Tắt Đơn Hàng
          </h3>

          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700 pr-1">
            {items.map((item) => {
              const product = item.product;
              const price = product.salePrice !== null ? product.salePrice : product.price;

              return (
                <div key={item.id} className="py-3 flex justify-between gap-4 text-sm">
                  <div className="flex-grow">
                    <p className="font-semibold text-slate-850 dark:text-white line-clamp-1">{product.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Số lượng: x{item.quantity}</p>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-350 flex-shrink-0">
                    {formatPrice(price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-150 dark:border-slate-700 space-y-2 text-sm">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Tạm tính:</span>
              <span className="font-semibold text-slate-800 dark:text-white">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Phí vận chuyển:</span>
              <span className="font-semibold text-emerald-500">Miễn phí 🛵</span>
            </div>
            <div className="pt-3 border-t border-slate-150 dark:border-slate-700 flex justify-between text-base font-bold text-slate-800 dark:text-white">
              <span>Tổng cộng:</span>
              <span className="text-lg text-primary">{formatPrice(totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
