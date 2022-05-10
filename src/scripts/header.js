function headerOnScroll() {
  const header = document.querySelector('.header');
  let scrollTop = window.pageYOffset;

  window.addEventListener('scroll', scroll, {once:true});

  function scroll() {
    update();

    setTimeout(() => {
      update();

      window.addEventListener('scroll', scroll, {once:true});

    }, 1000 / 120)
  };

  function update() {
    let newScrollTop = window.pageYOffset;

    if (Math.abs(scrollTop - newScrollTop) >= 1) {
      if (newScrollTop > scrollTop) {
        header.classList.add('header--short')
      } else {
        header.classList.remove('header--short')
      }
    }

    if (scrollTop < 1) {
      header.classList.remove('header--short')
    }

    scrollTop = newScrollTop;
  }
}

function headerDrops(eventClick, btnSelector, modalSelector) {

  const headerBtns = document.querySelectorAll(`[${btnSelector}]`);
  const headerModals = document.querySelectorAll(`[${modalSelector}]`);

  if (headerBtns.length) {
    
    const clickedBtn = eventClick.target.closest(`[${btnSelector}]`);

    let clickOff = document.querySelector(`.active[${modalSelector}]`) && !eventClick.target.closest(`[${btnSelector}]`) && !eventClick.target.closest(`[${modalSelector}]`);

    if (clickedBtn && !clickedBtn.classList.contains('active')) {
      openModal(clickedBtn);
      closeOnEsc();
    } else if (clickedBtn && clickedBtn.classList.contains('active')) {
      closeAllModal();
    } else if (clickOff) {
      closeAllModal();
    }
  }

  function openModal(clickedBtn) {
    
    headerBtns.forEach(item => {
      item.classList.remove('active')
    });
    headerModals.forEach(item => {
      item.classList.remove('active')
    });
    
    const activeId = Number(clickedBtn.getAttribute(btnSelector));
    const activeModal = document.querySelector(`[${modalSelector}='${activeId}']`);

    clickedBtn.classList.add('active');
    activeModal.classList.add('active');
    document.querySelector('.body').classList.add('modal-open');

    focusOnTab(activeModal);
  }
  function closeAllModal() {
    
    headerBtns.forEach(item => {
      item.classList.remove('active')
    });
    headerModals.forEach(item => {
      item.classList.remove('active')
    });

    document.querySelector('.body').classList.remove('modal-open');

    focusOnTabOff()
  }
  function closeOnEsc() {
    document.addEventListener('keydown', e => {
      if (e.code == 'Escape') {
        closeAllModal()
      }
    })
  }
  function focusOnTab(activeModal) {

    activeModal.querySelectorAll('a').forEach(item => {
      item.setAttribute('tabindex', '0')
    });
    activeModal.querySelectorAll('input').forEach(item => {
      item.setAttribute('tabindex', '0')
    });
    activeModal.querySelectorAll('button').forEach(item => {
      item.setAttribute('tabindex', '0')
    });
  }
  function focusOnTabOff() {
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
    })
  } 
}

function headerFavAndCartModals() {
  const icoBtns = document.querySelectorAll('.header__buttons-icon');

  if (icoBtns.length) {
    icoBtns.forEach(item => {
  
      if (item.classList.contains('count')) {
    
        if (item.hasAttribute('data-fav-btn')) {
          item.setAttribute('data-header-btn', '5');
        } else if (item.hasAttribute('data-cart-btn')) {
          item.setAttribute('data-header-btn', '6');
        }
    
      } else {
        
        if (item.hasAttribute('data-fav-btn')) {
          item.setAttribute('data-header-btn', '3');
        } else if (item.hasAttribute('data-cart-btn')) {
          item.setAttribute('data-header-btn', '4');
        }
      }

    })
  }
}

export { headerOnScroll, headerDrops, headerFavAndCartModals }
