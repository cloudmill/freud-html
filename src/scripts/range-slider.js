import noUiSlider from 'nouislider';

function rangeSlider() {

  const rangeSliders = document.querySelectorAll('#range-slider');

  if (rangeSliders.length) {

    rangeSliders.forEach(rangeSlider => {

      const rangeMin = Number(rangeSlider.getAttribute('data-range-min'));
      const rangeMax = Number(rangeSlider.getAttribute('data-range-max'));

      const rangeContainer = rangeSlider.closest('#range-slider-container');

      const rangeFrom = rangeContainer.querySelector('#range-from');
      const rangeTo = rangeContainer.querySelector('#range-to');
      
      noUiSlider.create(rangeSlider, {
          start: [rangeMin, rangeMax],
          connect: true,
          range: {
              'min': rangeMin,
              'max': rangeMax
          }
      });
      
      rangeSlider.noUiSlider.on('update', function (values, handle) {
      
        var value = values[handle];
      
        if (handle) {
          rangeTo.value = Math.round(value);
        } else {
          rangeFrom.value = Math.round(value);
        }
      });
      
      rangeFrom.addEventListener('change', function () {
        rangeSlider.noUiSlider.set([this.value, null]);
      });
      
      rangeTo.addEventListener('change', function () {
        rangeSlider.noUiSlider.set([null, this.value]);
      });
    })
  }
}

export default rangeSlider;
