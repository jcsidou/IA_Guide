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