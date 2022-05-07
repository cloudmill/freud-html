import Swiper, { Navigation, Pagination, Mousewheel, Thumbs } from 'swiper';

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

    slidesPerView: 'auto',
    spaceBetween: 30,

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
    spaceBetween: 30,
    // loop: true,

    navigation: {
      nextEl: '#shop-slider-next',
      prevEl: '#shop-slider-prev',
    },
  });

  const categoriesSlider = new Swiper('#categories-slider', {

    modules: [Navigation],

    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,

    navigation: {
      nextEl: '#categories-slider-next',
      prevEl: '#categories-slider-prev',
    },
  });

  const recommendSlider = new Swiper('#recommend-slider', {

    modules: [Navigation, Pagination],

    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,

    navigation: {
      nextEl: '#recommend-slider-next',
      prevEl: '#recommend-slider-prev',
    },

    pagination: {
      el: '#recommend-slider-pagination',
    },
  });

  const humidorSlider = new Swiper('#humidor-slider', {

    modules: [Mousewheel],

    mousewheel: true,
    slidesPerView: 'auto',
    spaceBetween: 30,

  });

  const gallerySlider = new Swiper('#gallery-slider', {

    modules: [Mousewheel],

    direction: 'vertical',
    slidesPerView: 'auto',
    mousewheel: true,
    slideToClickedSlide: true,

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