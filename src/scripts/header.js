import { mediaQuery } from './mediaQueries';

function headerOnScroll() {
  const header = document.querySelector('.header');
  let scrollTop = window.pageYOffset;

  if (header && (mediaQuery.matches || document.querySelector('[data-category-page]'))) {

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
    
  }
}

function headerFavAndCartModals() {
  const icoBtns = document.querySelectorAll('.header__buttons-icon');

  if (icoBtns.length) {
    icoBtns.forEach(item => {
  
      if (item.classList.contains('count')) {
    
        if (item.hasAttribute('data-fav-btn')) {
          item.setAttribute('data-header-btn', '5');
        } else if (item.hasAttribute('data-cart-btn')) {
          item.setAttribute('data-header-btn', '6');
        }
    
      } else {
        
        if (item.hasAttribute('data-fav-btn')) {
          item.setAttribute('data-header-btn', '3');
        } else if (item.hasAttribute('data-cart-btn')) {
          item.setAttribute('data-header-btn', '4');
        }
      }

    })
  }
}

export { headerOnScroll, headerFavAndCartModals }
