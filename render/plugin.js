(function () {
    // Define the Node.js app URL
    const nodeAppUrl = 'https://salesym.aiceafrica.com';

    // Function to generate a random unique ID for visitors
    function generateVisitorId() {
        // Replace this with your preferred method to generate a unique ID
        return 'visitor_' + Math.random().toString(36).substr(2, 9);
    }

    // Function to get or generate a unique visitor ID
    function getVisitorID() {
        let visitorID = localStorage.getItem('visitorID');

        if (!visitorID) {
            visitorID = generateVisitorId();
            localStorage.setItem('visitorID', visitorID);
        }

        return visitorID;
    }

    // Function to log the visitor to the Node.js app
    function logVisitor() {
        const visitorID = getVisitorID();
        const apiUrl = visitorID ? '/v1/visitors/update' : '/v1/visitors/create';

        // Construct the payload with visitor data
        const payload = {
            visitorID: visitorID,
            timestamp: new Date().toISOString(),
            pageUrl: window.location.href,
        };

        // Send the payload to the appropriate API based on whether the visitor already has an ID
        fetch(`${nodeAppUrl}${apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                // Handle response if needed
            })
            .catch((error) => {
                console.error('Error logging visitor:', error);
            });
    }

    // Function to send captured events to the Node.js app
    function sendEventToNodeApp(eventName, eventData) {
        // Add the unique visitor ID to the event data
        eventData.visitorID = getVisitorID();

        // Construct the payload with event data
        const payload = {
            event: eventName,
            data: eventData,
        };

        // Send the payload to the Node.js app using an HTTP request
        fetch(`${nodeAppUrl}/v1/capture/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                // Handle response if needed
            })
            .catch((error) => {
                console.error('Error sending event to Node.js app:', error);
            });
    }

    // Function to show a SweetAlert alert
    function showAlert(subject, content) {
        Swal.fire({
            title: subject,
            html: content,
            icon: 'info', // You can customize the icon (e.g., 'info', 'warning', 'success', 'error')
        });
    }

    // Function to capture user click events
    function captureClickEvent(event) {
        const targetElement = event.target;
        const eventData = {
            pageUrl: window.location.href,
            event: 'click',
        };

        // Check if the element has an ID or Name or Label and add the first one found
        if (targetElement.id) {
            eventData.elementIdentifier = targetElement.id;
        } else if (targetElement.name) {
            eventData.elementIdentifier = targetElement.name;
        } else if (targetElement.tagName.toLowerCase() === 'label') {
            eventData.elementIdentifier = targetElement.innerText;
        } else {
            // If the element has no specific identifier, capture its tag name
            eventData.elementIdentifier = targetElement.tagName.toLowerCase();
        }

        sendEventToNodeApp('user_interaction', eventData);
    }

    // Function to capture user navigation events
    function captureNavigationEvent(event) {
        const eventData = {
            pageUrl: window.location.href,
            event: 'user_navigation',
        };

        sendEventToNodeApp('user_navigation', eventData);
    }

    // Function to attach event listeners to elements that need to be tracked
    function attachEventListeners() {
        document.addEventListener('click', captureClickEvent);

        // Attach the 'popstate' event listener to capture user navigation
        window.addEventListener('popstate', captureNavigationEvent);
    }

    // Function to load the SweetAlert and Chatwoot SDK dynamically
    function loadDependencies() {
        // Load the SweetAlert CSS styles
        const sweetAlertCssLink = document.createElement('link');
        sweetAlertCssLink.rel = 'stylesheet';
        sweetAlertCssLink.href = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.css';
        document.head.appendChild(sweetAlertCssLink);

        // Load the SweetAlert script
        const sweetAlertScript = document.createElement('script');
        sweetAlertScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.js';
        sweetAlertScript.defer = true;
        sweetAlertScript.async = true;
        document.head.appendChild(sweetAlertScript);

        // Load the Chatwoot SDK
        const chatwootScript = document.createElement('script');
        chatwootScript.src = 'https://app.chatwoot.com/packs/js/sdk.js';
        chatwootScript.defer = true;
        chatwootScript.async = true;
        document.head.appendChild(chatwootScript);

        chatwootScript.onload = function () {
            window.chatwootSDK.run({
                websiteToken: 'Xk6N6QWiNSECau2duszhuSaz', // Replace with your Chatwoot website token
                baseUrl: 'https://app.chatwoot.com',
            });
        };
    }

    // Function to initialize the plugin
    function init() {
        loadDependencies();
        attachEventListeners();
        logVisitor();
    }

    // Call the function to initialize the plugin
    init();

    // Expose the showAlert function to the global scope so it can be used outside the IIFE if needed
    window.showAlert = showAlert;
})();  