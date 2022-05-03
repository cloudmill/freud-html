import { mediaQuery } from './mediaQueries'

if (mediaQuery.matches) {
  window.addEventListener('load', () => {
  
    const header = document.querySelector('.header');
    let scrollTop = window.pageYOffset;
  
    window.addEventListener('scroll', scroll, {once:true});
  
    function scroll() {
      update();
  
      setTimeout(() => {
        update();
  
        window.addEventListener('scroll', scroll, {once:true});
  
      }, 1000 / 120)
    };
  
    function update() {
      let newScrollTop = window.pageYOffset;
  
      if (Math.abs(scrollTop - newScrollTop) >= 1) {
        if (newScrollTop > scrollTop) {
          header.classList.add('header--short')
        } else {
          header.classList.remove('header--short')
        }
      }
  
      if (scrollTop < 1) {
        header.classList.remove('header--short')
      }
  
      scrollTop = newScrollTop;
    }
  })
}