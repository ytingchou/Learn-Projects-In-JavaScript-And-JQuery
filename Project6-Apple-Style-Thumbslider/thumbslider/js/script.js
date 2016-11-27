$(document).ready(function() {
  var totalWidth = 0;
  var positions = new Array();

  $('#slides .slide').each(function(i) {
    // Get slider widths
    positions[i] = totalWidth;
    totalWidth += $(this).width();

    // Check widths
    if (!$(this).width()) {
      alert('Please add a width to your images');
      return false;
    }
  });

  // Set width
  $('#slides').width(totalWidth);

  // Make first image active
  $('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');

  // Auto Scroll
  var current = 0;
  function autoScroll() {
    if (current == -1) return false;

    // Scroll to next image
    current++;
    var nextImageIndex = current % ($('#menu ul li a').length);
    $('#menu ul li a').eq(nextImageIndex).trigger('click', [true]);
  }

  // Duration for auto scroll
  var duration = 10;
  var itvl = setInterval(autoScroll, duration * 1000);

  // Menu item click handler
  $('#menu ul li a').click(function(e, keepScroll) {
    // Prevent default
    e.preventDefault();

    // Remove active class and add inactive
    $('li.product').removeClass('active').addClass('inactive');
    // Add active class to parent
    $(this).parent().addClass('active');

    var pos = $(this).parent().prevAll('.product').length;
    $('#slides').stop().animate({ marginLeft: -positions[pos] + 'px' }, 450);

    // Stop autoscroll
    if (!keepScroll) clearInterval(itvl);
  });
});