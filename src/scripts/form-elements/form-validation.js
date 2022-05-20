function formValidation() {
  const forms = document.querySelectorAll('form');

  if (forms) {

    // на случай если форм на странице несколько
    forms.forEach(form => {

      const inputs = form.querySelectorAll('input');

      inputs.forEach(item => {

        let error;

        if (!item.hasAttribute('data-input-novalidate')) {

          // добавляет элемент сразу после инпута и сохраняет для ошибки

          if (item.getAttribute('type') == 'checkbox') {

            item.closest('.checkbox').insertAdjacentHTML('beforeend', `<span class='form-error'></>`);
            error = item.closest('.checkbox').querySelector('.form-error');
            
          } else if (item.closest('[data-select-input]')) {

            item.closest('.select-label').insertAdjacentHTML('beforeend', `<span class='form-error'></>`);
            error = item.closest('.select-label').querySelector('.form-error');

          } else if (item.hasAttribute('data-datepicker')) {

            item.closest('.form__label').insertAdjacentHTML('beforeend', `<span class='form-error'></>`);
            error = item.closest('.form__label').querySelector('.form-error');

          } else {
            item.insertAdjacentHTML('afterend', `<span class='form-error'></>`)
            error = item.nextElementSibling;
          }

          // после потери курсора из инпута проводит валидацию
          // если есть ошибки - обрабатывает
          // если нет - обнуляет поле ошибки

          item.addEventListener('focusout', (event) => {
      
            if (item.validity.valid) {
              // console.log('ok');
      
              error.textContent = '';
              error.className = 'form-error';
      
            } else {
              // console.log('ne ok');
    
              showError();
            }
          });
        }

        // при отправке формы повторная валидация
        form.addEventListener('submit', function (event) {

          // console.log(item.validity.valid, item.getAttribute('type') == 'checkbox' && !item.checked);
        
          if(!item.validity.valid || (item.getAttribute('type') == 'checkbox' && !item.checked)) {

            showError();
            event.preventDefault();
          } else {
            event.preventDefault();
            
            if (item.closest('.subscription-form')) {
              
              document.querySelector('.body').classList.add('modal-open');
              document.querySelector('.modals-container').classList.add('active');
              document.querySelector('[data-popup="11"]').classList.add('active');

            }

            // сделать ответ формы
          }
        });
        
        // обработка ошибок
        function showError() {
  
          // обязательное поле не заполнено
          if (item.validity.valueMissing) {
            
            if (item.getAttribute('data-input-title') == 'name') {

              error.textContent = '— заполните поле «Имя»';

            } else if (item.getAttribute('data-input-title') == 'sec-name') {

              error.textContent = '— заполните поле «Фамилия»';

            } else if (item.getAttribute('data-input-title') == 'address') {

              error.textContent = '— заполните поле «Адрес»';

            } else if (item.getAttribute('type') == 'tel' && !item.closest('.booking-popup-form')) {

              error.textContent = '— заполните поле «Телефон»';

            } else if (item.getAttribute('type') == 'email') {

              error.textContent = '— заполните поле «E-mail»';

            } else if (item.getAttribute('type') == 'checkbox' && !item.checked) {

              error.textContent = '— вы не можете продолжить без согласия с политикой конфиденциальности'

            } else {
              error.textContent = 'Обязательное поле';
            }
          
          // введенный текст не соответствует типу инпута
          } else if (item.validity.typeMismatch) {

            if (item.getAttribute('type') == 'email') {

              error.textContent = '— e-mail должен содержать символы «@», «.» проверьте правильность ввода';

            } else {
              error.textContent = 'Введено некорректно';
            }
    
          } else {
            // console.log('ne rabotaet');
          }
          
          // добавляет на ошибку активный класс
          error.className = 'form-error active';
        }
      })
    })
  }
}

export default formValidation;