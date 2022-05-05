// input time mask

function inputTime() {
  const input = document.querySelector('[data-time-mask]');

  if (input) {
    input.setAttribute('placeholder', 'Введите время');

    input.addEventListener('focusin', () => {
      input.setAttribute('placeholder', '__:__')
    });

    Maska.create(input, {
      mask: 'hH:mM',
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