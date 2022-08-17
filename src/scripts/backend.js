import {closeWindow} from './modals-open-close';

$(function () {
  initData();
  forms();
  snippetImg();
  cookie();
  modalManuf();
  favorAdd();
  basketEvent();
  transferData();
});

function transferData() {
  $(document).on('click', '[data-type=transfer-data]', function() {
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
      basketCount = $('[data-type=basket-count]');

    if ($('[data-reload]').length) {
      if (item.filter('[data-type=item-modal]').parent().children().length === 1) {
        document.location.href = window.location.href;
      } else {
        item.remove();
      }
    } else {
      item.remove();
    }

    basketCount.text(+basketCount.text() - 1);
  },
  add: (elem, response) => {
    const item = elem.parents('[data-type=item]'),
      productId = elem.data('id'),
      basket = $('[data-container=header-basket]'),
      basketItem = basket.find(`[data-product-id=${productId}]`);

    if (basketItem.length) {
      const count = basketItem.find('[data-type=count]');

      console.log(count[0].text());

      // count.text(+count[0].text() + 1);
    } else {
      const itemTemplate = basket.find('template').contents(),
        basketCount = $('[data-type=basket-count]');

      itemTemplate.find('[data-item-id]').attr('data-item-id', response.data.ID);
      itemTemplate.find('[data-id]').attr('data-id', response.data.ID);
      itemTemplate.find('[data-product-id]').attr('data-product-id', productId);
      itemTemplate.find('img').attr('src', item.find('img').attr('src'));
      item.find('[data-field]').each(function() {
        itemTemplate.find(`[data-field=${$(this).data('field')}]`).text($(this).text());
      });

      console.log(itemTemplate);

      basket.append(itemTemplate);
      basketCount.text(+basketCount.text() + 1);
    }
  },
}

function basketEvent() {
  $(document).on('click', '[data-type=basket]', function() {
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
          } catch(e) {
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

function snippetImg() {
    $(document).ready(function () {
        let img = $(document).find('[data-type=snippet-img-hide]');

        $(document).find('[data-type=snippet-img-show]').html(img);
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
            },
        });
    });
}
