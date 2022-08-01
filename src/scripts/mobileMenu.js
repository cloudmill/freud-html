import { mediaQuery } from "./mediaQueries";

function mobileMenu() {

  if (!mediaQuery.matches) {

    // открытие мобильного меню и анимация бургера

    document.querySelector('[data-menu-btn]').addEventListener('click', () => {
      document.querySelector('[data-mobile-menu]').classList.toggle('active');
      document.querySelector('[data-menu-btn]').classList.toggle('active');

      if (document.querySelector('.mobile-menu-item.active')) {
        document.querySelector('.mobile-menu-item.active').classList.remove('active')
      }
    });

    // переход в раздел мобильного меню

    document.querySelectorAll('[data-menu-link]').forEach(item => {

      item.addEventListener('click', e => {

        const btnIndex = item.getAttribute('data-menu-link');

        document.querySelector(`[data-menu-item='${btnIndex}'`).classList.add('active');

      })

    });

    // закрытие раздела мобильного меню

    document.querySelectorAll('[data-menu-close]').forEach(item => {

      item.addEventListener('click', e => {

        e.target.closest('.mobile-menu-item.active').classList.remove('active');

      })
    }); 
  }
}

export default mobileMenu;