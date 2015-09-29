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
    if (scroll >= $(window).height() * 0.9) {
      $('nav').addClass('fixed');
    } else {
      $('nav').removeClass('fixed');
    }
  });

  // load videos
  var videos = [];
  var video_active = 0;
  var video = $('#video');
  var videolist = $('.video-list');
  $.getJSON( 'videos.json', function( data ) {
    videos = data;

    // fill video list
    for(var i = 0; i < videos.length; i++) {
      $('<li class=\'video-' + i + '\'>' + videos[i].name + '</li>')
        .click(function(e) {
          video_active = this.className.split('-')[1];
          showVideo(videos[video_active]);
          videolist.find('> li').removeClass('active');
          this.classList.add('active');
        }).appendTo(videolist);
    }

    showVideo(videos[video_active]);
    videolist.perfectScrollbar().find('> li:first-child').addClass('active');
  });

  $('.video-right').click(function() {
    showVideo(videos[++video_active]);
  });

  $('.video-left').click(function() {
    showVideo(videos[--video_active]);
  });

  // resize video list according to video height
  $(window).resize(function() {
    videolist.height(video.outerHeight());
    videolist.perfectScrollbar('update');
  });

  function showVideo(v) {
    video.find('> iframe').attr('src', v.url);
    $(window).resize();
    $('.video-active').text(v.name);
  }
});
