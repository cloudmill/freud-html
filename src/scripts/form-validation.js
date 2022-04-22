document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelectorAll('form');

  if (form) {

    const email = document.querySelector('[data-input-mail]');

    email.addEventListener('focusout', function (event) {

      console.log('out');

      if (email.validity.typeMismatch) {
        email.setCustomValidity("Некорректный email-адрес");
        console.log(123);
      } else {
        email.setCustomValidity("Yooo");
        console.log(321);
      }
    }); 
  }
})