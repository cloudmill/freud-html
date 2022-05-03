import Datepicker from 'vanillajs-datepicker/Datepicker';
import ru from 'vanillajs-datepicker/locales/ru';

Object.assign(Datepicker.locales, ru);

// datepicker

// const datepickerEl = document.querySelector('[data-datepicker]');

// new Datepicker(datepickerEl, {
//   format: 'dd/mm/yyyy',
//   autohide: true,
//   language: 'ru',
//   orientation: 'top',

//   prevArrow: `<svg class="datepicker-arrow" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M6 11L1 6L6 1" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//   </svg>`,
//   nextArrow: `<svg class="datepicker-arrow next" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M6 11L1 6L6 1" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//   </svg>`,
// }); 

// select

document.addEventListener('DOMContentLoaded', () => {

  const selectInput = document.querySelectorAll('[data-select-input]');

  if (selectInput.length > 0) {

    selectInput.forEach(item => {

      item.addEventListener('focus', e => {

        console.log('input-click');

        const activeLabel = e.target.closest('.select-label');

        if (activeLabel.classList.contains('active')) {

          console.log('has-remove');
          activeLabel.classList.remove('active')

        } else {
          activeLabel.classList.add('active');

          const activeSelect = activeLabel.querySelector('.select');
  
          activeSelect.addEventListener('click', e => {
            e.stopPropagation();
  
            if (e.target.closest('.select__option')) {
              
              activeLabel.querySelector('input').value = e.target.closest('.select__option').getAttribute('data-option');

              setTimeout(() => {
                activeLabel.classList.remove('active');
              }, );

              console.log('final-remove');
              
            } 
          })
        } 
      })
    })
  }
})


document.addEventListener('DOMContentLoaded', () => {

  const inputTime = document.querySelector('[data-input-time]');



})