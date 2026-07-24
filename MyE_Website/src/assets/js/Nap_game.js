/* ==========================================
   MyE Website - Nap Game page Javascript Actions
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Select Game Handlers
  const gameBoxes = document.querySelectorAll('#game-select-group .select-box');
  const displayGameInput = document.getElementById('display-game');

  gameBoxes.forEach(box => {
    box.addEventListener('click', function () {
      gameBoxes.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const gameLabel = this.querySelector('.select-box-label').textContent;
      displayGameInput.value = gameLabel;
    });
  });

  // 2. Select Payment Method Handlers
  const methodCards = document.querySelectorAll('#method-select-group .method-card');
  let currentPromo = 20; // default MoMo has 20%

  methodCards.forEach(card => {
    card.addEventListener('click', function () {
      methodCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      currentPromo = parseInt(this.getAttribute('data-promo')) || 0;
      calculateTopup();
    });
  });

  // 3. Select Package Handlers
  const packageCards = document.querySelectorAll('#package-select-group .package-card');
  let selectedBaseCoin = 20; // default selected
  let selectedPrice = 20000;  // default selected

  packageCards.forEach(card => {
    card.addEventListener('click', function () {
      packageCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      selectedBaseCoin = parseInt(this.getAttribute('data-coin')) || 0;
      selectedPrice = parseInt(this.getAttribute('data-price')) || 0;
      calculateTopup();
    });
  });

  // 4. Calculate Final Topup Coin & Amount
  const displayPayment = document.getElementById('display-payment');
  const displayTotalCoin = document.getElementById('display-total-coin');

  function calculateTopup() {
    // Format payment amount
    const formattedPrice = selectedPrice.toLocaleString('vi-VN') + ' VNĐ';
    displayPayment.textContent = formattedPrice;

    // Calculate coin with promotion
    const extraCoin = Math.floor(selectedBaseCoin * (currentPromo / 100));
    const totalCoin = selectedBaseCoin + extraCoin;

    // Build inner HTML for display
    let coinHtml = `${totalCoin.toLocaleString('vi-VN')} Coin`;
    if (currentPromo > 0) {
      coinHtml += ` <span class="small fs-6 text-success">(+${currentPromo}%)</span>`;
    }
    displayTotalCoin.innerHTML = coinHtml;
  }

  // Run initial calculation
  calculateTopup();

  // 5. Confirm Topup Button Handler
  const btnConfirm = document.getElementById('btn-confirm-topup');
  const targetAccountInput = document.getElementById('target-account');

  btnConfirm.addEventListener('click', function () {
    const targetAccount = targetAccountInput.value.trim();
    if (!targetAccount) {
      alert('Vui lòng nhập tên tài khoản nhận!');
      targetAccountInput.focus();
      return;
    }

    const game = displayGameInput.value;
    const payment = document.querySelector('#method-select-group .method-card.active .method-name').textContent;
    const finalAmount = displayPayment.textContent;
    const finalCoin = displayTotalCoin.textContent.split(' ')[0];

    const confirmMsg = `Bạn muốn xác nhận giao dịch sau?\n\n` +
                       `- Tài khoản nhận: ${targetAccount}\n` +
                       `- Dịch vụ: ${game}\n` +
                       `- Hình thức: ${payment}\n` +
                       `- Số tiền thanh toán: ${finalAmount}\n` +
                       `- Số Coin nhận được: ${finalCoin} Coin\n\n` +
                       `Nhấp OK để tiến hành thanh toán tự động!`;

    if (confirm(confirmMsg)) {
      alert('Giao dịch đang được xử lý! Hệ thống sẽ cộng Coin vào tài khoản của bạn trong 30 giây.');
      // Update transaction table mock
      const tbody = document.querySelector('table tbody');
      const newRowHtml = `
        <tr>
          <td class="small fw-bold">#MYE${Math.floor(1000 + Math.random() * 9000)}</td>
          <td class="small">Nạp ${finalCoin} MyE Coin</td>
          <td class="small text-white">${finalAmount.replace(' VNĐ', 'đ')}</td>
          <td><span class="badge bg-warning bg-opacity-75 text-dark">Đang xử lý</span></td>
        </tr>
      `;
      tbody.insertAdjacentHTML('afterbegin', newRowHtml);
    }
  });

});
