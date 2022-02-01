window.contentLoaded(window, function (e) {
    //Add your project specific scripts here
    initForm()

});


// Get Current Month Name
function getCurrentMonth() {
    var months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var now       = new Date();
    var thisMonth = months[now.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
    var output = document.getElementsByClassName('output');
    
    $( ".output" ).html( thisMonth);
}
getCurrentMonth();



function initForm () {
    var form = document.getElementById('offer-form')
    
    if (!form) return

    $(form).validate({
      submitHandler: async function (form, event) {
        event.preventDefault()

        var btn = $(form).find('[type="submit"]')
        btn.disabled = true
        btn.html('Sending...')

        var data = new FormData(event.target)
        fetch(event.target.action, {
          method: form.method,
          body: data,
          headers: {
            Accept: 'application/json'
          }
        })
          .then(response => {
            /* if (typeof window.dataLayer != 'undefined') {
              window.dataLayer.push({
                event: 'gtm.formSubmission',
                form: form
              })
            } */
            window.location.href = window.location.href + '/thank-you'
          })
          .catch(error => {
            form.html(
              '<p class="error">There was an error sending your message. Please try again later.</p>'
            )
          })
      }
    })
  }

