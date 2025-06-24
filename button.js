
document.querySelectorAll('.nav-b').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');

        // Скрыть все секции
        document.querySelectorAll('.section').forEach(div => {
            div.classList.add('h-d');
        });

        // Показать нужную
        const targetDiv = document.getElementById(targetId);
        if (targetDiv) {
            targetDiv.classList.remove('h-d');
        }
    });
});
