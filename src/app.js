import './styles/app.scss';

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
import accordions from './scripts/spoiler';
import tabs from './scripts/tabs';
import popups from './scripts/popups';
import dropdownsBlock from './scripts/dropdowns-block';
import { initMap } from './scripts/map';

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

  tabOffGlobal();

  closeOnEsc();

  // передача размеров сигары из дата-атрибута на странице продукта
  if (document.querySelector('[data-show-height]') && document.querySelector('[data-show-diameter]')) {
    document.querySelector('[data-show-height]').innerHTML = document.querySelector('.product-top-img__cigar-size').getAttribute('data-cigar-height');
    document.querySelector('[data-show-diameter]').innerHTML = document.querySelector('.product-top-img__cigar-size').getAttribute('data-cigar-diameter'); 
  }

  // состояния инпута промокода в корзине
  if (document.querySelector('.cart-promocode')) {

    const promocodeInput = document.querySelector('.cart-promocode__input');

    promocodeInput.addEventListener('focusin', e => {
      e.target.closest('.cart-promocode').classList.add('active')
    });

    promocodeInput.addEventListener('input', () => {
      const inputValue = promocodeInput.value;

      if (inputValue.length) {
        promocodeInput.closest('.cart-promocode').classList.add('send-active');
        promocodeInput.closest('.cart-promocode').classList.remove('delete-active');
      } else {
        promocodeInput.closest('.cart-promocode').classList.remove('send-active')
      }
    });

    document.querySelector('.cart-promocode-delete').addEventListener('click', e => {
      e.target.closest('.cart-promocode').querySelector('input').value = '';
      e.target.closest('.cart-promocode').classList.remove('delete-active');
    });

    promocodeInput.addEventListener('focusout', e => {
      e.target.closest('.cart-promocode').classList.remove('active');
      promocodeInput.closest('.cart-promocode').classList.remove('send-active');

      if (promocodeInput.value) {
        promocodeInput.closest('.cart-promocode').classList.add('delete-active');
      }
    });
  }

  document.addEventListener('click', eventClick => {

    popups(eventClick, 'data-popup-button', 'data-popup');
    dropdownsBlock(eventClick, 'data-filter-btn', 'data-filter-drop');
    addToFav(eventClick);
    addToCart(eventClick);
    activeFilter(eventClick);
    anchorScroll(eventClick);

    // затухание при переходах по страницам
    if (eventClick.target.closest('a')) {

      eventClick.preventDefault();

      const href = eventClick.target.closest('a').getAttribute('href');

      document.querySelector('.modals-container').classList.add('fade');

      setTimeout(() => {
        window.location.assign(href)
      }, 600);
    }

  });

  if (mediaQuery.matches) {

    document.querySelector('.header__bottom-inner').addEventListener('mouseover', eventHover => {

      dropdownsBlock(eventHover, 'data-header-btn', 'data-header-modal', blockScroll = true);

    });
  }
});

window.addEventListener('load', () => {

  document.querySelector('body').classList.remove('no-transition');

  // скрытие элементов под хедером пока работает аос
  setTimeout(() => {
    document.querySelector('.header').classList.add('loaded');

    if (document.querySelector('.filter-drops-container')) {
      document.querySelector('.filter-drops-container').classList.add('loaded')
    }

  }, 1200);

  // анимация открытия видео и выезжание заголовков на главной
  if (document.querySelector('.first-screen')) {
    document.querySelectorAll('[data-video-show]').forEach(item => {
      item.classList.add('loaded')
    });
  
    document.querySelector('.first-screen__ttl').classList.add('loaded');
  }

  if (mediaQuery.matches) {
    headerOnScroll();
  }
  
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
