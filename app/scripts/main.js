'use strict';

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

  function hasFormValidation () {
    return (typeof document.createElement('input').checkValidity === 'function');
  }

  function addError (el) {
    return el.parent().addClass('has-error');
  }

  if (!hasFormValidation()) {
    $('#contact-form').submit(function () {
      var hasError = false,
        name     = $('#form-name'),
        mail     = $('#form-email'),
        subject  = $('#form-subject'),
        message = $('#form-message'),
        testmail = /^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/,
        $this    = $(this);

      $this.find('div').removeClass('has-error');

      if (name.val() === '') {
        hasError = true;
        addError(name);
      }

      if (!testmail.test(mail.val())) {
        hasError = true;
        addError(mail);
      }

      if (subject.val() === '') {
        hasError = true;
        addError(subject);
      }

      if (message.val() === '') {
        hasError = true;
        addError(message);
      }

      return hasError === false;

    });
  }

  function sendData() {
    var XHR = new XMLHttpRequest();

    // We bind the FormData object and the form element
    var FD  = new FormData(form);

    // We define what will happen if the data are successfully sent
    XHR.addEventListener("load", function(event) {
      alert(event.target.responseText);
    });

    // We define what will happen in case of error
    XHR.addEventListener("error", function(event) {
      alert('Oups! Something goes wrong.');
    });

    // We setup our request
    XHR.open("POST", "/contact.php");

    // The data sent are the one the user provide in the form
    XHR.send(FD);
  }

  // We need to access the form element
  var form = document.getElementById("contact-form");

  // to takeover its submit event.
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    sendData();
  });
});
