const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({
    left: -320,
    behavior: 'smooth'
  });
});

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({
    left: 320,
    behavior: 'smooth'
  });
});
