//jQuery time
(function($) {
	
$(window).on('load', function () {

	// multistep form code
	var current_fs, next_fs, previous_fs, form; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches
	var checkboxChecked, radioChecked, textareaInput;



	$(".infusion-form input[type=radio]").click(function() { //Option was clicked.
		$('input.next', $(this).closest('.form-group')).click(); //Find nearest "next" button and activate it
	});

	/**
	 ** Make the outer wrapper the same height as the tallest field.
	**/
	// Get an array of all element heights
	if ($('.infusion-form .infusion-field').length) {
		form = $('.infusion-form .infusion-field')
	} else if ($('form fieldset').length) {
		form = $('form fieldset')
	} else if ($('form .form-group')) {
		form = $('form .form-group')
	} else if ($('form ._form_element').lemgth) {
		form = $('form ._form_element')
	}
	var elementHeights = form.map(function() {
		return $(this).innerHeight();
	}).get();
	// Math.max takes a variable number of arguments
	// `apply` is equivalent to passing each height as an argument
	var maxHeight = Math.max.apply(null, elementHeights);
	// Set each height to the max height
	$('.questionnaire-form').height(maxHeight);



	$(".next").click(function(){
		// if(animating) return false;
		// animating = true;
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		/**
		 ** validation. if there is no input for the field, do not move on to the next option and display an error message.
		**/
		checkboxChecked = $(this).prev().find('input[type=checkbox]').is(":checked");
		radioChecked = $(this).prev().find('input[type=radio]').is(":checked");

		if ($(this).prev().find('input').val() || $(this).prev().find('textarea').val() || $(this).prev().find('select').val() ) { 
			textareaInput = true 
		} else { 
			textareaInput = false 
		};
		
		if (checkboxChecked == false && radioChecked == false && textareaInput == false)
		{
			Swal.fire({
				title: "Something went wrong!",
				text: 'Please provide an answer to this question before moving on...',
				icon: 'error',
				showConfirmButton: false,
				timer: 5000,
			})
		}
		else {
			//activate next step on progressbar using the index of next_fs
			if ($(".infusion-field").length) {
				$("#progressbar li").eq($(".infusion-field").index(next_fs)).addClass("active");
			} else if($("._form_element").length) {
				$("#progressbar li").eq($("._form_element").index(next_fs)).addClass("active");
			} else if ($('fieldset').length) {
				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			} else if ($('.form-group').length) {
				$("#progressbar li").eq($(".form-group").index(next_fs)).addClass("active");
			}
			
			//show the next fieldset
			next_fs.css('visibility','visible'); 
			//hide the current fieldset with style
			current_fs.animate({opacity: 0}, {
				step: function(now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50)+"%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({'transform': 'scale('+scale+')'});
					next_fs.css({'left': left, 'opacity': opacity});
				}, 
				duration: 800, 
				complete: function(){
					current_fs.hide();
					animating = false;
				}, 
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
			// reset scroll to top of question on next
			/*
			$('html, body').animate({
					scrollTop: $("#progressbar").offset().top
				}, 500);
				*/
		}

	});

	$(".previous").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		
		//de-activate current step on progressbar
		if ($(".infusion-field").length) {
			$("#progressbar li").eq($(".infusion-field").index(current_fs)).removeClass("active");
		} else if ($("._form_element").length) {
			$("#progressbar li").eq($("._form_element").index(current_fs)).removeClass("active");
		} else if ($('fieldset').length) {
			$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		}
		//show the previous fieldset
		previous_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".submit").click(function(){
		return false;
	})
}); 

})( jQuery );