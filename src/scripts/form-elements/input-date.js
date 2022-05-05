import Datepicker from 'vanillajs-datepicker/Datepicker';
import ru from 'vanillajs-datepicker/locales/ru';

// datepicker

function inputDate() {
  Object.assign(Datepicker.locales, ru);

  const datepickerEl = document.querySelector('[data-datepicker]');

  if (datepickerEl) {
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
  }
}

export default inputDate;