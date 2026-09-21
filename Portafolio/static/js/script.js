document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Desplazamiento Suave (Smooth Scroll) ---
    window.scrollToId = function(id) {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- 2. Mascota Flotante e Interacción con Burbuja ---
    const mascot = document.getElementById('mascot');
    const mascotBubble = document.getElementById('mascotBubble');
    
    const mascotMessages = [
        "¡Hola! Bienvenido a mi portafolio 🎮",
        "¿Sabías que me apasionan los juegos RPG?",
        "¡Haz clic en mis proyectos para ver detalles!",
        "¡Puedes cambiar el tema visual con el botón de arriba!"
    ];
    let messageIndex = 0;

    if (mascot) {
        mascot.addEventListener('click', () => {
            mascotBubble.textContent = mascotMessages[messageIndex];
            mascotBubble.classList.add('is-visible');
            
            messageIndex = (messageIndex + 1) % mascotMessages.length;

            setTimeout(() => {
                mascotBubble.classList.remove('is-visible');
            }, 3500);
        });
    }

    // --- 3. Filtro Dinámico de Proyectos ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('is-active'));
            button.classList.add('is-active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 4. Modal / Ventana Emergente para Detalles ---
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.getElementById('modalClose');

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevenir apertura si se hace clic dentro del video o links
            if (e.target.tagName === 'VIDEO' || e.target.tagName === 'A' || e.target.tagName === 'SOURCE') return;

            const title = card.querySelector('.project-card__title').textContent;
            const description = card.querySelector('.project-card__description').textContent;

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modal.classList.add('is-open');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => modal.classList.remove('is-open'));
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('is-open');
    });

    // --- 5. Cambio de Tema (Modo Claro / Oscuro) ---
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggleBtn.textContent = isLight ? '☀️ MODO CLARO' : '🌙 MODO OSCURO';
        });
    }

    // --- 6. Formulario Interactivo de Contacto ---
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formFeedback.textContent = "¡Mensaje enviado con éxito! Me pondré en contacto pronto. 🚀";
            formFeedback.classList.add('success-message');
            contactForm.reset();
        });
    }

    // --- 7. Contador de Experiencia / Proyectos ---
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });


    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('esta-visible');
                entrada.target.classList.remove('oculto-inicial');
            }
        });
    }, { 
        threshold: 0.05 
    });

    document.querySelectorAll('.animar-al-scroll').forEach(el => {
        el.classList.add('oculto-inicial');
        observador.observe(el);
    });})