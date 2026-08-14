import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { resetCart } from '../store/slices/cartSlice';
import { LayoutDashboard, Utensils, FolderHeart, FileSpreadsheet, Image, Newspaper, Users, Palette, ArrowLeft, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} />, roles: ['SuperAdmin', 'Admin', 'Editor'] },
    { name: 'Món Ăn', path: '/admin/products', icon: <Utensils size={18} />, roles: ['SuperAdmin', 'Admin', 'Editor'] },
    { name: 'Danh Mục', path: '/admin/categories', icon: <FolderHeart size={18} />, roles: ['SuperAdmin', 'Admin', 'Editor'] },
    { name: 'Đơn Hàng', path: '/admin/orders', icon: <FileSpreadsheet size={18} />, roles: ['SuperAdmin', 'Admin', 'Editor'] },
    { name: 'Banners', path: '/admin/banners', icon: <Image size={18} />, roles: ['SuperAdmin', 'Admin', 'Editor'] },
    { name: 'Tin Tức', path: '/admin/news', icon: <Newspaper size={18} />, roles: ['SuperAdmin', 'Admin', 'Editor'] },
    { name: 'Thành Viên', path: '/admin/users', icon: <Users size={18} />, roles: ['SuperAdmin', 'Admin'] },
    { name: 'Cấu Hình UI', path: '/admin/settings', icon: <Palette size={18} />, roles: ['SuperAdmin', 'Admin', 'Editor'] },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex text-slate-805 dark:text-slate-100">
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-250 rounded-xl shadow-md"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-6 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Admin Header */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍛</span>
            <div className="text-left">
              <h2 className="font-extrabold text-sm text-slate-850 dark:text-white uppercase tracking-wider">Shop Đồ Ăn</h2>
              <span className="text-[10px] text-slate-400 font-bold uppercase dark:text-slate-500">Khu vực quản trị</span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-1.5">
            {filteredMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
          <div className="px-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-lg">
            <p className="font-semibold text-slate-700 dark:text-slate-350">{user.name}</p>
            <p className="text-slate-400 dark:text-slate-500 line-clamp-1">{user.email}</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-primary dark:text-slate-400 transition-all"
          >
            <ArrowLeft size={14} /> Quay lại Client
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          >
            <LogOut size={14} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">
        {/* Admin Header Navbar */}
        <header className="bg-white dark:bg-slate-850 h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shadow-sm">
          <div className="hidden md:block">
            <h1 className="font-bold text-lg text-slate-850 dark:text-white uppercase tracking-wide">
              {menuItems.find((item) => item.path === location.pathname)?.name || 'Hệ Thống Quản Trị'}
            </h1>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
              {user.role}
            </span>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{user.name}</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-grow p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
