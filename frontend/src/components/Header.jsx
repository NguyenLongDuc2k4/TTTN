import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { resetCart } from '../store/slices/cartSlice';
import { ShoppingCart, User, Sun, Moon, LogOut, ShieldAlert, Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { config } = useSelector((state) => state.setting);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Áp dụng Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    setDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Thực Đơn', path: '/products' },
    { name: 'Tin Tức', path: '/news' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              {config.logo ? (
                <img
                  src={`http://localhost:5000${config.logo}`}
                  alt="Logo"
                  className="h-10 w-10 object-contain rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '🍛'; // Fallback nếu không tải được ảnh
                  }}
                />
              ) : (
                <span className="text-2xl">🍛</span>
              )}
              <span className="font-bold text-xl tracking-tight text-slate-850 dark:text-white">
                Cơm <span className="text-primary">Bé Huệ</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary dark:text-primary-light font-semibold'
                    : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary-light'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons Action Area */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </button>

            {/* Shopping Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Dropdown */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 py-1 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-400 dark:text-slate-500">Vai trò</p>
                        <p className="text-sm font-semibold text-slate-850 dark:text-white">
                          {user.role}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <User size={16} /> Hồ sơ cá nhân
                      </Link>

                      {/* Link quản trị cho Admin/SuperAdmin/Editor */}
                      {['SuperAdmin', 'Admin', 'Editor'].includes(user.role) && (
                        <Link
                          to="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-primary/10 dark:text-primary-light transition-colors font-medium"
                        >
                          <ShieldAlert size={16} /> Trang quản trị
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors border-t border-slate-100 dark:border-slate-700"
                      >
                        <LogOut size={16} /> Đăng xuất
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-full shadow-sm transition-all"
                >
                  <User size={16} />
                  <span>Đăng Nhập</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 space-y-1 transition-all">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary dark:text-primary-light'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
