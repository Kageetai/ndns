console.log('\'Allo \'Allo!');

$(document).ready(function () {
  // smooth scroll to anchor
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - parseInt(target.css('margin-top'))
        }, 750);
        return false;
      }
    }
  });

  // show fixed nav when scrolling
  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll >= $(window).height()) {
      $('nav').addClass('fixed');
    } else {
      $('nav').removeClass('fixed');
    }
  });
});
