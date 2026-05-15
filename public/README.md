# Portal

Portal elegante inspirado no design da aplicação Spin. Tipografia sofisticada, tema claro/escuro e design minimalista.

## 📂 Estrutura

```
public/
├── index.html          # Página principal
├── styles.css          # Estilos (inspirado em Spin)
├── app.js              # Lógica JavaScript
├── projects.json       # Configuração dos projetos
└── spin/               # Seus projetos
    └── index.html
```

## Design

- **Tipografia**: Instrument Serif (títulos) + Geist (interface)
- **Tema**: Claro/Escuro automático
- **Cores**: Palette inspirada no Spin (tons neutros/quentes)
- **Animações**: Transições suaves e elegantes

## ⚙️ Como Adicionar Projetos

Edite `public/projects.json`:

```json
[
    {
        "id": "spin",
        "title": "Spin",
        "icon": "circle",
        "description": "Roleta dinâmica interativa",
        "path": "./spin/"
    },
    {
        "id": "novo-projeto",
        "title": "Novo Projeto",
        "icon": "square",
        "description": "Descrição do seu projeto",
        "path": "./novo-projeto/"
    }
]
```

## 🎨 Ícones Disponíveis

- `circle` - Círculo
- `square` - Quadrado
- `arrow` - Seta
- `box` - Caixa
- `grid` - Grade
- `star` - Estrela

## 📝 Campos do Projeto

- **id**: Identificador único
- **title**: Nome do projeto
- **icon**: Um dos ícones disponíveis
- **description**: Descrição (opcional)
- **path**: Caminho relativo da pasta

## 🌐 Usar Localmente

```bash
python -m http.server 8000
```

Acesse: `http://localhost:8000/public/`

O tema alterna automaticamente de acordo com a preferência do sistema, ou pode ser alterado manualmente com o botão no canto inferior direito.
