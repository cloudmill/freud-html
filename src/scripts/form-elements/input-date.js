import Datepicker from 'vanillajs-datepicker/Datepicker';
import ru from 'vanillajs-datepicker/locales/ru';
import { mediaQuery } from '../mediaQueries';

function inputDate() {
  Object.assign(Datepicker.locales, ru);

  const datepickerEl = document.querySelector('[data-datepicker]');

  if (datepickerEl) {

    let dateNow = new Date();
    let dateNowString = dateNow.toLocaleDateString('en-GB').replace(/\D/g, '/');
    let dateMax = '31/12/' + String(dateNow.getFullYear() + 1);

    new Datepicker(datepickerEl, {
      format: 'dd/mm/yyyy',
      autohide: true,
      language: 'ru',
      orientation: 'top',
      maxView: 2,
      minDate: dateNowString,
      maxDate: dateMax,
  
      prevArrow: `<svg class="datepicker-arrow" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 11L1 6L6 1" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      nextArrow: `<svg class="datepicker-arrow next" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 11L1 6L6 1" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,

    });

    if (!mediaQuery.matches) {
    
      document.querySelector('[data-datepicker]').addEventListener('click', () => {
  
        setTimeout(() => {
          document.querySelector('[data-datepicker]').scrollIntoView({
            behavior: 'smooth',
            block: 'end'
          });
        }, );
  
      })
    }
  }
}

export default inputDate;
