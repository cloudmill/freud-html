import AOS from 'aos';

function aosInit(e) {
  
  // скрытие элементов под хедером пока работает аос
  setTimeout(() => {
    document.querySelector('.header').classList.add('loaded');

    if (document.querySelector('.filter-drops-container')) {
      document.querySelector('.filter-drops-container').classList.add('loaded')
    };

  }, 1200);

  if (document.querySelector('.body').getAttribute('data-js') == 'true') {
    AOS.init({
      once: true,
      offset: 0,
      duration: 1200,
    });
  };

}

export default aosInit;