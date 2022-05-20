function tabs() {
  
  const tabs = document.querySelector('[data-tabs]');
  const content = document.querySelector('[data-tabs-content]');

  if (tabs && content) {
  
    const contentItems = content.querySelectorAll('[data-content-item]');
  
    tabs.querySelectorAll('[data-tabs-item]').forEach((item, index) => {
  
      item.addEventListener('click', () => {
        tabs.querySelector('.active').classList.remove('active');
        item.classList.add('active');
  
        content.querySelector('.active').classList.remove('active');
        contentItems[index].classList.add('active');
      })
    })
  
  } else if (tabs) {

    tabs.querySelectorAll('[data-tabs-item]').forEach((item, index) => {
  
      item.addEventListener('click', () => {
        tabs.querySelector('.active').classList.remove('active');
        item.classList.add('active');
      })
    })

  }
}

export default tabs;