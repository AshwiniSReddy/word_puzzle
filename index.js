FastClick.attach(document.body);

var wordsToFind = $('#list li').length,
    colors = ['red', 'green', 'yellow', 'blue', 'purple'],
    found = 0,
    clicking = false;

// Restart function
function restartGame() {
  $('.box').attr('class', 'box');
  $('#list li').removeClass('found');
  $('#restart').hide();
  found = 0;
}

// Manual restart button
$('#restart').click(function() {
  restartGame();
});

$('#grid').mousedown(function(){
    clicking = true;
});

$('#grid').mouseup(function(){
  clicking = false;
  $('.box').removeClass('highlight');
});

// Handle box highlighting
$('.box').on('mouseover', function() {
  if (clicking) {
    var word = $(this).attr('data-word'),
        wordLen = word.length,
        $box = $('.box[data-word="' + word + '"]');
    
    $(this).addClass('highlight');

    if ($('.box[data-word="' + word + '"].highlight').length == wordLen) {
      // Word fully highlighted
      $box.removeClass('highlight').addClass('found-' + colors[found]);
      $('li:contains("' + word + '")').addClass('found');
      $('.box').removeClass('highlight');
      found++;

      console.log(found + ' - ' + wordsToFind);

      if (found == wordsToFind) {
        // All words found - auto restart after short delay
        setTimeout(function(){
          restartGame();
        }, 500);
      }
    }
  }
});

// Stop highlighting if mouse leaves a box
$('.box').on('mouseout', function() {
  if (!clicking) {
    $(this).removeClass('highlight');
  }
});
