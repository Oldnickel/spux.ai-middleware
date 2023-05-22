/*** Document is ready */

var elements;

const midURL = 'http://192.168.88.31:3005'
document.addEventListener('DOMContentLoaded', async function () {
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
        return true;
    });

    window.addEventListener('unload', function () {
        console.log('unloaded');
        return true;
    })

    window.addEventListener('resize', function () {
        elements.update();
        return true;
    });

    const userInfo = await getUserInfo();
    console.log(userInfo);

    postNewMetaData(userInfo)

    var buttons = document.querySelectorAll('button[name="cart-button"]');

    // Add a click event listener to each button
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            // Handle button click event here
            Swal.fire({
                title: 'Error!',
                text: 'Do you need help with this product?',
                icon: 'info',
                confirmButtonText: 'Yes, i need help.',
                denyButtonText: 'No, i\'m okay.',
                toast: true,
                position: 'bottom-end',
                timer: 10000,
                timerProgressBar: true,
                showConfirmButton: true,
                showDenyButton: true,
                preConfirm: () => {
                    const data = {
                        message: 'accept_product_feedback',
                        sender: localStorage.getItem('salesBotCookie')
                    }
                    return fetch(midURL + '/v1/rasa/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response.statusText)
                            }
                            return response.json()
                        })
                        .catch(error => {
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('result: ', result);

                    Swal.fire({
                        title: 'Thank You!',
                        text: result.value[0].text
                    })
                }
            })
            return true;
        });
    }

    console.log('navigator: ', navigator);

    checkIfCookieIsSet();
    return true;
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
        const url = midURL + '/v1/visitors/update';

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
        const url = midURL + '/v1/visitors/create';

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
        const url = midURL + '/v1/visitors/find';

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

function postNewMetaData(userInfo) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', midURL + '/v1/metadata/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('Metadata created successfully:', xhr.responseText);
            } else {
                console.error('Error creating metadata:', xhr.status, xhr.statusText);
            }
        }
    };

    xhr.send(JSON.stringify(userInfo));
}




function swalWithQuestion(question) {
    Swal.fire({
        title: question,
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            return fetch(`${midURL}/v1/rasa/chat`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
            })
        }
    })
}

async function getUserInfo() {
    var userAgent = navigator.userAgent;
    var platform = navigator.platform;

    var browser = await getBrowserName(userAgent);
    var isMobile = isMobileDevice(userAgent);

    var userInfo = {
        os: platform,
        browser: browser,
        isMobile: isMobile,
        platform: platform
    };

    return userInfo;
}

function getBrowserName(userAgent) {
    // Check for popular browsers and return their names
    if (userAgent.indexOf("Chrome") !== -1) return "Google Chrome";
    if (userAgent.indexOf("Firefox") !== -1) return "Mozilla Firefox";
    if (userAgent.indexOf("Safari") !== -1) return "Apple Safari";
    if (userAgent.indexOf("Opera") !== -1) return "Opera";
    if (userAgent.indexOf("Edge") !== -1) return "Microsoft Edge";
    if (userAgent.indexOf("Trident") !== -1) return "Internet Explorer";

    // If the browser is not recognized, return the user agent string
    return userAgent;
}

function isMobileDevice(userAgent) {
    // Check if user agent contains keywords indicating a mobile device
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

