(function($) {
    $(window).on('load', function () {
        // Components loading animations
        $('.view-animation').viewportChecker({
            classToAdd: 'animated',
            offset: 80
        });
    })
})( jQuery );