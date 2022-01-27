var $lastClicked = null;

$('.styled-list').on('click','.click-box',function () {
    $(this).parent().find('.click-box').css('background-color', '#F4F9EC');
    $(this).css('transition', '0.3s;');
    $(this).css('background-color', '#ffffff');
    $lastClicked = $(this);
});


