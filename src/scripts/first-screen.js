import { mediaQuery } from "./mediaQueries";

function firstScreen(e) {

  const firstScreen = document.querySelector('.first-screen');
  const sectionBgVideo = document.querySelector('.section-bg-vid__video');
  
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
  
  if (sectionBgVideo && e.type == 'load') {

    setTimeout(() => {

      if (mediaQuery.matches) {

        sectionBgVideo.setAttribute('src', 'assets/videos/interior-bg-vid.mp4');
        sectionBgVideo.play();
        sectionBgVideo.setAttribute('autoplay', '');
        
      } else if (!mediaQuery.matches) {

        sectionBgVideo.setAttribute('src', 'assets/videos/interior-bg-vid-mob.mp4');
        sectionBgVideo.play();
        sectionBgVideo.setAttribute('autoplay', '');
        
      }

    }, 1000);
  }

}

export default firstScreen;