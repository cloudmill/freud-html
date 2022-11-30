function formValidation() {
  const forms = document.querySelectorAll('form');

  if (forms.length) {

    // на случай если форм на странице несколько
    forms.forEach(form => {

      if (!form.hasAttribute('data-search-block')) {

        const inputs = form.querySelectorAll('input');

        inputs.forEach(item => {

          if (!(item.getAttribute('type') === 'hidden') && !(item.getAttribute('type') === 'submit')) {

            let error;

            if (!item.hasAttribute('data-input-novalidate')) {

              // добавляет элемент для текста ошибки в зависимости от верстки

              if (!item.hasAttribute('data-error-span-added')) {
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
              }

              item.setAttribute('data-error-span-added', '');

              // после потери курсора из инпута проводит валидацию
              // если есть ошибки - обрабатывает
              // если нет - обнуляет поле ошибки

              item.addEventListener('focusout', (event) => {

                if (item.validity.valid && !item.hasAttribute('data-readonly') && !(item.getAttribute('type') === 'tel') || 
                  item.hasAttribute('data-readonly') && !item.value.length ||
                  item.getAttribute('type') === 'tel' && item.value.replace(/\D/g, "").length === 11 && (item.value.replace(/\D/g, "")[0] == '7' || item.value.replace(/\D/g, "")[0] == '8') ||
                  item.hasAttribute('data-time-input') && !item.hasAttribute('data-valid')) {

                  // console.log('focusout ok');
          
                  error.textContent = '';
                  error.className = 'form-error';
          
                } else {
                  // console.log('focusout error');
        
                  showError();

                  // if (item.getAttribute('type') === 'tel') {
                  //   console.log(item.getAttribute('type') === 'tel', item.value.replace(/\D/g, "").length === 11, item.value.replace(/\D/g, "")[0], item.value.replace(/\D/g, "")[0] == ('7' || '8'));
                  // }
                }
              
              });

              // при отправке формы повторная валидация
              form.addEventListener('submit', function (event) {

                event.preventDefault();

                setTimeout(() => {

                  if (!item.validity.valid || 
                    (item.getAttribute('type') == 'checkbox' && !item.checked) || 
                    item.hasAttribute('data-readonly') && !item.value.length || 
                    item.getAttribute('type') === 'tel' && item.value.replace(/\D/g, "").length !== 11 && (item.value.replace(/\D/g, "")[0] !== '7' || item.value.replace(/\D/g, "")[0] !== '8') ||
                    item.hasAttribute('data-time-input') && item.hasAttribute('data-valid')) {
      
                    showError(item, !item.validity.valid);
      
                    console.log('submit error');
      
                  } else {

                    // console.log(item);
      
                    error.className = 'form-error';
                    error.textContent = '';
                    
                    console.log('submit success');
                    
                  }
                  
                }, );
              
                setTimeout(() => {

                  if (!item.closest('form').querySelector('.form-error.active')) {

                    // console.log('finally success');

                    if (item.closest('.subscription-form')) {
                      
                      document.querySelector('.body').classList.add('modal-open');
                      document.querySelector('.modals-container').classList.add('active');
                      document.querySelector('[data-popup="11"]').classList.add('active');
      
                    } else if (item.closest('.product-body-consult')) {
      
                      document.querySelector('.body').classList.add('modal-open');
                      document.querySelector('.modals-container').classList.add('active');
                      document.querySelector('[data-popup="13"]').classList.add('active');
      
                    } else if (item.closest('#certificates-form') || item.closest('#consult-form')) {
      
                      document.querySelector('[data-popup="13"]').classList.add('active');
      
                    } else if (item.closest('#booking-form')) {
      
                      document.querySelector('[data-popup="16"]').classList.add('active');
      
                    }

                    if (!item.closest('[data-cart-form]')) {
                      setTimeout(() => {
                        item.value = '';
                      }, 500);
                    }
                    
                  }
                  
                }, 100);
                
              });
            }

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
        
              } else if (item.hasAttribute('data-readonly') && !item.value.length) {
                error.textContent = 'Обязательное поле';

              } else if (item.getAttribute('type') === 'tel' && (item.value.replace(/\D/g, "").length < 11 || !(item.value.replace(/\D/g, "")[0] == '7') || !(item.value.replace(/\D/g, "")[0] == '8'))) {

                error.textContent = 'Неверный номер';

              } else {
                // console.log('ne rabotaet');
              }
              
              // добавляет на ошибку активный класс
              error.className = 'form-error active';
            } 
          }
        }) 
      }
    })
  }
}

export default formValidation;
