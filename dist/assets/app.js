(()=>{"use strict";var e,t={968:(e,t,r)=>{var a=1280,o=768,n=window.matchMedia("(min-width: ".concat(a,"px)")),c=(window.matchMedia("(min-width: ".concat(o,"px)")),r(566)),i=r.n(c);function s(e,t,r,a,o,n,c){n&&document.querySelector(".body").classList.add("modal-open"),c&&c.classList.add("active"),t.forEach((function(e){e.classList.remove("active")})),r.forEach((function(e){e.classList.remove("active")}));var i,s=Number(e.getAttribute(a)),l=document.querySelector("[".concat(o,"='").concat(s,"']"));e.classList.add("active"),l.classList.add("active"),l.querySelector("[data-focus-input]")&&l.querySelector("[data-focus-input]").focus(),(i=l).querySelectorAll("input").forEach((function(e){e.setAttribute("tabindex","0")})),i.querySelectorAll("button").forEach((function(e){e.setAttribute("tabindex","0")})),i.querySelectorAll("a").forEach((function(e){e.setAttribute("tabindex","0")}))}function l(e,t,r,a){r&&document.querySelector(".body").classList.remove("modal-open"),a&&a.classList.remove("active"),e.forEach((function(e){e.classList.remove("active")})),t.forEach((function(e){e.classList.remove("active")})),t.forEach((function(e){e.querySelectorAll("input").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("button").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("a").forEach((function(e){e.setAttribute("tabindex","-1")}))}))}const d=function(){var e=document.querySelector("[data-time-mask]");e&&(e.setAttribute("placeholder","Введите время"),e.addEventListener("focusin",(function(){e.setAttribute("placeholder","__:__")})),Maska.create(e,{mask:"hH:mM",tokens:{h:{pattern:/[1-2]/},H:{pattern:/[0-9]/},m:{pattern:/[0-5]/},M:{pattern:/[0-9]/}}}))};var u=r(820),f=r(656);const v=function(){Object.assign(u.Z.locales,f.Z);var e=document.querySelector("[data-datepicker]");if(e){var t=new Date,r=t.toLocaleDateString("en-GB").replace(/\D/g,"/"),a="31/12/"+String(t.getFullYear()+1);new u.Z(e,{format:"dd/mm/yyyy",autohide:!0,language:"ru",orientation:"top",maxView:2,minDate:r,maxDate:a,prevArrow:'<svg class="datepicker-arrow" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <path d="M6 11L1 6L6 1" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n      </svg>',nextArrow:'<svg class="datepicker-arrow next" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <path d="M6 11L1 6L6 1" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n      </svg>'})}};function m(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return g(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return g(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,c=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){i=!0,n=e},f:function(){try{c||null==r.return||r.return()}finally{if(i)throw n}}}}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}const p=function(){var e,t=document.querySelectorAll('input[type="tel"]'),r=function(e){return e.value.replace(/\D/g,"")},a=function(e){var t=e.target,a=r(t),o=e.clipboardData||window.clipboardData;if(o){var n=o.getData("Text");if(/\D/g.test(n))return void(t.value=a)}},o=function(e){var t=e.target,a=r(t),o=t.selectionStart,n="";if(!a)return t.value="";if(t.value.length==o){if(["7","8","9"].indexOf(a[0])>-1){"9"==a[0]&&(a="7"+a);var c="8"==a[0]?"8":"+7";n=t.value=c+" ",a.length>1&&(n+="("+a.substring(1,4)),a.length>=5&&(n+=") "+a.substring(4,7)),a.length>=8&&(n+="-"+a.substring(7,9)),a.length>=10&&(n+="-"+a.substring(9,11))}else n="+"+a.substring(0,16);if(/^\+0+/g.test(n)){var i=n.replace(/^\+0+/g,"");i.length>0?t.value="+".concat(i):t.value=""}else t.value=n.replace(/^\+0+/g,"")}else e.data&&/\D/g.test(e.data)&&(t.value=a)},n=function(e){var t=e.target.value.replace(/\D/g,"");8==e.keyCode&&1==t.length&&(e.target.value="")},c=m(t);try{for(c.s();!(e=c.n()).done;){var i=e.value;i.addEventListener("keydown",n),i.addEventListener("input",o,!1),i.addEventListener("paste",a,!1)}}catch(e){c.e(e)}finally{c.f()}};const y=function(){var e=document.querySelectorAll("[data-select-context]");e.length&&e.forEach((function(e){e.addEventListener("click",(function(e){var t=e.target.closest("[data-select-context]"),r=e.target.closest("[data-select-input]"),a=e.target.closest("[data-select]"),o=e.target.closest("[data-select-option]"),n=t.querySelector(".select-label.active")&&e.target.closest("[data-select-context]")&&!e.target.closest("[data-select]");r?function(e){var t=document.querySelectorAll("[data-select-label]"),r=e.closest("[data-select-label]");r.classList.contains("active")?r.classList.remove("active"):(t.forEach((function(e){e.classList.remove("active")})),r.classList.add("active"))}(r):a?o&&function(e){var t=e.closest(".select-label.active");t.querySelector("input").value=e.getAttribute("data-select-option"),t.classList.remove("active")}(o):n&&t.querySelector(".select-label.active").classList.remove("active")}))}))};const b=function(){var e=document.querySelectorAll("form");e&&e.forEach((function(e){e.querySelectorAll("input").forEach((function(t){var r;function a(){t.validity.valueMissing?"name"==t.getAttribute("data-input-title")?r.textContent="— заполните поле «Имя»":"sec-name"==t.getAttribute("data-input-title")?r.textContent="— заполните поле «Фамилия»":"address"==t.getAttribute("data-input-title")?r.textContent="— заполните поле «Адрес»":"tel"!=t.getAttribute("type")||t.closest(".booking-popup-form")?"email"==t.getAttribute("type")?r.textContent="— заполните поле «E-mail»":"checkbox"!=t.getAttribute("type")||t.checked?r.textContent="Обязательное поле":r.textContent="— вы не можете продолжить без согласия с политикой конфиденциальности":r.textContent="— заполните поле «Телефон»":t.validity.typeMismatch&&("email"==t.getAttribute("type")?r.textContent="— e-mail должен содержать символы «@», «.» проверьте правильность ввода":r.textContent="Введено некорректно"),r.className="form-error active"}t.hasAttribute("data-input-novalidate")||("checkbox"==t.getAttribute("type")?(t.closest(".checkbox").insertAdjacentHTML("beforeend","<span class='form-error'></>"),r=t.closest(".checkbox").querySelector(".form-error")):t.closest("[data-select-input]")?(t.closest(".select-label").insertAdjacentHTML("beforeend","<span class='form-error'></>"),r=t.closest(".select-label").querySelector(".form-error")):t.hasAttribute("data-datepicker")?(t.closest(".form__label").insertAdjacentHTML("beforeend","<span class='form-error'></>"),r=t.closest(".form__label").querySelector(".form-error")):(t.insertAdjacentHTML("afterend","<span class='form-error'></>"),r=t.nextElementSibling),t.addEventListener("focusout",(function(e){t.validity.valid?(r.textContent="",r.className="form-error"):a()}))),e.addEventListener("submit",(function(e){!t.validity.valid||"checkbox"==t.getAttribute("type")&&!t.checked?(a(),e.preventDefault()):(e.preventDefault(),t.closest(".subscription-form")&&(document.querySelector(".body").classList.add("modal-open"),document.querySelector(".modals-container").classList.add("active"),document.querySelector('[data-popup="11"]').classList.add("active")))}))}))}))};var h=r(6);const S=function(){new h.ZP("#restaurant-slider",{modules:[h.W_,h.tl],loop:!0,navigation:{nextEl:"#restaurant-slider-next",prevEl:"#restaurant-slider-prev"},pagination:{el:"#restaurant-slider-pagination"}}),new h.ZP("#reviews-slider",{modules:[h.W_,h.tl],slidesPerView:1,spaceBetween:30,breakpoints:(e={},t=1280,r={slidesPerView:"auto"},t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e),navigation:{nextEl:"#reviews-slider-next",prevEl:"#reviews-slider-prev"},pagination:{el:"#reviews-slider-pagination"}}),new h.ZP("#shop-slider",{modules:[h.W_],slidesPerView:"auto",spaceBetween:30,navigation:{nextEl:"#shop-slider-next",prevEl:"#shop-slider-prev"}}),new h.ZP("#articles-slider",{modules:[h.W_],slidesPerView:"auto",spaceBetween:30,navigation:{nextEl:"#articles-slider-next",prevEl:"#articles-slider-prev"}}),new h.ZP("#categories-slider",{modules:[h.W_],slidesPerView:3,spaceBetween:30,loop:!0,navigation:{nextEl:"#categories-slider-next",prevEl:"#categories-slider-prev"}}),new h.ZP("#humidor-slider",{modules:[h.Gk],mousewheel:!0,slidesPerView:"auto",spaceBetween:30});var e,t,r,a=new h.ZP("#gallery-slider",{modules:[h.Gk],direction:"vertical",slidesPerView:"auto",mousewheel:!0,slideToClickedSlide:!0});new h.ZP("#product-slider",{modules:[h.o3],thumbs:{swiper:a}})};var L=r(386);const q=function(){var e=document.querySelectorAll(".js-badger-accordion");Array.from(e).forEach((function(e){new L.Z(e)}))};const A=function(){var e=document.querySelector("[data-tabs]"),t=document.querySelector("[data-tabs-content]");if(e&&t){var r=t.querySelectorAll("[data-content-item]");e.querySelectorAll("[data-tabs-item]").forEach((function(a,o){a.addEventListener("click",(function(){e.querySelector(".active").classList.remove("active"),a.classList.add("active"),t.querySelector(".active").classList.remove("active"),r[o].classList.add("active")}))}))}else e&&e.querySelectorAll("[data-tabs-item]").forEach((function(t,r){t.addEventListener("click",(function(){e.querySelector(".active").classList.remove("active"),t.classList.add("active")}))}))};const w=function(e,t,r){var a=document.querySelector(".modals-container"),o=document.querySelectorAll("[".concat(t,"]")),n=document.querySelectorAll("[".concat(r,"]"));if(o&&n){var c=e.target.closest("[".concat(t,"]")),i=a.classList.contains("active")&&!e.target.closest("[".concat(r,"]"))&&!e.target.closest("[".concat(t,"]"))&&!e.target.closest(".datepicker-view")||e.target.closest("[data-modal-close]");c?s(c,o,n,t,r,true,a):i&&l(o,n,true,a)}};const E=function(e,t,r,a){var o=document.querySelectorAll("[".concat(t,"]")),n=document.querySelectorAll("[".concat(r,"]")),c=!1;if(o&&n){var i,d=e.target.closest("[".concat(t,"]"));"mouseover"==e.type&&d?(s(d,o,n,t,r,a,c),document.querySelector(".header__top").addEventListener("mouseover",(function(e){e.relatedTarget==document.querySelector(".header__bottom")&&l(o,n,a,c)})),document.addEventListener("click",(function(e){(i=document.querySelector(".active[".concat(r,"]"))&&!e.target.closest("[".concat(t,"]"))&&!e.target.closest("[".concat(r,"]")))&&l(o,n,a,c)}))):"click"==e.type&&(i=document.querySelector(".active[".concat(r,"]"))&&!d&&!e.target.closest("[".concat(r,"]")),d&&!d.classList.contains("active")?s(d,o,n,t,r,a,c):(d&&d.classList.contains("active")||i)&&l(o,n,a,c))}};var x=r(344),k=r.n(x);const _=function(){var e=document.querySelectorAll("#range-slider");e.length&&e.forEach((function(e){var t=Number(e.getAttribute("data-range-min")),r=Number(e.getAttribute("data-range-max")),a=e.closest("#range-slider-container"),o=a.querySelector("#range-from"),n=a.querySelector("#range-to");k().create(e,{start:[t,r],connect:!0,range:{min:t,max:r}}),e.noUiSlider.on("update",(function(e,t){var r=e[t];t?n.value=Math.round(r):o.value=Math.round(r)})),o.addEventListener("change",(function(){e.noUiSlider.set([this.value,null])})),n.addEventListener("change",(function(){e.noUiSlider.set([null,this.value])}))}))};document.addEventListener("DOMContentLoaded",(function(){var e,t;S(),(e=document.querySelectorAll(".header__buttons-icon")).length&&e.forEach((function(e){e.classList.contains("count")?e.hasAttribute("data-fav-btn")?e.setAttribute("data-header-btn","5"):e.hasAttribute("data-cart-btn")&&e.setAttribute("data-header-btn","6"):e.hasAttribute("data-fav-btn")?e.setAttribute("data-header-btn","3"):e.hasAttribute("data-cart-btn")&&e.setAttribute("data-header-btn","4")})),function(){if(document.querySelector("#map"))try{ymaps.ready((function(){var e=new ymaps.Map("map",{center:[59.934277,30.309636],zoom:14},{searchControlProvider:"yandex#search"}),t=(ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'),new ymaps.Placemark([59.934277,30.309636],{},{iconLayout:"default#image",iconImageHref:"assets/images/placemark.png",iconImageSize:[45.71,64],iconImageOffset:[-22,-64]}));e.geoObjects.add(t)}))}catch(e){console.error(e)}}(),A(),v(),d(),p(),y(),b(),_(),document.querySelector(".sorting-filter")&&document.querySelector(".sorting-filter").addEventListener("change",(function(e){document.querySelector("[data-sort-filter]").innerHTML=e.target.closest(".sorting-filter__label").querySelector(".sorting-filter__txt").innerHTML})),(t=document.querySelector("[data-active-filters]"))&&t.querySelectorAll(".active-filter").length&&window.addEventListener("scroll",(function(){var e=document.querySelector(".active-filters-row"),r=document.querySelector(".header__bottom").offsetHeight;t.getBoundingClientRect().top-20-r<=0?e.classList.add("active"):e.classList.remove("active")})),document.querySelectorAll("[data-number-goods]").forEach((function(e){e.addEventListener("click",(function(t){t.stopPropagation();var r=Number(e.querySelector("[data-number-goods-count]").innerHTML);t.target.closest("[data-number-goods-minus]")&&r>0?e.querySelector("[data-number-goods-count]").innerHTML=r-1:t.target.closest("[data-number-goods-plus]")&&(e.querySelector("[data-number-goods-count]").innerHTML=r+1)}))})),function(){var e=document.querySelectorAll("[data-header-modal]"),t=document.querySelectorAll("[data-filter-drop]"),r=document.querySelectorAll("[data-popup]");e.forEach((function(e){e.querySelectorAll("a").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("input").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("button").forEach((function(e){e.setAttribute("tabindex","-1")}))})),t.forEach((function(e){e.querySelectorAll("a").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("input").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("button").forEach((function(e){e.setAttribute("tabindex","-1")}))})),r.forEach((function(e){e.querySelectorAll("input").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("a").forEach((function(e){e.setAttribute("tabindex","-1")})),e.querySelectorAll("button").forEach((function(e){e.setAttribute("tabindex","-1")}))}))}(),document.addEventListener("keydown",(function(e){"Escape"==e.code&&(document.querySelector(".modals-container.active")?(document.querySelector(".body.modal-open").classList.remove("modal-open"),document.querySelector(".modals-container.active").classList.remove("active"),document.querySelector(".active[data-popup]").classList.remove("active")):document.querySelector(".active[data-filter-drop]")?document.querySelector(".active[data-filter-drop]").classList.remove("active"):document.querySelector(".active[data-header-modal]")&&(document.querySelector(".active[data-header-modal]").classList.remove("active"),document.querySelector(".body.modal-open").classList.remove("modal-open")))})),document.querySelector("[data-show-height]")&&document.querySelector("[data-show-diameter]")&&(document.querySelector("[data-show-height]").innerHTML=document.querySelector(".product-top-img__cigar-size").getAttribute("data-cigar-height"),document.querySelector("[data-show-diameter]").innerHTML=document.querySelector(".product-top-img__cigar-size").getAttribute("data-cigar-diameter")),function(){if(document.querySelector(".cart-promocode")){var e=document.querySelector(".cart-promocode__input"),t=e.closest(".cart-promocode"),r=document.querySelector(".cart-promocode-delete");e.addEventListener("focusin",(function(e){e.target.closest(".cart-promocode").classList.add("active")})),e.addEventListener("input",(function(){e.value.length?(t.classList.add("send-active"),t.classList.remove("delete-active")):t.classList.remove("send-active")})),r.addEventListener("click",(function(e){e.target.closest(".cart-promocode").querySelector("input").value="",e.target.closest(".cart-promocode").classList.remove("delete-active")})),e.addEventListener("focusout",(function(r){r.target.closest(".cart-promocode").classList.remove("active"),t.classList.remove("send-active"),e.value&&t.classList.add("delete-active")}))}}(),document.addEventListener("click",(function(e){w(e,"data-popup-button","data-popup"),E(e,"data-filter-btn","data-filter-drop"),function(e){e.target.closest(".catalog-card__fav")&&e.target.closest(".catalog-card__fav").classList.toggle("active")}(e),function(e){e.target.closest(".catalog-card__btn")&&!e.target.closest(".catalog-card--small")&&(e.target.closest(".catalog-card.in-cart")?(e.target.closest(".catalog-card").classList.remove("in-cart"),e.target.closest(".catalog-card__btn").innerHTML="Добавить в корзину"):(e.target.closest(".catalog-card").classList.add("in-cart"),e.target.closest(".catalog-card__btn").innerHTML="В корзине",document.querySelector(".body").classList.add("modal-open"),document.querySelector(".modals-container").classList.add("active"),document.querySelector('[data-popup="5"]').classList.add("active")))}(e),function(e){(e.target.closest("[data-filter-drop]")||e.target.closest(".filters-popup"))&&e.target.closest(".category-filter-btn")&&e.target.closest(".category-filter-btn").classList.toggle("active"),e.target.closest(".drinks-filters-item")&&e.target.closest(".drinks-filters-item").classList.toggle("active")}(e),function(e){if(e.target.closest("[data-anchor-btn]")){e.preventDefault(),document.querySelectorAll("[data-anchor-target]").forEach((function(e){e.insertAdjacentHTML("afterbegin",'<div class="anchor"></div>')}));var t=e.target.closest("[data-anchor-btn]").getAttribute("data-anchor-btn");document.querySelector("[data-anchor-target='".concat(t,"']")).querySelector(".anchor").scrollIntoView({behavior:"smooth",block:"start"})}}(e),function(e){if(e.target.closest("a")){e.preventDefault();var t=e.target.closest("a").getAttribute("href");document.querySelector(".modals-container").classList.add("fade"),setTimeout((function(){window.location.assign(t)}),600)}}(e)})),n.matches&&document.querySelector(".header__bottom-inner").addEventListener("mouseover",(function(e){E(e,"data-header-btn","data-header-modal",!0)}))})),window.addEventListener("load",(function(){document.querySelector("body").classList.remove("no-transition"),setTimeout((function(){document.querySelector(".header").classList.add("loaded"),document.querySelector(".filter-drops-container")&&document.querySelector(".filter-drops-container").classList.add("loaded")}),1200),document.querySelector(".first-screen")&&(document.querySelectorAll("[data-video-show]").forEach((function(e){e.classList.add("loaded")})),document.querySelector(".first-screen__ttl").classList.add("loaded")),n.matches&&function(){var e=document.querySelector(".header"),t=window.pageYOffset;function r(){var r=window.pageYOffset;Math.abs(t-r)>=1&&(r>t?e.classList.add("header--short"):e.classList.remove("header--short")),t<1&&e.classList.remove("header--short"),t=r}window.addEventListener("scroll",(function e(){r(),setTimeout((function(){r(),window.addEventListener("scroll",e,{once:!0})}),1e3/120)}),{once:!0})}(),q(),i().init({once:!0,offset:0,duration:1200})}))}},r={};function a(e){var o=r[e];if(void 0!==o)return o.exports;var n=r[e]={exports:{}};return t[e].call(n.exports,n,n.exports,a),n.exports}a.m=t,e=[],a.O=(t,r,o,n)=>{if(!r){var c=1/0;for(d=0;d<e.length;d++){for(var[r,o,n]=e[d],i=!0,s=0;s<r.length;s++)(!1&n||c>=n)&&Object.keys(a.O).every((e=>a.O[e](r[s])))?r.splice(s--,1):(i=!1,n<c&&(c=n));if(i){e.splice(d--,1);var l=o();void 0!==l&&(t=l)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[r,o,n]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};a.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,[c,i,s]=r,l=0;if(c.some((t=>0!==e[t]))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(s)var d=s(a)}for(t&&t(r);l<c.length;l++)n=c[l],a.o(e,n)&&e[n]&&e[n][0](),e[c[l]]=0;return a.O(d)},r=self.webpackChunk=self.webpackChunk||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=a.O(void 0,[38],(()=>a(968)));o=a.O(o)})();