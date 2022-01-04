(function($) {
    $(window).on('load', function () {

       // get all sliders, we need to loop them due to different settings + nav
        var swipers = document.querySelectorAll('.swiper:not(.control):not(.mobile)');
        swipers.forEach(function(el,index){
            var closestSection = el.closest('section');
            var controls = closestSection.querySelector('.control');

            // slider settings
            var options = {
                speed: 600,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                thumbs:{},
            };

            // For gallery sliders
            if(controls){
                options.thumbs.swiper = new Swiper(controls, {
                    speed: 600,
                    loop: true,
                    slidesPerView: 2,
                    spaceBetween: 10,
                    freeMode: true,
                    centeredSlides: true,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: true,
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 3
                        },
                        992: {
                            slidesPerView: 4
                        }
                    }
                });
            }

            // init slider
            new Swiper(el, options);
        });
    })

    // mobile sliders, like logo rows etc
    // need to loop in order to get the slide count
    var resizeTimer, mobileSwiperSlider = [], mobileSwiperCount;
    $(window).on('resize load', function () {
        clearTimeout(resizeTimer);
        mobileSwiperSlider.forEach( function(slider, index) {
            if (typeof(slider) !== "undefined" ) {
                slider.destroy();
            }
        });

        resizeTimer = setTimeout(function () {
            
            // only initialise the slider if it is mobile size for mobile sliders
            mobile = window.matchMedia('(min-width: 0px) and (max-width: 992px)');

            if(mobile.matches) {
                mobileSwiperCount = 0;
                var mobileSwipers = document.querySelectorAll('.swiper.mobile');

                mobileSwipers.forEach(function(el,index){
                    
                    var slideCount = el.querySelectorAll('.swiper-slide').length;
        
                    var options = {
                        speed:600,
                        slidesPerView: 1,
                        watchOverflow: true,
                        loop: true,
                        simulateTouch: false,
                        autoplay: {
                            delay: 5000,
                            disableOnInteraction: true,
                        },
                        pagination:{
                            el: '.swiper-pagination',
                            type: 'bullets',
                            clickable: true
                        },
                        breakpoints: {
                            640 : {
                                slidesPerView: 2
                            },
                            992: {
                                slidesPerView: slideCount,
                                loop: false,
                            }
                        }
                    };
        
                    // init slider
                    mobileSwiperSlider[mobileSwiperCount] = new Swiper(el, options);
                    mobileSwiperCount++;
                });
            }
            
        }, 500);
    })

    // Load More Gallery eature
    var hiddenSlides = $('.extended-gallery .swiper-slide.extra-slide');
    if(!hiddenSlides.length) {
        $('.load-more-gallery').hide();
    }
    $(document).on('click', '.extended-gallery .load-more-gallery', function (event) {
        hiddenSlides = $('.extended-gallery .swiper-slide.extra-slide');
        if(hiddenSlides.length <= 3) {
            $(this).hide();
        } else {
            for(var i = 0 ; i < 3 ; i++) {
                var slide = hiddenSlides[i];
                $(slide).removeClass('extra-slide');
                $(slide).fadeIn(500);
            }
        }
    })

})( jQuery );