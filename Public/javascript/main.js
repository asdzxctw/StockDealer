$('.about-click').click(function(){
    $('html,body').animate({scrollTop:$('#members').offset().top},1000);
});

$('.history-click').click(function(){
    $('html,body').animate({scrollTop:$('#services').offset().top},1000);
});

$('.stock-click').click(function(){
    $('html,body').animate({scrollTop:$('#stocktest').offset().top},1200);
});
