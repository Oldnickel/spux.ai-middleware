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
        //Swal.fire('Hello World Swal')
        return true;
    })

    window.addEventListener('beforeunload', function (e) {
        // Cancel the event
        e.preventDefault();
        // Show the custom modal
        e.returnValue = '';
        // Return the message to display
        //return 'Are you sure you want to leave this page?';
    });

    window.addEventListener('unload', function () {
        console.log('unloaded');
        return false;
    })

    window.addEventListener('resize', function () {
        elements.update();
        return true;
    });


    var buttons = document.querySelectorAll('button[name="addtocart"]');

    // Add a click event listener to each button
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            // Handle button click event here
            Swal.fire('Button clicked!');
        });
    }

    console.log('navigator: ', navigator);

    checkIfCookieIsSet();

});


/*** Document is loaded */

window.addEventListener('load', function (event) {
    setOrReadCookie();
});

function checkIfCookieIsSet() {
    let cookie = 'salesBotCookie';
    let cookieChecker = localStorage.getItem(cookie);
    console.log('cookieChecker: ', cookieChecker);

    if (cookieChecker) {
        return cookieChecker;
    } else {
        return false;
    }
}

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

async function setOrReadCookie() {
    let cookie = checkIfCookieIsSet();
    if (cookie) {
        console.log('read cookie');
        const visitorObject = await findVisitor(cookie);
        console.log('visitorObject: ', visitorObject);
        registerNewVisitorAccess(visitorObject.visitorID, visitorObject.visits);
    } else {
        //set id
        setCookie();
    }
}

async function setCookie() {
    const newVisitorID = generateUniqueId();
    localStorage.setItem('salesBotCookie', newVisitorID);
    const newVisitor = await registerNewVisitor(newVisitorID);
    return newVisitor;
}

const registerNewVisitor = async (visitorID) => {

    postNewVisitor(visitorID)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });

}

const registerNewVisitorAccess = (visitorID, currentVisits) => {
    updateVisitor(visitorID, currentVisits + 1)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });

}


function updateVisitor(visitorID, visits) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:3005/v1/visitors/update';

        const data = {
            visitorID: visitorID,
            visits: visits
        };

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error('Request failed: ' + xhr.statusText));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Network error'));
        };

        xhr.send(JSON.stringify(data));
    });
}

function postNewVisitor(visitorID, visits, action) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:3005/v1/visitors/create';

        const data = {
            visitorID: visitorID
        };

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error('Request failed: ' + xhr.statusText));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Network error'));
        };

        xhr.send(JSON.stringify(data));
    });
}

function findVisitor(visitorID) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:3005/v1/visitors/find';

        const data = {
            visitorID: visitorID
        };

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('xhr: ', xhr);
                const response = JSON.parse(xhr.responseText);
                //response = response._pluck('id');
                const responseObject = {
                    visitorID: response.visitorID,
                    visits: response.visits
                }
                console.log('response: ', responseObject);
                resolve(responseObject);
                /* if (response.found) {
                  resolve(response.data);
                } else {
                  reject(new Error('Visitor not found'));
                } */
            } else {
                reject(new Error('Request failed: ' + xhr.statusText));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Network error'));
        };

        xhr.send(JSON.stringify(data));
    });
}
