document.querySelectorAll('nav ul li a').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('selected');
        });
        event.target.classList.add('selected');
    });
});