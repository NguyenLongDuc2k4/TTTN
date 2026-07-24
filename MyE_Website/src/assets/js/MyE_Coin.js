/* ==========================================
   MyE Website - MyE Coin page JS Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Select Payment Method Handlers
  const methodBoxes = document.querySelectorAll('#coin-method-group .coin-method-box');
  let currentPromo = 20; // default active (MoMo is 20%)

  methodBoxes.forEach(box => {
    box.addEventListener('click', function () {
      methodBoxes.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      currentPromo = parseInt(this.getAttribute('data-promo')) || 0;
      calculateCoinTopup();
    });
  });

  // 2. Select Package Handlers
  const packageCards = document.querySelectorAll('#coin-package-group .package-card');
  let selectedBaseCoin = 20; // default active
  let selectedPrice = 20000;  // default active

  packageCards.forEach(card => {
    card.addEventListener('click', function () {
      packageCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      selectedBaseCoin = parseInt(this.getAttribute('data-coin')) || 0;
      selectedPrice = parseInt(this.getAttribute('data-price')) || 0;
      calculateCoinTopup();
    });
  });

  // 3. Calculation Logic
  const displayPayment = document.getElementById('coin-display-payment');
  const displayTotalCoin = document.getElementById('coin-display-total');

  function calculateCoinTopup() {
    // Format payment amount
    displayPayment.textContent = selectedPrice.toLocaleString('vi-VN') + ' VNĐ';

    // Calculate total coin with promotion
    const extraCoin = Math.floor(selectedBaseCoin * (currentPromo / 100));
    const totalCoin = selectedBaseCoin + extraCoin;

    // Build display text
    let coinHtml = `${totalCoin.toLocaleString('vi-VN')} Coin`;
    if (currentPromo > 0) {
      coinHtml += ` <span class="small fs-6 text-success">(+${currentPromo}%)</span>`;
    }
    displayTotalCoin.innerHTML = coinHtml;
  }

  // Initial Calculation
  calculateCoinTopup();

  // 4. Confirm Button Click Handler
  const btnConfirm = document.getElementById('btn-confirm-coin');

  btnConfirm.addEventListener('click', function () {
    const payment = document.querySelector('#coin-method-group .coin-method-box.active span').textContent;
    const finalAmount = displayPayment.textContent;
    const finalCoin = displayTotalCoin.textContent.split(' ')[0];

    const confirmMsg = `Bạn muốn mua gói Coin sau?\n\n` +
                       `- Cổng thanh toán: ${payment}\n` +
                       `- Số tiền cần nạp: ${finalAmount}\n` +
                       `- Số MyE Coin nhận được: ${finalCoin} Coin\n\n` +
                       `Nhấp OK để lấy thông tin thanh toán!`;

    if (confirm(confirmMsg)) {
      alert('Yêu cầu thanh toán đã được khởi tạo! Vui lòng hoàn thành chuyển khoản hoặc quét mã QR trên màn hình.');
    }
  });

});
