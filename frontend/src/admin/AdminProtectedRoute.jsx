import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoles = ['SuperAdmin', 'Admin', 'Editor'];
  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-500 p-4 text-center">
        <span className="text-4xl mb-3">⚠️</span>
        <h2 className="text-xl font-bold text-slate-850">Từ Chối Truy Cập</h2>
        <p className="mt-2 text-sm text-slate-400">Bạn không có quyền truy cập vào khu vực quản trị này.</p>
        <a href="/" className="mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow transition-all">
          Quay lại Trang chủ
        </a>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
