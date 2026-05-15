// Cache para SVGs carregados
const svgCache = {};

// Função para carregar SVG de arquivo
async function loadSVG(iconName) {
  if (svgCache[iconName]) {
    return svgCache[iconName];
  }

  try {
    const response = await fetch(`./painel_temporario/icons/${iconName}.svg`);
    if (response.ok) {
      const svgContent = await response.text();
      svgCache[iconName] = svgContent;
      return svgContent;
    }
  } catch (error) {
    console.error(`Erro ao carregar ícone ${iconName}:`, error);
  }

  return '';
}

// Função para formatar o nome do projeto
function formatProjectName(name) {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

// Função para criar um card de projeto
async function createProjectCard(project) {
  const card = document.createElement("a");
  card.href = project.path;
  card.className = "project-card";

  const title = project.title || formatProjectName(project.id);
  const description = project.description || "";
  const iconName = project.icon || "circle";
  const iconSVG = await loadSVG(iconName);

  card.innerHTML = `
        <div class="card-content">
            <div class="card-icon">${iconSVG}</div>
            <h2 class="card-title">${title}</h2>
            ${description ? `<p class="card-description">${description}</p>` : ""}
            <div class="card-meta">/${project.id}/</div>
        </div>
    `;

  return card;
}

// Função para carregar os projetos
async function loadProjects() {
  const gridContainer = document.getElementById("projectsGrid");
  gridContainer.innerHTML = "";

  try {
    const response = await fetch("./painel_temporario/projects.json");
    if (response.ok) {
      const projects = await response.json();
      await renderProjects(projects, gridContainer);
      return;
    }
  } catch (error) {
    console.error("Erro ao carregar projetos:", error);
  }

  gridContainer.innerHTML = `<p style="color: var(--ink-mute);">Erro ao carregar projetos. Verifique se projects.json existe.</p>`;
}

// Função para renderizar os projetos
async function renderProjects(projectList, container) {
  if (projectList.length === 0) {
    container.innerHTML = `<p style="color: var(--ink-mute);">Nenhum projeto encontrado</p>`;
    return;
  }

  for (const project of projectList) {
    const card = await createProjectCard(project);
    container.appendChild(card);
  }
}

// Tema toggle
async function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  // Carrega SVGs do tema
  const sunSVG = await loadSVG("sun");
  const moonSVG = await loadSVG("moon");

  // Detecta tema preferido do sistema
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");

  html.setAttribute("data-theme", savedTheme);

  // Renderiza SVGs no botão
  toggle.innerHTML = `<span class="ic-sun">${sunSVG}</span><span class="ic-moon">${moonSVG}</span>`;

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Inicializa
document.addEventListener("DOMContentLoaded", async () => {
  await initThemeToggle();
  await loadProjects();
});
