import './styles/app.scss';
import './scripts/backend';

import { mediaQuery } from './scripts/mediaQueries';

import AOS from 'aos';
import { headerOnScroll, headerFavAndCartModals } from './scripts/header';
import { addToFav, addToCart, activeFilter, sortMethod, activeFiltersHeader, numberOfGoods } from './scripts/catalog-scripts';
import { closeOnEsc } from './scripts/modals-open-close';

import inputTime from './scripts/form-elements/input-time';
import inputDate from './scripts/form-elements/input-date';
import inputTel from './scripts/form-elements/input-tel';
import select from './scripts/form-elements/select';
import formValidation from './scripts/form-elements/form-validation';

import swipers from './scripts/sliders';
import humidorSlider from './scripts/slider-humidor';
import accordions from './scripts/spoiler';
import tabs from './scripts/tabs';
import popups from './scripts/popups';
import dropdownsBlock from './scripts/dropdowns-block';
import { initMap } from './scripts/map';

import cartStages from './scripts/cart-stages';

import rangeSlider from './scripts/range-slider';

import { tabOffGlobal } from './scripts/tabindex-in-modals';

let blockScroll;


document.addEventListener('DOMContentLoaded', () => {

  swipers();
  headerFavAndCartModals();
  initMap();

  tabs();

  inputDate();
  inputTime();
  inputTel();
  select();
  formValidation();

  rangeSlider();

  sortMethod();
  activeFiltersHeader();
  numberOfGoods();

  humidorSlider();

  tabOffGlobal();

  closeOnEsc();

  cigarSize();

  promocodeStates();

  

  if (document.querySelector('.first-screen')) {
    
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
  }


  document.addEventListener('click', eventClick => {

    popups(eventClick, 'data-popup-button', 'data-popup');
    dropdownsBlock(eventClick, 'data-filter-btn', 'data-filter-drop');
    addToFav(eventClick);
    addToCart(eventClick);
    activeFilter(eventClick);
    anchorScroll(eventClick);
    fadeOnLeave(eventClick);

    if (eventClick.target.closest('[data-cookie-close]')) {
      document.querySelector('.cookie.active').classList.remove('active');
    }

    if (eventClick.target.closest('[data-plug-close]')) {
      
      document.querySelector('.plug-popup.active').classList.remove('active');
      document.querySelector('.modals-container.plug').classList.remove('plug');

    }

    // модалка поиска на мобилке
    
    if (eventClick.target.closest('.mobile-nav__item') && eventClick.target.closest('.mobile-nav__item').hasAttribute('data-popup-button')) {

      eventClick.target.closest('.mobile-nav__item').classList.add('active');
      eventClick.target.closest('.mobile-nav').classList.add('index-raise');

      eventClick.target.closest('.mobile-nav__item').removeAttribute('data-popup-button');
      eventClick.target.closest('.mobile-nav__item').setAttribute('data-modal-close', 'data-modal-close');

    } else if (eventClick.target.closest('.mobile-nav__item') && eventClick.target.closest('.mobile-nav__item').hasAttribute('data-modal-close')) {

      eventClick.target.closest('.mobile-nav__item').removeAttribute('data-modal-close');
      eventClick.target.closest('.mobile-nav__item').setAttribute('data-popup-button', '14');

      eventClick.target.closest('.mobile-nav__item').classList.remove('active');

      setTimeout(() => {
        eventClick.target.closest('.mobile-nav').classList.remove('index-raise');
      }, 300);

    }

  });

  if (mediaQuery.matches) {

    document.querySelector('.header__bottom-inner').addEventListener('mouseover', eventHover => {

      dropdownsBlock(eventHover, 'data-header-btn', 'data-header-modal', blockScroll = true);

    });
  }

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
});

window.addEventListener('load', () => {

  cartStages();

  document.querySelector('body').classList.remove('no-transition');
  
  // скрытие элементов под хедером пока работает аос
  setTimeout(() => {
    document.querySelector('.header').classList.add('loaded');

    if (document.querySelector('.filter-drops-container')) {
      document.querySelector('.filter-drops-container').classList.add('loaded')
    };

  }, 1200);

  // отложенный запуск второго видео на главной странице
  if (document.querySelector('.first-screen')) {

    setTimeout(() => {
      document.querySelectorAll('.section-bg-vid__video').forEach(item => {
        item.play()
      });
    }, 1000);
    
  }

  headerOnScroll();
  
  accordions();

  AOS.init({
    once: true,
    offset: 0,
    duration: 1200,
  });

});

function anchorScroll(eventClick) {

  if (eventClick.target.closest('[data-anchor-btn]')) {

    eventClick.preventDefault();

    document.querySelectorAll('[data-anchor-target]').forEach(item => {
      item.insertAdjacentHTML('afterbegin', '<div class="anchor"></div>')
    })

    const activeId = eventClick.target.closest('[data-anchor-btn]').getAttribute('data-anchor-btn');

    document.querySelector(`[data-anchor-target='${activeId}']`).querySelector('.anchor').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

function fadeOnLeave(eventClick) {

  // затухание при переходах по страницам

  if (eventClick.target.closest('a') && !eventClick.target.closest('a').hasAttribute('data-nolink')) {

    eventClick.preventDefault();

    const href = eventClick.target.closest('a').getAttribute('href');

    document.querySelector('.modals-container').classList.add('fade');

    setTimeout(() => {
      window.location.assign(href)
    }, 600);
    
  }
}

function promocodeStates() {

  // состояния инпута промокода в корзине

  if (document.querySelector('.cart-promocode')) {

    const promocodeInput = document.querySelector('.cart-promocode__input');
    const activeBlock = promocodeInput.closest('.cart-promocode');
    const clearBtn =  document.querySelector('.cart-promocode-delete');

    promocodeInput.addEventListener('focusin', e => {
      e.target.closest('.cart-promocode').classList.add('active')
    });

    promocodeInput.addEventListener('input', () => {
      const inputValue = promocodeInput.value;

      if (inputValue.length) {
        activeBlock.classList.add('send-active');
        activeBlock.classList.remove('delete-active');
      } else {
        activeBlock.classList.remove('send-active')
      }
    });

    clearBtn.addEventListener('click', e => {
      e.target.closest('.cart-promocode').querySelector('input').value = '';
      e.target.closest('.cart-promocode').classList.remove('delete-active');
    });

    promocodeInput.addEventListener('focusout', e => {
      e.target.closest('.cart-promocode').classList.remove('active');
      activeBlock.classList.remove('send-active');

      if (promocodeInput.value) {
        activeBlock.classList.add('delete-active');
      }
    });
  }
}

function cigarSize() {

  // передача размеров сигары из дата-атрибута на странице продукта

  if (document.querySelector('[data-show-height]') && document.querySelector('[data-show-diameter]')) {
    document.querySelector('[data-show-height]').innerHTML = document.querySelector('.product-top-img__cigar-size').getAttribute('data-cigar-height');
    document.querySelector('[data-show-diameter]').innerHTML = document.querySelector('.product-top-img__cigar-size').getAttribute('data-cigar-diameter'); 
  }
}
