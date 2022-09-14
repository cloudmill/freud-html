function inputTel() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  // Удаление любых символов кроме цифр
  const getInputNumbersValue = (input) => {
    return input.value.replace(/\D/g, "");
  };

  // Очистка вставленного целиком номера
  const onPhonePaste = (e) => {

    var input = e.target;
    var inputNumbersValue = getInputNumbersValue(input);
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
  const onPhoneInput = (e) => {
    let input = e.target;
    let inputNumbersValue = getInputNumbersValue(input);
    let selectionStart = input.selectionStart;
    let formattedInputValue = "";

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

  const onPhoneKeyDown = (e) => {
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
}

export default inputTel;