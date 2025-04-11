document.addEventListener('DOMContentLoaded', function() {
    // Get all the buttons with the class 'prize'
    const prizeButtons = document.querySelectorAll('.prize, .prize-ca, .prize-pp, .prize-az, .prize-cc');
    let globalClickCount = 0; // Initialize global click count

    // Function to show a modal with specific options
    function showModal(modalId) {
        const modalElement = document.getElementById(modalId);
        let modalOptions = {};

        // Apply specific options for the 'win' modal
        if (modalId === 'win') {
            modalOptions = {
                backdrop: 'static', // Prevent closing modal by clicking outside it
                keyboard: false     // Prevent closing modal by pressing the escape key
            };
        }

        const modal = new bootstrap.Modal(modalElement, modalOptions);
        modal.show();
    }

    // Add a click event listener to each button
    prizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            globalClickCount++;  // Increment the global click count

            if (globalClickCount === 1) {
                // Show the 'tryagain' modal and add 'inactive' class on the first click
                showModal('tryagain');
                this.classList.add('inactive');
                this.setAttribute('aria-disabled', 'true');  // Optionally disable the button
            } else if (globalClickCount === 2) {
                // Show the 'win' modal on the second global click
                showModal('win');
            }
        });
    });
});

