import BadgerAccordion from 'badger-accordion';

function accordions() {

  const accordionDomNode = document.querySelector('.js-badger-accordion');

  if (accordionDomNode) {
    const accordion = new BadgerAccordion(accordionDomNode);
  }
}

export default accordions;