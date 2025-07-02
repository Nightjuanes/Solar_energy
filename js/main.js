document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Add your newsletter subscription logic here
            alert('Thank you for subscribing!');
            this.reset();
        });
    }

    // Add to cart functionality
    const buyButtons = document.querySelectorAll('.btn.primary');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartCount = document.querySelector('.cart-count');
            if(cartCount) {
                cartCount.textContent = parseInt(cartCount.textContent) + 1;
            }
        });
    });

    // Animate on scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.product-card, .step-card, .benefit-card, .testimonial-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('reveal');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Login/Sign Up tab toggle logic
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginWelcome = document.getElementById('loginWelcome');
    const signupWelcome = document.getElementById('signupWelcome');

    if (loginTab && signupTab && loginForm && signupForm && loginWelcome && signupWelcome) {
        loginTab.addEventListener('click', function() {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.style.display = '';
            signupForm.style.display = 'none';
            loginWelcome.style.display = '';
            signupWelcome.style.display = 'none';
        });
        signupTab.addEventListener('click', function() {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.style.display = '';
            loginForm.style.display = 'none';
            signupWelcome.style.display = '';
            loginWelcome.style.display = 'none';
        });
    }

    // Handle login and signup form submissions (demo)
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login successful! (Demo)');
        });
    }
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Sign up successful! (Demo)');
        });
    }

    const signupLink = document.getElementById('signupLink');
    if (signupLink && signupTab) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            signupTab.click();
        });
    }
});
