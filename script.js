let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const sliderContainer = document.querySelector('.slider-container');

function showSlide(index, direction) {
  slides.forEach(slide => {
    slide.classList.remove('active', 'prev');
  });

  slides[index].classList.add('active');

  if (direction === 'prev' && index < currentSlide) {
    slides[currentSlide].classList.add('prev');
  }
}

function nextSlide() {
  const previousSlide = currentSlide;
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide, 'next');
}

function prevSlide() {
  const previousSlide = currentSlide;
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide, 'prev');
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// 自动播放
let autoSlide = setInterval(nextSlide, 3000);

// 鼠标悬停暂停
sliderContainer.addEventListener('mouseover', () => clearInterval(autoSlide));
sliderContainer.addEventListener('mouseout', () => {
  autoSlide = setInterval(nextSlide, 3000);
});

// 触摸滑动支持
let touchStartY = 0;
let touchEndY = 0;

sliderContainer.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

sliderContainer.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchEndY - touchStartY;

  // 向上滑动（下一张）
  if (deltaY < -50) {
    nextSlide();
  }
  // 向下滑动（上一张）
  else if (deltaY > 50) {
    prevSlide();
  }
});

// 初始显示第一张
showSlide(currentSlide, 'next');