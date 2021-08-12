(function($) {
    $(window).on('load', function () {

        // Accordion for FAQs (jQuery)
        $('.accordion dt.active').next().slideDown()

        $('.accordion').on('click', 'dt', function () {
            $('.accordion dd').slideUp();

            if (!$(this).hasClass('active')) {
                // remove active class from any others that might be active
                $('.accordion dt.active').removeClass('active');
                $(this).addClass('active');
                $(this).next().slideDown();
            } else {
                $(this).removeClass('active');
            }
        });
    })
})( jQuery );