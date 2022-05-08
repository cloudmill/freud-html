function filterDrops() {

  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const filterDrops = document.querySelectorAll('[data-filter-drop]');

  focusOnTabOff();

  if (filterBtns.length) {
    
    window.addEventListener('click', e => {

      const clickedBtn = e.target.closest('[data-filter-btn]');
      const clickOff = document.querySelector('.active[data-filter-drop]') && !e.target.closest('[data-filter-btn]') && !e.target.closest('[data-filter-drop]');

      if (clickedBtn) {

        openDrop(clickedBtn);
        closeOnEsc();
        
      } else if (clickOff) {
        closeDrop()
      }
    })
  }

  function openDrop(clickedBtn) {

    filterDrops.forEach(item => {
      item.classList.remove('active')
    });

    const activeId = Number(clickedBtn.getAttribute('data-filter-btn'));
    const activeDrop = document.querySelector(`[data-filter-drop='${activeId}']`);

    activeDrop.classList.add('active');

    focusOnTab(activeDrop)
  }
  function closeDrop() {
    filterDrops.forEach(item => {
      item.classList.remove('active')
    });
    focusOnTabOff();
  }
  function closeOnEsc() {
    document.addEventListener('keydown', e => {
      if (e.code == 'Escape') {
        closeDrop()
      }
    })
  }
  function focusOnTab(activeDrop) {

    activeDrop.querySelectorAll('a').forEach(item => {
      item.setAttribute('tabindex', '0')
    });
    activeDrop.querySelectorAll('input').forEach(item => {
      item.setAttribute('tabindex', '0')
    });
    activeDrop.querySelectorAll('button').forEach(item => {
      item.setAttribute('tabindex', '0')
    });
  }
  function focusOnTabOff() {
    filterDrops.forEach(item => {

      item.querySelectorAll('a').forEach(link => {
        link.setAttribute('tabindex', '-1')
      });
      item.querySelectorAll('input').forEach(input => {
        input.setAttribute('tabindex', '-1')
      });
      item.querySelectorAll('button').forEach(button => {
        button.setAttribute('tabindex', '-1')
      });
    })
  }
}

export default filterDrops;