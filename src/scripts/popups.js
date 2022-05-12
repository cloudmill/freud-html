import { openWindow, closeWindow } from './modals-open-close';

function popups(trigger, btnSelector, windowSelector) {

  const blockScroll = true;
  const modalsContainer = document.querySelector('.modals-container');

  const triggerBtns = document.querySelectorAll(`[${btnSelector}]`);
  const windows = document.querySelectorAll(`[${windowSelector}]`);

  if (triggerBtns && windows) {

    const activeBtn = trigger.target.closest(`[${btnSelector}]`);

    const clickOff = modalsContainer.classList.contains('active') && 
    !trigger.target.closest(`[${windowSelector}]`) && 
    !trigger.target.closest(`[${btnSelector}]`) &&
    !trigger.target.closest('.datepicker-view') || 
    trigger.target.closest('.modal__close');

    if (activeBtn) {

      openWindow(activeBtn, triggerBtns, windows, btnSelector, windowSelector, blockScroll, modalsContainer);

    } else if (clickOff) {

      closeWindow(triggerBtns, windows, blockScroll, modalsContainer);

    }
  }
}

export default popups;
