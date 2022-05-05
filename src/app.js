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


document.addEventListener('DOMContentLoaded', () => {

  headerDrops();

  popup();
  swipers();
  tabs();

  inputDate();
  inputTime();
  inputTel();
  select();

  formValidation();

  if (mediaQuery.matches) {}

})

window.addEventListener('load', () => {

  headerOnScroll();
  accordions();

  if (mediaQuery.matches) {}
})