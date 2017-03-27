$('document').ready(function() {
  // initialize settings
  for (var k in labels) {
    $('[data-key=' + k + ']').data('checked', labels[k]);
  }
  $('.labels').click(function() {
    $(this).data('checked', !$(this).data('checked'));
    labels[$(this).data('key')] = $(this).data('checked');
  });
  $('[data-key=letters]').click();

  $('#order>li').click(function() {
    $('.uk-active').removeClass('uk-active');
    var v = parseInt($(this).text());
    $(this).addClass('uk-active');
    $('#order-val').text(v);
    order = v;
    console.log("order changed to " + v);
    init();
  });

  Moves.ticker = $('#ticker');

  $('.change-log').css("max-height",0.9*boardSize-$('#right-panel h3').height());
  $('.change-log').css("min-height",0.9*boardSize-$('#right-panel h3').height());
});
