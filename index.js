document.addEventListener("DOMContentLoaded", () => {
    const discount = 0.10;
    const duration = 7 * 24 * 60 * 60 * 1000;
    const prices = document.querySelectorAll(".price");
    const helpButton = document.getElementById("help-button");
    const helpBox = document.getElementById("helpBox");
    let helpTimer;
    let currentTime = Date.now();
    let discountEndTime = localStorage.getItem("discountEndTime");

    if (!discountEndTime) {
        discountEndTime = currentTime + duration;
        localStorage.setItem("discountEndTime", discountEndTime);
    } else {
        discountEndTime = parseInt(discountEndTime);
    }

    if (currentTime < discountEndTime) {
        prices.forEach(priceElement => {
            const originalPrice = parseFloat(priceElement.textContent.replace("€", ""));
            const discountedPrice = originalPrice * (1 - discount);
            priceElement.textContent = `€${discountedPrice.toFixed(2)}`;
        });
    } else {
        prices.forEach(priceElement => {
            const discountedPrice = parseFloat(priceElement.textContent.replace("€", ""));
            const originalPrice = discountedPrice / (1 - discount);
            priceElement.textContent = `€${originalPrice.toFixed(2)}`;
        });
    }

    function getSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'fall';
        return 'winter';
    }

    function updateHeroBackground() {
        const season = getSeason();
        const heroSection = document.querySelector('.hero');

        const seasonImages = {
            spring: 'url("../images/spring.jpg")',
            summer: 'url("../images/hero-b.jpg")',
            fall:   'url("../images/fall.jpg")',
            winter: 'url("../images/winter.jpg")'
        };

        heroSection.style.background = `
            linear-gradient(to right, rgba(47, 133, 90, 0.9), rgba(49, 151, 149, 0.9)),
            ${seasonImages[season]}
        `;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }

    updateHeroBackground(); 

    helpButton.addEventListener("click", () => {
       
        helpTimer = setTimeout(() => {
            helpBox.style.display = "block";
        }, 60000); // 60 seconds
    });
});
