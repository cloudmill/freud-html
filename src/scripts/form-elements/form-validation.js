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
          item.insertAdjacentHTML('afterend', `<span class='form-error'></>`)
          error = item.nextElementSibling;

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
        
          if(!item.validity.valid) {
            showError();
            event.preventDefault();
          }
        });
        
        // обработка ошибок
        function showError() {
  
          // обязательное поле не заполнено
          if(item.validity.valueMissing) {
            error.textContent = 'Обязательное поле';
          
          // введенный текст не соответствует типу инпута
          } else if (item.validity.typeMismatch) {
            error.textContent = 'Введено некорректно';
    
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