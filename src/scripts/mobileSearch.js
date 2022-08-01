function mobileSearch(eventClick) {
  
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

}

export default mobileSearch;