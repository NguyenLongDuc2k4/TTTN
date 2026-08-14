import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { RefreshCw, ClipboardList, User, Phone, MapPin, Eye, X } from 'lucide-react';

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Bộ lọc
  const [statusFilter, setStatusFilter] = useState('');
  
  // Chi tiết đơn hàng
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = { page, limit: 10 };
      if (statusFilter) params.status = statusFilter;

      const res = await API.get('/orders', { params });
      setOrders(res.data.orders || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, page]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      alert('Cập nhật trạng thái đơn hàng thành công!');
      fetchOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Không thể cập nhật trạng thái.');
    }
  };

  const openDetail = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Pending': return 'Chờ tiếp nhận';
      case 'Processing': return 'Đang nấu cơm';
      case 'Shipping': return 'Đang giao cơm';
      case 'Completed': return 'Đã giao xong';
      case 'Cancelled': return 'Đã hủy đơn';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Bộ lọc trạng thái */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex-wrap gap-4">
        <div>
          <h2 className="text-sm text-slate-400 font-bold uppercase tracking-wider">Danh sách đơn hàng</h2>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-750 text-slate-805 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none transition-colors cursor-pointer font-semibold"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Pending">Chờ tiếp nhận</option>
          <option value="Processing">Đang nấu cơm</option>
          <option value="Shipping">Đang giao cơm</option>
          <option value="Completed">Đã giao xong</option>
          <option value="Cancelled">Đã hủy đơn</option>
        </select>
      </div>

      {/* Bảng đơn hàng */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <RefreshCw className="animate-spin text-primary mb-2" size={24} />
            <p>Đang tải danh sách đơn cơm nóng sốt...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Không tìm thấy đơn hàng nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-755 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                  <th className="py-4 px-6">Mã đơn</th>
                  <th className="py-4 px-6">Khách hàng</th>
                  <th className="py-4 px-6">Số điện thoại</th>
                  <th className="py-4 px-6">Tổng tiền</th>
                  <th className="py-4 px-6">Ngày đặt</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-850 dark:text-white">#{order.id}</td>
                    <td className="py-4 px-6 font-semibold">{order.user?.name}</td>
                    <td className="py-4 px-6">{order.phone}</td>
                    <td className="py-4 px-6 font-extrabold text-primary">{formatPrice(order.totalAmount)}</td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleString('vi-VN')}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                          order.status === 'Completed' ? 'bg-emerald-50 text-emerald-505 border-emerald-200 dark:bg-emerald-955/20' :
                          order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-955/20' :
                          order.status === 'Shipping' ? 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-955/20' :
                          order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-205 dark:bg-blue-955/20' :
                          'bg-yellow-50 text-yellow-600 border-yellow-205 dark:bg-yellow-955/20'
                        }`}
                      >
                        <option value="Pending">Chờ tiếp nhận</option>
                        <option value="Processing">Đang nấu cơm</option>
                        <option value="Shipping">Đang giao cơm</option>
                        <option value="Completed">Đã giao xong</option>
                        <option value="Cancelled">Hủy đơn hàng</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => openDetail(order)}
                        className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-1.5 mx-auto font-semibold text-xs"
                      >
                        <Eye size={14} /> Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                  page === p
                    ? 'bg-primary border-primary text-white'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-350'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-855 dark:text-white">
                  Đơn Hàng Chi Tiết #{selectedOrder.id}
                </h3>
                <p className="text-xs text-slate-400">Đặt lúc: {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}</p>
              </div>
              <button onClick={() => setIsDetailModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-grow">
              <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-2xl space-y-2 text-xs text-slate-600 dark:text-slate-350">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-slate-400" />
                  <p><span className="font-bold">Khách hàng:</span> {selectedOrder.user?.name} ({selectedOrder.user?.email})</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <p><span className="font-bold">Số điện thoại:</span> {selectedOrder.phone}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-slate-400 mt-0.5" />
                  <p><span className="font-bold">Địa chỉ nhận cơm:</span> {selectedOrder.shippingAddress}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                  <ClipboardList size={16} className="text-primary" /> Chi tiết mâm cơm đặt
                </h4>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="py-2.5 flex justify-between items-center gap-4 text-xs">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">{item.product?.name}</p>
                        <p className="text-[10px] text-slate-400">Đơn giá: {formatPrice(item.price)}</p>
                      </div>
                      <span className="font-semibold text-slate-500">Số lượng: x{item.quantity}</span>
                      <span className="font-bold text-slate-800 dark:text-white">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 flex justify-between items-center flex-wrap gap-4">
              <div className="text-left">
                <p className="text-xs text-slate-400">Trạng thái: <span className="font-bold text-slate-600 dark:text-slate-350">{getStatusLabel(selectedOrder.status)}</span></p>
                <p className="text-sm font-bold text-slate-850 dark:text-white">Tổng cộng: <span className="text-lg text-primary">{formatPrice(selectedOrder.totalAmount)}</span></p>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-5 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManage;
