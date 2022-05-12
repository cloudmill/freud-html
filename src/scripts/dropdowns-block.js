import { openWindow, closeWindow } from './modals-open-close';

function dropdownsBlock(trigger, btnSelector, windowSelector, blockScroll) {
  
  const triggerBtns = document.querySelectorAll(`[${btnSelector}]`);
  const windows = document.querySelectorAll(`[${windowSelector}]`);

  let modalsContainer = false;

  if (triggerBtns && windows) {

    const activeBtn = trigger.target.closest(`[${btnSelector}]`);
    let clickOff;

    if (trigger.type == 'mouseover' && activeBtn) {
  
      openWindow(activeBtn, triggerBtns, windows, btnSelector, windowSelector, blockScroll, modalsContainer);

      document.querySelector('.header__top').addEventListener('mouseover', e => {
        
        if (e.relatedTarget == document.querySelector('.header__bottom')) {
          closeWindow(triggerBtns, windows, blockScroll, modalsContainer);
        }
      });
  
      document.addEventListener('click', eventClick => {

        clickOff = document.querySelector(`.active[${windowSelector}]`) && 
        !eventClick.target.closest(`[${btnSelector}]`) && 
        !eventClick.target.closest(`[${windowSelector}]`);
  
        if (clickOff) {
          closeWindow(triggerBtns, windows, blockScroll, modalsContainer);
        }
      });

    } else if (trigger.type == 'click') {

      clickOff = document.querySelector(`.active[${windowSelector}]`) &&
      !activeBtn && 
      !trigger.target.closest(`[${windowSelector}]`);

      if (activeBtn && !activeBtn.classList.contains('active')) {

        openWindow(activeBtn, triggerBtns, windows, btnSelector, windowSelector, blockScroll, modalsContainer);
        
      } else if (activeBtn && activeBtn.classList.contains('active') || clickOff) {

        closeWindow(triggerBtns, windows, blockScroll, modalsContainer);

      }
    }
  }
}

export default dropdownsBlock;