// Script para menu responsivo
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const navElement = document.querySelector('nav'); // Seleciona o elemento <nav>
    const navUl = document.getElementById('main-nav-ul');

    if (hamburgerButton && navElement && navUl) {
        hamburgerButton.addEventListener('click', () => {
            navElement.classList.toggle('nav-active'); // Adiciona/remove a classe no <nav>
            const isExpanded = navElement.classList.contains('nav-active');
            hamburgerButton.setAttribute('aria-expanded', isExpanded);
            hamburgerButton.classList.toggle('open'); // Para animar o botão para 'X'
        });

        // Opcional: Fechar o menu se clicar em um link (para SPAs ou navegação na mesma página)
        // Se seus links levam a outras páginas, isso pode não ser necessário.
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navElement.classList.contains('nav-active')) {
                    navElement.classList.remove('nav-active');
                    hamburgerButton.classList.remove('open');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Opcional: Fechar o menu se clicar fora dele em mobile
        document.addEventListener('click', (event) => {
            if (navElement.classList.contains('nav-active') && 
                !navElement.contains(event.target) && 
                !hamburgerButton.contains(event.target)) {
                navElement.classList.remove('nav-active');
                hamburgerButton.classList.remove('open');
                hamburgerButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
});