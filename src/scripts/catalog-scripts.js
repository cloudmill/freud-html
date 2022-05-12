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

      document.querySelector('.body').classList.add('modal-open');
      document.querySelector('.modals-container').classList.add('active');
      document.querySelector('[data-popup="5"]').classList.add('active');

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

function activeFiltersHeader() {

  const filtersOnPage = document.querySelector('[data-active-filters]');

  if (filtersOnPage && filtersOnPage.querySelectorAll('.active-filter').length) {
    
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

export {addToFav, addToCart, activeFilter, sortMethod, activeFiltersHeader};
