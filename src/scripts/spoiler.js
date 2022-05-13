import BadgerAccordion from 'badger-accordion';

function accordions() {

  const accordions = document.querySelectorAll('.js-badger-accordion');

  Array.from(accordions).forEach((accordion) => {
      const ba = new BadgerAccordion(accordion);
  });
}

export default accordions;