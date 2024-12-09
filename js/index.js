document.addEventListener("DOMContentLoaded", () => {
  const sidebarContainer = document.getElementById("right-side-bar");

  // sidebar.html 로드
  fetch("./components/sidebar.html")
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failed to load sidebar.html");
          }
          return response.text();
      })
      .then((html) => {
          sidebarContainer.innerHTML = html;
      })
      .catch((error) => {
          console.error("Error loading sidebar:", error);
      });
});

// 피드 슬라이더 스크립트
const swiper = document.querySelector('.carousel_wrapper');
const prevButtons = document.querySelectorAll('.carousel_prev');
const nextButtons = document.querySelectorAll('.carousel_next');
const bullets = document.querySelectorAll('.carousel_circle');

let currentSlide = 0;

function showSlide(slideIndex) {
    swiper.style.transform = `translateX(-${slideIndex * 470}px)`;
    currentSlide = slideIndex;

    bullets.forEach((bullet, index) => {
        if (index === currentSlide) {
            bullet.classList.add('active');
        } else {
            bullet.classList.remove('active');
        }
    });
}

prevButtons.forEach((prevButton) => {
    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    });
});

nextButtons.forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
        if (currentSlide < 3) {
            showSlide(currentSlide + 1);
        }
    });
});

bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
        showSlide(index);
    });
});

showSlide(0);