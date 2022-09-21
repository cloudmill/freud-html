import { mediaQuery } from './mediaQueries';
import formValidation from './form-elements/form-validation';

function cartStages() {

  if (document.querySelector('[data-cart-stage-general]')) {


    if (document.querySelector('[data-cart-big-form]')) {
    // в третьем этапе две анкеты разного размера
    // при переключении на большую строгий размер сбрасывается
    document.querySelector('[data-cart-big-form]').addEventListener('click', e => {
      e.target.closest('.cart-receiving').classList.add('height-auto')
    });
    document.querySelector('[data-cart-small-form]').addEventListener('click', e => {
      e.target.closest('.cart-receiving').classList.remove('height-auto')
    });
    }
    

    // обработка кнопок перехода к следующему этапу
    // если кнопка в форме - проверяет наличие ошибок
    // если ошибок нет - скролл к следующему этапу
    document.querySelectorAll('[data-cart-next]').forEach(item => {

      item.addEventListener('click', e => {

        setTimeout(() => {

          if (!Boolean(item.closest('form')) || item.closest('form') && !item.closest('form').querySelector('.form-error.active')) {

            const btnId = item.getAttribute('data-cart-next');

            // задает высоту контента для плавного сворачивания
            if (mediaQuery.matches) {
              const stageContent = document.querySelector(`[data-cart-content='${btnId}']`);
              const contentHeight = String(item.stageContent);
              stageContent.style.height = contentHeight + 'px';
            }

            e.target.closest('[data-cart-stage]').classList.remove('open');
            e.target.closest('[data-cart-stage]').classList.remove('add-transition');
            e.target.closest('[data-cart-stage]').classList.add('previous');

            document.querySelector(`[data-cart-stage='${btnId}']`).classList.remove('previous');
            document.querySelector(`[data-cart-stage='${btnId}']`).classList.remove('collapsed');
            document.querySelector(`[data-cart-stage='${btnId}']`).classList.add('open');

            if (btnId == 2) {

              document.querySelector('[data-name-result]').innerText = `${document.querySelector('[data-cart-name]').value} ${document.querySelector('[data-cart-name2]').value}`;

              document.querySelector('[data-tel-result]').innerText = document.querySelector('[data-cart-tel]').value;

              document.querySelector('[data-mail-result]').innerText = document.querySelector('[data-cart-mail]').value;

              document.querySelector('[data-note-result]').innerText = document.querySelector('[data-cart-comment]').value;

              formValidation();

              // переход на экран успешного оформления
              // так же проверяет наличие ошибок в случае зполнения формы на доставку
              document.querySelectorAll('[data-cart-final]').forEach(item => {
                item.addEventListener('click', () => {
                  finalStage(item)
                })
              })

            }

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
        }, 110);
      })
    });

    // возврат к изменению уже пройденного этапа
    document.querySelectorAll('[data-stage-edit]').forEach(item => {

      item.addEventListener('click', e => {

        document.querySelectorAll('[data-cart-stage]').forEach(item => {
          item.classList.remove('open');
          item.classList.remove('add-transition');

          if (!item.classList.contains('previous')) {
            item.classList.add('collapsed');
          }
        });

        e.target.closest('[data-cart-stage]').classList.remove('collapsed');
        e.target.closest('[data-cart-stage]').classList.remove('previous');
        e.target.closest('[data-cart-stage]').classList.add('open');
        e.target.closest('[data-cart-stage]').classList.add('add-transition');

      })
    })

  }
}

export function finalStage(elem) {
  setTimeout(() => {
    if (!Boolean(elem.closest('form')) || elem.closest('form') && !elem.closest('form').querySelector('.form-error.active')) {

      document.querySelector('[data-cart-body-stages]').classList.add('hide');
      document.querySelector('[data-cart-body-result]').classList.remove('hide');
      // document.querySelector('[data-cart-body-result]').classList.add('show');

      if (elem.hasAttribute('type', 'submit')) {

        document.querySelector('[data-result-adsress]').innerText = `${document.querySelector('[data-dostavka-address]').value} ${document.querySelector('[data-dostavka-address2]').value}`;

        document.querySelector('[data-result-samovyvos]').style.display = 'none';

      } else {

        document.querySelector('[data-result-dostavka]').style.display = 'none'

      }

      setTimeout(() => {

        document.querySelector(`html`).scrollIntoView({
          behavior: 'smooth'
          // block: 'start'
        })

      },);
    }
  }, );
}

export default cartStages;
