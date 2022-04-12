import Swiper, { Navigation, Pagination } from 'swiper';

window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper("#slider1", {

    modules: [Navigation, Pagination],

    loop: true,

    navigation: {
      nextEl: "#restaurant-slider-next",
      prevEl: "#restaurant-slider-prev",
    },

    pagination: {
      el: "#restaurant-slider-pagination",
    },
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper("#reviews-slider", {

    modules: [Navigation, Pagination],

    slidesPerView: 'auto',
    spaceBetween: 30,

    navigation: {
      nextEl: "#reviews-slider-next",
      prevEl: "#reviews-slider-prev",
    },

    pagination: {
      el: "#reviews-slider-pagination",
    },
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper("#shop-slider", {

    modules: [Navigation],

    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,

    navigation: {
      nextEl: "#shop-slider-next",
      prevEl: "#shop-slider-prev",
    },
  });
});