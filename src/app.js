import './styles/app.scss';

import { mediaQuery } from './scripts/mediaQueries';

import { headerOnScroll, headerDrops } from './scripts/header';
import accordions from './scripts/spoiler';

import inputTime from './scripts/form-elements/input-time';
import inputDate from './scripts/form-elements/input-date';
import inputTel from './scripts/form-elements/input-tel';
import select from './scripts/form-elements/select';
import formValidation from './scripts/form-elements/form-validation';

import swipers from './scripts/sliders';
import tabs from './scripts/tabs';
import popup from './scripts/popup';
import filterDrops from './scripts/catalog-filter-drops';

import rangeSlider from './scripts/range-slider';


document.addEventListener('DOMContentLoaded', () => {

  swipers();
  tabs();

  inputDate();
  inputTime();
  inputTel();
  select();

  formValidation();
  rangeSlider();
  sortMethod();

  tabOffGlobal();

  document.addEventListener('click', eventClick => {

    if (mediaQuery.matches) {
      headerDrops(eventClick);
    }

    popup(eventClick);
    filterDrops(eventClick);
    addToFav(eventClick);
    activeFilter(eventClick);
  })

});

window.addEventListener('load', () => {

  document.querySelector('body').classList.remove('no-transition');

  if (mediaQuery.matches) {
    headerOnScroll();
  }
  
  accordions();

});

function tabOffGlobal() {
  const headerModals = document.querySelectorAll('[data-header-modal]');
  const filterDrops = document.querySelectorAll('[data-filter-drop]');
  const popups = document.querySelectorAll('[data-popup]');

  headerModals.forEach(item => {

    item.querySelectorAll('a').forEach(link => {
      link.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('input').forEach(input => {
      input.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('button').forEach(button => {
      button.setAttribute('tabindex', '-1')
    });
  });
  filterDrops.forEach(item => {

    item.querySelectorAll('a').forEach(link => {
      link.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('input').forEach(input => {
      input.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('button').forEach(button => {
      button.setAttribute('tabindex', '-1')
    });
  });
  popups.forEach(item => {

    item.querySelectorAll('input').forEach(input => {
      input.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('a').forEach(link => {
      link.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('button').forEach(button => {
      button.setAttribute('tabindex', '-1')
    });
  });
}
function addToFav(eventClick) {
  if (eventClick.target.closest('.catalog-card__fav')) {
    eventClick.target.closest('.catalog-card__fav').classList.toggle('active')
  }
}
function activeFilter(eventClick) {
  if ((eventClick.target.closest('[data-filter-drop]') || eventClick.target.closest('.filters-popup')) && eventClick.target.closest('.category-filter-btn')) {
    eventClick.target.closest('.category-filter-btn').classList.toggle('active')
  }
}
function sortMethod() {
  // переключение способа сортировки на странице категории каталога 

  document.querySelector('.sorting-filter').addEventListener('change', e => {

    document.querySelector('[data-sort-filter]').innerHTML = e.target.closest('.sorting-filter__label').querySelector('.sorting-filter__txt').innerHTML;

  })
}
