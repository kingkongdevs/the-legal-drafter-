$(document).ready(function(){
    if($('body.ebook-page').length > 0) {

        $('#testimonial-slider .slider').slick({
            dots: false,
            arrows: true,
            prevArrow: '.slider-prev',
            nextArrow: '.slider-next',
            slide: '.slide',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        dots: true,
                        arrows: false,
                    }
                }
            ]
        });
    }
});