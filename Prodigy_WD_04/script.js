// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Dark/Light Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Check user's preferred color scheme
setTheme(prefersDarkScheme.matches);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
});

// Check for saved user preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode !== null) {
    setTheme(savedDarkMode === 'true');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Projects data
const projects = [
    {
        title: "E-commerce Website",
        description: "A fully responsive e-commerce platform with product filtering, cart functionality, and secure checkout.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        image: "images/project1.png",
        codeLink: "https://github.com/Sivarammorla75/Brainwave_Matrix_Intern/tree/a8ab9d087db7c14392b31122cacf1f52fe45b67f/E-commerce",
        category: "fullstack"
    },
    {
        title: "Task Management App",
        description: "A productivity application for managing tasks with drag-and-drop functionality and team collaboration features.",
        technologies: ["React", "Firebase", "Material UI", "Redux"],
        image: "images/project2.jpeg",
        codeLink: "#",
        category: "frontend"
    },
    {
        title: "Weather Dashboard",
        description: "Real-time weather application with 5-day forecast, location search, and interactive maps.",
        technologies: ["JavaScript", "OpenWeather API", "Chart.js", "Geolocation API"],
        image: "images/project3.png",
        codeLink: "#",
        category: "frontend"
    },
    {
        title: "Recipe Finder",
        description: "Search engine for recipes with filtering by dietary restrictions, ingredients, and cooking time.",
        technologies: ["React", "Edamam API", "Tailwind CSS", "Context API"],
        image: "images/project4.png",
        codeLink: "#",
        category: "frontend"
    },
    {
        title: "Fitness Tracker",
        description: "Application for tracking workouts, nutrition, and progress with data visualization.",
        technologies: ["Vue.js", "Express", "MongoDB", "D3.js"],
        image: "images/project5.jpeg",
        codeLink: "#",
        category: "fullstack"
    },
    {
        title: "Portfolio Website",
        description: "A responsive portfolio website to showcase projects and skills (this website).",
        technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
        image: ".//images/project6.png",
        codeLink: "https://github.com/Sivarammorla75/CodeAlpha_Task/tree/1c9608c3bf5f8287aff16bb09d83f3ba18641de7/My-Portfolio",
        category: "frontend"
    }
];

// Render projects
function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.category = project.category;
        projectCard.setAttribute('data-aos', 'fade-up');
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.codeLink}" target="_blank" aria-label="View Code"><i class="fab fa-github"></i> View Code</a>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        const projectCards = document.querySelectorAll('.project-card');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize Testimonials Swiper
const testimonialSwiper = new Swiper('.testimonials-container', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Form Validation
const contactForm = document.getElementById('contact-form');

function validateForm() {
    let isValid = true;
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    
    // Reset error states
    contactForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    // Validate name
    if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('error');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('error');
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

// Enhanced Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const loading = document.createElement('div');
    loading.className = 'loading active';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    try {
        // Simulate form submission (replace with actual fetch in production)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Your message has been sent successfully!';
        contactForm.prepend(successMessage);
        successMessage.style.display = 'block';
        
        contactForm.reset();
        
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 3000);
    } catch (error) {
        alert('There was an error sending your message. Please try again later.');
    } finally {
        loading.classList.remove('active');
        setTimeout(() => {
            loading.remove();
        }, 300);
    }
});

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initScrollAnimations();
    
    // Add tooltips to skills
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = item.querySelector('span').textContent;
        item.appendChild(tooltip);
    });
    
    // Add hover effects to download button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('mouseenter', () => {
            downloadBtn.querySelector('i').style.transform = 'translateY(-3px)';
        });
        
        downloadBtn.addEventListener('mouseleave', () => {
            downloadBtn.querySelector('i').style.transform = 'translateY(0)';
        });
    }
});

// Handle responsive images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});