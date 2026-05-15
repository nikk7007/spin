// Configuração dos projetos
const projects = [
    {
        id: 'spin',
        title: 'Spin',
        icon: 'circle',
        description: 'Roleta dinâmica interativa',
        path: './spin/'
    }
];

// Função para criar um SVG inline
function createIconSVG(iconName) {
    const icons = {
        circle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                 </svg>`,
        square: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                 </svg>`,
        arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="5 12 19 12"></polyline>
                    <polyline points="12 5 19 12 12 19"></polyline>
                 </svg>`,
        box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="12 3 20 7 20 17 12 21 4 17 4 7 12 3"></polyline>
                 </svg>`,
        grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                 </svg>`,
        star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 10.26 24 10.27 17.18 16.70 20.27 24.96 12 18.53 3.73 24.96 6.82 16.70 0 10.27 8.91 10.26 12 2"></polygon>
                 </svg>`
    };

    return icons[iconName] || icons.circle;
}

// Função para formatar o nome do projeto
function formatProjectName(name) {
    return name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

// Função para criar um card de projeto
function createProjectCard(project) {
    const card = document.createElement('a');
    card.href = project.path;
    card.className = 'project-card';

    const title = project.title || formatProjectName(project.id);
    const description = project.description || '';
    const iconSVG = createIconSVG(project.icon || 'circle');

    card.innerHTML = `
        <div class="card-content">
            <div class="card-icon">${iconSVG}</div>
            <h2 class="card-title">${title}</h2>
            ${description ? `<p class="card-description">${description}</p>` : ''}
            <div class="card-meta">/${project.id}/</div>
        </div>
    `;

    return card;
}

// Função para carregar os projetos
async function loadProjects() {
    const gridContainer = document.getElementById('projectsGrid');
    gridContainer.innerHTML = '';

    try {
        const response = await fetch('./projects.json');
        if (response.ok) {
            const customProjects = await response.json();
            renderProjects(customProjects, gridContainer);
            return;
        }
    } catch (error) {
        // Usa os projetos padrão
    }

    renderProjects(projects, gridContainer);
}

// Função para renderizar os projetos
function renderProjects(projectList, container) {
    if (projectList.length === 0) {
        container.innerHTML = `<p style="color: var(--ink-mute);">Nenhum projeto encontrado</p>`;
        return;
    }

    projectList.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
}

// Tema toggle
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Detecta tema preferido do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

    html.setAttribute('data-theme', savedTheme);

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Inicializa
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    loadProjects();
});
