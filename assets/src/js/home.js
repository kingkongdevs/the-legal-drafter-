(function($) {

    // Accordion for FAQs (jQuery)
    $('.accordion dt.active').next().slideDown()
    
    $('.accordion').on('click', 'dt', function() {
        $('.accordion dd').slideUp(); 

        if(!$(this).hasClass('active')){
            // remove active class from any others that might be active
            $('.accordion dt.active').removeClass('active');
            $(this).addClass('active');
            $(this).next().slideDown();
        }else{
            $(this).removeClass('active');
        }
    });  

    var ytVideos = [];
    var ytCount = 0;
    window.onYouTubeIframeAPIReady = function() {
        $('.yt-api iframe').each(function(){
            var thisnewid = 'ytplayer-'+ytCount;

            // assign dynamic ids
            $(this).attr('id', thisnewid);

            // store yt vid to play later
            ytVideos[thisnewid] = new YT.Player(thisnewid);

            ytCount++;
        });
    }

    // Slick Slider (jQuery) - Remove these if not in use 
    $('.testimonials .slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: $('.testimonial-prev'),
        nextArrow: $('.testimonial-next')
    });

    // Gallery Slider
    $('.gallery .slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        fade: true,
        prevArrow: $('.gallery-prev'),
        nextArrow: $('.gallery-next'),
        asNavFor: '.gallery .slider-controls'
    });
    $('.gallery .slider-controls').slick({
        slidesToShow: 3,
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
        lazyLoad: 'progressive',
        speed: 600,
        prevArrow: $('.video-prev'),
        nextArrow: $('.video-next'),
        fade: true,
        asNavFor: '.video-gallery .slider-controls'
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        // pause all playing vids
        if($('.yt-api').length){
            for(var i = 0; i < ytCount; i++){
                ytVideos['ytplayer-'+i].pauseVideo();
            }
        }
    });

    $('.video-gallery .slider-controls').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.video-gallery .slider',
        lazyLoad: 'progressive',
        dots: false,
        arrows: false,
        focusOnSelect: true,
        infinit: true,
    });

    var resizeTimer;
    $(window).bind('resize load', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // Responsive slider for blocks section
            $('.logos .slider').not('.slick-initialized').slick({
                infinite: true,
                mobileFirst: true,
                speed: 600,
                slidesToShow: 1,
                slidesToScroll: 1,
                // autoplay: true,
                // autoplaySpeed: 5000, 
                arrows: false,
                dots: true,
                responsive: [ 
                    {
                        breakpoint: 992, 
                        settings: 'unslick'
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    // {
                    //     breakpoint: 200,
                    //     settings: {
                    //         slidesToShow: 1,
                    //     }
                    // }
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
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                        }
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

    $(window).on('load', function () {

        // Components loading animations
        $('.view-animation').viewportChecker({
            classToAdd: 'animated',
            offset: 20
        });


        // Lazyload
        $('.lazyload').Lazy({
            effect: 'fadeIn',
            visibleOnly: true,
            onError: function (element) {
                console.log('error loading ' + element.data('src'));
            }
        });

        $(document).on('click', '.inline-video-trigger', function () {
            if($(this).closest('.yt-api').length){
                var thisparent = $(this).closest('.yt-api');
                var thisiframeid = $('iframe', thisparent).attr('id');

                $('.overlay, .play-button', thisparent).fadeOut();

                ytVideos[thisiframeid].playVideo();
            } else {
                if ($(this).data('video-id')) {
                    if ($(this).hasClass('vimeo')) {
                        var iframeHTML = '<iframe src="https://www.vimeo.com/embed/' + $(this).attr('data-video-id') + '?title=0&byline=0&portrait=0?&autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
                    } else {
                        var iframeHTML = '<iframe src="https://player.vimeo.com/video/' + $(this).attr('data-video-id') + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                    }

                    $(this).parent('.video-preview-container').find('.inline-video-trigger').hide();
                    $(this).parent('.video-preview-container').find('.overlay').hide();
                    $(this).parent('.video-preview-container').find('iframe').remove();
                    $(this).parent('.video-preview-container').append(iframeHTML);
                } else {
                    console.error('no video ID provided.');
                }
            }
        });


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
                    } else {
                        $(this).text(unsliced);
                    }
                });
            });

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