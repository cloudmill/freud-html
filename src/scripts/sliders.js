import Swiper, { Navigation, Pagination } from 'swiper';



window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper("#slider1", {

    modules: [Navigation, Pagination],

    loop: true,

    navigation: {
      nextEl: "#swiper-button-next",
      prevEl: "#swiper-button-prev",
    },
  });
});
