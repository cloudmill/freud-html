function filterDrops(eventClick) {

  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const filterDrops = document.querySelectorAll('[data-filter-drop]');

  if (filterBtns.length) {

    const clickedBtn = eventClick.target.closest('[data-filter-btn]');
    let clickOff = document.querySelector('.active[data-filter-drop]') && !clickedBtn && !eventClick.target.closest('[data-filter-drop]');

    if (clickedBtn && !clickedBtn.classList.contains('active')) {
      openDrop(clickedBtn);
      closeOnEsc();
    } else if (clickedBtn && clickedBtn.classList.contains('active')) {
      closeDrop()
    } else if (clickOff) {
      closeDrop()
    }
  }

  function openDrop(clickedBtn) {

    if (document.querySelector('.active[data-filter-btn]')) {
      document.querySelector('.active[data-filter-btn]').classList.remove('active');
    }
    if (document.querySelector('.active[data-filter-drop]')) {
      document.querySelector('.active[data-filter-drop]').classList.remove('active');
    }

    clickedBtn.classList.add('active');
    const activeId = Number(clickedBtn.getAttribute('data-filter-btn'));
    const activeDrop = document.querySelector(`[data-filter-drop='${activeId}']`);

    activeDrop.classList.add('active');

    focusOnTab(activeDrop)
  }
  function closeDrop() {
    if (document.querySelector('.active[data-filter-btn]')) {
      document.querySelector('.active[data-filter-btn]').classList.remove('active');
    }
    if (document.querySelector('.active[data-filter-drop]')) {
      document.querySelector('.active[data-filter-drop]').classList.remove('active');
    }

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