/* ==========================================
   MyE Website - Dang Ky (Register) JS Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

  // 1. Toggle Password Visibility
  const toggleBtn = document.getElementById('toggle-reg-password');
  const passwordInput = document.getElementById('reg-password');

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', function () {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

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

  // 2. Password Strength Meter
  if (passwordInput) {
    // Inject strength indicator below password field
    const wrapper = passwordInput.closest('.position-relative') || passwordInput.parentElement;
    const strengthHTML = `
      <div class="password-strength">
        <div class="password-strength-bar" id="strength-bar"></div>
      </div>
      <div class="password-strength-text text-muted" id="strength-text"></div>
    `;
    wrapper.insertAdjacentHTML('afterend', strengthHTML);

    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    passwordInput.addEventListener('input', function () {
      const val = this.value;
      let score = 0;

      if (val.length >= 6) score++;
      if (val.length >= 10) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      strengthBar.classList.remove('weak', 'medium', 'strong');
      if (val.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
      } else if (score <= 2) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Yếu';
        strengthText.style.color = '#ef4444';
      } else if (score <= 3) {
        strengthBar.classList.add('medium');
        strengthText.textContent = 'Trung bình';
        strengthText.style.color = '#f59e0b';
      } else {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Mạnh';
        strengthText.style.color = '#22c55e';
      }
    });
  }

  // 3. Validate and Handle Register Form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('reg-username').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = passwordInput ? passwordInput.value : '';
      const confirmPassword = document.getElementById('confirm-password').value;
      const agreeTerms = document.getElementById('agree-terms');

      // Basic validations
      if (username === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Vui lòng điền đầy đủ tất cả các trường!');
        return;
      }

      // Username: no spaces, no Vietnamese diacritics
      if (/\s/.test(username) || /[àáạảãăắằẳẵặâấầẩẫậèéẹẻẽêếềểễệìíịỉĩòóọỏõôốồổỗộơớờởỡợùúụủũưứừửữựỳýỵỷỹđ]/i.test(username)) {
        alert('Tên tài khoản phải viết liền, không dấu tiếng Việt!');
        return;
      }

      // Email basic validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Địa chỉ email không hợp lệ!');
        return;
      }

      // Password length
      if (password.length < 6) {
        alert('Mật khẩu phải có tối thiểu 6 ký tự!');
        return;
      }

      // Confirm password match
      if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp! Vui lòng nhập lại.');
        return;
      }

      // Terms agreement
      if (agreeTerms && !agreeTerms.checked) {
        alert('Bạn cần đồng ý với Điều khoản sử dụng dịch vụ để tiếp tục.');
        return;
      }

      // Simulated Registration Success
      alert('Đăng ký tài khoản thành công! Chào mừng bạn đến với MyE Portal. 🎮');
      window.location.href = 'Dang_nhap.html';
    });
  }

});
