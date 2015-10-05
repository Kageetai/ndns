$(document).ready(function() {
  var events = [];
  var events_future = $('#events-future');
  var events_past = $('#events-past');

  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/de_DE/sdk.js', function(){
    FB.init({
      appId: '152804634760737',
      version: 'v2.4' // or v2.0, v2.1, v2.2, v2.3
    });

    FB.api(
      '/gamestormberlin/events',
      'GET',
      {
        access_token: 'CAACKZBZAn5liEBAA0IUhGKf3JoqHa7n09vNvMp9GzjFq2hqK6XiZB2FCYNo4G8VRZCZAKtr7ZB9gq0Vxdh6VnB3ZBGByifEL5esnMAzZAgUtiYgbOnin0hJT2op5iLh8ZCkLqajGYxpyY1vYMVLbdyIfMZBm3ZB375VLQxtJbQsqEmBzAY4MlJZA2ZCa3yj0ZBZAmg966wZD'
      },
      fb_callback
    );
  });

  function fb_callback(response) {
    events = events.concat(response.data);
    if(response.paging.next) {
      $.get(response.paging.next, fb_callback);
    } else {
      parseEvents(events);
    }
  }

  function parseEvents(events) {
    var today = new Date();
    $.each(events, function(i, e) {
      var date = new Date(e.start_time);
      if (e.name.indexOf('Nacht') >= 0 && date < today) {
        events_past.append("<li><a href='http://www.facebook.com/events/" + e.id + "'>" + date.toLocaleDateString('de-DE') + " - " + e.name + "</a></li>");
      } else if (e.name.indexOf('Nacht') >= 0 && date >= today) {
        events_future.append("<li><a href='http://www.facebook.com/events/" + e.id + "'>" + date.toLocaleDateString('de-DE') + " - " + e.name + "</a></li>");
      }
    });

    jQuery(window).trigger('resize').trigger('scroll');
  }
});
