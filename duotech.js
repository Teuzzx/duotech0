// DUOTECH - Scripts e Interatividade

// ===== CONFIGURAÇÕES INICIAIS =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeFAQ();
    initializeAnimations();
    initializeLazyLoading();
});

// ===== NAVEGAÇÃO =====
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle menu mobile
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scroll para links internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Altura do navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Destacar link ativo na navegação
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== EFEITOS DE SCROLL =====
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Parallax suave no hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ===== FAQ INTERATIVO =====
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Fechar todas as outras FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle da FAQ atual
            if (isActive) {
                faqItem.classList.remove('active');
            } else {
                faqItem.classList.add('active');
            }
        });
    });
}

// ===== ANIMAÇÕES DE SCROLL =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll(
        '.service-card, .resource-card, .project-card, .testimonial-card, .section-header'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== LAZY LOADING DE IMAGENS =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== UTILITÁRIOS =====

// Debounce para otimizar performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== VALIDAÇÃO DE FORMULÁRIO (se necessário no futuro) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\(\)0-9\s\-\+]+$/;
    return re.test(phone) && phone.length >= 10;
}

// ===== ANALYTICS E TRACKING (se necessário) =====
function trackEvent(eventName, properties = {}) {
    // Implementar tracking analytics aqui
    console.log('Event tracked:', eventName, properties);
}

// Track clicks em CTAs
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('CTA Click', {
            button_text: e.target.textContent,
            page_section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Preload de recursos críticos
function preloadCriticalResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
function improveAccessibility() {
    // Adicionar skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.left = '-9999px';
    
    skipLink.addEventListener('focus', function() {
        this.style.left = '6px';
        this.style.top = '7px';
        this.style.zIndex = '999999';
        this.style.background = '#000';
        this.style.color = '#fff';
        this.style.padding = '8px 16px';
        this.style.borderRadius = '4px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Melhorar foco para keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ===== INICIALIZAÇÃO FINAL =====
window.addEventListener('load', function() {
    preloadCriticalResources();
    improveAccessibility();
    
    // Remove loading states
    document.body.classList.remove('loading');
    
    // Trigger de animações iniciais
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('animate-fade-in');
    }, 300);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Implementar error tracking aqui se necessário
});

// ===== SERVICE WORKER (Progressive Web App) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}