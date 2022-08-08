function inputTime() {
  const input = document.querySelector('[data-time-input]');

  if (input) {
    input.setAttribute('placeholder', 'Введите время');

    input.addEventListener('focusin', () => {
      input.setAttribute('placeholder', '__:__')
    });

    Maska.create(input, {
      tokens: {
        'h': { pattern: /[1-2]/ },
        'H': { pattern: /[0-9]/ },
        'm': { pattern: /[0-5]/ },
        'M': { pattern: /[0-9]/ }
      },
    });
  }
}

export default inputTime;