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

import rangeSlider from './scripts/range-slider';

import { tabOffGlobal } from './scripts/tabindex-in-modals';

let blockScroll;

document.addEventListener('DOMContentLoaded', () => {

  swipers();
  headerFavAndCartModals();

  tabs();

  inputDate();
  inputTime();
  inputTel();
  select();
  formValidation();

  rangeSlider();

  sortMethod();
  activeFiltersHeader();

  tabOffGlobal();

  closeOnEsc();

  if (document.querySelector('[data-show-height]') && document.querySelector('[data-show-diameter]')) {
    document.querySelector('[data-show-height]').innerHTML = document.querySelector('.product-top-img__cigar-size').getAttribute('data-cigar-height');
    document.querySelector('[data-show-diameter]').innerHTML = document.querySelector('.product-top-img__cigar-size').getAttribute('data-cigar-diameter'); 
  }

  document.addEventListener('click', eventClick => {

    popups(eventClick, 'data-popup-button', 'data-popup');
    dropdownsBlock(eventClick, 'data-filter-btn', 'data-filter-drop');
    addToFav(eventClick);
    addToCart(eventClick);
    activeFilter(eventClick);
    numberOfGoods(eventClick);

  });

  if (mediaQuery.matches) {

    document.querySelector('.header__bottom-inner').addEventListener('mouseover', eventHover => {

      dropdownsBlock(eventHover, 'data-header-btn', 'data-header-modal', blockScroll = true);

    });
  }

});

window.addEventListener('load', () => {

  document.querySelector('body').classList.remove('no-transition');

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

document.querySelector('.checkbox__input').addEventListener('change', () => {
  console.log(document.querySelector('.checkbox__input').checked);
})
