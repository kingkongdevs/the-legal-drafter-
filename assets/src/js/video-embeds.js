(function($) {
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