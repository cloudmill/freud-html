const siteTemplPath = document.querySelector('[data-type=site-templ-path]');

window.config = {
  path: window.location.hostname && window.location.hostname !== 'cloudmill.github.io' ? (siteTemplPath ? siteTemplPath.value : '/local/templates/main/') : '',
}

export function initMap() {

  if (document.querySelector('#map')) {
    try {

      ymaps.ready(function () {

        var myMap = new ymaps.Map('map', {
                center: [59.934277, 30.309636],
                zoom: 14
            }, {
                searchControlProvider: 'yandex#search'
            }),

            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark([59.934277, 30.309636], {
            }, {
                iconLayout: 'default#image',
                // iconImageHref: '/local/templates/main/assets/images/placemark.svg',
                iconImageHref: window.config.path + 'assets/images/placemark.svg',
                iconImageSize: [45.71, 64],
                iconImageOffset: [-22, -64]
            });

        myMap.geoObjects
            .add(myPlacemark)
    });

    } catch (err) {
      console.error(err)
    }
  }

  if (document.querySelector('#map2')) {

    try {

      ymaps.ready(function () {

        var myMap = new ymaps.Map('map2', {
                center: [59.934277, 30.309636],
                zoom: 14
            }, {
                searchControlProvider: 'yandex#search'
            }),

            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark([59.934277, 30.309636], {
            }, {
                iconLayout: 'default#image',
                // iconImageHref: '/local/templates/main/assets/images/placemark.svg',
                iconImageHref: window.config.path + 'assets/images/placemark.svg',
                iconImageSize: [45.71, 64],
                iconImageOffset: [-22, -64]
            });

        myMap.geoObjects
            .add(myPlacemark)
    });

    } catch (err) {
      console.error(err)
    }

  }
}
