function tabOffGlobal() {
  const headerModals = document.querySelectorAll('[data-header-modal]');
  const filterDrops = document.querySelectorAll('[data-filter-drop]');
  const popups = document.querySelectorAll('[data-popup]');

  headerModals.forEach(item => {

    item.querySelectorAll('a').forEach(link => {
      link.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('input').forEach(input => {
      input.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('button').forEach(button => {
      button.setAttribute('tabindex', '-1')
    });
  });
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
  });
  popups.forEach(item => {

    item.querySelectorAll('input').forEach(input => {
      input.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('a').forEach(link => {
      link.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('button').forEach(button => {
      button.setAttribute('tabindex', '-1')
    });
  });
}

function focusOnTab(activeModal) {
  activeModal.querySelectorAll('input').forEach(input => {
    input.setAttribute('tabindex', '0')
  });
  activeModal.querySelectorAll('button').forEach(button => {
    button.setAttribute('tabindex', '0')
  });
  activeModal.querySelectorAll('a').forEach(link => {
    link.setAttribute('tabindex', '0')
  });
}

function focusOnTabOff(modals) {
  modals.forEach(item => {

    item.querySelectorAll('input').forEach(input => {
      input.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('button').forEach(button => {
      button.setAttribute('tabindex', '-1')
    });
    item.querySelectorAll('a').forEach(link => {
      link.setAttribute('tabindex', '-1')
    });
  })
}

export { tabOffGlobal, focusOnTab, focusOnTabOff };
