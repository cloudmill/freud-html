(()=>{var e,t={997:(e,t,a)=>{"use strict";a(711);var o=1280,r=768,c=window.matchMedia("(min-width: ".concat(o,"px)")),n=(window.matchMedia("(min-width: ".concat(r,"px)")),a(566)),s=a.n(n);function i(e){e.querySelectorAll("input").forEach((function(e){e.setAttribute("tabindex","0")})),e.querySelectorAll("button").forEach((function(e){e.setAttribute("tabindex","0")})),e.querySelectorAll("a").forEach((function(e){e.setAttribute("tabindex","0")}))}function l(e,t,a,o,r,c,n){c&&document.querySelector(".body").classList.add("modal-open"),n&&n.classList.add("active"),t.forEach((function(e){e.classList.remove("active")})),a.forEach((function(e){e.classList.remove("active")}));var s=Number(e.getAttribute(o)),l=document.querySelector("[".concat(r,"='").concat(s,"']"));e.classList.add("active"),l.classList.add("active"),l.querySelector("[data-focus-input]")&&l.querySelector("[data-focus-input]").focus(),i(l)}function d(e,t,a,o){a&&document.querySelector(".body").classList.remove("modal-open"),o&&o.classList.remove("active"),e.forEach((function(e){e.classList.remove("active")})),t.forEach((function(e){e.classList.remove("active")})),t.forEach((function(e){e.querySelectorAll("input").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("button").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("a").forEach((function(e){e.setAttribute("tabindex","-1")}))}))}const u=function(){var e=document.querySelector("[data-time-mask]");e&&(e.setAttribute("placeholder","Введите время"),e.addEventListener("focusin",(function(){e.setAttribute("placeholder","__:__")})),Maska.create(e,{mask:"hH:mM",tokens:{h:{pattern:/[1-2]/},H:{pattern:/[0-9]/},m:{pattern:/[0-5]/},M:{pattern:/[0-9]/}}}))};var m=a(820),f=a(656);const v=function(){Object.assign(m.Z.locales,f.Z);var e=document.querySelector("[data-datepicker]");if(e){var t=new Date,a=t.toLocaleDateString("en-GB").replace(/\D/g,"/"),o="31/12/"+String(t.getFullYear()+1);new m.Z(e,{format:"dd/mm/yyyy",autohide:!0,language:"ru",orientation:"top",maxView:2,minDate:a,maxDate:o,prevArrow:'<svg class="datepicker-arrow" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <path d="M6 11L1 6L6 1" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n      </svg>',nextArrow:'<svg class="datepicker-arrow next" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <path d="M6 11L1 6L6 1" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n      </svg>'}),c.matches||document.querySelector("[data-datepicker]").addEventListener("click",(function(){setTimeout((function(){document.querySelector("[data-datepicker]").scrollIntoView({behavior:"smooth",block:"end"})}))}))}};function g(e,t){var a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(e,t)}(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,n=!0,s=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return n=e.done,e},e:function(e){s=!0,c=e},f:function(){try{n||null==a.return||a.return()}finally{if(s)throw c}}}}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,o=new Array(t);a<t;a++)o[a]=e[a];return o}const y=function(){var e,t=document.querySelectorAll('input[type="tel"]'),a=function(e){return e.value.replace(/\D/g,"")},o=function(e){var t=e.target,o=a(t),r=e.clipboardData||window.clipboardData;if(r){var c=r.getData("Text");if(/\D/g.test(c))return void(t.value=o)}},r=function(e){var t=e.target,o=a(t),r=t.selectionStart,c="";if(!o)return t.value="";if(t.value.length==r){if(["7","8","9"].indexOf(o[0])>-1){"9"==o[0]&&(o="7"+o);var n="8"==o[0]?"8":"+7";c=t.value=n+" ",o.length>1&&(c+="("+o.substring(1,4)),o.length>=5&&(c+=") "+o.substring(4,7)),o.length>=8&&(c+="-"+o.substring(7,9)),o.length>=10&&(c+="-"+o.substring(9,11))}else c="+"+o.substring(0,16);if(/^\+0+/g.test(c)){var s=c.replace(/^\+0+/g,"");s.length>0?t.value="+".concat(s):t.value=""}else t.value=c.replace(/^\+0+/g,"")}else e.data&&/\D/g.test(e.data)&&(t.value=o)},c=function(e){var t=e.target.value.replace(/\D/g,"");8==e.keyCode&&1==t.length&&(e.target.value="")},n=g(t);try{for(n.s();!(e=n.n()).done;){var s=e.value;s.addEventListener("keydown",c),s.addEventListener("input",r,!1),s.addEventListener("paste",o,!1)}}catch(e){n.e(e)}finally{n.f()}};const h=function(){var e=document.querySelectorAll("[data-select-context]");e.length&&e.forEach((function(e){e.addEventListener("click",(function(e){var t=e.target.closest("[data-select-context]"),a=e.target.closest("[data-select-input]"),o=e.target.closest("[data-select]"),r=e.target.closest("[data-select-option]"),c=t.querySelector(".select-label.active")&&e.target.closest("[data-select-context]")&&!e.target.closest("[data-select]");a?function(e){var t=document.querySelectorAll("[data-select-label]"),a=e.closest("[data-select-label]");a.classList.contains("active")?a.classList.remove("active"):(t.forEach((function(e){e.classList.remove("active")})),a.classList.add("active"))}(a):o?r&&function(e){var t=e.closest(".select-label.active");t.querySelector("input").value=e.getAttribute("data-select-option"),t.classList.remove("active")}(r):c&&t.querySelector(".select-label.active").classList.remove("active")}))}))};const b=function(){var e=document.querySelectorAll("form");e&&e.forEach((function(e){e.querySelectorAll("input").forEach((function(t){var a;function o(){t.validity.valueMissing?"name"==t.getAttribute("data-input-title")?a.textContent="— заполните поле «Имя»":"sec-name"==t.getAttribute("data-input-title")?a.textContent="— заполните поле «Фамилия»":"address"==t.getAttribute("data-input-title")?a.textContent="— заполните поле «Адрес»":"tel"!=t.getAttribute("type")||t.closest(".booking-popup-form")?"email"==t.getAttribute("type")?a.textContent="— заполните поле «E-mail»":"checkbox"!=t.getAttribute("type")||t.checked?a.textContent="Обязательное поле":a.textContent="— вы не можете продолжить без согласия с политикой конфиденциальности":a.textContent="— заполните поле «Телефон»":t.validity.typeMismatch?"email"==t.getAttribute("type")?a.textContent="— e-mail должен содержать символы «@», «.» проверьте правильность ввода":a.textContent="Введено некорректно":t.hasAttribute("data-readonly")&&!t.value.length&&(a.textContent="Обязательное поле"),a.className="form-error active"}t.hasAttribute("data-input-novalidate")||("checkbox"==t.getAttribute("type")?(t.closest(".checkbox").insertAdjacentHTML("beforeend","<span class='form-error'></>"),a=t.closest(".checkbox").querySelector(".form-error")):t.closest("[data-select-input]")?(t.closest(".select-label").insertAdjacentHTML("beforeend","<span class='form-error'></>"),a=t.closest(".select-label").querySelector(".form-error")):t.hasAttribute("data-datepicker")?(t.closest(".form__label").insertAdjacentHTML("beforeend","<span class='form-error'></>"),a=t.closest(".form__label").querySelector(".form-error")):(t.insertAdjacentHTML("afterend","<span class='form-error'></>"),a=t.nextElementSibling),t.addEventListener("focusout",(function(e){t.validity.valid||t.hasAttribute("data-readonly")&&!t.value.length?(a.textContent="",a.className="form-error"):o()}))),e.addEventListener("submit",(function(e){!t.validity.valid||"checkbox"==t.getAttribute("type")&&!t.checked||t.hasAttribute("data-readonly")&&!t.value.length||t.closest("form").querySelector(".form-error.active")?(o(),e.preventDefault(),console.log("form-error")):(e.preventDefault(),console.log("form-success"),t.closest(".subscription-form")?(document.querySelector(".body").classList.add("modal-open"),document.querySelector(".modals-container").classList.add("active"),document.querySelector('[data-popup="11"]').classList.add("active")):t.closest(".product-body-consult")?(document.querySelector(".body").classList.add("modal-open"),document.querySelector(".modals-container").classList.add("active"),document.querySelector('[data-popup="13"]').classList.add("active")):t.closest("#certificates-form")?document.querySelector('[data-popup="13"]').classList.add("active"):t.closest("#booking-form")&&document.querySelector('[data-popup="16"]').classList.add("active"))}))}))}))};var L=a(6);function S(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const q=function(){new L.ZP("#restaurant-slider",{modules:[L.W_,L.tl],loop:!0,navigation:{nextEl:"#restaurant-slider-next",prevEl:"#restaurant-slider-prev"},pagination:{el:"#restaurant-slider-pagination"}}),new L.ZP("#reviews-slider",{modules:[L.W_,L.tl],slidesPerView:1.1,spaceBetween:15,breakpoints:(e={},S(e,768,{slidesPerView:"auto"}),S(e,1280,{spaceBetween:30,slidesPerView:"auto"}),e),navigation:{nextEl:"#reviews-slider-next",prevEl:"#reviews-slider-prev"},pagination:{el:"#reviews-slider-pagination"}}),new L.ZP("#shop-slider",{modules:[L.W_],slidesPerView:"auto",spaceBetween:15,breakpoints:S({},1280,{spaceBetween:30}),navigation:{nextEl:"#shop-slider-next",prevEl:"#shop-slider-prev"}}),new L.ZP("#articles-slider",{modules:[L.W_],slidesPerView:"auto",spaceBetween:30,navigation:{nextEl:"#articles-slider-next",prevEl:"#articles-slider-prev"}}),new L.ZP("#categories-slider",{modules:[L.W_],slidesPerView:"auto",spaceBetween:20,loop:!0,breakpoints:S({},1280,{slidesPerView:3,spaceBetween:30}),navigation:{nextEl:"#categories-slider-next",prevEl:"#categories-slider-prev"}}),new L.ZP("#humidor-slider",{modules:[L.Gk],slidesPerView:"auto",spaceBetween:15,centeredSlides:!0,initialSlide:1,mousewheel:{releaseOnEdges:!0,eventsTarget:".humidor-slider-overlay"},breakpoints:(t={},S(t,768,{centeredSlides:!1}),S(t,1280,{spaceBetween:30,initialSlide:0,centeredSlides:!1}),t)});var e,t,a=new L.ZP("#gallery-slider",{modules:[L.Gk,L.W_],slidesPerView:"auto",mousewheel:!0,slideToClickedSlide:!0,breakpoints:S({},1280,{direction:"vertical"}),navigation:{nextEl:"#gallery-slider-next",prevEl:"#gallery-slider-prev"}});new L.ZP("#product-slider",{modules:[L.o3],thumbs:{swiper:a}})};const A=function(){var e=document.querySelector(".humidor-slider-overlay"),t=document.querySelector(".last-slide"),a=document.querySelector(".first-slide");function o(){e.getBoundingClientRect().top<-600&&(e.classList.add("at-last"),document.removeEventListener("scroll",o))}function r(){e.getBoundingClientRect().top>200&&(e.classList.remove("at-first"),document.removeEventListener("scroll",r))}e&&c.matches&&(new IntersectionObserver((function(t,a){(e.getBoundingClientRect().top<0&&!e.classList.contains("at-first")||e.classList.contains("at-last"))&&(document.querySelector("body").classList.add("fix-scroll"),e.classList.add("active"))}),{root:null,rootMargin:"0px",threshold:1}).observe(e),new IntersectionObserver((function(t,a){e.getBoundingClientRect().top<100&&(document.querySelector("body").classList.remove("fix-scroll"),e.classList.remove("active"),document.addEventListener("scroll",o))}),{root:null,rootMargin:"0px",threshold:1}).observe(t),new IntersectionObserver((function(t,a){e.getBoundingClientRect().top<200&&e.classList.contains("at-last")&&(document.querySelector("body").classList.remove("fix-scroll"),e.classList.remove("active"),e.classList.add("at-first"),e.classList.remove("at-last"),document.addEventListener("scroll",r))}),{root:null,rootMargin:"0px",threshold:1}).observe(a))};var w=a(386);const E=function(){var e=document.querySelectorAll(".js-badger-accordion");Array.from(e).forEach((function(e){new w.Z(e)}))};const x=function(){var e=document.querySelector("[data-tabs]"),t=document.querySelector("[data-tabs-content]");if(e&&t){var a=t.querySelectorAll("[data-content-item]");e.querySelectorAll("[data-tabs-item]").forEach((function(o,r){o.addEventListener("click",(function(){e.querySelector(".active").classList.remove("active"),o.classList.add("active"),t.querySelector(".active").classList.remove("active"),a[r].classList.add("active")}))}))}else e&&e.querySelectorAll("[data-tabs-item]").forEach((function(t,a){t.addEventListener("click",(function(){e.querySelector(".active").classList.remove("active"),t.classList.add("active")}))}))};const k=function(e,t,a){var o=document.querySelector(".modals-container"),r=document.querySelectorAll("[".concat(t,"]")),c=document.querySelectorAll("[".concat(a,"]"));if(r&&c){var n=e.target.closest("[".concat(t,"]")),s=o.classList.contains("active")&&!e.target.closest("[".concat(a,"]"))&&!e.target.closest("[".concat(t,"]"))&&!e.target.closest(".datepicker-view")||e.target.closest("[data-modal-close]");n?l(n,r,c,t,a,true,o):s&&d(r,c,true,o)}};const _=function(e,t,a,o){var r=document.querySelectorAll("[".concat(t,"]")),c=document.querySelectorAll("[".concat(a,"]")),n=!1;if(r&&c){var s,u=e.target.closest("[".concat(t,"]"));if("mouseover"==e.type&&u){o&&document.querySelector(".body").classList.add("modal-open");var m=Number(u.getAttribute(t)),f=document.querySelector("[".concat(a,"='").concat(m,"']"));r.forEach((function(e){e.getAttribute(t)!==m&&e.classList.remove("active")})),c.forEach((function(e){e.classList.contains("header-modals__item")?e!==f&&(e.style.zIndex="4",setTimeout((function(){e.classList.remove("active"),e.style.zIndex=""}),300)):e.classList.remove("active")})),u.classList.add("active"),f.classList.add("active"),f.querySelector("[data-focus-input]")&&f.querySelector("[data-focus-input]").focus(),i(f),document.querySelector(".header__top").addEventListener("mouseover",(function(e){e.relatedTarget==document.querySelector(".header__bottom")&&d(r,c,o,n)})),document.querySelector("[data-drop-close]").addEventListener("mouseover",(function(e){d(r,c,o,n)})),document.addEventListener("click",(function(e){(s=document.querySelector(".active[".concat(a,"]"))&&!e.target.closest("[".concat(t,"]"))&&!e.target.closest("[".concat(a,"]")))&&d(r,c,o,n)}))}else"click"==e.type&&(s=document.querySelector(".active[".concat(a,"]"))&&!u&&!e.target.closest("[".concat(a,"]")),u&&!u.classList.contains("active")?l(u,r,c,t,a,o,n):(u&&u.classList.contains("active")||s)&&d(r,c,o,n))}};const T=function(){document.querySelector("[data-cart-stage-general]")&&(c.matches&&document.querySelectorAll("[data-cart-content]").forEach((function(e){var t=String(e.offsetHeight);e.style.height=t+"px"})),document.querySelector("[data-cart-big-form]").addEventListener("click",(function(e){e.target.closest(".cart-receiving").classList.add("height-auto")})),document.querySelector("[data-cart-small-form]").addEventListener("click",(function(e){e.target.closest(".cart-receiving").classList.remove("height-auto")})),document.querySelectorAll("[data-cart-next]").forEach((function(e){e.addEventListener("click",(function(t){setTimeout((function(){if(!Boolean(e.closest("form"))||e.closest("form")&&!e.closest("form").querySelector(".form-error.active")){t.target.closest("[data-cart-stage]").classList.remove("open"),t.target.closest("[data-cart-stage]").classList.remove("add-transition"),t.target.closest("[data-cart-stage]").classList.add("previous");var a=e.getAttribute("data-cart-next");document.querySelector("[data-cart-stage='".concat(a,"']")).classList.remove("previous"),document.querySelector("[data-cart-stage='".concat(a,"']")).classList.remove("collapsed"),document.querySelector("[data-cart-stage='".concat(a,"']")).classList.add("open"),setTimeout((function(){document.querySelector("[data-next-target='".concat(a,"']")).scrollIntoView({behavior:"smooth"})})),c.matches||t.target.closest("[data-cart-stage]").scrollIntoView({block:"start"})}}))}))})),document.querySelectorAll("[data-stage-edit]").forEach((function(e){e.addEventListener("click",(function(e){document.querySelectorAll("[data-cart-stage]").forEach((function(e){e.classList.remove("open"),e.classList.remove("add-transition"),e.classList.contains("previous")||e.classList.add("collapsed")})),e.target.closest("[data-cart-stage]").classList.remove("collapsed"),e.target.closest("[data-cart-stage]").classList.remove("previous"),e.target.closest("[data-cart-stage]").classList.add("open"),e.target.closest("[data-cart-stage]").classList.add("add-transition")}))})),document.querySelectorAll("[data-cart-final]").forEach((function(e){e.addEventListener("click",(function(t){setTimeout((function(){(!Boolean(e.closest("form"))||e.closest("form")&&!e.closest("form").querySelector(".form-error.active"))&&(document.querySelector("[data-cart-body-stages]").classList.add("hide"),document.querySelector("[data-cart-body-result]").classList.remove("hide"),setTimeout((function(){document.querySelector("html").scrollIntoView({behavior:"smooth"})})))}))}))})))};var M=a(344),C=a.n(M);const O=function(){var e=document.querySelectorAll("#range-slider");e.length&&e.forEach((function(e){var t=Number(e.getAttribute("data-range-min")),a=Number(e.getAttribute("data-range-max")),o=e.closest("#range-slider-container"),r=o.querySelector("#range-from"),c=o.querySelector("#range-to");C().create(e,{start:[t,a],connect:!0,range:{min:t,max:a}}),e.noUiSlider.on("update",(function(e,t){var a=e[t];t?c.value=Math.round(a):r.value=Math.round(a)})),r.addEventListener("change",(function(){e.noUiSlider.set([this.value,null])})),c.addEventListener("change",(function(){e.noUiSlider.set([null,this.value])}))}))};document.addEventListener("DOMContentLoaded",(function(){var e,t;q(),(e=document.querySelectorAll(".header__buttons-icon")).length&&e.forEach((function(e){e.classList.contains("count")?e.hasAttribute("data-fav-btn")?e.setAttribute("data-header-btn","5"):e.hasAttribute("data-cart-btn")&&e.setAttribute("data-header-btn","6"):e.hasAttribute("data-fav-btn")?e.setAttribute("data-header-btn","3"):e.hasAttribute("data-cart-btn")&&e.setAttribute("data-header-btn","4")})),function(){if(document.querySelector("#map"))try{ymaps.ready((function(){var e=new ymaps.Map("map",{center:[59.934277,30.309636],zoom:14},{searchControlProvider:"yandex#search"}),t=(ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'),new ymaps.Placemark([59.934277,30.309636],{},{iconLayout:"default#image",iconImageHref:"/local/templates/main/assets/images/placemark.png",iconImageSize:[45.71,64],iconImageOffset:[-22,-64]}));e.geoObjects.add(t)}))}catch(e){console.error(e)}if(document.querySelector("#map2")){console.log(document.querySelector("#map2"));try{ymaps.ready((function(){var e=new ymaps.Map("map2",{center:[59.934277,30.309636],zoom:14},{searchControlProvider:"yandex#search"}),t=(ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'),new ymaps.Placemark([59.934277,30.309636],{},{iconLayout:"default#image",iconImageHref:"/local/templates/main/assets/images/placemark.png",iconImageSize:[45.71,64],iconImageOffset:[-22,-64]}));e.geoObjects.add(t)}))}catch(e){console.error(e)}}}(),x(),v(),u(),y(),h(),b(),O(),document.querySelector(".sorting-filter")&&document.querySelector(".sorting-filter").addEventListener("change",(function(e){document.querySelector("[data-sort-filter]").innerHTML=e.target.closest(".sorting-filter__label").querySelector(".sorting-filter__txt").innerHTML})),(t=document.querySelector("[data-active-filters]"))&&t.querySelectorAll(".active-filter").length&&window.addEventListener("scroll",(function(){var e=document.querySelector(".active-filters-row"),a=document.querySelector(".header__bottom").offsetHeight;t.getBoundingClientRect().top-20-a<=0?e.classList.add("active"):e.classList.remove("active")})),document.querySelectorAll("[data-number-goods]").forEach((function(e){e.addEventListener("click",(function(t){t.stopPropagation();var a=Number(e.querySelector("[data-number-goods-count]").innerHTML);t.target.closest("[data-number-goods-minus]")&&a>0?e.querySelector("[data-number-goods-count]").innerHTML=a-1:t.target.closest("[data-number-goods-plus]")&&(e.querySelector("[data-number-goods-count]").innerHTML=a+1)}))})),A(),function(){var e=document.querySelectorAll("[data-header-modal]"),t=document.querySelectorAll("[data-filter-drop]"),a=document.querySelectorAll("[data-popup]");e.forEach((function(e){e.querySelectorAll("a").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("input").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("button").forEach((function(e){e.setAttribute("tabindex","-1")}))})),t.forEach((function(e){e.querySelectorAll("a").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("input").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("button").forEach((function(e){e.setAttribute("tabindex","-1")}))})),a.forEach((function(e){e.querySelectorAll("input").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("a").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("button").forEach((function(e){e.setAttribute("tabindex","-1")}))}))}(),document.addEventListener("keydown",(function(e){"Escape"==e.code&&(document.querySelector(".modals-container.active")||document.querySelector(".active[data-popup]")?(document.querySelector(".body.modal-open").classList.remove("modal-open"),document.querySelector(".modals-container.active").classList.remove("active"),document.querySelectorAll(".active[data-popup]").forEach((function(e){e.classList.remove("active")}))):document.querySelector(".active[data-filter-drop]")?document.querySelector(".active[data-filter-drop]").classList.remove("active"):document.querySelector(".active[data-header-modal]")&&(document.querySelector(".active[data-header-modal]").classList.remove("active"),document.querySelector(".body.modal-open").classList.remove("modal-open")))})),document.querySelector("[data-show-height]")&&document.querySelector("[data-show-diameter]")&&(document.querySelector("[data-show-height]").innerHTML=document.querySelector(".product-top-img__cigar-size").getAttribute("data-cigar-height"),document.querySelector("[data-show-diameter]").innerHTML=document.querySelector(".product-top-img__cigar-size").getAttribute("data-cigar-diameter")),function(){if(document.querySelector(".cart-promocode")){var e=document.querySelector(".cart-promocode__input"),t=e.closest(".cart-promocode"),a=document.querySelector(".cart-promocode-delete");e.addEventListener("focusin",(function(e){e.target.closest(".cart-promocode").classList.add("active")})),e.addEventListener("input",(function(){e.value.length?(t.classList.add("send-active"),t.classList.remove("delete-active")):t.classList.remove("send-active")})),a.addEventListener("click",(function(e){e.target.closest(".cart-promocode").querySelector("input").value="",e.target.closest(".cart-promocode").classList.remove("delete-active")})),e.addEventListener("focusout",(function(a){a.target.closest(".cart-promocode").classList.remove("active"),t.classList.remove("send-active"),e.value&&t.classList.add("delete-active")}))}}(),document.querySelector(".first-screen")&&setTimeout((function(){document.querySelectorAll("[data-video-show]").forEach((function(e){e.classList.add("loaded")})),document.querySelectorAll("[data-fade-up]").forEach((function(e){e.classList.add("loaded")})),document.querySelector(".first-screen__ttl").classList.add("loaded")}),600),document.addEventListener("click",(function(e){k(e,"data-popup-button","data-popup"),_(e,"data-filter-btn","data-filter-drop"),function(e){e.target.closest(".catalog-card__fav")?e.target.closest(".catalog-card__fav").classList.toggle("active"):e.target.closest(".product-button-fav")&&e.target.closest(".product-button-fav").classList.toggle("active")}(e),function(e){e.target.closest(".catalog-card__btn")&&!e.target.closest(".catalog-card--small")&&(e.target.closest(".catalog-card.in-cart")?(e.target.closest(".catalog-card").classList.remove("in-cart"),c.matches?e.target.closest(".catalog-card__btn").innerHTML="Добавить в корзину":e.target.closest(".catalog-card__btn").innerHTML="В корзину"):(e.target.closest(".catalog-card").classList.add("in-cart"),e.target.closest(".catalog-card__btn").innerHTML="В корзине",document.querySelector(".body").classList.add("modal-open"),document.querySelector(".modals-container").classList.add("active"),document.querySelector('[data-popup="5"]').classList.add("active")))}(e),function(e){var t=e.target.closest("[data-filter-drop]"),a=e.target.closest(".filters-popup"),o=e.target.closest(".category-filter-btn"),r=document.querySelector("[data-mob-filters]");if((t||a)&&o&&c.matches)o.classList.toggle("active");else if(a&&o&&!c.matches)if(e.target.closest("[data-mob-filters]"))e.target.closest("[data-mob-filters]")&&(o.remove(),document.querySelector(".filters-popup").querySelectorAll(".category-filter-btn.active").forEach((function(e){e.textContent==o.textContent&&e.classList.remove("active")})),r.innerHTML||r.classList.remove("active"));else if(o.classList.contains("active"))o.classList.remove("active"),document.querySelector("[data-mob-filters]").querySelectorAll(".category-filter-btn.active-filter").forEach((function(e){e.textContent==o.textContent&&e.remove()})),r.innerHTML||r.classList.remove("active");else{o.classList.add("active"),r.classList.add("active");var n=o.innerHTML;r.insertAdjacentHTML("beforeend",'<button class="category-filter-btn button--clean active-filter">'.concat(n,"</button>"))}e.target.closest(".drinks-filters-item")&&e.target.closest(".drinks-filters-item").classList.toggle("active")}(e),function(e){if(e.target.closest("[data-anchor-btn]")){e.preventDefault(),document.querySelectorAll("[data-anchor-target]").forEach((function(e){e.insertAdjacentHTML("afterbegin",'<div class="anchor"></div>')}));var t=e.target.closest("[data-anchor-btn]").getAttribute("data-anchor-btn");document.querySelector("[data-anchor-target='".concat(t,"']")).querySelector(".anchor").scrollIntoView({behavior:"smooth",block:"start"})}}(e),function(e){if(e.target.closest("a")&&!e.target.closest("a").hasAttribute("data-nolink")){e.preventDefault();var t=e.target.closest("a").getAttribute("href");document.querySelector(".modals-container").classList.add("fade"),setTimeout((function(){window.location.assign(t)}),600)}}(e),e.target.closest("[data-cookie-close]")&&document.querySelector(".cookie.active").classList.remove("active"),e.target.closest("[data-plug-close]")&&(document.querySelector(".plug-popup.active").classList.remove("active"),document.querySelector(".modals-container.plug").classList.remove("plug")),e.target.closest(".mobile-nav__item")&&e.target.closest(".mobile-nav__item").hasAttribute("data-popup-button")?(e.target.closest(".mobile-nav__item").classList.add("active"),e.target.closest(".mobile-nav").classList.add("index-raise"),e.target.closest(".mobile-nav__item").removeAttribute("data-popup-button"),e.target.closest(".mobile-nav__item").setAttribute("data-modal-close","data-modal-close")):e.target.closest(".mobile-nav__item")&&e.target.closest(".mobile-nav__item").hasAttribute("data-modal-close")&&(e.target.closest(".mobile-nav__item").removeAttribute("data-modal-close"),e.target.closest(".mobile-nav__item").setAttribute("data-popup-button","14"),e.target.closest(".mobile-nav__item").classList.remove("active"),setTimeout((function(){e.target.closest(".mobile-nav").classList.remove("index-raise")}),300))})),c.matches&&document.querySelector(".header__bottom-inner").addEventListener("mouseover",(function(e){_(e,"data-header-btn","data-header-modal",!0)})),c.matches||(document.querySelector("[data-menu-btn]").addEventListener("click",(function(){document.querySelector("[data-mobile-menu]").classList.toggle("active"),document.querySelector("[data-menu-btn]").classList.toggle("active"),document.querySelector(".mobile-menu-item.active")&&document.querySelector(".mobile-menu-item.active").classList.remove("active")})),document.querySelectorAll("[data-menu-link]").forEach((function(e){e.addEventListener("click",(function(t){var a=e.getAttribute("data-menu-link");document.querySelector("[data-menu-item='".concat(a,"'")).classList.add("active")}))})),document.querySelectorAll("[data-menu-close]").forEach((function(e){e.addEventListener("click",(function(e){e.target.closest(".mobile-menu-item.active").classList.remove("active")}))})))})),window.addEventListener("load",(function(){T(),document.querySelector("body").classList.remove("no-transition"),setTimeout((function(){document.querySelector(".header").classList.add("loaded"),document.querySelector(".filter-drops-container")&&document.querySelector(".filter-drops-container").classList.add("loaded")}),1200),document.querySelector(".first-screen")&&setTimeout((function(){document.querySelector(".first-screen__ttl").classList.add("blend-mode")}),500),function(){var e=document.querySelector(".header"),t=window.pageYOffset;if(e&&(c.matches||document.querySelector("[data-category-page]"))){var a=function(){var a=window.pageYOffset;Math.abs(t-a)>=1&&(a>t?e.classList.add("header--short"):e.classList.remove("header--short")),t<1&&e.classList.remove("header--short"),t=a};window.addEventListener("scroll",(function e(){a(),setTimeout((function(){a(),window.addEventListener("scroll",e,{once:!0})}),1e3/120)}),{once:!0})}}(),E(),s().init({once:!0,offset:0,duration:1200})}))},711:(e,t,a)=>{var o=a(638);o((function(){o(document).on("submit","[data-type=js-form]",(function(e){console.log("form submit"),e.preventDefault();var t=o(this),a=t.attr("data-url"),r=0,c=!!t.find("[data-type=get-field-file]").length&&t.find("[data-type=get-field-file]"),n=!c&&"application/x-www-form-urlencoded; charset=UTF-8",s=!c,i=c?new FormData:{};c&&(o.each(c.files,(function(e,t){i.append("file[]",t)})),i.append("file",c[0].files[0])),t.find("[data-type=get-field]").each((function(){var e=o(this).attr("data-uf"),t=o(this).val();c?i.append(e,t):i[e]=t})),t.find("[data-type=get-field-multi]").each((function(){var e=o(this).attr("data-uf");i[e]=[]})),t.find("[data-type=get-field-multi]").each((function(){if(o(this).is(":checked")){var e=o(this).attr("data-uf"),t=o(this).attr("text");i[e][r]=t,r++}})),t.find("[data-type=get-field-radio]").each((function(){if(o(this).is(":checked")){var e=o(this).attr("data-uf"),t=o(this).attr("data-value");i[e]=t}})),o.ajax({type:"POST",url:a,dataType:"json",contentType:n,processData:s,data:i,success:function(e){console.log(e)}})})),o(document).ready((function(){var e=o(document).find("[data-type=snippet-img-hide]");o(document).find("[data-type=snippet-img-show]").html(e)})),o(document).on("click","[data-type=cookie]",(function(e){console.log("cookie"),e.preventDefault();var t="/local/templates/main/include/ajax/cookie.php",a=o(this).attr("data-name"),r={};r.name=a,o.ajax({type:"POST",url:t,data:r,success:function(e){console.log(e)}})}))}))}},a={};function o(e){var r=a[e];if(void 0!==r)return r.exports;var c=a[e]={exports:{}};return t[e].call(c.exports,c,c.exports,o),c.exports}o.m=t,e=[],o.O=(t,a,r,c)=>{if(!a){var n=1/0;for(d=0;d<e.length;d++){for(var[a,r,c]=e[d],s=!0,i=0;i<a.length;i++)(!1&c||n>=c)&&Object.keys(o.O).every((e=>o.O[e](a[i])))?a.splice(i--,1):(s=!1,c<n&&(n=c));if(s){e.splice(d--,1);var l=r();void 0!==l&&(t=l)}}return t}c=c||0;for(var d=e.length;d>0&&e[d-1][2]>c;d--)e[d]=e[d-1];e[d]=[a,r,c]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};o.O.j=t=>0===e[t];var t=(t,a)=>{var r,c,[n,s,i]=a,l=0;if(n.some((t=>0!==e[t]))){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(i)var d=i(o)}for(t&&t(a);l<n.length;l++)c=n[l],o.o(e,c)&&e[c]&&e[c][0](),e[n[l]]=0;return o.O(d)},a=self.webpackChunk=self.webpackChunk||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var r=o.O(void 0,[829],(()=>o(997)));r=o.O(r)})();