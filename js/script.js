window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    document.querySelector(".home-content").style.opacity = "1";
  }, 2500); // loader shows for 2.5 seconds
});
const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("musicToggle");

// Try to autoplay
function tryAutoplay() {
  music.play().then(() => {
    toggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }).catch(() => {
    // Retry on user interaction if autoplay was blocked
    document.addEventListener("click", forcePlay, { once: true });
    document.addEventListener("scroll", forcePlay, { once: true });
    document.addEventListener("mousemove", forcePlay, { once: true });
  });
}

function forcePlay() {
  music.play().then(() => {
    toggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  });
}

// Toggle manually
toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } else {
    music.pause();
    toggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  }
});

// Start attempt on page load
window.addEventListener("load", tryAutoplay);

  // ==================== Scroll-Based Header Hide/Show ====================
  let lastScrollTop = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      header.style.top = "-100px"; // hide
    } else {
      header.style.top = "0"; // show
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // ==================== Skill Category Filter ====================
  const buttons = document.querySelectorAll('.skill-categories button');
  const skillBoxes = document.querySelectorAll('.skill-box');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      skillBoxes.forEach(box => {
        box.style.display =
          filter === 'all' || box.classList.contains(filter) ? 'inline-block' : 'none';
      });
    });
  });

  // ==================== Carousel Logic ====================
  const carousel = document.getElementById('carousel');
  const wrapper = document.getElementById('carouselWrapper');
  const cards = Array.from(carousel.getElementsByClassName('project-card'));
  let currentIndex = 0;

  function updateCarousel() {
    cards.forEach((card, i) => {
      card.classList.remove('active');
      const offset = (i - currentIndex + cards.length) % cards.length;

      switch (offset) {
        case 0:
          card.style.transform = 'translateX(0) scale(1.2)';
          card.style.zIndex = 5;
          card.style.opacity = '1';
          card.classList.add('active');
          break;
        case 1:
          card.style.transform = 'translateX(280px) rotateY(-15deg)';
          card.style.zIndex = 3;
          card.style.opacity = '0.6';
          break;
        case 2:
          card.style.transform = 'translateX(500px) scale(0.9) rotateY(-25deg)';
          card.style.zIndex = 1;
          card.style.opacity = '0.3';
          break;
        case cards.length - 1:
          card.style.transform = 'translateX(-280px) rotateY(15deg)';
          card.style.zIndex = 3;
          card.style.opacity = '0.6';
          break;
        case cards.length - 2:
          card.style.transform = 'translateX(-500px) scale(0.9) rotateY(25deg)';
          card.style.zIndex = 1;
          card.style.opacity = '0.3';
          break;
        default:
          card.style.transform = 'translateX(0)';
          card.style.opacity = '0';
          card.style.zIndex = 0;
      }
    });
  }

  function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
    resetAutoScroll();
  }

  function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
    resetAutoScroll();
  }

  document.getElementById('nextBtn').addEventListener('click', nextCard);
  document.getElementById('prevBtn').addEventListener('click', prevCard);

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.getAttribute('data-link');
      if (link) window.open(link, '_blank');
    });
  });

  // Auto-scroll
  let autoScroll = setInterval(nextCard, 3000);

  function resetAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = setInterval(nextCard, 3000);
  }

  wrapper.addEventListener('mouseenter', () => clearInterval(autoScroll));
  wrapper.addEventListener('mouseleave', () => {
    autoScroll = setInterval(nextCard, 3000);
  });

  // Final init
  updateCarousel();
});
