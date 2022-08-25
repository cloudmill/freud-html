import { closeWindow } from './modals-open-close';
import { finalStage } from './cart-stages';
import { eventPromoDelete } from './catalog-scripts';

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
});

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
      timeTooltipBlock = bookingForm.find('[data-type=tooltip-date-block]');;

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
          pagenResponse = $(r).filter('[data-type=pagen]');

        container.find('[data-container=items]').append($(r).filter('[data-container=items]').children());
        container.find('[data-type=pagen]').remove();

        if (pagenResponse.length) {
          container.find('[data-type=pagen-append]').after(pagenResponse);
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
      basketItemsCount = $('[data-type=basket-items-count]');

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
  },
  add: (elem, response) => {
    const basketContainer = $('.not-empty');

    if (!basketContainer.hasClass('active')) {
      basketContainer.addClass('active');
    }

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
