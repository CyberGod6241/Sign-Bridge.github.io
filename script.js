 document.addEventListener('DOMContentLoaded', function() {
  //loader//
  window.addEventListener('load', function(){
    const load = document.getElementById('load');
    if(load){
      // load.classList.add('fade-out');
      setTimeout(() => {
        load.style.display = 'none';
      }, 5000);
    }
  });
      // Mobile Menu Toggle
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      
      mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.innerHTML = mobileMenu.classList.contains('hidden') ? 
          '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
      });

      // FAQ Toggle
      const faqToggles = document.querySelectorAll('.faq-toggle');
      faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
          const content = this.nextElementSibling;
          const icon = this.querySelector('i');
          
          content.classList.toggle('hidden');
          icon.classList.toggle('rotate-180');
        });
      });

      // Theme Toggle
      const themeToggle = document.getElementById('theme-toggle');
      const html = document.documentElement;
      
      // Check for saved theme preference or use light as default
      const savedTheme = localStorage.getItem('theme') || 'light';
      html.classList.toggle('dark', savedTheme === 'dark');
      updateThemeIcon();
      
      themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon();
      });
      
      function updateThemeIcon() {
        const isDark = html.classList.contains('dark');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      }

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
              mobileMenu.classList.add('hidden');
              mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
          }
        });
      });
    });