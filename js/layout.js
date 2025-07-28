document.addEventListener('DOMContentLoaded', function() {
    // Evitar execução múltipla
    if (window.layoutLoaded) return;
    window.layoutLoaded = true;

    const loadComponent = (url, placeholderId) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder && placeholder.innerHTML.trim() === '') {
                    placeholder.innerHTML = data;
                    return true;
                } else {
                    return false;
                }
            })
            .catch(error => {
                console.error(`Falha ao carregar o componente ${url}:`, error);
                return false;
            });
    };

    // Função para ativar navegação de backup
    function activateBackupNav() {
        const backupNav = document.querySelector('.backup-nav');
        const navPlaceholder = document.getElementById('nav-placeholder');
        
        if (backupNav && backupNav.style.display === 'none') {
            backupNav.style.display = 'block';
            if (navPlaceholder) {
                navPlaceholder.style.display = 'none';
            }
            // Inicializar funcionalidades após ativar backup
            setTimeout(initializeMenuFunctionality, 100);
        }
    }

    // Carregar todos os componentes
    Promise.all([
        loadComponent('header.html', 'header-placeholder'),
        loadComponent('nav.html', 'nav-placeholder'),
        loadComponent('footer.html', 'footer-placeholder')
    ]).then((results) => {
        // Verificar se o nav foi carregado com sucesso
        const navLoaded = results[1];
        
        if (!navLoaded) {
            activateBackupNav();
        } else {
            // Se carregou com sucesso, inicializar funcionalidades
            setTimeout(initializeMenuFunctionality, 100);
        }
    }).catch(() => {
        // Se houve erro geral, ativar backup
        activateBackupNav();
    });

    function initializeMenuFunctionality() {
        // Evitar múltiplas inicializações
        if (window.menuInitialized) return;
        window.menuInitialized = true;

        const nav = document.querySelector('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                nav.classList.toggle('menu-active');
                
                // Animar o ícone do menu
                if (nav.classList.contains('menu-active')) {
                    this.innerHTML = '✕';
                    this.style.transform = 'translateY(-50%) rotate(180deg)';
                } else {
                    this.innerHTML = '☰';
                    this.style.transform = 'translateY(-50%) rotate(0deg)';
                }
            });
            
            // Fechar menu ao clicar em um link
            const navLinks = document.querySelectorAll('nav ul li a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('menu-active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '☰';
                        menuToggle.style.transform = 'translateY(-50%) rotate(0deg)';
                    }
                });
            });
            
            // Fechar menu ao clicar fora
            document.addEventListener('click', function(event) {
                if (!nav.contains(event.target) && nav.classList.contains('menu-active')) {
                    nav.classList.remove('menu-active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '☰';
                        menuToggle.style.transform = 'translateY(-50%) rotate(0deg)';
                    }
                }
            });
        }
    }
});