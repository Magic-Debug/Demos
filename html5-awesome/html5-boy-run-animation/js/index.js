$(document).ready( function() {	
  $('#running').animate({
    'top' : '10px',
    transform: 'scale(0.6)'
  }, 3200, function() {
    $(this).animate({
      'z-index' : 5
    }, 0, function() {
      $(this).animate({
        'top' : '90px',
        transform: 'scale(1)'	
      }, 2000);
    });
  });
});