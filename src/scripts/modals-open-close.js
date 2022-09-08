import { focusOnTab, focusOnTabOff } from "./tabindex-in-modals";


function openWindow(activeBtn, triggerBtns, windows, btnSelector, windowSelector, blockScroll, modalsContainer) {

  if (blockScroll) {
    document.querySelector('.body').classList.add('modal-open');
  }
  if (modalsContainer) {
    modalsContainer.classList.add('active');
  }

  triggerBtns.forEach(item => {
    item.classList.remove('active')
  });
  windows.forEach(item => {
    item.classList.remove('active')
  });

  const activeId = Number(activeBtn.getAttribute(btnSelector));
  const activeWindow = document.querySelector(`[${windowSelector}='${activeId}']`);

  activeBtn.classList.add('active');
  activeWindow.classList.add('active');

  if (activeWindow.querySelector('[data-focus-input]')) {
    activeWindow.querySelector('[data-focus-input]').focus();
  }

  focusOnTab(activeWindow);
}

function closeWindow(triggerBtns, windows, blockScroll, modalsContainer) {

  if (blockScroll) {
    document.querySelector('.body').classList.remove('modal-open');
  }
  if (modalsContainer) {
    modalsContainer.classList.remove('active');
  }

  triggerBtns.forEach(item => {
    item.classList.remove('active')
  });
  windows.forEach(item => {
    item.classList.remove('active')
  });

  focusOnTabOff(windows)

}

function closeOnEsc() {
  document.addEventListener('keydown', e => {
    if (e.code == 'Escape') {

      if (document.querySelector('.modals-container.active') || document.querySelector('.active[data-popup]')) {

        document.querySelector('.body.modal-open').classList.remove('modal-open');
        document.querySelector('.modals-container.active').classList.remove('active');

        document.querySelectorAll('.active[data-popup]').forEach(item => {
          item.classList.remove('active')
        });

      } else if (document.querySelector('.active[data-filter-drop]')) {

        document.querySelector('.active[data-filter-drop]').classList.remove('active')

      } else if (document.querySelector('.active[data-header-modal]')) {

        document.querySelector('.active[data-header-modal]').classList.remove('active');
        document.querySelector('.body.modal-open').classList.remove('modal-open');

      }
    }
  })
}

export { openWindow, closeWindow, closeOnEsc };
