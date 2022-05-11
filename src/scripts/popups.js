import { focusOnTab, focusOnTabOff } from "./tabindex-in-modals";

function popups(eventClick) {

  const buttons = document.querySelectorAll('[data-popup-button]');
  const popups = document.querySelectorAll('[data-popup]');
  const modalsContainer = document.querySelector('.modals-container');

  if (buttons && popups) {

    const clickedBtn = eventClick.target.closest('[data-popup-button]');

    const clickOff = modalsContainer.classList.contains('active') && 
    !eventClick.target.closest('[data-popup]') && 
    !eventClick.target.closest('[data-popup-button]') &&
    !eventClick.target.closest('.datepicker-view') || 
    eventClick.target.closest('.modal__close');

    if (clickedBtn) {
      openPopup(clickedBtn);
    } else if (clickOff) {
      closePopup()
    }
  }

  function openPopup(clickedBtn) {
    popups.forEach(item => {
      item.classList.remove('active')
    });
    
    const buttonId = Number(clickedBtn.getAttribute('data-popup-button'));
    const activePopup = document.querySelector(`[data-popup='${buttonId}']`);

    modalsContainer.classList.add('active');
    document.querySelector('.body').classList.add('modal-open');
    activePopup.classList.add('active');

    if (activePopup.querySelector('[data-focus-input]')) {
      activePopup.querySelector('[data-focus-input]').focus();
    }

    closeOnEsc();
    focusOnTab(activePopup);
  }
  function closePopup() {
    popups.forEach(item => {
      item.classList.remove('active')
    });
    modalsContainer.classList.remove('active');
    document.querySelector('.body').classList.remove('modal-open');

    focusOnTabOff(popups)
  }
  function closeOnEsc() {
    document.addEventListener('keydown', e => {
      if (e.code == 'Escape') {
        closePopup()
      }
    })
  }
}

export default popups;
