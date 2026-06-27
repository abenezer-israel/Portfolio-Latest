// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            mainNav.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
// The contact form is submitted via FormSubmit.co, so we allow the browser form submission.

// If you want a client-side notification instead, uncomment the lines below:
// const contactForm = document.getElementById('contactForm');
// contactForm.addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Thank you for your message! I will get back to you soon.');
//     contactForm.reset();
// });

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