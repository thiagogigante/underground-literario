# Visao Geral do Site

Este repositório é um site estático do Festival Underground Literario.
Ele usa HTML, CSS e JavaScript modules (sem build step).

## Paginas

- `index.html`: Site principal com hero, gallery, mídia, atrações, mapa, equipe e contato.
- `src/programacao.html`: Página de programação.
- `src/inscricoes.html`: Página de inscrições.

Todas as páginas carregam o mesmo entry point: `src/scripts/main.js`.

## Fontes de Dados

- `src/data/atracoes.json`: Dados das atrações (nome, bio, imagem, Instagram).
- `src/data/equipe.json`: Dados da equipe (nome, bio, foto).
- `src/data/fotos.json`: Grupos da gallery e lista de imagens.

## Arquitetura JavaScript

- `src/scripts/main.js`: Entry point; inicia todos os modules.
- `src/scripts/core/dom.js`: Helpers de DOM (`$`, `$$`).
- `src/scripts/modules/media.js`: Image lazy loading e otimização do background video.
- `src/scripts/modules/menu.js`: Mobile menu toggle e fechamento ao clicar em link.
- `src/scripts/modules/reveal.js`: Scroll reveal animation.
- `src/scripts/modules/anchors.js`: Smooth anchor scrolling.
- `src/scripts/modules/slides.js`: Photo gallery (carrega `fotos.json`).
- `src/scripts/modules/tabs.js`: Tab switching (inclui day tabs).
- `src/scripts/modules/overlays.js`: Fecha overlay modals (click e Esc).
- `src/scripts/modules/atracoes.js`: Attraction modal preenchido via JSON.
- `src/scripts/modules/equipe.js`: Team modal preenchido via JSON.
- `src/scripts/modules/hero-bubble.js`: Fecha os notice bubbles.

## Estilos

- `src/styles/styles.css`: Estilos globais, componentes e regras responsivas.

## Midias e Assets

- `src/assets/images/`: Logos, ícones, backgrounds, imagens de seção, imagens da gallery.
- `src/assets/images/fotos/`: Imagens da gallery referenciadas por `fotos.json`.
- `src/assets/images/confirmados/`: Thumbnails e feature images das atrações.
- `src/assets/videos/video.mp4`: Background video.

## Como Funciona

Os arquivos HTML fornecem a estrutura estática. Os JavaScript modules adicionam
interatividade (menus, modals, slides, reveal). Os arquivos JSON fornecem dados
para gallery e popups. O CSS cuida de layout, tema e animações.
