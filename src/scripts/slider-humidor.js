import { mediaQuery } from './mediaQueries';

function humidorSlider() {

  const humidorOverlay = document.querySelector('.humidor-slider-overlay');
  const lastSlide = document.querySelector('.last-slide');
  const firstSlide = document.querySelector('.first-slide');

  if (humidorOverlay && mediaQuery.matches) {


    const observerOverlay = new IntersectionObserver(callbackOverlay, {
      root: null,
      rootMargin: '0px',
      threshold: 0.98,
    });

    observerOverlay.observe(humidorOverlay);
    

    const observerLastSlide = new IntersectionObserver(callbackLastSlide, {
      root: null,
      rootMargin: '0px',
      threshold: 0.95,
    });

    observerLastSlide.observe(lastSlide);


    const observerFirstSlide = new IntersectionObserver(callbackFirstSlide, {
      root: null,
      rootMargin: '0px',
      threshold: 0.95,
    });

    observerFirstSlide.observe(firstSlide);
    
  }

  function addLastClass() {
    if (humidorOverlay.getBoundingClientRect().top < -600) {
      console.log('last class');

      humidorOverlay.classList.add('at-last');
      document.removeEventListener('scroll', addLastClass)
    }
  }

  function callbackOverlay(entries, observer) {

    console.log('callback overlay 1');
    console.log(humidorOverlay.getBoundingClientRect().top < 0, !humidorOverlay.classList.contains('at-first'));

    if (humidorOverlay.getBoundingClientRect().top < 0 && !humidorOverlay.classList.contains('at-first') || humidorOverlay.classList.contains('at-last')) {

      console.log('callback overlay 2');

      document.querySelector('body').classList.add('fix-scroll');
      humidorOverlay.classList.add('active');

    }
    
  }

  function callbackLastSlide(entries, observer) {

    if (humidorOverlay.getBoundingClientRect().top < 100) {

      console.log('callback last slide');

      document.querySelector('body').classList.remove('fix-scroll');
      humidorOverlay.classList.remove('active');

      document.addEventListener('scroll', addLastClass)
    }
    
  }

  function callbackFirstSlide(entries, observer) {

    if (humidorOverlay.getBoundingClientRect().top < 200 && humidorOverlay.classList.contains('at-last')) {

      console.log('callback first slide');

      document.querySelector('body').classList.remove('fix-scroll');
      humidorOverlay.classList.remove('active');

      humidorOverlay.classList.add('at-first');
      humidorOverlay.classList.remove('at-last');

      document.addEventListener('scroll', removeFirstClass)

    }
  }

  function removeFirstClass() {
    if (humidorOverlay.getBoundingClientRect().top > 200) {
      console.log('remove first class');

      humidorOverlay.classList.remove('at-first');
      document.removeEventListener('scroll', removeFirstClass)
    }
    
  }
  
}

export default humidorSlider;