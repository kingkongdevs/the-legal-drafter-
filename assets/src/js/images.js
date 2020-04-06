document.addEventListener('lazybeforesizes', function(e){
    var sizes = [
        { width: 320, suffix: 'small' },
        { width: 480, suffix: 'medium' },
        { width: 800, suffix: 'large' },
        { width: 1200, suffix: 'extra-large' },
        { width: 2000, suffix: 'cover' }
    ];

    var $image = $(e.target);
    var originalSrc = $image.attr('data-original-src');

    var imagePath = originalSrc.slice(0, originalSrc.lastIndexOf('.'));
    var imageExtension = originalSrc.slice(originalSrc.lastIndexOf('.'));

    var srcsetAttr = '';

    sizes.forEach(function(size){
        srcsetAttr += imagePath + '-' + size.suffix + imageExtension + ' ' + size.width + 'w, ';
    });

    $image.attr('data-srcset', srcsetAttr);
});