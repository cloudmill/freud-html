import { openWindow, closeWindow } from './modals-open-close';
import { focusOnTab, focusOnTabOff } from "./tabindex-in-modals";

function dropdownsBlock(trigger, btnSelector, windowSelector, blockScroll) {
  
  const triggerBtns = document.querySelectorAll(`[${btnSelector}]`);
  const windows = document.querySelectorAll(`[${windowSelector}]`);

  let modalsContainer = false;

  if (triggerBtns && windows) {

    const activeBtn = trigger.target.closest(`[${btnSelector}]`);
    let clickOff;

    if (trigger.type == 'mouseover' && activeBtn) {
  
      if (blockScroll) {
        document.querySelector('.body').classList.add('modal-open');
      }
      if (modalsContainer) {
        modalsContainer.classList.add('active');
      }
    
      const activeId = Number(activeBtn.getAttribute(btnSelector));
      const activeWindow = document.querySelector(`[${windowSelector}='${activeId}']`);

      triggerBtns.forEach(item => {
        if (item.getAttribute(btnSelector) !== activeId) {
          item.classList.remove('active')
        }
      });
      
      windows.forEach(item => {

        if (item.classList.contains('header-modals__item')) {

          if (item !== activeWindow) {
            item.style.zIndex = '4';
  
            setTimeout(() => {
              item.classList.remove('active');
              item.style.zIndex = '';
            }, 300);
            
          }
          
        } else {

          item.classList.remove('active');

        }

      });
    
      activeBtn.classList.add('active');
      activeWindow.classList.add('active');
    
      if (activeWindow.querySelector('[data-focus-input]')) {
        activeWindow.querySelector('[data-focus-input]').focus();
      }
    
      focusOnTab(activeWindow);

      document.querySelector('.header__top').addEventListener('mouseover', e => {
        
        if (e.relatedTarget == document.querySelector('.header__bottom')) {
          closeWindow(triggerBtns, windows, blockScroll, modalsContainer);
        }
      });

      document.querySelector('[data-drop-close]').addEventListener('mouseover', e => {
        
        closeWindow(triggerBtns, windows, blockScroll, modalsContainer);

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