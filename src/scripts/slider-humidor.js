import { mediaQuery } from './mediaQueries';

function humidorSlider() {

  if (mediaQuery.matches) {

    const section = document.querySelector('.humidor-slider2-section');

    if (section) {

      const slider = section.querySelector('.humidor-slider2-slider');
      const container = document.querySelector('.humidor-slider2-container');
  
      container.style.top = `${(document.documentElement.clientHeight / 2) - (container.offsetHeight / 2)}px`;

      addEventListener('scroll', () => {
        const progress = Math.min(Math.max(0, -(section.getBoundingClientRect().top - innerHeight / 4)) / (section.getBoundingClientRect().height - innerHeight / 4 * 3), 1);

        slider.style.transform = `translateX(-${(slider.getBoundingClientRect().width - innerWidth) * progress}px)`;
      });
    } 
  }
}

export default humidorSlider;