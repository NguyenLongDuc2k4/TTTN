import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { DollarSign, Utensils, ClipboardCheck, Users, RefreshCw, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await API.get('/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Lỗi lấy thông tin thống kê:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500">
        <RefreshCw className="animate-spin text-primary mb-2" size={32} />
        <p>Đang lập bảng thống kê hoạt động kinh doanh...</p>
      </div>
    );
  }

  const { summary, chartData } = stats;

  const cardData = [
    { title: 'Tổng Doanh Thu', value: formatPrice(summary.totalRevenue), icon: <DollarSign className="text-emerald-500" />, color: 'bg-emerald-500/10 text-emerald-600' },
    { title: 'Món Ăn Phục Vụ', value: `${summary.totalProducts} món`, icon: <Utensils className="text-blue-500" />, color: 'bg-blue-500/10 text-blue-600' },
    { title: 'Đơn Hàng Đã Đặt', value: `${summary.totalOrders} đơn`, icon: <ClipboardCheck className="text-amber-500" />, color: 'bg-amber-500/10 text-amber-600' },
    { title: 'Khách Hàng Đăng Ký', value: `${summary.totalUsers} người`, icon: <Users className="text-purple-500" />, color: 'bg-purple-500/10 text-purple-600' },
  ];

  return (
    <div className="space-y-8">
      {/* 4 Cards Thống Kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.title}</span>
              <p className="text-xl md:text-2xl font-black text-slate-850 dark:text-white">{card.value}</p>
            </div>
            <div className={`p-4 rounded-2xl ${card.color}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Biểu Đồ Thống Kê */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Biểu đồ Doanh thu */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary" size={20} />
            <h3 className="font-bold text-base text-slate-850 dark:text-white">Thống Kê Doanh Thu 6 Tháng Gần Nhất (VND)</h3>
          </div>
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-700" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip formatter={(value) => formatPrice(value)} />
                <Area type="monotone" dataKey="revenue" name="Doanh thu" stroke="#FF6B6B" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ số Đơn Hàng */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="text-secondary" size={20} />
            <h3 className="font-bold text-base text-slate-850 dark:text-white">Thống Kê Số Lượng Đơn Hàng (Đơn)</h3>
          </div>
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-700" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" name="Số đơn hàng" fill="#4D96FF" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
