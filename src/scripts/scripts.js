document.addEventListener('DOMContentLoaded', () => {

    // ===================== MENU MOBILE =====================

(function setupMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open'); // adiciona/remove .open
    menu.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fechar o menu ao clicar em um link (mobile)
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

  // ===================== UTILIDADES =====================

  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  function safeAddEvent(el, ev, fn) { if (el) el.addEventListener(ev, fn); }

carregarAtracoes();
carregarEquipe();

  // ===================== EFEITO: SCROLL REVEAL (ENTRADA DAS SESSÕES E ELEMENTOS EM DIREÇÕES ALEATORIAS) =====================

  (function scrollReveal() {
    const revealEls = $$('section, .card, .slide, .area-slide');
    const revealOnScroll = () => {
      const limit = window.innerHeight * 0.85;
      revealEls.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < limit) {
          if (!el.classList.contains('revealed')) {
            el.classList.add('revealed');
            el.classList.remove('reveal');
            // direction: alternate by index (even -> from left, odd -> from right)
            const fromLeft = (i % 2 === 0);
            el.style.transform = 'translateX(' + (fromLeft ? '-12px' : '12px') + ')';
            // small timeout to trigger final in CSS
            requestAnimationFrame(() => {
              el.style.transform = 'translateX(0)';
              el.style.opacity = '1';
              el.style.transition = 'opacity 700ms ease, transform 700ms cubic-bezier(.2,.9,.2,1)';
            });
          }
        }
      });
    };

    // initialize: add base class
    revealEls.forEach(el => {
      if (!el.classList.contains('reveal') && !el.classList.contains('revealed')) el.classList.add('reveal');
    });

    safeAddEvent(window, 'scroll', revealOnScroll);
    revealOnScroll();
  })();
 
  // ===================== NAVEGAÇÃO: SMOOTH SCROLL (ROLAGEM PARA SESSÕES EM SLOW) =====================

  (function smoothAnchors(){
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  })();
});

// =================== GALERIA: NOVA SESSÃO ATRAÇÕES =================\\

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ================================= FICHAS DAS ATRAÇÕES ====================== //
let atracoesData = [];
let fichaIndex = 0;

async function carregarAtracoes() {
  const resposta = await fetch('src/data/atracoes.json');
  atracoesData = await resposta.json();

  // liga o clique de cada imagem da galeria
  document.querySelectorAll('.gallery a').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.dataset.id;
      abrirFichaPorId(id);
    });
  });
}

function abrirFichaPorId(id) {
  const index = atracoesData.findIndex(a => a.id === id);
  if (index !== -1) abrirFicha(index);
}

function abrirFicha(index) {
  fichaIndex = index;
  const atracao = atracoesData[index];
  if (!atracao) return;
//document.getElementById('ficha-logo').src = atracao.logo;//
  document.getElementById('ficha-nome').textContent = atracao.nome;
  document.getElementById('ficha-destaque').src = atracao.destaque;
  document.getElementById('ficha-bio').innerHTML = atracao.bio;
// instagram entre as setas
const linkInsta = document.getElementById('ficha-instagram');
linkInsta.textContent = atracao.instagram ? atracao.instagram.replace('https://www.instagram.com/', '@') : '';
linkInsta.href = atracao.instagram || 'LINK_EXTERNO';

  document.getElementById('overlay-ficha').classList.remove('hidden');
}

// fechar ficha
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-fechar') || e.target.id === 'overlay-ficha') {
    document.getElementById('overlay-ficha').classList.add('hidden');
  }
});

// navegar entre atrações
document.getElementById('ficha-prev').addEventListener('click', () => {
  fichaIndex = (fichaIndex - 1 + atracoesData.length) % atracoesData.length;
  abrirFicha(fichaIndex);
});

document.getElementById('ficha-next').addEventListener('click', () => {
  fichaIndex = (fichaIndex + 1) % atracoesData.length;
  abrirFicha(fichaIndex);
});

// ========================== PROGRAMAÇÃO - alternar cartazes ======================
document.querySelectorAll('.btn-day').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn-day').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cartazarea').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// =================== FICHAS DA EQUIPE ========================
let equipeData = [];
let equipeIndex = 0;

async function carregarEquipe() {
  const resposta = await fetch('src/data/equipe.json');
  equipeData = await resposta.json();

  document.querySelectorAll('.equipe-gallery a').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.dataset.id;
      abrirFichaEquipePorId(id);
    });
  });
}

function abrirFichaEquipePorId(id) {
  const index = equipeData.findIndex(p => p.id === id);
  if (index !== -1) abrirFichaEquipe(index);
}

function abrirFichaEquipe(index) {
  equipeIndex = index;
  const pessoa = equipeData[index];
  if (!pessoa) return;

  document.getElementById('equipe-nome').textContent = pessoa.nome;
  document.getElementById('equipe-destaque').src = pessoa.foto;
  document.getElementById('equipe-bio').innerHTML = pessoa.bio;

  document.getElementById('overlay-equipe').classList.remove('hidden');
}

// fechar ficha da equipe
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-fechar') || e.target.id === 'overlay-equipe') {
    document.getElementById('overlay-equipe').classList.add('hidden');
  }
});
