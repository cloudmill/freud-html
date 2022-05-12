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

  document.addEventListener('keydown', e => {
    if (e.code == 'Escape') {
      closeWindow(triggerBtns, windows, modalsContainer);

      if (modalsContainer) {
        modalsContainer.classList.remove('active');
      }
    }
  })

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

export { openWindow, closeWindow };
