/* ==========================================
   MyE Website - Dang Nhap page JS Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Toggle Password Visibility
  const toggleBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', function () {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Toggle eye icon class
      const icon = this.querySelector('i');
      if (type === 'text') {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        icon.classList.remove('text-muted');
        icon.classList.add('text-cyan');
      } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        icon.classList.remove('text-cyan');
        icon.classList.add('text-muted');
      }
    });
  }

  // 2. Validate and Handle Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value.trim();
      const password = passwordInput.value;

      if (username === '' || password === '') {
        alert('Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu!');
        return;
      }

      // Simulated Login Success
      alert('Đăng nhập thành công! Chào mừng quay trở lại cổng game MyE.');
      window.location.href = 'Trang_chu.html';
    });
  }

});
