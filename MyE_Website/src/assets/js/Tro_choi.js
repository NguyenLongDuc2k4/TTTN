/* ==========================================
   MyE Website - Tro Choi page JS Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
  
  const filterButtons = document.querySelectorAll('#games-filter-tabs .filter-tab-btn');
  const gameCards = document.querySelectorAll('#games-grid-container .game-item-card');
  const searchInput = document.getElementById('game-search-input');

  let currentGenre = 'all';
  let searchQuery = '';

  // 1. Filtering by Genre
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      currentGenre = this.getAttribute('data-genre').toLowerCase();
      applyFilters();
    });
  });

  // 2. Searching by Name
  searchInput.addEventListener('input', function () {
    searchQuery = this.value.trim().toLowerCase();
    applyFilters();
  });

  // 3. Combined Filter Engine
  function applyFilters() {
    gameCards.forEach(card => {
      const cardGenre = card.getAttribute('data-genre').toLowerCase();
      const cardTitle = card.querySelector('h4').textContent.toLowerCase();
      const cardDesc = card.querySelector('p').textContent.toLowerCase();

      const matchesGenre = (currentGenre === 'all' || cardGenre === currentGenre);
      const matchesSearch = (searchQuery === '' || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery));

      if (matchesGenre && matchesSearch) {
        card.classList.remove('d-none');
      } else {
        card.classList.add('d-none');
      }
    });
  }

});
