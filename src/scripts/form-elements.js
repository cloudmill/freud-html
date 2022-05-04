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

  const selectForms = document.querySelectorAll('[data-select-context]');

  if (selectForms.length) {

    selectForms.forEach(item => {
      item.addEventListener('click', e => {

        const selectContext = e.target.closest('[data-select-context]');
  
        const clickedInput = e.target.closest('[data-select-input]');
        const clickedSelect = e.target.closest('[data-select]');
        const clickedOption = e.target.closest('[data-select-option]');
  
        const clickOff = selectContext.querySelector('.select-label.active') && e.target.closest('[data-select-context]') && !e.target.closest('[data-select]');
  

        if (clickedInput) {
  
          openSelect(clickedInput)
  
        } else if (clickedSelect) {
  
          if (clickedOption) {
  
            postOption(clickedOption)
  
          }
  
        } else if (clickOff) {
  
          selectContext.querySelector('.select-label.active').classList.remove('active')
  
        }
      })
    })  
  }

  function openSelect(clickedInput) {

    const selectLabels = document.querySelectorAll('[data-select-label]');
    
    const activeLabel = clickedInput.closest('[data-select-label]');

    if (activeLabel.classList.contains('active')) {

      activeLabel.classList.remove('active')

    } else {

      selectLabels.forEach(item => {
        item.classList.remove('active')
      });

      activeLabel.classList.add('active');
    }

  }

  function postOption(clickedOption) {

    const currLabel = clickedOption.closest('.select-label.active');
    const currInput = currLabel.querySelector('input');

    currInput.value = clickedOption.getAttribute('data-select-option');

    currLabel.classList.remove('active');
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