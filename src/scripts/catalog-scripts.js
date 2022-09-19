import { mediaQuery } from './mediaQueries';

function addToFav(eventClick) {
  if (eventClick.target.closest('.catalog-card__fav')) {
    eventClick.target.closest('.catalog-card__fav').classList.toggle('active')
  } else if (eventClick.target.closest('.product-button-fav')) {
    eventClick.target.closest('.product-button-fav').classList.toggle('active')
  }
}

function addToCart(eventClick) {

  if (eventClick.target.closest('[data-card-btn]') && !eventClick.target.closest('.catalog-card--small')) {

    if (eventClick.target.closest('[data-card-btn-parent].in-cart')) {
      eventClick.target.closest('[data-card-btn-parent]').classList.remove('in-cart');
      if (mediaQuery.matches) {
        eventClick.target.closest('[data-card-btn]').innerHTML = 'Добавить в корзину'
      } else {
        eventClick.target.closest('[data-card-btn]').innerHTML = 'В корзину'
      }
    } else {
      eventClick.target.closest('[data-card-btn-parent]').classList.add('in-cart');
      eventClick.target.closest('[data-card-btn]').innerHTML = 'В корзине';

      addToCartSuccess();
    }
  }
}

function addToCartSuccess() {
  document.querySelector('.body').classList.add('modal-open');
  document.querySelector('.modals-container').classList.add('active');
  document.querySelector('[data-popup="5"]').classList.add('active');
}

function activeFilter(eventClick) {
  // активное состояние для кнопки-фильтра в выпадашке или модалке

  const clickOnDrop = eventClick.target.closest('[data-filter-drop]');
  const clickOnPopup = eventClick.target.closest('.filters-popup');
  const clickOnBtn = eventClick.target.closest('.category-filter-btn');
  const mobFilters = document.querySelector('[data-mob-filters]');

  if ((clickOnDrop || clickOnPopup) && clickOnBtn && mediaQuery.matches) {

    clickOnBtn.classList.toggle('active')

  } else if (clickOnPopup && clickOnBtn && !mediaQuery.matches) {

    if (!eventClick.target.closest('[data-mob-filters]')) {

      if (clickOnBtn.classList.contains('active')) {

        clickOnBtn.classList.remove('active');

        document.querySelector('[data-mob-filters]').querySelectorAll('.category-filter-btn.active-filter').forEach(item => {
          if (item.textContent == clickOnBtn.textContent) {
            item.remove()
          }
        })

        if (!mobFilters.innerHTML) {
          mobFilters.classList.remove('active');
        }

      } else {

        clickOnBtn.classList.add('active');
        mobFilters.classList.add('active');

        const clickedBtnInner = clickOnBtn.innerHTML;

        mobFilters.insertAdjacentHTML('beforeend', `<button class="category-filter-btn button--clean active-filter">${clickedBtnInner}</button>`);

      }

    } else if (eventClick.target.closest('[data-mob-filters]')) {

      clickOnBtn.remove();

      document.querySelector('.filters-popup').querySelectorAll('.category-filter-btn.active').forEach(item => {
        if (item.textContent == clickOnBtn.textContent) {
          item.classList.remove('active');
        }
      });

      if (!mobFilters.innerHTML) {
        mobFilters.classList.remove('active');
      }

    }

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

function activeFiltersHeader() {

  const filtersOnPage = document.querySelector('[data-active-filters]');

  if (filtersOnPage) {

    window.addEventListener('scroll', () => {

      const filtersInHeader = document.querySelector('.active-filters-row');
      const minHeaderHeight = document.querySelector('.header__bottom').offsetHeight;

      if (filtersOnPage.getBoundingClientRect().top - 20 - minHeaderHeight <= 0) {
        filtersInHeader.classList.add('active')
      } else {
        filtersInHeader.classList.remove('active')
      }
    });

  }
}

function numberOfGoods() {

  document.querySelectorAll('[data-number-goods]').forEach(item => {
    item.addEventListener('click', e => {

      // e.stopPropagation();

      let numberGoods = Number(item.querySelector('[data-number-goods-count]').innerHTML);

      if (e.target.closest('[data-number-goods-minus]') && numberGoods > 0) {

        if (numberGoods == 2) {
          item.querySelector('[data-number-goods-minus]').classList.add('hide');
        }

        item.querySelector('[data-number-goods-count]').innerHTML = numberGoods - 1;

      } else if (e.target.closest('[data-number-goods-plus]')) {

        if (numberGoods == 1) {
          item.querySelector('[data-number-goods-minus]').classList.remove('hide');
        }

        item.querySelector('[data-number-goods-count]').innerHTML = numberGoods + 1;

      }
    })
  })
}

// состояния инпута промокода в корзине

function promocodeStates() {

  const promocodes = document.querySelectorAll('.cart-promocode');

  if (promocodes.length) {

    promocodes.forEach((block) => {

      const promocodeInput = block.querySelector('.cart-promocode__input');
      const clearBtn = block.querySelector('[data-event=promo-delete]');

      promocodeInput.addEventListener('focusin', e => {
        block.classList.add('active')
      });

      promocodeInput.addEventListener('input', () => {
        const inputValue = promocodeInput.value;

        if (inputValue.length) {
          block.classList.add('send-active');
          block.classList.remove('delete-active');
        } else {
          block.classList.remove('send-active')
        }
      });

      if (clearBtn) {
        clearBtn.addEventListener('click', e => {
          eventPromoDelete(block);
        });
      }

      promocodeInput.addEventListener('focusout', e => {
        block.classList.remove('active');
        block.classList.remove('send-active');

        if (promocodeInput.value) {
          block.classList.add('delete-active');
        }
      });

    })
  }
}

function eventPromoDelete(elem) {
  elem.querySelector('input').value = '';
  elem.classList.remove('delete-active');
}

function cigarSize() {

  // передача размеров сигары из дата-атрибута на странице продукта

  if (document.querySelector('[data-show-height]') && document.querySelector('[data-show-diameter]')) {

    document.querySelector('[data-show-height]').innerHTML = document.querySelector('.product-top-img__cigar-size').getAttribute('data-cigar-height');
    document.querySelector('[data-show-diameter]').innerHTML = document.querySelector('.product-top-img__cigar-size').getAttribute('data-cigar-diameter');

  }
}

export {addToFav, addToCart, activeFilter, sortMethod, activeFiltersHeader, numberOfGoods, promocodeStates, cigarSize, eventPromoDelete, addToCartSuccess };
