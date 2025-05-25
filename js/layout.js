document.addEventListener('DOMContentLoaded', function() {
    const loadComponent = (url, placeholderId) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;

                    // Se o componente carregado for nav.html, inicialize o script do menu
                    if (placeholderId === 'nav-placeholder') {
                        const hamburgerButton = document.getElementById('hamburger-button');
                        // O elemento <nav> é o filho direto do placeholder após innerHTML
                        const navElement = placeholder.querySelector('nav'); 
                        const navUl = document.getElementById('main-nav-ul');

                        if (hamburgerButton && navElement && navUl) {
                            hamburgerButton.addEventListener('click', () => {
                                navElement.classList.toggle('nav-active');
                                const isExpanded = navElement.classList.contains('nav-active');
                                hamburgerButton.setAttribute('aria-expanded', isExpanded);
                                hamburgerButton.classList.toggle('open');
                            });

                            // Fechar o menu ao clicar em um link (para navegação na mesma página ou SPAs)
                            navUl.querySelectorAll('a').forEach(link => {
                                link.addEventListener('click', () => {
                                    if (navElement.classList.contains('nav-active')) {
                                        navElement.classList.remove('nav-active');
                                        hamburgerButton.classList.remove('open');
                                        hamburgerButton.setAttribute('aria-expanded', 'false');
                                    }
                                });
                            });

                            // Fechar o menu se clicar fora dele em mobile
                            document.addEventListener('click', (event) => {
                                // Verifica se o clique foi fora do navElement E fora do hamburgerButton
                                if (navElement.classList.contains('nav-active') &&
                                    !navElement.contains(event.target) &&
                                    !hamburgerButton.contains(event.target)) {
                                    navElement.classList.remove('nav-active');
                                    hamburgerButton.classList.remove('open');
                                    hamburgerButton.setAttribute('aria-expanded', 'false');
                                }
                            });
                        } else {
                            console.warn('Elementos do menu hambúrguer (hamburgerButton, navElement ou navUl) não encontrados após carregar nav.html.');
                        }
                    }
                } else {
                    console.warn(`Placeholder com ID '${placeholderId}' não encontrado.`);
                }
            })
            .catch(error => console.error(`Falha ao carregar o componente ${url}:`, error));
    };

    loadComponent('header.html', 'header-placeholder');
    loadComponent('nav.html', 'nav-placeholder');
    loadComponent('footer.html', 'footer-placeholder');
});