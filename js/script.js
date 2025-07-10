//  search bar

const searchIcon = document.getElementById("searchIcon");
const searchBox = document.getElementById("searchBox");

searchIcon.addEventListener("click", () => {
  // Toggle visibility
  if (searchBox.style.display === "none" || searchBox.style.display === "") {
    searchBox.style.display = "block";
  } else {
    searchBox.style.display = "none";
  }
});

// perfume_flavoure area_image // circle dots

const wrapper = document.getElementById("circleWrapper");
const totalDots = 9;

// Clear any existing generated dots

wrapper.querySelectorAll(".dot").forEach((dot) => dot.remove());

const radius = wrapper.offsetWidth / 2;

for (let i = 0; i < totalDots; i++) {
  const angle = (2 * Math.PI * i) / totalDots;
  const x = radius + radius * Math.cos(angle);
  const y = radius + radius * Math.sin(angle);

  const dot = document.createElement("div");
  dot.className = "dot";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;

  wrapper.appendChild(dot);
}

// perfume gallery slide area

const images = [
  "assets/image/spray_btl2.png",
  "assets/image/spray4.jpg",
  "assets/image/spray1.jpg",
  "assets/image/spray3.jpg",
];
let currentIndex = 0;
let autoSlide;

function showImage(index) {
  const sliderImage = document.getElementById("sliderImage");
  const dots = document.querySelectorAll(".dotss");

  if (index >= images.length) currentIndex = 0;
  else if (index < 0) currentIndex = images.length - 1;
  else currentIndex = index;

  sliderImage.src = images[currentIndex];

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function prevImage() {
  showImage(currentIndex - 1);
  resetAutoSlide();
}

function nextImage() {
  showImage(currentIndex + 1);
  resetAutoSlide();
}

function goToImage(index) {
  showImage(index);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    nextImage();
  }, 3000); // 3 seconds
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// Start everything
showImage(currentIndex);
startAutoSlide();

// add to cart area
// ✅ Highlight selected subscription box
document.querySelectorAll('input[name="plan"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    // Remove 'active' class from all boxes
    document.querySelectorAll(".subscription-box").forEach((box) => {
      box.classList.remove("active");
    });

    // Add 'active' to selected
    const selected = radio.closest(".subscription-box");
    if (selected) {
      selected.classList.add("active");
    }

    // Show related details box only
    const id = radio.getAttribute("data-id");
    document.querySelectorAll(".details").forEach((div) => {
      div.style.display = div.id === id ? "block" : "none";
    });
  });
});

// ✅ Add to Cart Function
function addToCart() {
  const planSelected = document.querySelector('input[name="plan"]:checked');
  const cartList = document.getElementById("cartItems");

  if (!planSelected) {
    const warningItem = document.createElement("li");
    warningItem.style.color = "red";
    warningItem.textContent = "❗ Please select a subscription plan.";
    cartList.appendChild(warningItem);
    return;
  }

  const planId = planSelected.getAttribute("data-id");
  let fragrance1, fragrance2;
  let error = "";

  if (planId === "single") {
    const singleFragrance = document.querySelector(
      'input[name="fragrance"]:checked'
    );
    if (!singleFragrance) {
      error = "❗ Please select a fragrance for Single Subscription.";
    } else {
      fragrance1 = singleFragrance.value;
    }
  } else if (planId === "double" || planId === "try") {
    fragrance1 = document.querySelector('input[name="fragrance1"]:checked');
    fragrance2 = document.querySelector('input[name="fragrance2"]:checked');
    if (!fragrance1 || !fragrance2) {
      error = `❗ Please select both Fragrance 1 and Fragrance 2 for ${
        planId === "double" ? "Double Subscription" : "Try Once"
      }.`;
    } else {
      fragrance1 = fragrance1.value;
      fragrance2 = fragrance2.value;
    }
  }

  if (error) {
    const warningItem = document.createElement("li");
    warningItem.style.color = "red";
    warningItem.textContent = error;
    cartList.appendChild(warningItem);
    return;
  }

  // ✅ Add item to cart
  const item = document.createElement("li");
  item.innerHTML = `
    <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 8px;">
      <p><strong>📦 Plan:</strong> ${planSelected.value}</p>
      ${
        fragrance1
          ? `<p><strong>🌸 Fragrance 1:</strong> ${fragrance1}</p>`
          : ""
      }
      ${
        fragrance2
          ? `<p><strong>🌼 Fragrance 2:</strong> ${fragrance2}</p>`
          : ""
      }
      <button class="delete-btn" onclick="this.parentElement.parentElement.remove()">❌</button>
    </div>
  `;
  cartList.appendChild(item);
}

// our collection area

const allDetails = document.querySelectorAll(".text-area-container details");

allDetails.forEach((targetDetail) => {
  targetDetail.addEventListener("toggle", () => {
    if (targetDetail.open) {
      allDetails.forEach((detail) => {
        if (detail !== targetDetail && detail.open) {
          detail.removeAttribute("open");
        }
      });
    }
  });
});

//gallery area our collection

const gtgImagePaths = [
  "assets/image/spray7.jpg",
  "assets/image/spray1.jpg",
  "assets/image/spray2.jpg",
  "assets/image/spray3.jpg",
];

let gtgCurrentIndex = 0;
const gtgSliderImg = document.getElementById("gtg-main-image");
const gtgDots = document.querySelectorAll(".gtg-dot");

function gtgUpdateImage(index) {
  gtgCurrentIndex = index;
  gtgSliderImg.src = gtgImagePaths[gtgCurrentIndex];

  // Update active dot
  gtgDots.forEach((dot, i) => {
    dot.classList.toggle("gtg-active", i === index);
  });
}

function gtgShowPrevImage() {
  gtgCurrentIndex =
    (gtgCurrentIndex - 1 + gtgImagePaths.length) % gtgImagePaths.length;
  gtgUpdateImage(gtgCurrentIndex);
}

function gtgShowNextImage() {
  gtgCurrentIndex = (gtgCurrentIndex + 1) % gtgImagePaths.length;
  gtgUpdateImage(gtgCurrentIndex);
}

function gtgJumpToImage(index) {
  gtgUpdateImage(index);
}

// Initialize
gtgUpdateImage(gtgCurrentIndex);

// ✅ Auto-slide every 3 seconds
setInterval(gtgShowNextImage, 3000);

// GTG Percentage Counter Script
document.addEventListener("DOMContentLoaded", () => {
  const gtgcountNumbers = document.querySelectorAll(".gtgcount-number");
  let hasStarted = false;

  function startCounting() {
    gtgcountNumbers.forEach((counter) => {
      const updateGTGCount = () => {
        const target = +counter.getAttribute("data-gtgcount");
        const current = +counter.innerText.replace("%", "");
        const increment = Math.ceil(target / 50);

        if (current < target) {
          counter.innerText = `${Math.min(current + increment, target)}%`;
          setTimeout(updateGTGCount, 30);
        }
      };
      updateGTGCount();
    });
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true; // Run once only
          startCounting();
          obs.disconnect(); // Optional: stop observing once triggered
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the section is visible
    }
  );

  const targetSection = document.querySelector(".gtgcount-section");
  if (targetSection) {
    observer.observe(targetSection);
  }
});

// customer reviews area
let revwIndex = 0;
const revwTrack = document.getElementById("revwTrackElem");
const revwCards = document.querySelectorAll(".revwCard_337");
const revwCardWidth = revwCards[0].offsetWidth + 20;
const revwVisible = 3;
const revwTotalPages = Math.ceil(revwCards.length / revwVisible);
const revwDotsContainer = document.getElementById("revwDotsElem");

// Create dots
for (let i = 0; i < revwTotalPages; i++) {
  const dot = document.createElement("span");
  dot.classList.add("revwDot_991");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    revwIndex = i;
    updateRevwSlider();
  });
  revwDotsContainer.appendChild(dot);
}

function updateRevwSlider() {
  revwTrack.style.transform = `translateX(-${
    revwIndex * revwCardWidth * revwVisible
  }px)`;
  document.querySelectorAll(".revwDot_991").forEach((dot, i) => {
    dot.classList.toggle("active", i === revwIndex);
  });
}

function moveRevwSlide(direction) {
  revwIndex += direction;
  if (revwIndex < 0) revwIndex = 0;
  if (revwIndex >= revwTotalPages) revwIndex = revwTotalPages - 1;
  updateRevwSlider();
}

// Auto-slide
setInterval(() => {
  revwIndex = (revwIndex + 1) % revwTotalPages;
  updateRevwSlider();
}, 4000);

// FAQs

const gtgFaqItems = document.querySelectorAll(".gtgFaq-item");

gtgFaqItems.forEach((item) => {
  item.addEventListener("click", () => {
    gtgFaqItems.forEach((i) => {
      if (i !== item) i.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

// scroll animation

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // remove if you want one-time animation
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document
  .querySelectorAll(".scroll-reveal")
  .forEach((el) => observer.observe(el));

// image animation
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll('.lazy-image');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, {
    threshold: 0.1
  });

  lazyImages.forEach(img => {
    observer.observe(img);
  });
});

// mobile/tablet menu 

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  hamburger.addEventListener("click", () => {
    const isVisible = window.getComputedStyle(mobileNav).display !== "none";
    mobileNav.style.display = isVisible ? "none" : "flex";
  });
});


