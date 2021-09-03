window.contentLoaded(window, function (e) {
    var sizes = [
        { width: 320, suffix: 'small' },
        { width: 480, suffix: 'medium' },
        { width: 800, suffix: 'large' },
        { width: 1200, suffix: 'extra-large' },
        { width: 2000, suffix: 'cover' }
    ];

    var webpImages = document.querySelectorAll('[data-original-src]');

    webpImages.forEach(function(el, index){
        var $image = el;
        var originalSrc = $image.getAttribute('data-original-src');

        var imagePath = originalSrc.slice(0, originalSrc.lastIndexOf('.'));
        var imageExtension = originalSrc.slice(originalSrc.lastIndexOf('.'));
        var extWithoutDot = imageExtension.replace('.','');

        var srcsetAttr = '';

        sizes.forEach(function(size){
            srcsetAttr += imagePath + '-' + size.suffix + '.webp' + ' ' + size.width + 'w, ';
        });

        var src = imagePath + '-cover.webp';

        // create picture markup
        var imContainer = document.createElement('picture');
        var imOrig = document.createElement('source');
        var imWebp = document.createElement('source');

        // fallback image
        imOrig.setAttribute('data-srcset', originalSrc);
        imOrig.setAttribute('type', 'image/'+extWithoutDot);

        // webp image
        imWebp.setAttribute('data-srcset', srcsetAttr);
        imWebp.setAttribute('type', 'image/webp');

        $image.removeAttribute('data-original-src');
        $image.setAttribute('data-src', src);
        $image.classList.add('lazy');

        imContainer.appendChild(imWebp);
        imContainer.appendChild(imOrig);
        imContainer.appendChild($image.cloneNode());

        $image.insertAdjacentElement('afterend',imContainer);
        $image.remove();
    });

    new LazyLoad();
});