document.addEventListener("DOMContentLoaded", () => {
//ia

  const aiBtn = document.getElementById("aiAssistantBtn");
  const aiChat = document.getElementById("aiChatBox");
  const aiClose = document.getElementById("aiClose");
  const aiSend = document.getElementById("aiSend");
  const aiInput = document.getElementById("aiUserInput");
  const aiMessages = document.getElementById("aiMessages");

  aiBtn.addEventListener("click", () => {
    aiChat.style.display = "block";
  });

  aiClose.addEventListener("click", () => {
    aiChat.style.display = "none";
  });

  aiSend.addEventListener("click", sendMessage);

  aiInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });

function sendMessage() {
  const userText = aiInput.value.trim();
  if (!userText) return;

  appendMessage("Tú", userText);
  aiInput.value = "";

  fetch("https://api.pawan.krd/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "pai-001",
      messages: [
        {
          role: "system",
          content: "Eres un asistente útil llamado EcoBot que responde en español."
        },
        {
          role: "user",
          content: userText
        }
      ]
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data && data.choices && data.choices[0]) {
        appendMessage("EcoBot", data.choices[0].message.content.trim());
      } else {
        appendMessage("EcoBot", "No recibí una respuesta válida.");
        console.warn("Respuesta inesperada:", data);
      }
    })
    .catch(err => {
      console.error("Error de red:", err);
      appendMessage("EcoBot", "Hubo un error de conexión con la IA.");
    });
}



  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    aiMessages.appendChild(msg);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }



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


    fetch('./js/products.json')
        .then(response => response.json())
        .then(products => {
            const randomProducts = getRandomProducts(products, 3);
            renderFeaturedProducts(randomProducts);
        })
        .catch(error => console.error('Error loading featured products:', error));
});

// Utility to get N random items from an array
function getRandomProducts(arr, n) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}
function renderFeaturedProducts(products) {
    const container = document.getElementById('featuredProducts');
    container.innerHTML = '';

    const discount = 0.10;
    const currentTime = Date.now();
    const discountEndTime = parseInt(localStorage.getItem("discountEndTime"));

    products.forEach(product => {
        const originalPrice = parseFloat(product.price);
        const isDiscountActive = currentTime < discountEndTime;
        const finalPrice = isDiscountActive
            ? (originalPrice * (1 - discount)).toFixed(2)
            : originalPrice.toFixed(2);

        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h3>${product.title}</h3>
                <div class="price">€${finalPrice}</div>
                <a href="products.html"><button class="btn primary">Buy Now</button></a>
            </div>
        `;

        container.appendChild(card);
    });
    
}
