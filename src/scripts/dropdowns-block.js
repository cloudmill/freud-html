function dropdownsBlock(eventClick, btnSelector, dropSelector, blockScroll) {
  
  const triggerBtns = document.querySelectorAll(`[${btnSelector}]`);
  const dropdowns = document.querySelectorAll(`[${dropSelector}]`);

  if (triggerBtns.length) {
    
    const clickedBtn = eventClick.target.closest(`[${btnSelector}]`);

    const clickOff = document.querySelector(`.active[${dropSelector}]`) && !clickedBtn && !eventClick.target.closest(`[${dropSelector}]`);

    if (clickedBtn && !clickedBtn.classList.contains('active')) {
      openDrop(clickedBtn);
      closeOnEsc();
      
      if (blockScroll) {
        document.querySelector('.body').classList.add('modal-open');
      }
    } else if (clickedBtn && clickedBtn.classList.contains('active')) {
      closeDrop();

      if (blockScroll) {
        document.querySelector('.body').classList.remove('modal-open');
      }
    } else if (clickOff) {
      closeDrop();

      if (blockScroll) {
        document.querySelector('.body').classList.remove('modal-open');
      }
    }
  }

  function openDrop(clickedBtn) {
    
    triggerBtns.forEach(item => {
      item.classList.remove('active')
    });
    dropdowns.forEach(item => {
      item.classList.remove('active')
    });
    
    const activeId = Number(clickedBtn.getAttribute(btnSelector));
    const activeDrop = document.querySelector(`[${dropSelector}='${activeId}']`);

    clickedBtn.classList.add('active');
    activeDrop.classList.add('active');

    focusOnTab(activeDrop);
  }
  function closeDrop() {
    
    triggerBtns.forEach(item => {
      item.classList.remove('active')
    });
    dropdowns.forEach(item => {
      item.classList.remove('active')
    });

    focusOnTabOff()
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
    dropdowns.forEach(item => {

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

export default dropdownsBlock;