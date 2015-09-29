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
  var video = $('#video');
  $.getJSON( 'videos.json', function( data ) {
    videos = data;

    // fill video list
    var list = $('.video-list');
    for(var i = 0; i < videos.length; i++) {
      $('<li class=\'video-' + i + '\'>' + videos[i].name + '</li>')
        .click(function(e) {
          showVideo(videos[this.className.split('-')[1]]);
        }).appendTo(list);
    }

    showVideo(videos[0]);
  });

  // resize video list according to video height
  $(window).resize(function() {
    $('.video-list').height(video.outerHeight());
  });

  function showVideo(v) {
    video.find('> iframe').attr('src', v.url);
    $('.video-list').height(video.outerHeight());
  }
});
