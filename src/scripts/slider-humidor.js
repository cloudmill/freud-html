import { mediaQuery } from './mediaQueries';

function humidorSlider() {

  const humidorOverlay = document.querySelector('.humidor-slider-overlay');
  const lastSlide = document.querySelector('.last-slide');
  const firstSlide = document.querySelector('.first-slide');
  const humidorSlider = document.querySelector('.humidor-slider');

  if (humidorOverlay && mediaQuery.matches) {

    const headerHeight = document.querySelector('.header').offsetHeight;
    const sliderHeight = humidorSlider.offsetHeight;
    const windowHeight = document.documentElement.clientHeight;
    const topOffset = (windowHeight - sliderHeight) / 2;

    window.addEventListener('scroll', () => {

      if (humidorSlider.getBoundingClientRect().top < topOffset && 
      humidorSlider.getBoundingClientRect().top > 0 &&
          !humidorOverlay.classList.contains('start-slider')) {

        document.querySelector('body').classList.add('fix-scroll');
        humidorOverlay.classList.add('active');

        humidorOverlay.classList.add('start-slider');

      } else if (humidorSlider.getBoundingClientRect().top < topOffset && 
                humidorSlider.getBoundingClientRect().top > topOffset - 20 &&
                humidorOverlay.classList.contains('at-last')) {

        document.querySelector('body').classList.add('fix-scroll');
        humidorOverlay.classList.add('active');
        
      }
    });

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




    function callbackLastSlide(entries, observer) {

      if (humidorOverlay.getBoundingClientRect().top < 100 && !humidorOverlay.classList.contains('at-last')) {
  
        document.querySelector('body').classList.remove('fix-scroll');
        humidorOverlay.classList.remove('active');
  
        document.addEventListener('scroll', addLastClass)
      }
      
    }
  
    function callbackFirstSlide(entries, observer) {
  
      if (humidorOverlay.getBoundingClientRect().top < topOffset && humidorOverlay.classList.contains('at-last')) {
  
        document.querySelector('body').classList.remove('fix-scroll');
        humidorOverlay.classList.remove('active');
        humidorOverlay.classList.remove('at-last');
  
        document.addEventListener('scroll', removeFirstClass)
  
      }
    }
  
    function addLastClass() {
      if (humidorOverlay.getBoundingClientRect().top < 0) {
  
        humidorOverlay.classList.add('at-last');
        document.removeEventListener('scroll', addLastClass)
      }
    }
  
    function removeFirstClass() {
      if (humidorOverlay.getBoundingClientRect().top > 200) {
        humidorOverlay.classList.remove('start-slider');
        document.removeEventListener('scroll', removeFirstClass)
      }
      
    }
    
  }

  
  
}

export default humidorSlider;