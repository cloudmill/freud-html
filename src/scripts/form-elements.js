import Datepicker from 'vanillajs-datepicker/Datepicker';
import ru from 'vanillajs-datepicker/locales/ru';

Object.assign(Datepicker.locales, ru);

// datepicker

const datepickerEl = document.querySelector('[data-datepicker]');

new Datepicker(datepickerEl, {
  format: 'dd/mm/yyyy',
  autohide: true,
  language: 'ru',
  orientation: 'top',

  prevArrow: `<svg class="datepicker-arrow" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 11L1 6L6 1" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  nextArrow: `<svg class="datepicker-arrow next" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 11L1 6L6 1" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
}); 

// select

document.addEventListener('DOMContentLoaded', () => {

  const selectInput = document.querySelectorAll('[data-select-input]');
  const selectLabel = document.querySelector('.select-label');

  if (selectInput.length > 0) {

    selectInput.forEach(item => {

      item.addEventListener('focusin', e => {

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

    // закрытие селекта при клике мимо

    document.addEventListener('click', e => {

      if (selectLabel.classList.contains('active') && e.target.closest('.booking-popup-form') && !e.target.closest('.select-label')) {
        selectLabel.classList.remove('active');
      }
    })
  }
})

// input time mask

document.addEventListener('DOMContentLoaded', () => {

  const inputTime = document.querySelector('[data-time-mask]');

  inputTime.setAttribute('placeholder', 'Введите время');

  inputTime.addEventListener('focusin', () => {
    inputTime.setAttribute('placeholder', '__:__')
  });

  Maska.create(inputTime, {
    mask: 'hH:mM',
    tokens: {
      'h': { pattern: /[1-2]/ },
      'H': { pattern: /[0-9]/ },
      'm': { pattern: /[0-5]/ },
      'M': { pattern: /[0-9]/ }
    },
  });
})