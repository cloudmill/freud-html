function formValidation() {
  const forms = document.querySelectorAll('form');
  let error;

  if (forms.length) {

    // на случай если форм на странице несколько
    forms.forEach(form => {

      const inputs = form.querySelectorAll('input');

      inputs.forEach(item => {

        if (!item.hasAttribute('data-input-novalidate')) {

          // добавляет блок для текста ошибки в зависимости от верстки
          addingErrorBlock(item);
          errorDefinition(item);

          // после потери курсора из инпута проводит валидацию
          // если есть ошибки - обрабатывает
          // если нет - обнуляет поле ошибки

          item.addEventListener('focusout', () => {
      
            if (!item.validity.valid || 
              item.hasAttribute('data-readonly') && !item.value.length || 
              item.getAttribute('type') == 'tel' && chekTel(item)) {
      
              showError(item, error);
      
            } else {
    
              error.textContent = '';
              error.classList.remove('active');
            }
          });
        }        
      })

      // при отправке формы повторная валидация
      form.addEventListener('submit', (event) => {

        event.preventDefault();

        inputs.forEach(item => {

          errorDefinition(item);

          // console.log(!item.validity.valid, item.getAttribute('type') == 'checkbox' && !item.checked, item.getAttribute('type') == 'tel' && chekTel(item));

          if (!item.validity.valid || 
            (item.getAttribute('type') == 'checkbox' && !item.checked) || 
            item.hasAttribute('data-readonly') && !item.value.length || 
            item.getAttribute('type') == 'tel' && chekTel(item)) {
  
            showError(item, error);
            
            console.log('form-error');
  
          } else {
            form.querySelectorAll('.form-error.active').forEach(errors => {
              errors.classList.remove('active')
            })
          }
        })

        setTimeout(() => {

          if (!form.querySelector('.form-error.active')) {
            if (form.closest('.subscription-form')) {
              
              document.querySelector('.body').classList.add('modal-open');
              document.querySelector('.modals-container').classList.add('active');
              document.querySelector('[data-popup="11"]').classList.add('active');

            } else if (form.closest('.product-body-consult')) {

              document.querySelector('.body').classList.add('modal-open');
              document.querySelector('.modals-container').classList.add('active');
              document.querySelector('[data-popup="13"]').classList.add('active');

            } else if (form.closest('#certificates-form') || form.closest('#consult-form')) {

              document.querySelector('[data-popup="13"]').classList.add('active');

            } else if (form.closest('#booking-form')) {

              document.querySelector('[data-popup="16"]').classList.add('active');

            }
          } 
        }, );
      });
    })
  }

  // проверка телефона
  function chekTel(input) {

    if (input.getAttribute('type') == 'tel') {

      console.log('ku');

      const value = input.value.replace(/\D/g, "");

      console.log(value[0] === 7, value[0] === 8, value.length < 10);

      if ((value[0] === 7 || value[0] === 8) || value.length < 10) {
        return true
      }
      return false
      
    }
  }

  // обработка ошибок
  function showError(item, error) {
    
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
    } else if (item.getAttribute('type') == 'tel') {

      error.textContent = 'Неверный формат';

    } else {
      // console.log('ne rabotaet');
    }
    
    // добавляет на ошибку активный класс
    error.classList.add('active');
  }

  // добавление элемента ошибки
  function addingErrorBlock(item) {
    if (item.getAttribute('type') == 'checkbox') {

      item.closest('.checkbox').insertAdjacentHTML('beforeend', `<span class='form-error'></>`);
      
    } else if (item.closest('[data-select-input]')) {

      item.closest('.select-label').insertAdjacentHTML('beforeend', `<span class='form-error'></>`);

    } else if (item.hasAttribute('data-datepicker')) {

      item.closest('.form__label').insertAdjacentHTML('beforeend', `<span class='form-error'></>`);

    } else {
      item.insertAdjacentHTML('afterend', `<span class='form-error'></>`)
    }
  }

  // нахождение блока ошибки
  function errorDefinition(item) {
    if (item.getAttribute('type') == 'checkbox') {
      error = item.closest('.checkbox').querySelector('.form-error');
    } else if (item.closest('[data-select-input]')) {
      error = item.closest('.select-label').querySelector('.form-error');
    } else if (item.hasAttribute('data-datepicker')) {
      error = item.closest('.form__label').querySelector('.form-error');
    } else {
      error = item.nextElementSibling;
    }
  }
}

export default formValidation;
