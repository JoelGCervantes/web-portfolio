document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    let currentlyExpanding = false;

    skillItems.forEach(item => {
        const details = item.querySelector('.skill-details');

        item.addEventListener('mouseenter', () => {
            if (item.classList.contains('active') || currentlyExpanding) return;

            currentlyExpanding = true;

            // Collapse all other items
            skillItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherDetails = other.querySelector('.skill-details');
                    otherDetails.style.height = '0';
                }
            });

            // Wait for all transitions to end, then expand new item
            const prevDetails = document.querySelector('.skill-item.active .skill-details');
            if (prevDetails) {
                prevDetails.addEventListener(
                    'transitionend',
                    function handleTransitionEnd() {
                        expand(item, details);
                        prevDetails.removeEventListener('transitionend', handleTransitionEnd);
                    }
                );
            } else {
                expand(item, details);
            }
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
            details.style.height = '0';
        });
    });

    function expand(item, details) {
        item.classList.add('active');
        details.style.height = details.scrollHeight + 'px';
        currentlyExpanding = false;
    }
});
