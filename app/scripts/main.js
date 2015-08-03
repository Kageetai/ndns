console.log('\'Allo \'Allo!');

$(document).ready(function () {
  //initialize swiper when document ready
  var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1.3,
    centeredSlides: true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    paginationBulletRender: function (index, className) {
      return '<span class="' + className + '"> Nacht des nacherzählten Spiels #' + (index + 1) + '</span>';
    },
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 100,
    effect: 'coverflow',
    coverflow: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }
  });
});
