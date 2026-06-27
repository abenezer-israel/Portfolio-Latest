// Theme toggle and mobile menu
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const themeToggle = document.getElementById('themeToggle');

const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;

    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#020617' : '#ffffff');
    }
};

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('portfolio-theme', currentTheme);
        applyTheme(currentTheme);
    });
}

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            mainNav.classList.remove('active');
        }
    });
});

// Contact form submission through FormSubmit
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('formToast');
let toastTimer;

function showToast(type, message) {
    if (!toast) return;

    const title = toast.querySelector('.toast-title');
    const msg = toast.querySelector('.toast-message');
    const icon = toast.querySelector('.toast-icon i');

    toast.classList.remove('show', 'success', 'error');
    toast.classList.add(type, 'show');
    toast.setAttribute('aria-hidden', 'false');

    if (title) {
        title.textContent = type === 'success' ? 'Message Sent' : 'Submission Failed';
    }

    if (msg) {
        msg.textContent = message;
    }

    if (icon) {
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    }

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
        toast.setAttribute('aria-hidden', 'true');
    }, 4200);
}

if (contactForm && toast) {
    const toastClose = toast.querySelector('.toast-close');
    if (toastClose) {
        toastClose.addEventListener('click', () => {
            toast.classList.remove('show');
            toast.setAttribute('aria-hidden', 'true');
            clearTimeout(toastTimer);
        });
    }

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.textContent : 'Send Message';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showToast('success', 'Thank you! Your message has been sent successfully. I will get back to you shortly.');
                contactForm.reset();
            } else {
                throw new Error('Unable to send your message right now.');
            }
        } catch (error) {
            showToast('error', 'Sorry, your message could not be sent right now. Please email me directly at abenezerisrael23@gmail.com.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Reveal elements with emotional scroll motion
const revealSelectors = [
    '.hero-image',
    '.hero-content > h1',
    '.hero-content > p',
    '.hero-btns',
    '.about-text',
    '.about-image',
    '.skill-category',
    '.service-card',
    '.project-card',
    '.rating-item',
    '.contact-item',
    '.contact-form'
];

revealSelectors.forEach((selector, sectionIndex) => {
    document.querySelectorAll(selector).forEach((element, elementIndex) => {
        element.classList.add('reveal');
        if (selector !== '.contact-item') {
            element.classList.add('reveal-emotion');
        }
        const delay = sectionIndex * 70 + elementIndex * 35;
        element.dataset.revealDelay = delay;
        element.style.transitionDelay = `${delay}ms`;
    });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.classList.add('active');
            observer.unobserve(element);
        }
    });
}, {
    threshold: 0.25
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const skillBars = document.querySelectorAll('.skill-level');
skillBars.forEach(bar => {
    bar.dataset.targetWidth = bar.style.width || '0%';
    bar.style.width = '0';
});

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.dataset.targetWidth;
            observer.unobserve(bar);
        }
    });
}, {
    threshold: 0.4
});

skillBars.forEach(bar => skillObserver.observe(bar));