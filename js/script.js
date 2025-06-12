window.addEventListener("DOMContentLoaded", () => {
    const circle = document.querySelector(".progress-ring__circle");
    const text = document.querySelector(".progress-text");
    const wave = document.getElementById("wave");
    const preloader = document.getElementById("preloader");
    const startSection = document.getElementById("start-section");
    const startBtn = document.getElementById("start-btn");

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference}`;

    let progress = 0;
    const updateProgress = () => {
      const offset = circumference - (progress / 100) * circumference;
      circle.style.strokeDashoffset = offset;
      text.textContent = `${progress}%`;
    };

    const interval = setInterval(() => {
      progress += 1;
      updateProgress();
      if (progress >= 100) {
        clearInterval(interval);
        wave.style.bottom = "0";
        setTimeout(() => {
          document.querySelector(".progress-wrapper").style.display = "none";
          startSection.style.visibility = "visible";
          startSection.style.opacity = 1;
        }, 1000);
      }
    }, 20);

    startBtn.addEventListener("click", () => {
      preloader.style.opacity = 0;
      preloader.style.pointerEvents = "none";
      document.body.style.overflow = "auto";
  });
});

let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // downscroll
    header.style.top = "-100px";
  } else {
    // upscroll
    header.style.top = "0";
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

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


const carousel = document.getElementById('carousel');
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

  // Auto-scroll logic with pause on hover
  let autoScroll = setInterval(nextCard, 3000);

  function resetAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = setInterval(nextCard, 3000);
  }

  const wrapper = document.getElementById('carouselWrapper');
  wrapper.addEventListener('mouseenter', () => clearInterval(autoScroll));
  wrapper.addEventListener('mouseleave', () => {
    autoScroll = setInterval(nextCard, 3000);
  });

  window.addEventListener('load', updateCarousel);