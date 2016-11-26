// Searchbar Handler
$(function() {
  var searchField = $('#query');
  var icon = $('#search-btn');

  // Focus Handler
  $(searchField).on('focus', function() {
    $(this).animate({
      width: '100%'
    }, 400);
    $(icon).animate({
      right: '10px'
    }, 400);
  });

  // Blur Event Handler
  $(searchField).on('blur', function() {
    if (searchField.val() == '') {
      $(searchField).animate({
        width: '45%'
      }, 400, function() {});
      $(icon).animate({
        right: '360px'
      }, 400, function() {});
    }
  });
});

function search() {
  // Clear Results
  $('#results').html('');
  $('#buttons').html('');

  // Get Form Input
  q = $('#query').val();

  // Run GET Request on API
  $.get(
      "https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet',
        q: q,
        type: 'video',
        key: 'AIzaSyBoGXWc8Kav-uqGT5Tes2aHweAlVUP4uUA'
      }).done(function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        $.each(data.items, function(i, item) {
          // Get Output
          var output = getOutput(item);

          // Display Results
          $('#results').append(output);
        });
      });

  return false;
}

// Build Output
function getOutput(item) {
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  // Build Output String;
  var output = '<li>' +
    '<div class="list-left">' +
    '<img src="' + thumb + '">' +
    '</div>' +
    '<div class="list-right">' +
    '<h3>' + title + '</h3>' +
    '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>'+
    '<p>' + description + '</p>' +
    '</div>' +
    '</li>' +
    '<div class="clearfix"></div>' +
    '';

    return output;
}