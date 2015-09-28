console.log('\'Allo \'Allo!');

$(document).ready(function () {
  // smooth scroll to anchor
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - parseInt(target.css('margin-top')) - $('nav').outerHeight()
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

  // load videos
  var videos = [];
  $.getJSON( "videos.json", function( data ) {
    videos = data;

    showVideo(videos[0]);
  });

  function showVideo(video) {
    $("<iframe class='embed-responsive-item' width='560' height='315' src='" + video.url + "' allowfullscreen></iframe>").appendTo('#videos');
  }
});
