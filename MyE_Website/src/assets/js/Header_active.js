/* ==========================================
   Header Active Link Auto-detector
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1).toLowerCase();

  const navLinks = document.querySelectorAll('.mye-navbar .nav-link');

  navLinks.forEach(link => {
    // Remove default active
    link.classList.remove('active');
    
    const linkHref = link.getAttribute('href');
    if (linkHref) {
      const linkPage = linkHref.substring(linkHref.lastIndexOf('/') + 1).toLowerCase();
      
      // If the current page name matches link page name, or defaults to Trang_chu.html for empty/slash
      if (pageName === linkPage || (pageName === '' && linkPage === 'trang_chu.html')) {
        link.classList.add('active');
      }
    }
  });
});
