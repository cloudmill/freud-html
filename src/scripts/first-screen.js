import { mediaQuery } from "./mediaQueries";

function firstScreen(e) {

  const firstScreen = document.querySelector('.first-screen');
  
  if (firstScreen && e.type == 'DOMContentLoaded' && !mediaQuery.matches) {

    // анимация первого экрана
    setTimeout(() => {

      document.querySelectorAll('[data-video-show]').forEach(item => {
        item.classList.add('loaded')
      });
      document.querySelectorAll('[data-fade-up]').forEach(item => {
        item.classList.add('loaded')
      });
      document.querySelector('.first-screen__ttl').classList.add('loaded');
      
    }, 1000);

    // фикс бленд мода в сафари
    setTimeout(() => {
      document.querySelector('.first-screen__ttl').classList.add('blend-mode');
    }, 1200);
    
  } else if (firstScreen && e.type == 'load' && mediaQuery.matches) {

    // анимация первого экрана
    document.querySelectorAll('[data-video-show]').forEach(item => {
      item.classList.add('loaded')
    });
    document.querySelectorAll('[data-fade-up]').forEach(item => {
      item.classList.add('loaded')
    });
    document.querySelector('.first-screen__ttl').classList.add('loaded');

    // фикс бленд мода в сафари
    document.querySelector('.first-screen__ttl').classList.add('blend-mode');
    
  }
  
  if (firstScreen && e.type == 'load') {

    setTimeout(() => {
      document.querySelectorAll('.section-bg-vid__video').forEach(item => {
        item.play()
      });
    }, 1000);
  }

}

export default firstScreen;