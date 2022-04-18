window.addEventListener('DOMContentLoaded', () => {

  const spoilers = document.querySelectorAll('[data-spoiler]');

  if (spoilers) {
    
    const buttons = document.querySelectorAll('[data-spoiler-btn]');

    buttons.forEach(item => {

      item.addEventListener('click', event => {
        console.log('click');

        const currentSpoiler = event.target.closest('[data-spoiler]');

        // spoilers.forEach(item => item.classList.remove('active'));
        currentSpoiler.classList.toggle('active');
      })
    })
  }
})