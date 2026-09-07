

const navbar = document.querySelector('.gremlin-navbar');

  window.addEventListener('scroll', () => {
    // Si el usuario baja más de 50px, añade la clase .scrolled
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });