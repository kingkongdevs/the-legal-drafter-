(function($) {
    $(window).on('load', function () {

       // get all sliders, we need to loop them due to different settings + nav
        var swipers = document.querySelectorAll('.swiper-container:not(.control):not(.mobile)');
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
                    slidesPerView: 4,
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
                        320: {
                            slidesPerView: 2
                        },
                        480: {
                            slidesPerView: 3
                        },
                        640: {
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
            
            mobileSwiperCount = 0;
            var mobileSwipers = document.querySelectorAll('.swiper-container.mobile');

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
                        576 : {
                            slidesPerView: 2
                        },
                        768 : {
                            slidesPerView: 4
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
        }, 500);
    })

})( jQuery );