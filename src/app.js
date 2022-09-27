import './styles/app.scss';
import './scripts/backend';

import { mediaQuery } from './scripts/mediaQueries';
import AOS from 'aos';

import { headerOnScroll, headerFavAndCartModals } from './scripts/header';
import { addToFav, addToCart, activeFilter, sortMethod, activeFiltersHeader, numberOfGoods, promocodeStates, cigarSize } from './scripts/catalog-scripts';
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
import firstScreen from './scripts/first-screen';
import cartStages from './scripts/cart-stages';

import rangeSlider from './scripts/range-slider';

import { tabOffGlobal } from './scripts/tabindex-in-modals';
import aosInit from './scripts/aos';
import mobileMenu from './scripts/mobileMenu';
import mobileSearch from './scripts/mobileSearch';

let blockScroll;

const siteTemplPath = document.querySelector('[data-type=site-templ-path]');

window.config = {
  path: window.location.hostname && window.location.hostname !== 'cloudmill.github.io' ? (siteTemplPath ? siteTemplPath.value : '/local/templates/main/') : '',
}

document.addEventListener('DOMContentLoaded', (e) => {
  // проверка что js работает
  document.querySelector('.body').setAttribute('data-js', 'true');

  firstScreen(e);
  mobileMenu();

  swipers();
  headerFavAndCartModals();
  initMap();

  tabs();

  inputDate();
  // inputTime();
  inputTel();
  select();
  formValidation();

  rangeSlider();

  sortMethod();
  activeFiltersHeader();
  numberOfGoods();

  tabOffGlobal();

  closeOnEsc();

  cigarSize();

  promocodeStates();

  document.addEventListener('click', eventClick => {

    popups(eventClick, 'data-popup-button', 'data-popup');
    dropdownsBlock(eventClick, 'data-filter-btn', 'data-filter-drop');
    addToFav(eventClick);
    addToCart(eventClick);
    activeFilter(eventClick);
    anchorScroll(eventClick);
    fadeOnLeave(eventClick);
    mobileSearch(eventClick);

    if (eventClick.target.closest('[data-cookie-close]')) {
      document.querySelector('.cookie.active').classList.remove('active');
    }

    if (eventClick.target.closest('[data-plug-close]')) {

      document.querySelector('.plug-popup.active').classList.remove('active');
      document.querySelector('.modals-container.plug').classList.remove('plug');

    }

  });

  if (mediaQuery.matches) {

    document.querySelectorAll('[data-header-btn]').forEach(item => {
      item.addEventListener('mouseenter', eventHover => {

        dropdownsBlock(eventHover, 'data-header-btn', 'data-header-modal', blockScroll = true);

      });
    })
  }
});

window.addEventListener('load', (e) => {

  mainVideo();

  categoryFilters();

  document.querySelector('body').classList.remove('no-transition');

  firstScreen(e);
  cartStages();
  humidorSlider();

  aosInit();

  headerOnScroll();

  accordions();

});

window.addEventListener('scroll', aosRefresh);

function aosRefresh() {
  const timeout = setTimeout( () => {
    clearTimeout(timeout)
    AOS.refresh();
    window.addEventListener('scroll', aosRefresh);
  },1000);

  window.removeEventListener('scroll', aosRefresh);
}

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

function categoryFilters() {

  const filterBtns = document.querySelectorAll('[data-filter-btn]');

  if (filterBtns.length) {

    filterBtns.forEach(item => {

      if (!(item.getAttribute('data-filter-btn') == '6')) {

        const btnsRow = document.querySelector('.filter-drops-btns');
        const pad = btnsRow.getBoundingClientRect().left;
        const btnNum = item.getAttribute('data-filter-btn');
        const drop = document.querySelector(`[data-filter-drop='${btnNum}']`);

        const left = item.getBoundingClientRect().left - pad - 10;

        if (left > 0) {
          drop.style.left = `${left}px`;
        } else {
          drop.style.left = `0px`;
        }


        const right = document.documentElement.clientWidth - drop.getBoundingClientRect().right;

          if (right < pad) {

            const newWidth = btnsRow.getBoundingClientRect().width - left;
            drop.style.width = `${newWidth}px`;

          }
      }
    })
  }
}

function mainVideo() {
  // загрузка десктопного или мобильного видео на главной странице
  const videoMain = document.querySelectorAll('[data-main-video]');

  if (videoMain.length && mediaQuery.matches) {

    videoMain.forEach(video => {
      video.setAttribute('src', `${window.config.path}assets/videos/main-video-comp.mp4`);
      // video.setAttribute('src', `assets/videos/main-video-comp.mp4`);
      video.play();
      video.setAttribute('autoplay', '');
    })

  } else if (videoMain.length && !mediaQuery.matches) {

    videoMain.forEach(video => {
      video.setAttribute('src', `${window.config.path}assets/videos/main-video-comp-mob.mp4`);
      // video.setAttribute('src', `assets/videos/main-video-comp-mob.mp4`);
      video.play();
      video.setAttribute('autoplay', '');
    })
  }
}
