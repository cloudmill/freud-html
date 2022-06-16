import Swiper, { Navigation, Pagination, Mousewheel, Thumbs } from 'swiper';
import { mediaQuery } from './mediaQueries';

function swipers() {

  const restaurantSlider = new Swiper('#restaurant-slider', {

    modules: [Navigation, Pagination],

    loop: true,

    navigation: {
      nextEl: '#restaurant-slider-next',
      prevEl: '#restaurant-slider-prev',
    },

    pagination: {
      el: '#restaurant-slider-pagination',
    },
  });

  const reviewsSlider = new Swiper('#reviews-slider', {

    modules: [Navigation, Pagination],

    slidesPerView: 1.1,
    spaceBetween: 15,

    breakpoints: {
      [768]: {
        slidesPerView: 'auto',
      },
      [1280]: {
        spaceBetween: 30,
        slidesPerView: 'auto',
      },
    },

    navigation: {
      nextEl: '#reviews-slider-next',
      prevEl: '#reviews-slider-prev',
    },

    pagination: {
      el: '#reviews-slider-pagination',
    },
  });

  const shopSlider = new Swiper('#shop-slider', {

    modules: [Navigation],

    slidesPerView: 'auto',
    spaceBetween: 15,
    // loop: true,

    breakpoints: {
      [1280]: {
        spaceBetween: 30,
      },
    },

    navigation: {
      nextEl: '#shop-slider-next',
      prevEl: '#shop-slider-prev',
    },
  });

  const articlesSlider = new Swiper('#articles-slider', {

    modules: [Navigation],

    slidesPerView: 'auto',
    spaceBetween: 30,
    // loop: true,

    navigation: {
      nextEl: '#articles-slider-next',
      prevEl: '#articles-slider-prev',
    },
  });

  const categoriesSlider = new Swiper('#categories-slider', {

    modules: [Navigation],

    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,

    breakpoints: {
      [1280]: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },

    navigation: {
      nextEl: '#categories-slider-next',
      prevEl: '#categories-slider-prev',
    },
  });

  const humidorSlider = new Swiper('#humidor-slider', {

    modules: [Mousewheel],

    slidesPerView: 'auto',
    spaceBetween: 15,
    centeredSlides: true,
    initialSlide: 1,
    // mousewheel: true,

    mousewheel: {
      releaseOnEdges: true,
      // sensitivity: 5,
      // eventsTarget: '.humidor-slider-section',
      eventsTarget: '.humidor-slider-overlay',
    },

    breakpoints: {
      [768]: {
        centeredSlides: false,
      },

      [1280]: {
        spaceBetween: 30,
        initialSlide: 0,
        centeredSlides: false,
      },
    },
  });

  const gallerySlider = new Swiper('#gallery-slider', {

    modules: [Mousewheel, Navigation],

    slidesPerView: 'auto',
    mousewheel: true,
    slideToClickedSlide: true,

    breakpoints: {
      [1280]: {
        direction: 'vertical',
      },
    },

    navigation: {
      nextEl: '#gallery-slider-next',
      prevEl: '#gallery-slider-prev',
    },

  });

  const productSlider = new Swiper('#product-slider', {

    modules: [Thumbs],

    // direction: 'vertical',

    thumbs: {
      swiper: gallerySlider
    },
  });
}

export default swipers;