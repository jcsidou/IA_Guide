// Script para melhorias visuais e interatividade
document.addEventListener('DOMContentLoaded', function() {
    
    // Evitar execução múltipla
    if (window.scriptLoaded) return;
    window.scriptLoaded = true;
    
    // Verificar se a navegação foi carregada após um tempo
    setTimeout(function() {
        const navPlaceholder = document.getElementById('nav-placeholder');
        const backupNav = document.querySelector('.backup-nav');
        
        console.log('Verificando navegação...');
        console.log('Nav placeholder content:', navPlaceholder ? navPlaceholder.innerHTML.length : 'não encontrado');
        console.log('Backup nav disponível:', backupNav ? 'sim' : 'não');
        
        // Se o placeholder está vazio e há backup disponível
        if (navPlaceholder && navPlaceholder.innerHTML.trim() === '' && backupNav && backupNav.style.display === 'none') {
            backupNav.style.display = 'block';
            navPlaceholder.style.display = 'none';
            console.log('Navegação de backup ativada devido a falha no carregamento');
            
            // Inicializar menu após ativar backup
            setTimeout(initializeBackupMenu, 100);
        }
        
        // Debug: verificar se links do header estão funcionando
        const headerLinks = document.querySelectorAll('.header-quick-nav a');
        console.log('Links no header encontrados:', headerLinks.length);
        
        headerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Link clicado:', this.href);
                // Garantir que o link funcione
                if (this.href) {
                    window.location.href = this.href;
                }
            });
        });
    }, 1500);
    
    function initializeBackupMenu() {
        if (window.backupMenuInitialized) return;
        window.backupMenuInitialized = true;
        
        const nav = document.querySelector('.backup-nav nav');
        const menuToggle = document.querySelector('.backup-nav .menu-toggle');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                nav.classList.toggle('menu-active');
                
                if (nav.classList.contains('menu-active')) {
                    this.innerHTML = '✕';
                    this.style.transform = 'translateY(-50%) rotate(180deg)';
                } else {
                    this.innerHTML = '☰';
                    this.style.transform = 'translateY(-50%) rotate(0deg)';
                }
            });
            
            const navLinks = document.querySelectorAll('.backup-nav nav ul li a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('menu-active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '☰';
                        menuToggle.style.transform = 'translateY(-50%) rotate(0deg)';
                    }
                });
            });
        }
    }
    
    // Efeito de parallax suave no header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });

    // Efeito de fade-in para elementos quando aparecem na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas as seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Smooth scroll para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efeito de hover melhorado para cards/seções
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Efeito de typing para o título principal
    const mainTitle = document.querySelector('h2');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                mainTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar o efeito após um pequeno delay
        setTimeout(typeWriter, 500);
    }

    // Adicionar efeito de ripple aos botões/links
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Aplicar efeito ripple aos links de navegação
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', createRipple);
    });

    // Menu responsivo melhorado
    function initResponsiveMenu() {
        const nav = document.querySelector('nav');
        const navUl = document.querySelector('nav ul');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
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
                    menuToggle.innerHTML = '☰';
                    menuToggle.style.transform = 'translateY(-50%) rotate(0deg)';
                });
            });
            
            // Fechar menu ao clicar fora
            document.addEventListener('click', function(event) {
                if (!nav.contains(event.target) && nav.classList.contains('menu-active')) {
                    nav.classList.remove('menu-active');
                    menuToggle.innerHTML = '☰';
                    menuToggle.style.transform = 'translateY(-50%) rotate(0deg)';
                }
            });
        }
        
        if (window.innerWidth <= 768) {
            nav.classList.add('mobile');
        } else {
            nav.classList.remove('mobile');
            nav.classList.remove('menu-active');
            if (menuToggle) {
                menuToggle.innerHTML = '☰';
                menuToggle.style.transform = 'translateY(-50%) rotate(0deg)';
            }
        }
    }

    window.addEventListener('resize', initResponsiveMenu);
    initResponsiveMenu();

    // Efeito de loading inicial
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingOverlay);
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            document.body.style.opacity = '1';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 800);
    });

    // Indicador de progresso de leitura
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Botão de voltar ao topo
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// CSS para o efeito ripple (será adicionado dinamicamente)
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    nav a {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
//                 !hamburgerButton.contains(event.target)) {
//                 navElement.classList.remove('nav-active');
//                 hamburgerButton.classList.remove('open');
//                 hamburgerButton.setAttribute('aria-expanded', 'false');
//             }
//         });
//     }
// });