import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { User, Calendar, Phone, MapPin, RefreshCw, ClipboardList, CheckCircle2, Clock, Truck, XCircle } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        const res = await API.get('/orders/my-orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Lỗi lấy danh sách đơn hàng:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-950/20',
          text: 'text-yellow-600 dark:text-yellow-400',
          border: 'border-yellow-200 dark:border-yellow-900/30',
          label: 'Chờ tiếp nhận',
          icon: <Clock size={14} />,
        };
      case 'Processing':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/20',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-900/30',
          label: 'Đang nấu',
          icon: <RefreshCw size={14} className="animate-spin" />,
        };
      case 'Shipping':
        return {
          bg: 'bg-purple-50 dark:bg-purple-950/20',
          text: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-200 dark:border-purple-900/30',
          label: 'Đang giao cơm',
          icon: <Truck size={14} />,
        };
      case 'Completed':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/20',
          text: 'text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-900/30',
          label: 'Đã giao xong',
          icon: <CheckCircle2 size={14} />,
        };
      case 'Cancelled':
        return {
          bg: 'bg-red-50 dark:bg-red-950/20',
          text: 'text-red-600 dark:text-red-400',
          border: 'border-red-200 dark:border-red-900/30',
          label: 'Đã hủy',
          icon: <XCircle size={14} />,
        };
      default:
        return {
          bg: 'bg-slate-50 dark:bg-slate-750',
          text: 'text-slate-600 dark:text-slate-350',
          border: 'border-slate-200 dark:border-slate-700',
          label: status,
          icon: <ClipboardList size={14} />,
        };
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-10">
      {/* Khối thông tin cá nhân */}
      <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 bg-primary/10 text-primary flex items-center justify-center rounded-full text-3xl font-extrabold shadow-inner border border-primary/20">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-grow text-center md:text-left space-y-2">
          <h1 className="text-2xl font-black text-slate-850 dark:text-white flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start">
            {user.name}
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 uppercase tracking-wider">
              {user.role}
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 justify-center">
              <User size={14} /> {user.email}
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1.5 justify-center">
              <Calendar size={14} /> Thành viên từ: {new Date(user.createdAt || Date.now()).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>
      </section>

      {/* Lịch sử đặt hàng */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <ClipboardList className="text-primary" /> Lịch Sử Đặt Cơm
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <RefreshCw className="animate-spin text-primary mb-2" size={24} />
            <p>Đang lục lại sổ đặt đơn...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl text-center border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
            <p className="text-slate-550 dark:text-slate-400 text-lg">Bạn chưa đặt phần cơm nào tại quán.</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-full transition-all"
            >
              Thử đặt ngay thôi!
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusStyle = getStatusStyle(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden"
                >
                  {/* Header của Đơn Hàng */}
                  <div className="bg-slate-50 dark:bg-slate-750 px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800 dark:text-white">
                        Đơn hàng #{order.id}
                      </p>
                      <p className="text-xs text-slate-400">
                        Đặt ngày: {new Date(order.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Trạng thái đơn */}
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                        {statusStyle.icon} {statusStyle.label}
                      </span>
                      {/* Tổng tiền */}
                      <p className="text-lg font-black text-primary">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Body của Đơn Hàng */}
                  <div className="p-6 divide-y divide-slate-100 dark:divide-slate-700">
                    <div className="space-y-4 pb-4">
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex justify-between items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-55 dark:bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.product?.image ? `http://localhost:5000${item.product.image}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}
                                alt={item.product?.name || 'Món ngon'}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100';
                                }}
                              />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-slate-800 dark:text-white">
                                {item.product?.name || 'Sản phẩm không khả dụng'}
                              </p>
                              <p className="text-xs text-slate-400">
                                Đơn giá: {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-slate-600 dark:text-slate-350">
                            Số lượng: x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer của Đơn Hàng */}
                    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-550 dark:text-slate-400">
                      <div className="flex items-start gap-2">
                        <Phone size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                        <p><span className="font-bold">Số điện thoại:</span> {order.phone}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                        <p><span className="font-bold">Địa chỉ giao:</span> {order.shippingAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
