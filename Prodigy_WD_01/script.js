document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initApp();
});

const initApp = () => {
    // Initialize components
    initParticles();
    initPreloader();
    initCustomCursor();
    initNavigation();
    initHeroAnimations();
    initScrollEffects();
    initPortfolioFilter();
    initThemeToggle();
    initTestimonialSlider();
    initFAQAccordion();
    initContactForm();
    initStatsCounter();
    initBackToTop();
    initAnimations();
};

// ==================== COMPONENT INITIALIZERS ====================

/**
 * Particle.js Background Initialization
 */
const initParticles = () => {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6c5ce7"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6c5ce7",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
};

/**
 * Preloader Initialization
 */
const initPreloader = () => {
    const preloader = document.querySelector('.preloader');
    
    // Simulate loading (in real project, wait for assets to load)
    const simulateLoading = () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 2000);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
        preloader.style.display = 'none';
    } else {
        window.addEventListener('load', simulateLoading);
        // Fallback in case load event doesn't fire
        setTimeout(simulateLoading, 3000);
    }
};

/**
 * Custom Cursor Initialization
 */
const initCustomCursor = () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        cursorOutline.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 500, fill: 'forwards' });
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = [
        ...document.querySelectorAll('a'),
        ...document.querySelectorAll('button'),
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.portfolio-item'),
        ...document.querySelectorAll('.testimonial-card')
    ];
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
            cursorOutline.style.borderColor = 'var(--primary-color)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
            cursorOutline.style.borderColor = 'var(--primary-color)';
        });
    });
};

/**
 * Navigation Initialization
 */
const initNavigation = () => {
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const links = document.querySelectorAll('.nav-link');
    const heroHeight = document.querySelector('.hero').offsetHeight;

    // Toggle mobile menu
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    // Close mobile menu when clicking a link
    const closeMenu = () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    // Handle scroll effects on navigation
    const handleScroll = () => {
        if (window.scrollY > heroHeight - 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    // Initialize event listeners
    menuToggle.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load
};

/**
 * Hero Animations Initialization
 */
const initHeroAnimations = () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroImage = document.querySelector('.hero-image');
    
    if (!heroTitle || !heroImage) return;
    
    // Animate hero title words
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        word.style.animationDelay = `${index * 0.2 + 0.3}s`;
    });
    
    // Parallax effect for hero image
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });
};

/**
 * Scroll Effects Initialization
 */
const initScrollEffects = () => {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-link');
    
    // Highlight active section in navigation
    const highlightActiveSection = () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Run once on load
};

/**
 * Portfolio Filter Initialization
 */
const initPortfolioFilter = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    const filterPortfolio = (filterValue) => {
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    };
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterPortfolio(button.getAttribute('data-filter'));
        });
    });
};

/**
 * Theme Toggle Initialization
 */
const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const setTheme = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    };
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setTheme(true);
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        setTheme(!document.body.classList.contains('dark-mode'));
    });
};

/**
 * Testimonial Slider Initialization
 */
const initTestimonialSlider = () => {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const testimonialSwiper = new Swiper('.testimonials-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            }
        }
    });
};

/**
 * FAQ Accordion Initialization
 */
const initFAQAccordion = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    const toggleFAQItem = (item) => {
        const isActive = item.classList.contains('active');
        
        // Close all items first
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Open current item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    };
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => toggleFAQItem(item));
    });
};

/**
 * Contact Form Initialization
 */
const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const validations = {
        name: (value) => {
            if (!value) return { valid: false, message: 'Name is required' };
            return { valid: true };
        },
        email: (value) => {
            if (!value) return { valid: false, message: 'Email is required' };
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return { valid: false, message: 'Please enter a valid email' };
            }
            return { valid: true };
        },
        message: (value) => {
            if (!value) return { valid: false, message: 'Message is required' };
            return { valid: true };
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Validate all fields
        Object.keys(validations).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = field.nextElementSibling;
            const validation = validations[fieldName](field.value.trim());
            
            if (!validation.valid) {
                errorElement.textContent = validation.message;
                isValid = false;
            } else {
                errorElement.textContent = '';
            }
        });
        
        // Submit form if valid
        if (isValid) {
            const formSuccess = document.getElementById('formSuccess');
            formSuccess.style.display = 'flex';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
            
            // In a real app, you would send the form data to a server here
            console.log('Form submitted successfully!');
        }
    };
    
    // Initialize event listeners
    contactForm.addEventListener('submit', handleSubmit);
    
    // Add input event listeners for real-time validation
    Object.keys(validations).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('input', () => {
                const errorElement = field.nextElementSibling;
                const validation = validations[fieldName](field.value.trim());
                errorElement.textContent = validation.valid ? '' : validation.message;
            });
        }
    });
};

/**
 * Stats Counter Initialization
 */
const initStatsCounter = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;
    
    const animateStats = () => {
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000; // Animation duration in ms
                const startTime = performance.now();
                
                const updateCount = (timestamp) => {
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const value = Math.floor(progress * target);
                    
                    stat.textContent = value;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                requestAnimationFrame(updateCount);
            });
            
            // Remove event listener after animation
            window.removeEventListener('scroll', checkStatsVisibility);
        }
    };
    
    const checkStatsVisibility = () => {
        animateStats();
    };
    
    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
};

/**
 * Back to Top Button Initialization
 */
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    window.addEventListener('scroll', toggleVisibility);
    backToTopBtn.addEventListener('click', scrollToTop);
    toggleVisibility(); // Initial check
};

/**
 * Animations Initialization
 */
const initAnimations = () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .info-card, .testimonial-card'
    );
    
    if (!animatedElements.length) return;
    
    // Animate elements when they come into view
    const animateElements = () => {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.5s ease';
        observer.observe(element);
    });
    
    // Initial check
    animateElements();
};

// Initialize the app
initApp();