(function (d, t) {
    /*** Register plugin in window object */

    console.log('d: ', d);

    this.myPlugin = function () {
        let defaults = {};

        this.elements = [];
        this.settings = (arguments[0] && typeof arguments[0] === 'object') ? extendDefaults(defaults, arguments[0]) : defaults;

        this.init();
    }

    function createSweetAlert() {
        let jsFile = 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
        //let styleFile = './sweetalert2/dist/sweetalert2.min.css'
        //var link = document.createElement("link");
        var script = document.createElement("script");

        // Set the attributes of the link element
        //link.href = styleFile;
        //link.rel = "stylesheet";
        //link.type = "text/css";

        script.src = jsFile;

        // Add the link element to the head section of the document
        document.head.appendChild(script);
        //document.head.appendChild(link);
    }


    /*** Public Methods */

    myPlugin.prototype.init = function () {
        console.log('Init plugin.');
        //createModal()
        createSweetAlert();

        build.call(this);
    }


    myPlugin.prototype.update = function (element) {
        console.log('Update plugin.');
    }

    this.myPlugin.prototype.getCookies = function (elements) {
        console.log('elements cookie getter: ', elements);

    }

    myPlugin.prototype.beforeunload = function (element) {
        console.log('Update plugin.');
    }


    /*** Private Methods */

    function build(element) {
        console.log('Build plugin.');
    }

    function createModal() {
        // Create a div element for the modal
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal', 'fade');
        modalContainer.id = 'customModal';
        modalContainer.setAttribute('tabindex', '-1');
        modalContainer.setAttribute('role', 'dialog');
        modalContainer.setAttribute('aria-labelledby', 'customModalLabel');
        modalContainer.setAttribute('aria-hidden', 'true');

        // Create the modal dialog
        const modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
        modalDialog.setAttribute('role', 'document');

        // Create the modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Create the modal header
        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header', 'bg-primary', 'text-white', 'rounded-top');

        // Create the avatar
        const avatar = document.createElement('img');
        avatar.classList.add('rounded-circle', 'mr-2');
        avatar.setAttribute('src', 'https://via.placeholder.com/50');
        avatar.setAttribute('alt', 'Avatar');

        // Create the modal title
        const modalTitle = document.createElement('h5');
        modalTitle.classList.add('modal-title', 'font-weight-bold');
        modalTitle.setAttribute('id', 'customModalLabel');
        modalTitle.innerText = 'Custom Modal';

        // Create the close button
        const closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.classList.add('close');
        closeButton.setAttribute('data-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');

        const closeIcon = document.createElement('span');
        closeIcon.setAttribute('aria-hidden', 'true');
        closeIcon.innerHTML = '&times;';

        // Append the close icon to the close button
        closeButton.appendChild(closeIcon);

        // Append the avatar and modal title to the modal header
        modalHeader.appendChild(avatar);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        // Create the modal body
        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');

        // Create the lead paragraph
        const leadParagraph = document.createElement('p');
        leadParagraph.classList.add('lead');
        leadParagraph.innerText = 'This is a custom modal with an avatar.';

        // Create the content paragraph
        const contentParagraph = document.createElement('p');
        contentParagraph.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae faucibus libero. Aenean eleifend ac nibh non lacinia. Nullam euismod hendrerit malesuada. Aliquam erat volutpat. Vivamus fermentum faucibus magna, quis tempus sapien molestie eu. Sed eleifend est ut luctus venenatis.';

        // Append the lead and content paragraphs to the modal body
        modalBody.appendChild(leadParagraph);
        modalBody.appendChild(contentParagraph);

        // Create the modal footer
        const modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer', 'bg-light', 'rounded-bottom');

        // Create the close button for the modal footer
        const modalCloseButton = document.createElement('button');
        modalCloseButton.setAttribute('type', 'button');
        modalCloseButton.classList.add('btn', 'btn-secondary');
        modalCloseButton.setAttribute('data-dismiss', 'modal');
        modalCloseButton.innerText = 'Close';

        // Append the close button to the modal footer
        modalFooter.appendChild(modalCloseButton);

        // Append the header, body, and footer to the modal content
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        // Append the modal content to the modal dialog
        modalDialog.appendChild(modalContent);

        // Append the modal dialog to the modal container
        modalContainer.appendChild(modalDialog);

        // Append the modal container to the document body
        document.body.appendChild(modalContainer);

        // Show the modal
        $('#customModal').modal('show');

    }

    function extendDefaults(defaults, properties) {
        Object.keys(properties).forEach(property => {
            if (properties.hasOwnProperty(property)) {
                defaults[property] = properties[property];
            }
        });
        return defaults;
    }
}());