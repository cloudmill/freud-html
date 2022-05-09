function select() {
  const selectForms = document.querySelectorAll('[data-select-context]');

  if (selectForms.length) {

    selectForms.forEach(item => {
      item.addEventListener('click', e => {

        const selectContext = e.target.closest('[data-select-context]');
  
        const clickedInput = e.target.closest('[data-select-input]');
        const clickedSelect = e.target.closest('[data-select]');
        const clickedOption = e.target.closest('[data-select-option]');
  
        const clickOff = selectContext.querySelector('.select-label.active') && e.target.closest('[data-select-context]') && !e.target.closest('[data-select]');
  

        if (clickedInput) {
          openSelect(clickedInput)
        } else if (clickedSelect) {
          if (clickedOption) {
            postOption(clickedOption)
          }
        } else if (clickOff) {
          selectContext.querySelector('.select-label.active').classList.remove('active')
        }
      })
    })  
  }

  function openSelect(clickedInput) {

    const selectLabels = document.querySelectorAll('[data-select-label]');
    
    const activeLabel = clickedInput.closest('[data-select-label]');

    if (activeLabel.classList.contains('active')) {

      activeLabel.classList.remove('active')

    } else {

      selectLabels.forEach(item => {
        item.classList.remove('active')
      });

      activeLabel.classList.add('active');
    }

  }
  function postOption(clickedOption) {

    const currLabel = clickedOption.closest('.select-label.active');
    const currInput = currLabel.querySelector('input');

    currInput.value = clickedOption.getAttribute('data-select-option');

    currLabel.classList.remove('active');
  }
}

export default select;