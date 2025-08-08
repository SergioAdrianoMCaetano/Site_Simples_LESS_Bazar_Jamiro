//Menu hamburguer
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    }

    //Botões de "Comprar"
    const buttons = document.querySelectorAll('.product-button');

    buttons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Produto adicionado ao carrinho!');
    });
    });

    //Validação do formulário
    const form = document.querySelector('.signup-form');

    if (form) {
    form.addEventListener('submit', (e) => {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const telefone = form.telefone.value.trim();

        if (!name || !email || !telefone) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos.');
        }
    });
}
