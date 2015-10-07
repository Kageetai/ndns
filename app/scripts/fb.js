'use strict';

var NDNS = window.NDNS || {};

$(document).ready(function () {
  NDNS.init_fb = function () {
    var events = [];
    var events_future = $('#events-future');
    var events_past = $('#events-past');
    var access_token;

    $.get('https://graph.facebook.com/v2.4/oauth/access_token?client_id='+window.config.fb_client_id+'&client_secret='+window.config.fb_client_secret+'&grant_type=client_credentials', function (response) {
      access_token = response.access_token;
    });

    $.ajaxSetup({cache: true});
    $.getScript('//connect.facebook.net/de_DE/sdk.js', function () {
      FB.init({
        appId: window.config.fb_app_id,
        version: 'v2.4' // or v2.0, v2.1, v2.2, v2.3
      });

      FB.api(
        '/gamestormberlin/events',
        'GET',
        {
          access_token: access_token
        },
        fb_callback
      );
    });

    function fb_callback(response) {
      console.log(response);
      events = events.concat(response.data);
      if (response.paging.next) {
        $.get(response.paging.next, fb_callback);
      } else {
        parseEvents(events);
      }
    }

    function parseEvents(events) {
      var today = new Date();
      $.each(events, function (i, e) {
        var date = new Date(e.start_time);
        if (e.name.indexOf('Nacht') >= 0 && date < today) {
          events_past.append("<li><a href='http://www.facebook.com/events/" + e.id + "'>" + date.toLocaleDateString('de-DE') + " - " + e.name + "</a></li>");
        } else if (e.name.indexOf('Nacht') >= 0 && date >= today) {
          events_future.append("<li><a href='http://www.facebook.com/events/" + e.id + "'>" + date.toLocaleDateString('de-DE') + " - " + e.name + "</a></li>");
        }
      });

      jQuery(window).trigger('resize').trigger('scroll');
    }
  }
});
