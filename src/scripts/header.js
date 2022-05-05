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

function headerDrops() {
  const headerBtns = document.querySelectorAll('[data-header-btn]');
  const headerModals = document.querySelectorAll('[data-header-modal]');

  if (headerBtns.length) {

    window.addEventListener('click', e => {

      const clickedBtn = e.target.closest('[data-header-btn]');
      const clickOff = document.querySelector('.active[data-header-modal]') && !e.target.closest('[data-header-btn]') && !e.target.closest('[data-header-modal]');

      if (clickedBtn) {
        openModal(clickedBtn)
      } else if (clickOff) {
        closeAllModal()
      }
    })
  }

  function openModal(clickedBtn) {
    
    headerModals.forEach(item => {
      item.classList.remove('active')
    });

    const activeId = Number(clickedBtn.getAttribute('data-header-btn'));
    document.querySelector(`[data-header-modal='${activeId}']`).classList.add('active');
  }

  function closeAllModal() {
    headerModals.forEach(item => {
      item.classList.remove('active')
    });
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
