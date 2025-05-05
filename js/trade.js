document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const energyListingForm = document.getElementById('energyListingForm');
    if(energyListingForm) {
        energyListingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Energy listing submitted successfully!');
            this.reset();
        });
    }

    // Filter handling
    const filterSelects = document.querySelectorAll('.filter-group select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Add your filter logic here
            console.log('Filter changed:', this.value);
        });
    });

    // Buy Now button handling
    const buyButtons = document.querySelectorAll('.package-card .btn.primary');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add your purchase logic here
            alert('Proceeding to purchase...');
        });
    });

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.package-card, .step-card, .feature-card');
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            if(position.top < window.innerHeight - 100) {
                element.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});