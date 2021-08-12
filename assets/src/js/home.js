(function($) {
    //Add your project specific scripts here
    
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