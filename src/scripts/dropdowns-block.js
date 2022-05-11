import { focusOnTab, focusOnTabOff } from "./tabindex-in-modals";

function dropdownsBlock(trigger, btnSelector, dropSelector, blockScroll) {
  
  const triggerBtns = document.querySelectorAll(`[${btnSelector}]`);
  const dropdowns = document.querySelectorAll(`[${dropSelector}]`);

  if (triggerBtns && dropdowns) {

    const activeBtn = trigger.target.closest(`[${btnSelector}]`);
    let clickOff;

    if (trigger.type == 'mouseover' && activeBtn) {
  
      openDrop(activeBtn);
  
      document.addEventListener('click', eventClick => {

        clickOff = document.querySelector(`.active[${dropSelector}]`) && !eventClick.target.closest(`[${btnSelector}]`) && !eventClick.target.closest(`[${dropSelector}]`);
  
        if (clickOff) {
          closeDrop();
        }
      })

    } else if (trigger.type == 'click') {

      clickOff = document.querySelector(`.active[${dropSelector}]`) && !activeBtn && !trigger.target.closest(`[${dropSelector}]`);

      if (activeBtn && !activeBtn.classList.contains('active')) {

        openDrop(activeBtn);
        
      } else if (activeBtn && activeBtn.classList.contains('active') || clickOff) {

        closeDrop();

      }
    }
  }

  function openDrop(activeBtn) {

    if (blockScroll) {
      document.querySelector('.body').classList.add('modal-open');
    }
    
    triggerBtns.forEach(item => {
      item.classList.remove('active')
    });
    dropdowns.forEach(item => {
      item.classList.remove('active')
    });
    
    const activeId = Number(activeBtn.getAttribute(btnSelector));
    const activeDrop = document.querySelector(`[${dropSelector}='${activeId}']`);

    activeBtn.classList.add('active');
    activeDrop.classList.add('active');

    closeOnEsc();
    focusOnTab(activeDrop);
  }
  function closeDrop() {

    if (blockScroll) {
      document.querySelector('.body').classList.remove('modal-open');
    }
    
    triggerBtns.forEach(item => {
      item.classList.remove('active')
    });
    dropdowns.forEach(item => {
      item.classList.remove('active')
    });

    focusOnTabOff(dropdowns)
  }
  function closeOnEsc() {
    document.addEventListener('keydown', e => {
      if (e.code == 'Escape') {
        closeDrop()
      }
    })
  }
}

export default dropdownsBlock;