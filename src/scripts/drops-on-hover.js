import { closeWindow } from './modals-open-close';
import { focusOnTab } from "./tabindex-in-modals";

export default function dropOnHover(activeBtn, btnSelector, windowSelector, triggerBtns, windows, blockScroll, modalsContainer, clickOff) {

  if (activeBtn.classList.contains('active')) {

    closeWindow(triggerBtns, windows, blockScroll, modalsContainer)
    
  } else {

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

    function closeOnMouseover(e) {
      if (!e.target.closest('.header')) {
        closeWindow(triggerBtns, windows, blockScroll, modalsContainer);
        document.removeEventListener('mouseover', closeOnMouseover)
      }
    };

    document.addEventListener('mouseover', closeOnMouseover);

    document.addEventListener('click', eventClick => {

      clickOff = document.querySelector(`.active[${windowSelector}]`) && 
      !eventClick.target.closest(`[${btnSelector}]`) && 
      !eventClick.target.closest(`[${windowSelector}]`);

      if (clickOff) {
        closeWindow(triggerBtns, windows, blockScroll, modalsContainer);
      }
    });
  }
}