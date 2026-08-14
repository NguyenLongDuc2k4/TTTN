import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Client Components
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';

// Admin Components
import AdminProtectedRoute from './admin/AdminProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ProductManage from './admin/ProductManage';
import CategoryManage from './admin/CategoryManage';
import OrderManage from './admin/OrderManage';
import UserManage from './admin/UserManage';
import BannerManage from './admin/BannerManage';
import NewsManage from './admin/NewsManage';
import SettingManage from './admin/SettingManage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== PHÂN HỆ CLIENT ==================== */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
        </Route>

        {/* ==================== PHÂN HỆ ADMIN ==================== */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductManage />} />
            <Route path="categories" element={<CategoryManage />} />
            <Route path="orders" element={<OrderManage />} />
            <Route path="users" element={<UserManage />} />
            <Route path="banners" element={<BannerManage />} />
            <Route path="news" element={<NewsManage />} />
            <Route path="settings" element={<SettingManage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
