// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const desktopLinks = document.querySelectorAll('.nav-link');
    const logoText = document.getElementById('nav-logo');
    const mobileBtn = document.getElementById('mobile-btn');

    if (window.scrollY > 50) {
        navbar.classList.remove('bg-transparent');
        navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg');

        desktopLinks.forEach(link => {
            link.classList.remove('text-white', 'drop-shadow');
            link.classList.add('text-gray-700');
        });
        if (logoText) {
            logoText.classList.remove('text-white', 'drop-shadow-lg');
            logoText.classList.add('text-primary');
        }
        if (mobileBtn) {
            mobileBtn.classList.remove('text-white');
            mobileBtn.classList.add('text-gray-700');
        }
    } else {
        navbar.classList.add('bg-transparent');
        navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg');

        desktopLinks.forEach(link => {
            link.classList.add('text-white', 'drop-shadow');
            link.classList.remove('text-gray-700');
        });
        if (logoText) {
            logoText.classList.add('text-white', 'drop-shadow-lg');
            logoText.classList.remove('text-primary');
        }
        if (mobileBtn) {
            mobileBtn.classList.add('text-white');
            mobileBtn.classList.remove('text-gray-700');
        }
    }
});

// Animated Counters
function animateCounter(id, target, duration = 2000) {
    const element = document.getElementById(id);
    if (!element) return;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for Counters
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter('counter1', 150);
            animateCounter('counter2', 15);
            animateCounter('counter3', 50);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroSection = document.getElementById('hero');
if (heroSection) observer.observe(heroSection);

// Lightbox
window.addEventListener('load', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    window.openLightbox = function(src) {
        if (lightboxImg) lightboxImg.src = src;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    function cerrar() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', cerrar);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) cerrar();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') cerrar();
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
        }
    });
});

// Back to Top
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });
    backToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Contact Form (Async fetch para enviar a enviar.php)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const btn = document.getElementById('submitBtn');
        const successMsg = document.getElementById('successMessage');
        if (!btn || !successMsg) return;

        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                successMsg.classList.remove('hidden');
                contactForm.reset();
                setTimeout(() => successMsg.classList.add('hidden'), 6000);
            } else {
                alert('Hubo un error al enviar. Por favor intentá nuevamente.');
            }
        } catch (error) {
            alert('Error de conexión. Verificá tu internet e intentá de nuevo.');
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
}