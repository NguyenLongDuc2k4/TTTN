import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../store/slices/authSlice';
import { fetchCart } from '../store/slices/cartSlice';
import { fetchSettings } from '../store/slices/settingSlice';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Tải cấu hình giao diện
    dispatch(fetchSettings());
    
    // Nếu đã đăng nhập trước đó (có token) thì tải thông tin user & giỏ hàng
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCurrentUser());
      dispatch(fetchCart());
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
