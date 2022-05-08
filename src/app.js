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

  if (mediaQuery.matches) {
    headerDrops();
  }

  popup();
  swipers();
  tabs();

  filterDrops();

  inputDate();
  inputTime();
  inputTel();
  select();

  formValidation();

  rangeSlider();

});

window.addEventListener('load', () => {

  document.querySelector('body').classList.remove('no-transition');

  if (mediaQuery.matches) {
    headerOnScroll();
  }
  
  accordions();

});
