import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/slices/authSlice';
import { fetchCart } from '../store/slices/cartSlice';
import { Mail, Lock, User, UserPlus, RefreshCw, AlertCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Điều hướng nếu đã có tài khoản
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
      navigate('/');
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu nhập lại không khớp!');
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <span className="text-4xl">🍛</span>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Đăng Ký Tài Khoản</h1>
        <p className="text-xs md:text-sm text-slate-400 dark:text-slate-550">Tạo tài khoản để tham gia đặt cơm nhanh chóng và nhận quà hấp dẫn</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl border border-red-100 dark:border-red-900/50">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-650 dark:text-slate-350">Họ và tên *</label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Nhập tên hiển thị..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none text-sm transition-colors"
            />
            <User className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-650 dark:text-slate-350">Email *</label>
          <div className="relative">
            <input
              type="email"
              required
              placeholder="Nhập email đăng ký..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-55 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none text-sm transition-colors"
            />
            <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-650 dark:text-slate-350">Mật khẩu *</label>
          <div className="relative">
            <input
              type="password"
              required
              placeholder="Tạo mật khẩu (tối thiểu 6 ký tự)..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none text-sm transition-colors"
            />
            <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-650 dark:text-slate-350">Nhập lại mật khẩu *</label>
          <div className="relative">
            <input
              type="password"
              required
              placeholder="Xác nhận lại mật khẩu..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-white border border-transparent focus:border-primary rounded-xl focus:outline-none text-sm transition-colors"
            />
            <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="animate-spin" size={18} /> Đang khởi tạo...
            </>
          ) : (
            <>
              <UserPlus size={18} /> Đăng Ký
            </>
          )}
        </button>
      </form>

      <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700">
        Bạn đã có tài khoản?{' '}
        <Link to="/login" className="text-primary hover:underline font-bold">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default Register;
