import {closeWindow} from './modals-open-close';
import {finalStage} from './cart-stages';
import {eventPromoDelete, addToCartSuccess} from './catalog-scripts';
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
});

window.formSuccess = {
  consultation: form => {

  },
}

function formsEvent() {
  $(document).on('submit', '[data-type=form]', function() {
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
            console.log(e.message);
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
      allValues = $(`[data-filter-key=${filterKey}]`).filter('[data-filter-all]'),
      data = thisObj.data('show-obj'),
      container = $(`[data-show=${thisObj.data('show-all')}]`),
      entityElem = container.find('[data-filter-key]'),
      entity = entityElem.attr('data-filter-key'),
      content = container.find('[data-container=content]'),
      template = content.find('template');

    if (entity !== filterKey) {
      entityElem.attr('data-filter-key', filterKey);

      for (let property in data.replace) {
        container.find(`[data-replace=${property}]`).text(data.replace[property]);
      }

      data.data.value.forEach(item => {
        const result = template.clone().contents();

        result.find('[data-type=filter-val]').text(item);
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
  $(document).on('click', '[data-type=search]', function() {
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
            console.log(e.message);
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
    const arr = responseFilter.find('[data-type=filter-val]').map((arrI, item) => item.textContent ? item.textContent : item.value);

    elem.find('[data-type=filter-val]').each(function () {
      const filterContainer = $(this).parents('[data-container=filter-item]').length ? $(this).parents('[data-container=filter-item]') : $(this).parents('[data-type=filter]');

      if (Object.values(arr).includes($(this).text() ? $(this).text() : $(this).val())) {
        filterContainer.css(styles.enable);
      } else {
        filterContainer.css(styles.disable);
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
    const containers = $('[data-container=filters]'),
      responseContainers = response.find('[data-container=filters]'),
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

    let i = 0;

    containers.each((index, item) => {
      $(item).find('[data-container=filter]').each(function () {
        if (elem.parents('[data-container=filter]').data('filter-key') === $(this).data('filter-key')) {
          i++;
          return;
        }

        const responseFilter = responseContainers.find('[data-container=filter]').eq(i);

        if ($(this).data('filter-key') !== responseFilter.data('filter-key')) {
          $(this).css(styles.disable);
        } else {
          window.filterCompare[$(this).attr('data-compare')]($(this), responseFilter, styles);
          $(this).css(styles.enable);

          i++;
        }
      });
    });
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
      }
    },
    disable: {
      checkbox: elem => {
        elem.parents('[data-container=filter-item]').find('[data-type=filter]').prop('checked', false);
      },
      button: elem => {
        elem.parent().removeClass('active');
      }
    }
  }
}

function filterFetch(thisObj, linkContainer, entity) {
  $.ajax({
    type: 'GET',
    url: window.location.href,
    dataType: 'html',
    data: window.filters,
    success: function (r) {
      const content = $(linkContainer),
        jqResponse = $(r);

      content.empty();
      content.append(jqResponse.find(linkContainer).children());

      try {
        window.filterSuccess[entity](thisObj, jqResponse);
      } catch (e) {
        console.log(e.message);
      }
    },
  });
}

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
        if (item.getAttribute('data-template-type') === container.attr('data-template-type')) {
          return;
        }

        item.querySelector('#range-slider').noUiSlider.set(values, false);
      });

      window.filters.filter[filterKey] = values;

      filterFetch(thisObj, linkContainer, entity);
    });
  });

  $(document).on('click', '[data-type=filter]', function () {
    const thisObj = $(this),
      filterKey = thisObj.parents('[data-filter-key]').length ? thisObj.parents('[data-filter-key]').attr('data-filter-key') : thisObj.attr('data-filter-key'),
      filterElem = thisObj.parents('[data-container=filter-item]').length ? thisObj.parents('[data-container=filter-item]') : thisObj,
      valElem = filterElem.find('[data-type=filter-val]'),
      val = valElem.text() ? valElem.text() : valElem.val(),
      linkContainer = thisObj.parents('[data-link-container]').attr('data-link-container'),
      entity = thisObj.parents('[data-entity]').data('entity'),
      allFilters = $(`[data-filter-key=${filterKey}]`).find(`[data-type=filter-val]:contains(${val})`).filter((i, item) => item.getAttribute('data-style') !== valElem.attr('data-style'));

    let isSelect = 'enable';

    if (!window.filters.filter[filterKey]) {
      window.filters.filter[filterKey] = {};
    }

    if (window.filters.filter[filterKey][val]) {
      delete window.filters.filter[filterKey][val];
      removeFilterValue(val);
      isSelect = 'disable';
    } else {
      window.filters.filter[filterKey][val] = val;
      addFilterValue(filterKey, val);
    }

    allFilters.each((i, item) => {
      try {
        window.filtersEvent.styles[isSelect][item.getAttribute('data-style')]($(item));
      } catch (e) {
        console.log(e.message);
      }
    });

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
  })
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
      console.log(e.message);
    }
  });
}

function removeFilterValue(val) {
  const container = $('[data-container=filter-line]');

  container.find(`[data-type=filter-val]:contains(${val})`).parent().remove();

  if (container.find('[data-type=filter-val]').length) {
    return;
  }

  container.find('[data-type=filter-reset]').css({
    'display': 'none',
  });
}

function addFilterValue(key, val) {
  filterLineInit();

  const container = $('[data-container=filter-line]'),
    template = container.find('template').clone().contents(),
    clearElem = container.find('[data-type=filter-reset]');

  template.attr('data-filter-key', key);
  template.find('[data-type=filter-val]').text(val);
  container.prepend(template);

  if (clearElem.css('display') === 'block') {
    return;
  }

  clearElem.css({
    'display': 'block',
  });
}

function filterLineInit() {
  const templElem = $('[data-template=filter-line]'),
    templContent = templElem.contents();

  if (!templContent) {
    return;
  }

  templElem.after(templContent);
}

function checkInput() {
  let checkInput = $(document).find("[data-input=check]");
  checkInput.on('change', function () {
    let inputVal = $(this).val(),
      form = $(this).parents("[data-type=js-form]"),
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
          errorSpan.addClass("active");
          errorSpan.html(r.txter);
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
          console.log(r);
          if (r.success) {
            let timeInput = bookingForm.find('[data-uf=UF_TIME]'),
              timeTooltip = bookingForm.find('[data-type=tooltip-date]'),
              timeTooltipBlock = bookingForm.find('[data-type=tooltip-date-block]');

            timeInput.removeAttr("disabled");
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
          tooltipBlock.trigger('mouseenter');
          tooltipBlock.trigger('hover');
          tooltipBlock.trigger('mouseover');

          errorSpan.addClass("active");
          errorSpan.html(r.txter);
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
      timeTooltipBlock = bookingForm.find('[data-type=tooltip-date-block]');
    ;

    timeInput.val("");
    dateInput.val("");

    timeInput.attr("disabled", "");
    timeTooltipBlock.attr("style", "display:none;");

    dateInput.removeAttr("disabled");
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
          htmlReload();
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
          htmlReload();
          eventPromoDelete(container[0]);
          $('.cart-promocode-error').removeClass('active');
        } else {
          alert(r.message);
        }
      },
    });
  });
}

function htmlReload() {
  $.ajax({
    type: 'GET',
    url: window.location.href,
    dataType: 'html',
    data: {
      ajax: 'promo',
    },
    success: function (r) {
      $('[data-type=replace]').each(function () {
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
          pagenResponse = $(r).filter('[data-type=pagen]').length ? $(r).filter('[data-type=pagen]') : $(r).find('[data-type=pagen]');

        container.find('[data-container=items]').append($(r).filter('[data-container=items]').children());
        container.find('[data-type=pagen]').remove();

        if (pagenResponse.length) {
          container.find('[data-type=pagen-append]').append(pagenResponse);
        }
      },
    });
  });
}

function order() {
  $(document).on('click', '[data-type=order]', function () {
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
      fullPriceElem = $('[data-type=basket-full-price]'),
      price = +item[0].querySelector('[data-type=price]').textContent,
      count = +item[0].querySelector('[data-type=count]').textContent,
      basketItemsCount = $('[data-type=basket-items-count]'),
      buttonItemList = $(`[data-event=add][data-id=${item.attr('data-product-id')}]`);

    if ($('[data-reload]').length) {
      if (item.filter('[data-type=item-modal]').parent().find('[data-type=item-modal]').length === 1) {
        document.location.href = window.location.href;
      } else {
        item.remove();
      }
    } else {
      item.remove();
    }

    basketCount.text(+basketCount.text() - 1);
    totalPriceElem.text(+totalPriceElem[0].textContent - (price * count));

    if (fullPriceElem.length) {
      const fullPrice = item[0].querySelector('[data-type=full-price]') ? +item[0].querySelector('[data-type=full-price]').textContent : null;

      fullPriceElem.text(+fullPriceElem[0].textContent - ((fullPrice ? fullPrice : price) * count));
      $('[data-type=discount]').text(+fullPriceElem[0].textContent - +totalPriceElem[0].textContent);
    }

    if (basketItemsCount.length) {
      basketItemsCount.text(+basketItemsCount[0].textContent - count);
    }

    if (buttonItemList.length) {
      buttonItemList.parents('[data-type=item]').removeClass('in-cart');
      buttonItemList.attr('data-type', 'basket');
      buttonItemList.text('Добавить в корзину');
    }
  },
  add: (elem, response) => {
    const basketContainer = $('.not-empty');

    const item = elem.parents('[data-type=item]'),
      productId = elem.data('id'),
      basket = $('[data-container=header-basket]'),
      basketItem = basket.find(`[data-product-id=${productId}]`),
      totalPriceElem = basketContainer.find('[data-type=basket-price-total]');

    if (basketItem.length) {
      const count = basketItem.find('[data-type=count]');

      count.text(+count[0].textContent + 1);
    } else {
      const itemTemplate = basket.find('template').clone().contents(),
        basketCount = $('[data-type=basket-count]');

      item.addClass('in-cart');
      item.removeAttr('data-type');
      item.find('button').text('В корзине');

      $('[data-replace]').each((i, field) => {
        const jq = $(field);

        jq.text(item.find(`[data-field=${jq.data('replace')}]`).text());
      });

      $('[data-replace-img]').each((i, field) => {
        const jq = $(field);

        jq.attr('src', item.find('[data-field-img]').attr('src'));
      });

      addToCartSuccess();

      itemTemplate.filter('[data-item-id]').attr('data-item-id', response.data.ID);
      itemTemplate.filter('[data-product-id]').attr('data-product-id', productId);
      itemTemplate.find('[data-id]').attr('data-id', response.data.ID);
      itemTemplate.find('img').attr('src', item.find('img').attr('src'));
      item.find('[data-field]').each(function () {
        const inpVal = $(this).val(),
          value = inpVal ? inpVal : $(this).text();

        itemTemplate.find(`[data-field=${$(this).data('field')}]`).html(value);
      });

      basket.append(itemTemplate);
      basketCount.text(+basketCount.text() + 1);
    }

    totalPriceElem.text(+totalPriceElem.text() + +item.find('[data-type=price]').text());
  },
  update: elem => {
    const thisElems = $(`[data-item-id=${elem.attr('data-id')}]`),
      price = +thisElems[0].querySelector('[data-type=price]').textContent,
      totalElem = $('[data-type=basket-price-total]'),
      fullPriceElem = $('[data-type=basket-full-price]');

    thisElems.find('[data-type=count]').text(elem.parent().find('[data-type=count-stepper]').text());
    totalElem.text(elem.data('additional').operator === '+' ? +totalElem[0].textContent + price : +totalElem[0].textContent - price);

    if (fullPriceElem.length) {
      const fullPrice = thisElems[0].querySelector('[data-type=full-price]') ? +thisElems[0].querySelector('[data-type=full-price]').textContent : null;

      fullPriceElem.text(elem.data('additional').operator === '+' ? +fullPriceElem[0].textContent + (fullPrice ? fullPrice : price) : +fullPriceElem[0].textContent - (fullPrice ? fullPrice : price));
      $('[data-type=discount]').text(+fullPriceElem[0].textContent - +totalElem[0].textContent);
    }

    let count = 0;

    elem.parents('[data-type=replace]').find('[data-item-id]').each(function () {
      count += +$(this).find('[data-type=count-stepper]').text();
    });

    $('[data-type=basket-items-count]').text(count);
  }
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
            console.log(e.message);
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
    console.log("favorite add");
    e.preventDefault();

    let link = $(this),
      url = "/local/templates/main/include/ajax/favor.php",
      id = link.attr("data-id"),
      data = {};

    data['id'] = id;

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: function (r) {
        console.log(r.count);
        $(document).find("[data-type=count-favor-header]").empty();
        $(document).find("[data-type=count-favor-header]").html(r.count);
        $.ajax({
          type: 'POST',
          url: window.location.pathname,
          dataType: 'html',
          data: {
            favorajax: true,
          },
          success: function (r) {
            $(document).find("[data-type=favor-header]").empty();
            $(document).find("[data-type=favor-header]").html(r);
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
    console.log("manuf modal");
    e.preventDefault();

    let txtMore = $(this).attr("data-text-more"),
      nameManuf = $(this).html();

    $(document).find('[data-type=modal-manuf-name]').html(nameManuf);
    $(document).find('[data-type=modal-manuf-text]').html(txtMore);
  });
}

function cookie() {
  $(document).on("click", "[data-type=cookie]", function (e) {
    console.log("cookie");
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
        console.log(r);
      },
    });
  });
}

function forms() {
  $(document).on("submit", "[data-type=js-form]", function (e) {
    console.log("form submit");
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
      }
    });

    form.find("[data-type=get-field-radio]").each(function () {
      if ($(this).is(":checked")) {
        let field = $(this).attr("data-uf"),
          val = $(this).attr("data-value");

        data[field] = val;
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
        console.log(r);
        if (r.response) {
          let responseBlock = $(document).find("[data-type=response-text]");

          responseBlock.empty();
          responseBlock.html(r.response);
        }
      },
    });
  });
}
