function popup() {
  const buttons = document.querySelectorAll('[data-popup-button]');
  const popups = document.querySelectorAll('[data-popup]');
  const modalsContainer = document.querySelector('.modals-container');

  if (buttons.length) {

    window.addEventListener('click', e => {

      const clickedBtn = e.target.closest('[data-popup-button]');
      const clickOff = modalsContainer.classList.contains('active') && 
      !e.target.closest('[data-popup]') && 
      !e.target.closest('[data-popup-button]') &&
      !e.target.closest('.datepicker-view') || 
      e.target.closest('.modal__close');

      if (clickedBtn) {
        openPopup(clickedBtn)
      } else if (clickOff) {
        closePopup()
      }
    })

    function openPopup(clickedBtn) {
      popups.forEach(item => {
        item.classList.remove('active')
      });
      
      const buttonId = Number(clickedBtn.getAttribute('data-popup-button'));

      modalsContainer.classList.add('active');
      document.querySelector('.body').classList.add('modal-open');
      document.querySelector(`[data-popup='${buttonId}']`).classList.add('active');
    }
    function closePopup() {
      popups.forEach(item => {
        item.classList.remove('active')
      });
      modalsContainer.classList.remove('active');
      document.querySelector('.body').classList.remove('modal-open');
    }
  }
}

export default popup;