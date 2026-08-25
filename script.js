/* =========================================================
   DATOS — edita aquí para actualizar el contenido del sitio
   ========================================================= */

const FACTS = [
  { k: 'Ubicación', v: 'Ciudad de México' },
  { k: 'Rol', v: 'Desarrollador Fullstack .NET' },
  { k: 'Sector', v: 'Software empresarial' },
  { k: 'Desde', v: 'Nov. 2024 (activo en el sector desde may. 2024)' },
  { k: 'GitHub', v: 'KevinMtz123' },
];

const STACK_GROUPS = [
  {
    title: 'Backend',
    items: [
      { name: 'ASP.NET Core', level: 'green' },
      { name: 'Entity Framework Core', level: 'green' },
      { name: 'SQL Server', level: 'green' },
      { name: 'AutoMapper', level: 'green' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'Blazor WebAssembly / Auto', level: 'green' },
      { name: 'MudBlazor', level: 'green' },
      { name: 'React', level: 'amber' },
    ],
  },
  {
    title: 'Tiempo real & documentos',
    items: [
      { name: 'SignalR', level: 'green' },
      { name: 'iText7 (PDF)', level: 'green' },
    ],
  },
  {
    title: 'Otras tecnologías',
    items: [
      { name: 'Java', level: 'amber' },
      { name: 'PHP / Laravel', level: 'amber' },
      { name: 'Flutter', level: 'amber' },
      { name: 'Android', level: 'amber' },
    ],
  },
];

const REPOS = [
  {
    name: 'Clean-Architecture-with-ASP.NET-Core',
    lang: 'C#',
    desc: 'Sistema de gestión para clínica dental. Organizado en capas de Dominio, Aplicación, Infraestructura, Identidad y Persistencia.',
    url: 'https://github.com/KevinMtz123/Clean-Architecture-with-ASP.NET-Core',
  },
  {
    name: 'Curaditos-API',
    lang: 'C#',
    desc: 'API REST para la gestión de productos de aguardientes y curados artesanales: catálogo, categorías y promociones.',
    url: 'https://github.com/KevinMtz123/Curaditos-API',
  },
  {
    name: 'APIPracticaGestionEscuelas',
    lang: 'C#',
    desc: 'API RESTful para gestión de escuelas de música: CRUD sobre escuelas, profesores y alumnos, y consultas relacionales.',
    url: 'https://github.com/KevinMtz123/APIPracticaGestionEscuelas',
  },
  {
    name: 'Crud-Blazor',
    lang: 'Blazor',
    desc: 'CRUD base construido con Blazor y .NET Core.',
    url: 'https://github.com/KevinMtz123/Crud-Blazor',
  },
  {
    name: 'AI-Padrino',
    lang: 'Python',
    desc: 'Chatbot de ayuda emocional para personas con dependencia del alcohol.',
    url: 'https://github.com/KevinMtz123/AI-Padrino',
  },
];

/* =========================================================
   COMPONENTES — funciones que generan HTML a partir de datos
   ========================================================= */

function FactRow({ k, v }) {
  return `
    <div class="fact">
      <span class="fact-k">${k}</span>
      <span class="fact-v">${v}</span>
    </div>`;
}

function StatusDot(level = 'green') {
  return `<span class="dot ${level}"></span>`;
}

function StackCell({ title, items }) {
  const rows = items
    .map(({ name, level }) => `<li>${StatusDot(level)}${name}</li>`)
    .join('');
  return `
    <div class="stack-cell">
      <div class="stack-cell-title">${title}</div>
      <ul>${rows}</ul>
    </div>`;
}

function RepoCard({ name, lang, desc, url }) {
  return `
    <div class="repo-card">
      <div class="repo-top">
        <span class="repo-name">${name}</span>
        <span class="repo-lang">${lang}</span>
      </div>
      <p class="repo-desc">${desc}</p>
      <a class="repo-link" href="${url}" target="_blank" rel="noopener">Ver repositorio ↗</a>
    </div>`;
}

/* =========================================================
   RENDER — monta los componentes en sus contenedores
   ========================================================= */

function renderFacts() {
  const el = document.getElementById('facts-list');
  if (!el) return;
  el.innerHTML = FACTS.map(FactRow).join('');
}

function renderStack() {
  const el = document.getElementById('stack-grid');
  if (!el) return;
  el.innerHTML = STACK_GROUPS.map(StackCell).join('');
}

function renderRepos() {
  const el = document.getElementById('repo-grid');
  if (!el) return;
  el.innerHTML = REPOS.map(RepoCard).join('');
}

/* =========================================================
   COMPORTAMIENTO — reloj en vivo y scroll reveal
   ========================================================= */

function tickClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Mexico_City',
  });
  el.textContent = fmt.format(new Date());
}

function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
}

/* =========================================================
   INIT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderFacts();
  renderStack();
  renderRepos();

  tickClock();
  setInterval(tickClock, 1000);

  initScrollReveal();
});
