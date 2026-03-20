import { $, $$ } from './core/dom.js';
import { initMediaOptimizations } from './modules/media.js';
import { initMobileMenu } from './modules/menu.js';
import { initScrollReveal } from './modules/reveal.js';
import { initSmoothAnchors } from './modules/anchors.js';
import { initSlides } from './modules/slides.js';
import { initTabs, initDayTabs } from './modules/tabs.js';
import { initOverlayClose } from './modules/overlays.js';
import { initAtracoes } from './modules/atracoes.js';
import { initEquipe } from './modules/equipe.js';
import { initNoteBubbles } from './modules/hero-bubble.js';

document.addEventListener('DOMContentLoaded', () => {
  initMediaOptimizations($, $$);
  initMobileMenu($);
  initScrollReveal($$);
  initSmoothAnchors($$);
  initSlides($);
  initTabs($$);
  initDayTabs($$);
  initOverlayClose();
  initAtracoes($, $$);
  initEquipe($, $$);
  initNoteBubbles($);
});
