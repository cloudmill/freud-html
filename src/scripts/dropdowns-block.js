import { openWindow, closeWindow } from './modals-open-close';
import dropOnHover from './drops-on-hover';

function dropdownsBlock(trigger, btnSelector, windowSelector, blockScroll) {
  
  const triggerBtns = document.querySelectorAll(`[${btnSelector}]`);
  const windows = document.querySelectorAll(`[${windowSelector}]`);

  let modalsContainer = false;

  if (triggerBtns && windows) {

    const activeBtn = trigger.target.closest(`[${btnSelector}]`);
    let clickOff;

    if (trigger.type == 'mouseover' && activeBtn) {
    
      dropOnHover(activeBtn, btnSelector, windowSelector, triggerBtns, windows, blockScroll, modalsContainer, clickOff, trigger)

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