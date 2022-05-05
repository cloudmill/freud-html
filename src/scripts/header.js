
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

  headerBtns.forEach(item => {
    item.addEventListener('click', () => {

      const activeId = Number(item.getAttribute('data-header-btn'));

      if (document.querySelector('.header-modals__item.active')) {
        document.querySelector('.header-modals__item.active').classList.remove('active');
      }
      
      document.querySelector(`[data-header-modal='${activeId}']`).classList.add('active');
    })
  })

  window.addEventListener('click', e => {

    if (!e.target.closest('.header__item') && !e.target.closest('[data-header-btn]') && document.querySelector('.header-modals__item.active')) {

      document.querySelector('.header-modals__item.active').classList.remove('active');

    }
  })
}

export { headerOnScroll, headerDrops }