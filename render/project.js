/*** Document is ready */

var elements;

document.addEventListener('DOMContentLoaded', function () {
    elements = new myPlugin();

    window.addEventListener('scroll', function () {
        console.log("scrolling");
        return true;
    });

    window.addEventListener('click', function () {
        console.log('clicked');
        return true;
    })

    window.addEventListener('beforeunload', function (e) {
        // Cancel the event
        e.preventDefault();
        // Show the custom modal
        e.returnValue = '';
        // Return the message to display
        return 'Are you sure you want to leave this page?';
    });

    window.addEventListener('unload', function () {
        console.log('unloaded');
        return false;
    })

    window.addEventListener('resize', function () {
        elements.update();
        return true;
    });
});


/*** Document is loaded */

window.addEventListener('load', function (event) {
});