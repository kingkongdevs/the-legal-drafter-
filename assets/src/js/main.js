(function($) {
// Custom Scripts in here.
    alert('hello');

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

        // setTimeout( function() {
        //     $('.phonenumber .js-phone').each(function () {
        //         var unsliced = $(this).text();
        //         var sliced = unsliced.slice(0, -2) + "...";
        //         $(this).text(sliced);
        //         var linked = "tel:" + unsliced.replace(/\s/g, '');
        //         $(this).click(function () {
        //             if ($(window).width() < 1000) {
        //                 window.location.href = linked;
        //                 dataLayer.push({ 'event': 'gtm.PhoneClick' });
        //             } else {
        //                 $(this).text(unsliced);
        //                 dataLayer.push({ 'event': 'gtm.PhoneClick' });
        //             }
        //         });
        //     });
    
        //     if ($(window).width() < 1000) {
        //         $('.phone').click(function () {
        //             dataLayer.push({ 'event': 'gtm.PhoneClick' });
        //         });
        //     }
        // }, 3000)
    })

    // Sticky Header 
    $(window).on("scroll load", function () {
        if ($(window).scrollTop() >= 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // CTA Button Click
    $(document).on('click', '.js-cta', function () {
        target = $(this).attr('data-target')

        if (target.length) {
            $('html, body').animate({
                scrollTop: $(target).find('form').offset().top
            }, 1500)
        }
    });
})( jQuery );