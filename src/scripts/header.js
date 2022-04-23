import { mediaQuery } from './mediaQueries'

console.log('start1');

// scroll
// {
//   $(() => {

//     console.log('start');

//     if (mediaQuery.matches) {

//       const header = $('.header')
  
//       const fps = 120
  
//       let scrollTop = $(window).scrollTop()
  
//       $(window).one('scroll', scroll)
  
//       function scroll() {
//         console.log('scroll');

//         update()
  
//         setTimeout(() => {
//           update()
  
//           $(window).one('scroll', scroll)
//         }, 1000 / fps)
//       }
  
//       function update() {
//         const newScrollTop = $(window).scrollTop()
  
//         if (Math.abs(scrollTop - newScrollTop) >= 1) {
//           if (newScrollTop > scrollTop) {
//             header.addClass('header--up')
//           } else {
//             header.removeClass('header--up')
//           }
//         }
  
//         if (scrollTop < 1) {
//           header.removeClass('header--up')
//         }
  
//         if ($('[data-header-transparent]').length) {
//           if (scrollTop < 1) {
//             header.addClass('header--transparent')
//           } else {
//             header.removeClass('header--transparent')
//           }
//         }
  
//         scrollTop = newScrollTop
//       }
//     }
//   });
// }