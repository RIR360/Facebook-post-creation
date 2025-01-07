function toggle(...selectors) {
    for (const selector of selectors) {
        document.querySelector(selector).classList.toggle('hidden');
    }
}

function activeGroup(selector) {

    let elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
        elem.addEventListener('click', () => {
            elements.forEach(el => el.classList.remove('active'));
            elem.classList.add('active');
        });
    });

}