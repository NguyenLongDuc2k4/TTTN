import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor chèn token vào header của mọi request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý lỗi tập trung
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu token hết hạn hoặc không hợp lệ (401 Unauthorized)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Chuyển hướng người dùng về trang đăng nhập nếu không ở các trang công khai
      const publicPaths = ['/login', '/register', '/', '/products'];
      const currentPath = window.location.pathname;
      
      const isPublic = publicPaths.some(path => currentPath === path || currentPath.startsWith('/products/'));
      if (!isPublic) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
