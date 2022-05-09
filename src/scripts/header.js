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

function headerDrops(eventClick) {
  const headerBtns = document.querySelectorAll('[data-header-btn]');
  const headerModals = document.querySelectorAll('[data-header-modal]');

  if (headerBtns.length) {
    
    const clickedBtn = eventClick.target.closest('[data-header-btn]');

    let clickOff;

    if (clickedBtn) {
      clickOff = document.querySelector('.active[data-header-modal]') && !eventClick.target.closest('[data-header-btn]') && !eventClick.target.closest('[data-header-modal]') || clickedBtn.classList.contains('active');
    } else {
      clickOff = document.querySelector('.active[data-header-modal]') && !eventClick.target.closest('[data-header-btn]') && !eventClick.target.closest('[data-header-modal]');
    }

    if (clickedBtn && !clickedBtn.classList.contains('active')) {
      openModal(clickedBtn);
      closeOnEsc();

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
    
    const activeId = Number(clickedBtn.getAttribute('data-header-btn'));
    const activeModal = document.querySelector(`[data-header-modal='${activeId}']`);

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

export { headerOnScroll, headerDrops }
