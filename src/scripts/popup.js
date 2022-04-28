document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll('[data-popup-button]');
  const modalsContainer = document.querySelector('.modals-container');

  if (buttons.length) {
    buttons.forEach(item => {

      item.addEventListener('click', e => {
  
        const buttonId = Number(item.getAttribute('data-popup-button'));
  
        modalsContainer.classList.add('active');
        document.querySelector('.body').classList.add('modal-open');
        document.querySelector(`[data-popup='${buttonId}']`).classList.add('active');
  
      })
  
    });

    document.addEventListener('click', e => {

      if (modalsContainer.classList.contains('active') && 
          !e.target.closest('.modal') && 
          !e.target.closest('[data-popup-button]') || 
          e.target.closest('.modal__close')
      ) {
  
        modalsContainer.classList.remove('active');
        document.querySelector('.body').classList.remove('modal-open');
        modalsContainer.querySelector('.active').classList.remove('active');
        
      }
  
    })
  }
})