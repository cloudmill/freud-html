import { mediaQuery } from './mediaQueries';

function cartStages() {
  
  if (document.querySelector('[data-cart-stage-general]')) {

    // измеряет и задает строгую высоту блоков с контентом
    // после измерения блоков с контентом - сворачивает
    document.querySelectorAll('[data-cart-content]').forEach(item => {
      const contentHeight = String(item.offsetHeight);
      item.style.height = contentHeight + 'px';

      // if (item.closest('.cart-stage.collapsed')) {

      //   // как-будто без сворачивания лучше выглядит

      //   item.classList.add('hide-content');

      // }
    });

    // в третьем этапе две анкеты разного размера
    // при переключении на большую строгий размер сбрасывается
    document.querySelector('[data-cart-big-form]').addEventListener('click', e => {
      e.target.closest('.cart-receiving').classList.add('height-auto')
    });
    document.querySelector('[data-cart-small-form]').addEventListener('click', e => {
      e.target.closest('.cart-receiving').classList.remove('height-auto')
    });
    
    // обработка кнопок перехода к следующему этапу
    // если кнопка в форме - проверяет наличие ошибок
    // если ошибок нет - скролл к следующему этапу
    document.querySelectorAll('[data-cart-next]').forEach(item => {
  
      item.addEventListener('click', e => {
  
        setTimeout(() => {
  
          if (!Boolean(item.closest('form')) || item.closest('form') && !item.closest('form').querySelector('.form-error.active')) {
  
            e.target.closest('[data-cart-stage]').classList.remove('open');
            e.target.closest('[data-cart-stage]').classList.add('previous');
    
            const btnId = item.getAttribute('data-cart-next');
            
            document.querySelector(`[data-cart-stage='${btnId}']`).classList.remove('previous');
            document.querySelector(`[data-cart-stage='${btnId}']`).classList.remove('collapsed');
            document.querySelector(`[data-cart-stage='${btnId}']`).classList.add('open');

            setTimeout(() => {

              document.querySelector(`[data-next-target='${btnId}']`).scrollIntoView({
                behavior: 'smooth',
                // block: 'start'
              })
              
            },);
            
    
            if (!mediaQuery.matches) {
    
              e.target.closest('[data-cart-stage]').scrollIntoView({
                block: 'start'
              })  
            } 
          }
        }, );
      })
    });

    // возврат к изменению уже пройденного этапа
    document.querySelectorAll('[data-stage-edit]').forEach(item => {
  
      item.addEventListener('click', e => {
  
        document.querySelectorAll('[data-cart-stage]').forEach(item => {
          item.classList.remove('open');

          if (!item.classList.contains('previous')) {
            item.classList.add('collapsed');
          }
        });
  
        e.target.closest('[data-cart-stage]').classList.remove('collapsed');
        e.target.closest('[data-cart-stage]').classList.remove('previous');
        e.target.closest('[data-cart-stage]').classList.add('open');
  
      })
    })
  
    // переход на экран успешного оформления
    // так же проверяет наличие ошибок в случае зполнения формы на доставку
    document.querySelectorAll('[data-cart-final]').forEach(item => {
  
      item.addEventListener('click', e => {

        setTimeout(() => {
          
          if (!Boolean(item.closest('form')) || item.closest('form') && !item.closest('form').querySelector('.form-error.active')) {
  
            document.querySelector('[data-cart-body-stages]').classList.add('hide');
            document.querySelector('[data-cart-body-result]').classList.remove('hide');
            // document.querySelector('[data-cart-body-result]').classList.add('show');

            setTimeout(() => {

              document.querySelector(`html`).scrollIntoView({
                behavior: 'smooth'
                // block: 'start'
              })
              
            },);
          }
        }, );
      })
    })

  }
}

export default cartStages;