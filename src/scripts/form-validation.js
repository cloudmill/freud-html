document.addEventListener('DOMContentLoaded', () => {

  const forms = document.querySelectorAll('form');

  if (forms) {

    // на случай если форм на странице несколько
    forms.forEach(form => {

      const inputs = form.querySelectorAll('input');

      inputs.forEach(item => {

        // добавляет элемент сразу после инпута и сохраняет для ошибки
        item.insertAdjacentHTML('afterend', `<span class='form-error'></>`)
        const error = item.nextElementSibling;

        // после потери курсора из инпута проводит валидацию
        // если есть ошибки - обрабатывает
        // если нет - обнуляет поле ошибки

        if (!item.hasAttribute('data-select-input')) {
          item.addEventListener('focusout', (event) => {
      
            if (item.validity.valid) {
              console.log('ok');
      
              error.textContent = '';
              error.className = 'form-error';
      
            } else {
              console.log('ne ok');
    
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
            console.log('ne rabotaet');
          }
          
          // добавляет на ошибку активный класс
          error.className = 'form-error active';
        }
      })
    })
  }
})

// маска для полей с номером телефона

document.addEventListener("DOMContentLoaded", function () {
  var phoneInputs = document.querySelectorAll('input[type="tel"]');

  var getInputNumbersValue = function (input) {
    // Удаление любых символов крме цифр
    return input.value.replace(/\D/g, "");
  };

  // Очистка скопированного и вставленного в поле номера
  var onPhonePaste = function (e) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    var pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      var pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
        return;
      }
    }
  };

  // Обработка вписанного вручную номера
  var onPhoneInput = function (e) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      var firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    if (/^\+0+/g.test(formattedInputValue)) {
      const result = formattedInputValue.replace(/^\+0+/g, "");

      if (result.length > 0) {
        input.value = `+${result}`;
      } else {
        input.value = "";
      }
    } else {
      input.value = formattedInputValue.replace(/^\+0+/g, "");
    }
  };

  var onPhoneKeyDown = function (e) {
    // Удаление первого символа после удаления номера
    var inputValue = e.target.value.replace(/\D/g, "");
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  };

  for (var phoneInput of phoneInputs) {
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("input", onPhoneInput, false);
    phoneInput.addEventListener("paste", onPhonePaste, false);
  }
});