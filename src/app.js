import './styles/app.scss';

import { mediaQuery } from './scripts/mediaQueries';

import { headerOnScroll, headerFavAndCartModals } from './scripts/header';
import accordions from './scripts/spoiler';

import inputTime from './scripts/form-elements/input-time';
import inputDate from './scripts/form-elements/input-date';
import inputTel from './scripts/form-elements/input-tel';
import select from './scripts/form-elements/select';
import formValidation from './scripts/form-elements/form-validation';

import swipers from './scripts/sliders';
import tabs from './scripts/tabs';
import popup from './scripts/popup';
import dropdownsBlock from './scripts/dropdowns-block';

import rangeSlider from './scripts/range-slider';

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

  tabOffGlobal();

  document.addEventListener('click', eventClick => {

    if (mediaQuery.matches) {
      // dropdownsBlock(eventClick, 'data-header-btn', 'data-header-modal', blockScroll = true)
    }

    popup(eventClick);
    dropdownsBlock(eventClick, 'data-filter-btn', 'data-filter-drop');
    addToFav(eventClick);
    addToCart(eventClick);
    activeFilter(eventClick);
  });

  document.querySelector('.header__bottom-inner').addEventListener('mouseover', eventHover => {

    const triggerBtns = document.querySelectorAll('[data-header-btn]');
    const dropdowns = document.querySelectorAll('[data-header-modal]');

    const activeBtn = eventHover.target.closest('[data-header-btn]');
    
    if (activeBtn) {
      openByHover()
    }

    document.addEventListener('click', eventClick => {

      if (document.querySelector(`.active[data-header-modal]`) && !eventClick.target.closest(`[data-header-btn]`) && !eventClick.target.closest(`[data-header-modal]`)) {

        closeByClick()
        
      }
    })

    function openByHover() {
      triggerBtns.forEach(item => {
        item.classList.remove('active')
      });
      dropdowns.forEach(item => {
        item.classList.remove('active')
      });

      const activeId = Number(activeBtn.getAttribute('data-header-btn'));
      const activeDrop = document.querySelector(`[data-header-modal='${activeId}']`);

      activeBtn.classList.add('active');
      activeDrop.classList.add('active');
    }
    function closeByClick() {
      triggerBtns.forEach(item => {
        item.classList.remove('active')
      });
      dropdowns.forEach(item => {
        item.classList.remove('active')
      });
    }
  });

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
function addToCart(eventClick) {
  if (eventClick.target.closest('.catalog-card__btn')) {
    if (eventClick.target.closest('.catalog-card.in-cart')) {
      eventClick.target.closest('.catalog-card').classList.remove('in-cart');
      eventClick.target.closest('.catalog-card__btn').innerHTML = 'Добавить в корзину';
    } else {
      eventClick.target.closest('.catalog-card').classList.add('in-cart');
      eventClick.target.closest('.catalog-card__btn').innerHTML = 'В корзине';
    }
  }
}
function activeFilter(eventClick) {
  // активное состояние для кнопки-фильтра в выпадашке или модалке

  if ((eventClick.target.closest('[data-filter-drop]') || eventClick.target.closest('.filters-popup')) && eventClick.target.closest('.category-filter-btn')) {
    eventClick.target.closest('.category-filter-btn').classList.toggle('active')
  }

  // активное состояние верхнего фильтра в категории напитков
  if (eventClick.target.closest('.drinks-filters-item')) {
    eventClick.target.closest('.drinks-filters-item').classList.toggle('active')
  }
}
function sortMethod() {
  // переключение способа сортировки на странице категории каталога 

  if (document.querySelector('.sorting-filter')) {
    document.querySelector('.sorting-filter').addEventListener('change', e => {

      document.querySelector('[data-sort-filter]').innerHTML = e.target.closest('.sorting-filter__label').querySelector('.sorting-filter__txt').innerHTML;
  
    })
  } 
}
