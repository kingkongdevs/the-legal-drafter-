(function($) {

    // Accordion for FAQs (jQuery)
    $('.accordion').on('click', 'dt', function() {
        $(this).toggleClass('active').next().slideToggle();  
    });  

    // Slick Slider (jQuery) - Remove these if not in use 
    $('.testimonials .slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: $('.prev'),
        nextArrow: $('.next')
    });

    // Responsive slider for blocks section
    $('.blocks .slider').slick({
        infinite: true,
        mobileFirst: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000, 
        dots: false,
        arrows: false,
        responsive: [ 
            {
                breakpoint: 992, 
                settings: 'unslick'
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Gallery Slider
    $('.gallery .slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        fade: true,
        asNavFor: '.gallery .slider-controls'
    });
    $('.gallery .slider-controls').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.gallery .slider',
        dots: false,
        arrows: false,
        centerMode: true,
        focusOnSelect: true,
        infinit: true
    });
              

    // Sticky Header
    $(window).on("scroll load", function () {
        if ($(window).scrollTop() >= 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // Smooth Scroll To Anchor
    $(document).on('click', '.js-cta', function () {
        target = $(this).attr('data-target')

        if (target.length) {
            $('html, body').animate({
                scrollTop: $(target).find('form').offset().top
            }, 1500)
        }
    });

    
    $(window).on('load', function () {

        // // Components loading animations
        // $('.view-animation').viewportChecker({
        //     classToAdd: 'animated',
        //     offset: 20
        // });


        // // Lazyload
        // $('.lazyload').Lazy({
        //     effect: 'fadeIn',
        //     visibleOnly: true,
        //     onError: function (element) {
        //         console.log('error loading ' + element.data('src'));
        //     }
        // });


        // Phone Concatenation Script For Tracking
        setTimeout( function() {
            $('.phone-text em').each(function () {
                var unsliced = $(this).text();
                var sliced = unsliced.slice(0, -2) + "...";
                $(this).text(sliced);
                var linked = "tel:" + unsliced.replace(/\s/g, '');
                $(this).click(function () {
                    if ($(window).width() < 1000) {
                        window.location.href = linked;
                        dataLayer.push({ 'event': 'gtm.PhoneClick' });
                    } else {
                        $(this).text(unsliced);
                        dataLayer.push({ 'event': 'gtm.PhoneClick' });
                    }
                });
            });

            if ($(window).width() < 1000) {
                $('.phone').click(function () {
                    dataLayer.push({ 'event': 'gtm.PhoneClick' });
                });
            }
        }, 3000)

        // Form Validations
        // $('#_form_1_, #_form_3_').each(function () {
        //     $(this).validate({
        //         rules: {
        //             fullname: {
        //                 required: true,
        //             },
        //             email: {
        //                 required: true,
        //                 email: true
        //             },
        //             phone: {
        //                 required: true,
        //                 number: true,
        //                 minlength: 8,
        //                 maxlength: 11
        //             }
        //         },
        //         submitHandler: function (form) {
        //             $(this).find("._form-thank-you").html('Thank you for your information!');
        //             $(this).find("._form-thank-you").show();

        //             // if (form.id == '_form_1_') {
        //             // 	dataLayer.push({ 'event': 'gtm.EbookSubmission' });
        //             // } else {
        //             // 	dataLayer.push({ 'event': 'gtm.ConsultationSubmission' });
        //             // }
        //             form.submit();
        //         },
        //         invalidHandler: function (event, validator) {
        //             // 'this' refers to the form
        //             var errors = validator.numberOfInvalids();
        //             if (errors) {
        //                 var message = errors == 1
        //                     ? 'You missed 1 field. It has been highlighted'
        //                     : 'You missed ' + errors + ' fields. They have been highlighted';
        //                 $(this).find("div.form-error").html(message);
        //                 $(this).find("div.form-error").show();
        //             } else {
        //                 $(this).find("div.form-error").hide();
        //             }
        //         }
        //     });
        // });

    })

})( jQuery );