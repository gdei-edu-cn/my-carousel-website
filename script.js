let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const sliderContainer = document.querySelector('.slider-container');
const introScreen = document.querySelector('.intro-screen');
const introButton = document.querySelector('.intro-button');

// 点击按钮显示图片页面并隐藏按钮
introButton.addEventListener('click', () => {
  introScreen.classList.add('hidden');
  sliderContainer.classList.remove('hidden');
  introButton.classList.add('hidden'); // 按钮消失
});

function showSlide(index, direction) {
  slides.forEach(slide => {
    slide.classList.remove('active', 'prev');
  });

  slides[index].classList.add('active');

  if (direction === 'prev') {
    if (index < currentSlide) {
      slides[currentSlide].classList.add('prev');
    }
  } else {
    if (index > currentSlide) {
      slides[currentSlide].style.transform = 'translateY(-20%) scale(0.95)';
      slides[currentSlide].style.opacity = '0';
    }
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide, 'next');
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide, 'prev');
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// 触摸滑动支持
let touchStartY = 0;
let touchEndY = 0;

sliderContainer.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

sliderContainer.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchEndY - touchStartY;

  if (deltaY < -50) {
    nextSlide();
  } else if (deltaY > 50) {
    prevSlide();
  }
});

// 初始显示第一张
showSlide(currentSlide, 'next');