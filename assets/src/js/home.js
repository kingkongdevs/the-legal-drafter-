(function($) {
    $(window).on('load', function () {

        // Components loading animations
        $('.view-animation').viewportChecker({
            classToAdd: 'animated',
            offset: 20
        });

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

        // Phone Concatenation Script For Tracking
        setTimeout(function () {
            $('.phone-text em').each(function () {
                var unsliced = $(this).text();
                var sliced = unsliced.slice(0, -2) + "...";
                $(this).text(sliced);
                var linked = "tel:" + unsliced.replace(/\s/g, '');
                $(this).click(function () {
                    if ($(window).width() < 1000) {
                        window.location.href = linked;
                    } else {
                        $(this).text(unsliced);
                    }
                });
            });

        }, 2000)

        // Slick Slider (jQuery) - Remove these if not in use 
        $('.testimonials .slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 600,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            prevArrow: $('.testimonials .prev'),
            nextArrow: $('.testimonials .next')
        });

        // Gallery Slider
        $('.gallery .slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 600,
            fade: true,
            prevArrow: $('.gallery .prev'),
            nextArrow: $('.gallery .next'),
            asNavFor: '.gallery .slider-controls'
        });
        $('.gallery .slider-controls').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.gallery .slider',
            arrows: false,
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            infinit: true
        });

        // Gallery Slider
        $('.video-gallery .slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 600,
            prevArrow: $('.video-gallery .prev'),
            nextArrow: $('.video-gallery .next'),
            fade: true,
            asNavFor: '.video-gallery .slider-controls'
        });

        $('.video-gallery .slider-controls').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.video-gallery .slider',
            arrows: false,
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            infinit: true
        });
    })

    var resizeTimer;
    $(window).bind('resize load', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // Responsive slider for blocks section
            $('.featured-in .slider').not('.slick-initialized').slick({
                infinite: true,
                mobileFirst: true,
                speed: 600,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000, 
                arrows: false,
                dots: true,
                responsive: [ 
                    {
                        breakpoint: 992, 
                        settings: 'unslick'
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                ]
            });

            $('.blocks .slider').not('.slick-initialized').slick({
                infinite: true,
                slidesToScroll: 1,
                mobileFirst: true,
                speed: 600,
                autoplay: true,
                autoplaySpeed: 3000,
                dots: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: 'unslick'
                    }
                ]
            });
        }, 500)
    })

    // Sticky Header
    $(window).on("scroll load", function () {
        if ($(window).scrollTop() >= 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // Smooth Scroll To Anchor
    $(document).on('click', 'a[href*="#"]', function (event) {
        event.preventDefault()
        var target = $(this).attr('href')

        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 1500)
        }
    });

    // Inline Video Funcionality
    $(document).on('click', '.inline-video-trigger', function () {
        if ($(this).data('video-id')) {
            if ($(this).hasClass('vimeo')) {
                var iframeHTML = '<iframe src="https://player.vimeo.com/video/' + $(this).attr('data-video-id') + '?title=0&byline=0&portrait=0?&autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
            } else {
                var iframeHTML = '<iframe src="https://www.youtube.com/embed/' + $(this).attr('data-video-id') + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            }

            $(this).parent('.video-preview-container').find('.inline-video-trigger').hide();
            $(this).parent('.video-preview-container').find('.overlay').hide();
            $(this).parent('.video-preview-container').find('iframe').remove();
            $(this).parent('.video-preview-container').append(iframeHTML);
        } else {
            console.error('no video ID provided.');
        }
    });

})( jQuery );

// Get Current Month Name
function getCurrentMonth() {
    var months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var now       = new Date();
    var thisMonth = months[now.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
    var output = document.getElementsByClassName('output');

    $( ".output" ).html( thisMonth);
}
getCurrentMonth();