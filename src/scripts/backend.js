import { closeWindow } from './modals-open-close';
import { finalStage } from './cart-stages';
import { eventPromoDelete, addToCartSuccess } from './catalog-scripts';
import noUiSlider from 'nouislider';

$(function () {
  initData();
  forms();
  cookie();
  modalManuf();
  favorAdd();
  basketEvent();
  transferData();
  order();
  pagen();
  bookingFormStart();
  bookingFormDate();
  bookingFormPlace();
  bookingFormTime();
  checkInput();
  promoAdd();
  promoDelete();
  filterEvent();
  searchEvent();
  showAllData();
  searchFetchEvent();
  formsEvent();
  sortEvent();
  applyFilter();
});
/* service */
if (window.location.pathname == '/service/') {
  newTitleHidden();
}
function newTitleHidden () {
  $(document).on('click', '[data-popup-button="8"]', function (e) {
    let value = $(this).siblings().find('h3').html() ? $(this).siblings().find('h3').html() : $(this).siblings().find('h2').html();
    let form = $('#consult-form').find('[data-uf="UF_TITLE"]');
    $(form).val(value.trim());
  })
}


window.ajaxRequest = {};

function sortEvent() {
  $(document).on('change', '[data-type=sort]', function () {
    const thisObj = $(this),
      linkContainer = thisObj.parents('[data-link-container]').data('link-container'),
      container = $(linkContainer);

    let data = {
      ajax: 'sort',
      sort: {
        field: thisObj.data('field'),
        by: thisObj.data('by'),
      },
    },
      resultData = data;

    if (window.ajaxRequest.params) {
      resultData = Object.assign(window.ajaxRequest.params, data);
    }

    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: resultData,
      success: function (r) {
        window.ajaxRequest.params = data;

        container.empty();
        container.append($(r).filter(linkContainer).children());
      },
    });
  });
}

window.formSuccess = {
  consultation: form => {

  },
}

function formsEvent() {
  $(document).on('submit', '[data-type=form]', function () {
    const thisObj = $(this),
      data = {};

    thisObj.find('[data-type=get-field]').each((i, item) => {
      const jq = $(item);

      data[jq.data('field')] = jq.val();
    });

    $.ajax({
      type: 'POST',
      url: `${window.backend.templPath}/include/ajax/form/add.php`,
      dataType: 'json',
      data: data,
      success: function (r) {
        if (r.success) {
          try {
            window.formSuccess[thisObj.data('event')](thisObj);
          } catch (e) {
          }
        } else {
          alert(r.message);
        }
      },
    });
  });
}

function showAllData() {
  $(document).on('click', '[data-show-all]', function () {
    const thisObj = $(this),
      filterKey = thisObj.parents('[data-filter-key]').attr('data-filter-key'),
      allValues = $(`[data-filter-key=${filterKey}][data-filter-all]`),
      data = thisObj.data('show-obj'),
      container = $(`[data-show=${thisObj.data('show-all')}]`),
      entityElem = container.find('[data-filter-key]'),
      entity = entityElem.attr('data-filter-key'),
      content = container.find('[data-container=content]');

    if (entity !== filterKey) {
      const template = container.find('template');

      content.empty();
      entityElem.attr('data-filter-key', filterKey);

      for (let property in data.replace) {
        container.find(`[data-replace=${property}]`).text(data.replace[property]);
      }

      allValues.find('[data-container=filter-item]').each((i, item) => {
        const result = template.clone().contents();

        result.find('[data-type=filter-val]').text(item.querySelector('[data-type=filter-val]').textContent);
        result.find('[data-type=filter-count]').text(item.querySelector('[data-type=filter-count]').textContent);
        content.append(result);
      });
    }

    content.find('[data-container=filter-item]').each((i, item) => {
      const elem = $(item),
        input = elem.find('input'),
        compareElem = allValues.find('[data-container=filter-item]').eq(i);

      input.prop('checked', compareElem.find('input').prop('checked'));

      if (compareElem.css('opacity') === 1) {
        return;
      }

      elem.css({
        'opacity': compareElem.css('opacity'),
        'pointer-events': compareElem.css('pointer-events'),
      });
    });
  });
}

function searchFetchEvent() {
  $(document).on('click', '[data-type=search]', function () {
    const thisObj = $(this),
      container = thisObj.parents('[data-container=search]'),
      linkContainer = container.data('link-container'),
      entity = container.data('entity');

    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: {
        q: container.find('input').val(),
        ajax: 'filter',
      },
      success: function (r) {
        const content = $(linkContainer),
          jqResponse = $(r);

        content.empty();
        content.append(jqResponse.find(linkContainer).children());

        try {
          window.filterSuccess[entity](thisObj, jqResponse);
        } catch (e) {
        }
      },
    });
  });
}

function searchEvent() {
  $(document).on('input', '[data-search]', function () {
    const thisObj = $(this),
      container = thisObj.parents('[data-search-container]'),
      q = thisObj.val();

    container.find('[data-type=filter-val]').each((i, item) => {
      if (new RegExp(q).test(item.textContent)) {
        $(item).parents('[data-container=filter-item]').css('display', 'flex');
      } else {
        $(item).parents('[data-container=filter-item]').css('display', 'none');
      }
    });
  });
}

window.filterCompare = {
  items: (elem, responseFilter, styles) => {
    elem.find('[data-type=filter-val]').each(function () {
      const filterContainer = $(this).parents('[data-container=filter-item]').length ? $(this).parents('[data-container=filter-item]') : $(this).parents('[data-type=filter]'),
        customCompare = $(this).attr('data-custom-compare'),
        val = $(this).text(),
        filterKey = elem.attr('data-filter-key');

      let responseVal;

      if (customCompare) {
        responseVal = responseFilter.find(`[data-type=filter-val][data-custom-compare=${customCompare}]`);
      } else {
        responseVal = responseFilter.find('[data-type=filter-val]').filter((i, item) => item.textContent === val);
      }

      if (responseVal.length) {
        const responseFiltCont = responseVal.parents('[data-container=filter-item]').length ? responseVal.parents('[data-container=filter-item]') : responseVal.parents('[data-type=filter]');

        filterContainer.css(styles.enable);
        filterContainer.find('[data-type=filter-count]').text(responseFiltCont.find('[data-type=filter-count]').text());
      } else {
        filterContainer.css(styles.disable);

        if (!window.filters.filter.hasOwnProperty(filterKey)) {
          return;
        }

        if (!window.filters.filter[filterKey].hasOwnProperty(val)) {
          return;
        }

        $(`[data-filter-key=${filterKey}]`).find('[data-type=filter-val]').filter((i, item) => item.textContent === val).each((i, item) => {

          window.filtersEvent.styles.disable[$(item).attr('data-style')]($(item));
        });

        delete window.filters.filter[elem.data('filter-key')][val];
      }
    });
  },
  range: (elem, responseFilter) => {
    const valElem = responseFilter.find('#range-slider'),
      min = +valElem.attr('data-range-min'),
      max = +valElem.attr('data-range-max');

    elem[0].querySelector('#range-slider').noUiSlider.updateOptions(
      {
        range: {
          min: min,
          max: max,
        },
        start: [
          min,
          max
        ],
      },
      false
    );
  },
}

window.filterSuccess = {
  shop: (elem, response) => {
    const filtersContainers = $('[data-container=filters]'),
      responseFiltersContainers = response.find('[data-container=filters]'),
      replaceElems = $('[data-type=replace-elem]');

    replaceElems.each((i, item) => {
      const jq = $(item),
        field = jq.data('field'),
        replace = response.find(`[data-type=replace-elem][data-field=${field}]`).text();

      jq.text(replace);
    });

    filtersDependency(elem, filtersContainers, responseFiltersContainers);
  }
}

window.filters = {
  filter: {},
  ajax: 'filter',
};

window.filtersEvent = {
  styles: {
    enable: {
      checkbox: elem => {
        elem.parents('[data-container=filter-item]').find('[data-type=filter]').prop('checked', true);
      },
      button: elem => {
        elem.parent().addClass('active');
      },
    },
    disable: {
      checkbox: elem => {
        elem.parents('[data-container=filter-item]').find('[data-type=filter]').prop('checked', false);
      },
      button: elem => {
        elem.parent().removeClass('active');
      },
      none: elem => {
        const container = elem.closest('[data-container]');

        elem.parent().remove();

        if (!container.find('[data-type=filter]').length) {
          container.find('[data-type=filter-reset]').css('display', 'none');
        }
      },
    }
  }
}

function filtersDependency(elem, filtersContainers, responseFiltersContainers) {
  const selectFilterKeys = Object.keys(window.filters.filter),
    selectFilter = selectFilterKeys[selectFilterKeys.length - 1],
    styles = {
      enable: {
        'opacity': 1,
        'pointer-events': 'auto',
      },
      disable: {
        'opacity': 0.3,
        'pointer-events': 'none',
      }
    };

  filtersContainers.each((index, item) => {
    const filterContainer = $(item);

    filterContainer.find('[data-container=filter]').each(function () {
      const filterKey = $(this).attr('data-filter-key');

      if (filterKey === selectFilter && elem.data('type') !== 'filters') {
        return;
      }

      const responseFilter = responseFiltersContainers.eq(index).find(`[data-container=filter][data-filter-key=${filterKey}]`);

      if (!responseFilter.length) {
        $(this).css(styles.disable);
      } else {
        window.filterCompare[$(this).attr('data-compare')]($(this), responseFilter, styles);
        $(this).css(styles.enable);
      }
    });
  });
}

function filterFetch(thisObj, linkContainer, entity) {
  const filters = $('[data-container=filters]');

  history.pushState(null, null, `?filter=${JSON.stringify(window.filters.filter)}`);
  filters.css('pointer-events', 'none');

  $.ajax({
    type: 'GET',
    url: window.location.href,
    dataType: 'html',
    data: window.ajaxRequest.params ? Object.assign(window.ajaxRequest.params, window.filters) : window.filters,
    success: function (r) {
      filters.css('pointer-events', 'auto');
      window.ajaxRequest.params = window.filters;

      const content = $(linkContainer),
        jqResponse = $(r);

      content.empty();
      content.append(jqResponse.filter(linkContainer).children());

      try {
        window.filterSuccess[entity](thisObj, jqResponse);
      } catch (e) {
      }
    },
  });
}

window.addEventListener('popstate', () => {

});

function filterEvent() {
  document.querySelectorAll('#range-slider').forEach(slider => {
    slider.noUiSlider.on('set', function (values) {
      const thisObj = $(this.target),
        container = thisObj.parents('[data-filter-key]'),
        filterKey = container.data('filter-key'),
        entityElem = container.parents('[data-link-container]'),
        entity = entityElem.data('entity'),
        linkContainer = entityElem.data('link-container');

      document.querySelectorAll(`[data-filter-key=${filterKey}]`).forEach(item => {
        const slider = item.querySelector('#range-slider');

        if (!slider) {
          return;
        }

        if (item.getAttribute('data-template-type') === container.attr('data-template-type')) {
          return;
        }

        slider.noUiSlider.set(values, false);
      });
      addFilterValue(filterKey, $(`<div data-custom-val="${container.find('[data-type=filter-name]').text()}: от ${Math.round(values[0])} до ${Math.round(values[1])}">${JSON.stringify(values)}</div>`));

      window.filters.filter[filterKey] = values;

      filterFetch(thisObj, linkContainer, entity);
    });
  });

  $(document).on('click', '[data-type=filter]', function () {
    const thisObj = $(this),
      filterKey = thisObj.parents('[data-filter-key]').length ? thisObj.parents('[data-filter-key]').attr('data-filter-key') : thisObj.attr('data-filter-key'),
      filterElem = thisObj.parents('[data-container=filter-item]').length ? thisObj.parents('[data-container=filter-item]') : thisObj,
      valElem = filterElem.find('[data-type=filter-val]'),
      settingVal = valElem.data('setting-val'),
      defaultVal = valElem.text(),
      val = settingVal ? settingVal : defaultVal,
      linkContainer = thisObj.parents('[data-link-container]').attr('data-link-container'),
      entityElem = thisObj.parents('[data-entity]'),
      entity = entityElem.data('entity'),
      allFilters = $(`[data-filter-key=${filterKey}]`).find(`[data-type=filter-val]:contains(${val})`).filter((i, item) => $(item).parents('[data-entity]').attr('data-place') !== entityElem.attr('data-place')),
      isSelect = dataFilterValue(valElem, filterKey, val);

    allFilters.each((i, item) => {
      try {
        window.filtersEvent.styles[isSelect][item.getAttribute('data-style')]($(item));
      } catch (e) {
      }
    });

    filterFetch(thisObj, linkContainer, entity);
  });

  $(document).on('click', '[data-type=filters]', function () {
    const thisObj = $(this),
      entityElem = thisObj.parents('[data-entity]'),
      entity = entityElem.data('entity'),
      linkContainer = entityElem.data('link-container'),
      valuesElem = thisObj.find('[data-type=filter-val]'),
      values = JSON.parse(valuesElem.text());

    clearSelectFilters();

    if (thisObj.hasClass('active')) {
      thisObj.removeClass('active');
    } else {
      let array = thisObj.parent().children();
      $(array).each(function (i, elem) {
        $(elem).removeClass('active')
      })
      thisObj.addClass('active');

      for (let filterKey in values) {
        if (Array.isArray(values[filterKey])) {
          window.filters.filter[filterKey] = values[filterKey];
        } else {
          window.filters.filter[filterKey] = {};
          for (let val in values[filterKey]) {
            let allFilters = $(`[data-filter-key=${filterKey}]`).find(`[data-type=filter-val]:contains(${val})`).filter((i, item) => $(item).parents('[data-entity]').attr('data-place') !== entityElem.attr('data-place'));

            allFilters.each((i, item) => {
              try {
                window.filtersEvent.styles['enable'][item.getAttribute('data-style')]($(item));
              } catch (e) {
              }
            });

            window.filters.filter[filterKey][val] = val;
          }
        }
      }
    }

    filterFetch(thisObj, linkContainer, entity);
  });

  $(document).on('click', '[data-type=filter-reset]', function () {
    const thisObj = $(this),
      entityElem = thisObj.parents('[data-entity]'),
      entity = entityElem.data('entity'),
      linkContainer = entityElem.data('link-container');

    window.filters.filter = {};

    filtersClear();
    filterFetch(thisObj, linkContainer, entity);
  });
}

function clearSelectFilters() {
  for (let field in window.filters.filter) {
    for (let val in window.filters.filter[field]) {
      let allFilters = $(`[data-filter-key=${field}]`).find(`[data-type=filter-val]:contains(${val})`);

      allFilters.each((i, item) => {
        try {
          window.filtersEvent.styles['disable'][item.getAttribute('data-style')]($(item));
        } catch (e) {
        }
      });
    }
  }

  window.filters.filter = {};
}

function applyFilter() {
  if (!window.location.search) {
    return;
  }

  const params = decodeURI(window.location.search.replace('?', '')).split('&');

  let filter = null;

  params.forEach((item) => {
    const itemParams = item.split('=');

    if (itemParams[0] === 'filter') {
      filter = itemParams[1];

      return false;
    }
  });

  if (!filter) {
    return;
  }

  window.filters.filter = JSON.parse(filter);

  for (let filterKey in window.filters.filter) {
    for (let val in window.filters.filter[filterKey]) {
      const allFiltersContainer = $(`[data-filter-key=${filterKey}]`),
        allFilters = allFiltersContainer.find(`[data-type=filter-val]:contains(${val})`);

      if (!allFilters.length) {
        addFilterValue(filterKey, $(`<div data-custom-val="${allFiltersContainer[0].querySelector('[data-type=filter-name]').textContent}: от ${Math.round(window.filters.filter[filterKey][0])} до ${Math.round(window.filters.filter[filterKey][1])}">${JSON.stringify(window.filters.filter[filterKey])}</div>`));
        break;
      } else {
        allFilters.each((i, item) => {
          try {
            window.filtersEvent.styles['enable'][item.getAttribute('data-style')]($(item));
          } catch (e) {
          }
        });
        addFilterValue(filterKey, $(allFilters[0]));
      }
    }
  }
}

function dataFilterValue(valElem, filterKey, val) {
  if (Array.isArray(val)) {
    delete window.filters.filter[filterKey];
    removeFilterValue(valElem);
    $(`[data-filter-key=${filterKey}]`).find('#range-slider').each((i, item) => {
      item.noUiSlider.set([+item.getAttribute('data-range-min'), +item.getAttribute('data-range-max')], false);
    });

    return 'disable';
  }

  let isSelect;

  if (!window.filters.filter[filterKey]) {
    window.filters.filter[filterKey] = {};
  }

  if (window.filters.filter[filterKey][val]) {
    delete window.filters.filter[filterKey][val];
    removeFilterValue(valElem);
    isSelect = 'disable';

    if (!Object.keys(window.filters.filter[filterKey]).length) {
      delete window.filters.filter[filterKey];
    }
  } else {
    window.filters.filter[filterKey][val] = val;
    addFilterValue(filterKey, valElem);
    isSelect = 'enable';
  }

  return isSelect;
}

function filtersClear() {
  const filterLine = $('[data-container=filter-line]'),
    filters = $('[data-type=filter-val]');

  filterLine.find('[data-type=filter]').remove();
  filterLine.find('[data-type=filter-reset]').css({
    'display': 'none',
  });
  filters.each((i, item) => {
    const jq = $(item);

    try {
      window.filtersEvent.styles.disable[jq.data('style')](jq);
    } catch (e) {
    }
  });
}

function removeFilterValue(valElem) {
  const container = $('[data-container=filter-line]'),
    customValue = valElem.data('custom-val'),
    val = customValue ? customValue : valElem.text();

  container.find(`[data-type=filter-val]:contains(${val})`).parent().remove();

  if (container.find('[data-type=filter-val]').length) {
    return;
  }

  container.find('[data-type=filter-reset]').css({
    'display': 'none',
  });
}

function addFilterValue(key, valElem) {
  const containers = $('[data-container=filter-line]');

  containers.each((i, item) => {
    const container = $(item),
      template = container.find('template').clone().contents(),
      templateVal = template.find('[data-type=filter-val]'),
      clearElem = container.find('[data-type=filter-reset]'),
      customVal = valElem.data('custom-val'),
      defaultVal = valElem.text();

    let jsonVal;

    try {
      jsonVal = JSON.parse(defaultVal);
    } catch (e) {
      jsonVal = false;
    }

    if (Array.isArray(jsonVal)) {
      const filterElem = $(`[data-filter-key=${key}][data-filter-line]`);

      if (filterElem.length) {
        removeFilterValue(filterElem.find('[data-type=filter-val]'));
      }
    }

    let val = defaultVal;

    if (customVal) {
      val = customVal;

      templateVal.attr('data-setting-val', defaultVal);
    }

    template.attr('data-filter-key', key);
    template.attr('data-filter-line', '1');
    templateVal.text(val);
    container.prepend(template);

    if (clearElem.css('display') === 'block') {
      return;
    }

    clearElem.css({
      'display': 'block',
    });
  });
}

function checkInput() {
  let checkInput = $(document).find("[data-input=check]");
  checkInput.on('change', function () {
    let input = $(this),
      inputVal = input.val(),
      form = input.parents("[data-type=js-form]"),
      url = form.attr("data-url"),
      errorSpan = checkInput.siblings(".form-error"),
      data = {};

    data['UF_EMAIL'] = inputVal;
    data['type'] = 'check';

    $.ajax({
      type: 'POST',
      url: url,
      dataType: 'json',
      data: data,
      success: function (r) {
        if (r.txter) {
          input.val('');
          errorSpan.addClass("active");
          errorSpan.html(r.txter);
        }
        if (!r.txter) {
          errorSpan.removeClass("active");
          errorSpan.html();
        }
      },
    });
  });
}

function bookingFormStart() {
  let bookingForm = $(document).find("#booking-form");

  if (bookingForm) {
    let section = bookingForm.find("[data-uf=UF_SEC]").val(),
      inputPlace = bookingForm.find("[data-uf=UF_PLACE]"),
      placeholderNew = false;

    bookingForm.find('[data-type=place-option]').each(function () {
      let pathAttr = $(this).attr("data-path"),
        nameAttr = $(this).attr("data-select-option");

      if (section == pathAttr) {
        placeholderNew = nameAttr;
      }
    });

    if (placeholderNew) {
      inputPlace.attr("placeholder", placeholderNew);
      inputPlace.val(placeholderNew);

      bookingForm.find('[data-booking=date]').removeAttr("disabled");
      bookingForm.find("[data-type=par-date-div]").removeClass("disabled");
    }
  }
};

function bookingFormDate() {
  $(document).on('click', '[data-booking=date]', function () {
    let date = $(this).val(),
      sibDiv = $(this).siblings(".datepicker"),
      bookingForm = $(this).parents("#booking-form"),
      place = bookingForm.find("[data-uf=UF_PLACE]").val(),
      data = {};

    if (!sibDiv.hasClass("active")) {
      data['date'] = date;
      data['place'] = place;

      $.ajax({
        type: 'POST',
        url: `${window.backend.templPath}/include/ajax/booking.php`,
        dataType: 'json',
        data: data,
        success: function (r) {
          if (r.success) {
            let timeInput = bookingForm.find('[data-uf=UF_TIME]'),
              timeTooltip = bookingForm.find('[data-type=tooltip-date]'),
              timeTooltipBlock = bookingForm.find('[data-type=tooltip-date-block]');

            timeInput.removeAttr("disabled");
            timeInput.removeClass("disabled");
            timeTooltipBlock.removeAttr("style");

            timeTooltip.empty();
            timeTooltip.html(r.tooltip);
          }
        },
      });
    }
  });
}

function bookingFormTime() {
  let inputTime = $(document).find("[data-time-input]");
  inputTime.on('change', function () {
    let time = $(this).val(),
      bookingForm = $(this).parents("#booking-form"),
      place = bookingForm.find("[data-uf=UF_PLACE]").val(),
      date = bookingForm.find("[data-uf=UF_DATE]").val(),
      errorSpan = $(this).siblings(".form-error"),
      tooltipBlock = bookingForm.find("[data-type=tooltip-date-block]"),
      data = {};

    data['date'] = date;
    data['place'] = place;
    data['time'] = time;

    $.ajax({
      type: 'POST',
      url: `${window.backend.templPath}/include/ajax/booking.php`,
      dataType: 'json',
      data: data,
      success: function (r) {
        if (r.txter) {
          tooltipBlock.addClass("active");

          errorSpan.addClass("active");
          errorSpan.html(r.txter);

          inputTime.attr('data-valid', 'no');
        }
        if (!r.txter) {
          inputTime.removeAttr('data-valid');

          errorSpan.removeClass("active");
          errorSpan.html();

          bookingForm.reset();
        }
      },
    });
  });
}

function bookingFormPlace() {
  $(document).on('click', '[data-type=place-option]', function () {
    let bookingForm = $(this).parents("#booking-form"),
      timeInput = bookingForm.find('[data-uf=UF_TIME]'),
      dateInput = bookingForm.find('[data-uf=UF_DATE]'),
      dateInputBlock = bookingForm.find("[data-type=par-date-div]"),
      timeTooltipBlock = bookingForm.find('[data-type=tooltip-date-block]');
    ;

    timeInput.val("");
    dateInput.val("");

    timeInput.attr("disabled", "");
    timeTooltipBlock.attr("style", "display:none;");

    dateInput.removeAttr("disabled");
    dateInputBlock.removeClass("disabled");
  });
}

function promoAdd() {
  $(document).on('change', '[data-type=promo-add]', function () {
    $.ajax({
      type: 'POST',
      url: `${window.backend.templPath}/include/ajax/promo/add.php`,
      dataType: 'json',
      data: {
        code: $(this).val(),
      },
      success: function (r) {
        if (r.success) {
          htmlReload('promo', '[data-replace=items-list], [data-replace=preview-items-list], [data-replace=price], [data-replace=header-basket-items]');
          $('.cart-promocode-error').removeClass('active');
        } else {
          $('.cart-promocode-error').addClass('active');
        }
      },
    });
  });
}

function promoDelete() {
  $(document).on('click', '[data-type=promo-delete]', function () {
    const thisObj = $(this),
      container = thisObj.parents('[data-container=promo-code]');

    $.ajax({
      type: 'POST',
      url: `${window.backend.templPath}/include/ajax/promo/delete.php`,
      dataType: 'json',
      data: {
        code: container.find('[data-type=promo-add]').val(),
      },
      success: function (r) {
        if (r.success) {
          htmlReload('promo', '[data-replace=items-list], [data-replace=preview-items-list], [data-replace=price], [data-replace=header-basket-items]');
          eventPromoDelete(container[0]);
          $('.cart-promocode-error').removeClass('active');
        } else {
          alert(r.message);
        }
      },
    });
  });
}

function htmlReload(action, containers) {
  $.ajax({
    type: 'GET',
    url: window.location.href,
    dataType: 'html',
    data: {
      ajax: action,
    },
    success: function (r) {
      $(`${containers}`).each(function () {
        $(this).empty();
        $(this).append($(r).find(`[data-replace=${$(this).data('replace')}]`).children());
      });
    },
  });
}

function pagen() {
  $(document).on("click", "[data-type=pagen]", function () {
    const thisObj = $(this);

    $.ajax({
      method: "GET",
      url: thisObj.data('url'),
      data: {
        ajax: 'pagen',
      },
      success: function (r) {
        const container = thisObj.parents('[data-container=base]'),
          pagenResponse = $(r).filter('[data-type=pagen-append]').length ? $(r).filter('[data-type=pagen-append]') : $(r).find('[data-type=pagen-append]');

        container.find('[data-container=items]').append($(r).filter('[data-container=items]').children());
        container.find('[data-type=pagen-append]').remove();

        if (pagenResponse.length) {
          container.find('[data-container=list]').append(pagenResponse);
        }
      },
    });
  });
}

function order() {
  $(document).on('click', '[data-type=order]', function (e) {
    e.preventDefault();

    const thisObj = $(this),
      container = thisObj.parents('[data-container=order]'),
      data = {};

    container.find('[data-type=get-field]').each(function () {
      const val = $(this).text();

      if (!val) {
        return;
      }

      data[$(this).data('field')] = val;
    });

    container.find('[data-type=get-field-container].active').find('[data-type=get-field-select], input:checked').each(function () {
      const inpVal = $(this).val(),
        val = $(this).data('value');

      if (!val && !inpVal) {
        return;
      }

      data[$(this).data('field')] = inpVal ? inpVal : val;
    });

    $.ajax({
      type: 'POST',
      url: `${window.backend.templPath}/include/ajax/order/add.php`,
      dataType: 'json',
      data: data,
      success: function (r) {
        if (r.success) {
          $('[data-type=order-result-id]').text(r.data.ID);
          finalStage(thisObj[0]);
          $('[data-type=basket-count]').text('0');
          $('[data-cart-btn]').attr('data-header-btn', '4');
        } else {
          alert(r.message);
        }
      },
    });
  });
}

function transferData() {
  $(document).on('click', '[data-type=transfer-data]', function () {
    const thisObj = $(this),
      data = thisObj.data('transfer'),
      success = $(thisObj.data('success'));

    $.each(data, (field, val) => {
      success.attr(field, val);
    });
  });
}

function initData() {
  window.backend = {
    templPath: $('[data-type=templ-path]').val(),
  };
}

function priceToNum(price){
  return +(price.replace(/\s+/g, ''))
}

window.basketEventSuccess = {
  delete: elem => {
    closeWindow(
      document.querySelectorAll('[data-popup-button]'),
      document.querySelectorAll('[data-popup]'),
      true,
      document.querySelector('.modals-container')
    );

    const item = $(`[data-item-id=${elem.attr('data-id')}]`),
      basketCount = $('[data-type=basket-count]'),
      totalPriceElem = $('[data-type=basket-price-total]'),
      price = priceToNum(item[0].querySelector('[data-type=price]').textContent),
      count = +item[0].querySelector('[data-type=count]').textContent,
      basketItemsCount = $('[data-type=basket-items-count]'),
      buttonItemList = $(`[data-event=add][data-id=${item.attr('data-product-id')}]`),
      empty = item.filter('[data-type=item-modal]').parent().find('[data-type=item-modal]').length === 1;

    if ($('[data-reload]').length && empty) {
      document.location.href = window.location.href;

      return;
    }

    if (empty) {
      const basketElem = $('[data-cart-btn]');

      basketElem.attr('data-header-btn', '4');
      basketElem.removeClass('active');
      $('[data-cart-modal]').removeClass('active');
    }

    item.remove();

    $(basketCount).each((i, elem)=> {
      let count = elem.innerText;
      elem.innerText = count - 1;
    })

    let topCounts = $('.cart-stage__products')
    let valueAfter = topCounts.text().trim().replace(/[^0-9]/g,"") -1 ;
    topCounts.text(valueAfter + ' позиции');


    let totalPrice = priceToNum(totalPriceElem[0].textContent) - (price * count)
    totalPriceElem.text(totalPrice.toLocaleString('ru-RU'));

    if (basketItemsCount.length) {
      basketItemsCount.text(+basketItemsCount[0].textContent - count);
    }

    if (buttonItemList.length) {
      buttonItemList.parents('[data-type=item]').removeClass('in-cart');
      buttonItemList.attr('data-type', 'basket');
      buttonItemList.text('Добавить в корзину');
    }

    bFPriceCalc($(item[0]), 'delete');

    if (elem.data('reload')) {
      htmlReload('deliveries', '[data-replace=deliveries]');
    }
  },
  add: (elem, response) => {
    $('[data-cart-btn]').attr('data-header-btn', '6');

    const item = elem.parents('[data-type=item]'),
      productId = elem.data('id'),
      basket = $('[data-container=header-basket]'),
      basketItem = basket.find(`[data-product-id=${productId}]`),
      totalPriceElem = $('[data-type=basket-price-total]'),
      basketItemsCount = $('[data-type=basket-items-count]');

    if (basketItem.length) {
      const count = basketItem.find('[data-type=count]');

      count.text(+count[0].textContent + 1);
    } else {
      const itemTemplates = $('[data-entity-template=basket]'),
        basketCount = $('[data-type=basket-count]');

      item.addClass('in-cart');
      item.find('[data-type=basket]').text('В корзине');
      elem.removeAttr('data-type');

      $('[data-field-replace]').each((i, field) => {
        const jq = $(field),
          textElem = item.find(`[data-field=${jq.data('field-replace')}]`),
          text = textElem.val() ? textElem.val() : textElem.text();

        jq.html(text);
      });

      $('[data-replace-img]').each((i, field) => {
        const jq = $(field);

        jq.attr('src', item.find('[data-field-img]').attr('src'));
      });

      addToCartSuccess();

      itemTemplates.each((i, template) => {
        const templContent = $(template).clone().contents();

        templContent.filter('[data-item-id]').attr('data-item-id', response.data.ID);
        templContent.filter('[data-product-id]').attr('data-product-id', productId);
        templContent.find('[data-id]').attr('data-id', response.data.ID);
        templContent.find('img').attr('src', item.find('img').attr('src'));
        item.find('[data-field]').each(function () {
          const inpVal = $(this).val(),
            value = inpVal ? inpVal : $(this).text();

          templContent.find(`[data-field=${$(this).data('field')}]`).html(value);
        });

        const dataTransfer = templContent.find('[data-type=transfer-data]');

        if (dataTransfer.length) {
          dataTransfer.attr('data-transfer', `{"data-id": ${response.data.ID}}`);
        }

        $(template).parent().append(templContent);
      });

      basketCount.text(+basketCount[0].textContent + 1);
    }

    let totalPrice = priceToNum(totalPriceElem[0].textContent) + priceToNum(item.find('[data-type=price]').text())
    totalPriceElem.text(totalPrice.toLocaleString('ru-RU'));

    if (basketItemsCount.length) {
      basketItemsCount.text(+basketItemsCount[0].textContent + 1);
    }

    bFPriceCalc(item, 'add');

    if (elem.data('reload')) {
      htmlReload('4_items', '[data-replace=4-items]');
    }
  },
  update: elem => {
    const thisElems = $(`[data-item-id=${elem.attr('data-id')}]`), // выбор товара по id которое было в кнопке + или -
      price = priceToNum(thisElems[0].querySelector('[data-type=price]').textContent), // цена
      calcPrice = thisElems.find('[data-type=calc-price]'), // цена * кол-во товара
      fullPrice = thisElems.find('[data-type=full-price]'), // нету в корзине
      totalElem = $('[data-type=basket-price-total]'), // к оплате
      countItem = elem.parent().find('[data-type=count-stepper]').text(); // выбранное кол - во

    if (fullPrice.length) {
      const discountAll = priceToNum(fullPrice[0].textContent) - priceToNum(calcPrice[0].textContent),
        discountCount = elem.data('additional').operator === '+' ? +countItem - 1 : +countItem + 1,
        discount = discountAll / discountCount;

      fullPrice.text(elem.data('additional').operator === '+' ? priceToNum(fullPrice[0].textContent) + (price + discount) : priceToNum(fullPrice[0].textContent) - (price + discount));
    }

    thisElems.find('[data-type=count]').text(countItem);
    thisElems.find('[data-type=count-stepper]').text(countItem);

    // к оплате
    const basketTotalPrice = elem.data('additional').operator === '+' ? priceToNum(totalElem[0].textContent) + price : priceToNum(totalElem[0].textContent) - price
    totalElem.text(basketTotalPrice.toLocaleString('RU-ru'));
    // стоимость товара с учетом кол-ва
    const rowTotalPrice = elem.data('additional').operator === '+' ? priceToNum(calcPrice[0].textContent) + price : priceToNum(calcPrice[0].textContent) - price
    calcPrice.text(rowTotalPrice.toLocaleString('RU-ru'));

    let count = 0;

    elem.parents('[data-type=replace]').find('[data-item-id]').each(function () {
      count += +$(this).find('[data-type=count-stepper]').text();
    });

    $('[data-type=basket-items-count]').text(count);

    bFPriceCalc($(thisElems[0]), 'update', elem.data('additional').operator);
  }
}

function bFPriceCalc(elem, type, operator) {
  const fullPriceElem = $('[data-type=basket-full-price]'); // n товаров на сумму

  if (!fullPriceElem.length) {
    return;
  }

  const fullPriceItem = elem.find('[data-type=full-price]'), // нету в корзине
    totalPriceElem = $('[data-type=basket-price-total]'), // к оплате
    discountElem = $('[data-type=discount]'); // нету в корзине

  let price;

  if (fullPriceItem.length) {
    price = priceToNum(fullPriceItem.text());
  } else {
    price = priceToNum(elem.find('[data-type=price]').text()); // n шт. х price ₽ в строке товара
  }

  const oldPrice = priceToNum(fullPriceElem[0].textContent)
  let newPrice = 0
  switch (type) {
    case 'add':
      newPrice = oldPrice + price
      break;
    case 'delete':
      const count = +elem[0].querySelector('[data-type=count]').textContent;

      newPrice = oldPrice - (price * count)
      break;
    case 'update':
      newPrice = operator === '+' ? oldPrice + price : oldPrice - price
      break;
  }
  if(newPrice !== 0 ){
    fullPriceElem.text(newPrice.toLocaleString('ru-RU'));
  }


  if (!discountElem.length) {
    return;
  }

  const discount = priceToNum(fullPriceElem[0].textContent) - priceToNum(totalPriceElem[0].textContent)
  discountElem.text(discount.toLocaleString('ru-RU'));
}

function basketEvent() {
  $(document).on('click', '[data-type=basket]', function () {
    const thisObj = $(this),
      event = thisObj.data('event'),
      additionalData = thisObj.data('additional');

    let data = {
      id: thisObj.attr('data-id'),
    };

    if (additionalData) {
      data = Object.assign(additionalData, data);
    }

    $.ajax({
      type: 'POST',
      url: `${window.backend.templPath}/include/ajax/basket/${event}.php`,
      dataType: 'json',
      data: data,
      success: function (r) {
        if (r.success) {
          try {
            window.basketEventSuccess[event](thisObj, r);
          } catch (e) {
          }
        } else {
          alert(r.message);
        }
      },
    });
  });
}

function favorAdd() {
  $(document).on("click", "[data-type=favor-add]", function (e) {
    e.preventDefault();

    let link = $(this),
      url = "/local/templates/main/include/ajax/favor.php",
      id = link.attr("data-id"),
      headerClick = link.attr("data-header-click"),
      data = {};


    if (headerClick == 'remove') {
      $(document).find('[data-type=favor-add]').each(function () {
        let idCheck = $(this).attr("data-id"),
          headerClickCheck = $(this).attr("data-header-click");

        if (!headerClickCheck) {
          if (idCheck == id) {
            $(this).removeClass('active');
          }
        }
      });
    }

    data['id'] = id;

    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: data,
      success: function (r) {

        let hederFavBlock = $(document).find("[data-type=favor-header]");
        $(document).find("[data-type=count-favor-header]").empty();
        $(document).find("[data-type=count-favor-header]").text(r.count);


        if (r.count == 0) {
          hederFavBlock.removeClass('not-empty');
          hederFavBlock.removeClass('active');
          hederFavBlock.addClass('empty');
        }

        if (r.count > 0) {
          hederFavBlock.removeClass('empty');
          hederFavBlock.addClass('not-empty');
        }

        $.ajax({
          type: 'POST',
          url: window.location.pathname,
          dataType: 'html',
          data: {
            favorajax: true,
          },
          success: function (r) {
            hederFavBlock.empty();
            hederFavBlock.html(r);
          }
        });
        $.ajax({
          type: 'POST',
          url: window.location.pathname,
          dataType: 'html',
          data: {
            favorajaxlist: true,
          },
          success: function (r) {
            $(document).find("[data-type=favor-list]").empty();
            $(document).find("[data-type=favor-list]").html(r);
          }
        });
      },
    });
  });
}

function modalManuf() {
  $(document).on("click", "[data-type=manuf-modal]", function (e) {
    e.preventDefault();

    let txtMore = $(this).attr("data-text-more"),
      nameManuf = $(this).html();

    $(document).find('[data-type=modal-manuf-name]').html(nameManuf);
    $(document).find('[data-type=modal-manuf-text]').html(txtMore);
  });
}

function cookie() {
  $(document).on("click", "[data-type=cookie]", function (e) {
    e.preventDefault();

    let link = $(this),
      url = "/local/templates/main/include/ajax/cookie.php",
      name = link.attr("data-name"),
      data = {};

    data['name'] = name;

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: function (r) {
      },
    });
  });
}

function forms() {
  $(document).on("submit", "[data-type=js-form]", function (e) {
    e.preventDefault();

    let form = $(this),
      url = form.attr("data-url"),
      count = 0,
      file = form.find('[data-type=get-field-file]').length ? form.find('[data-type=get-field-file]') : false,
      contentType = file ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
      processData = file ? false : true,
      data = file ? new FormData() : {};

    if (file) {
      $.each(file.files, function (key, input) {
        data.append('file[]', input);
      });
      data.append('file', file[0].files[0]);
    }

    form.find("[data-type=get-field]").each(function () {
      let field = $(this).attr("data-uf"),
        val = $(this).val();

      file ? data.append(field, val) : (data[field] = val);
    });

    form.find("[data-type=get-field-multi]").each(function () {
      let field = $(this).attr("data-uf");

      data[field] = [];

    });

    form.find("[data-type=get-field-multi]").each(function () {
      if ($(this).is(":checked")) {
        let field = $(this).attr("data-uf"),
          val = $(this).attr("text");

        data[field][count] = val;
        count++

        // $(this).removeAttr("checked");
      }
    });

    form.find("[data-type=get-field-radio]").each(function () {
      if ($(this).is(":checked")) {
        let field = $(this).attr("data-uf"),
          val = $(this).attr("data-value");

        data[field] = val;

        // $(this).removeAttr("checked");
      }
    });

    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      contentType: contentType,
      processData: processData,
      data: data,
      success: function (r) {
        if (r.response) {
          let responseBlock = $(document).find("[data-type=response-text]");

          responseBlock.empty();
          responseBlock.html(r.response);
        }

        // form.trigger("reset");
      },
    });
  });
}
