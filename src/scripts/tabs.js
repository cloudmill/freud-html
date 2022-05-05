function tabs() {
  const tabs = document.querySelector('[data-tabs]');

  if (tabs) {
  
    const content = document.querySelector('[data-tabs-content]');
    const contentItems = content.querySelectorAll('[data-content-item]');
  
    tabs.querySelectorAll('[data-tabs-item]').forEach((item, index) => {
  
      item.addEventListener('click', () => {
        tabs.querySelector('.active').classList.remove('active');
        item.classList.add('active');
  
        content.querySelector('.active').classList.remove('active');
        contentItems[index].classList.add('active');
      })
    })
  
  }
}

export default tabs;