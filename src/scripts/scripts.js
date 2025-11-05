document.addEventListener('DOMContentLoaded', () => {

  // ===================== UTILIDADES =====================

  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  function safeAddEvent(el, ev, fn) { if (el) el.addEventListener(ev, fn); }

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

//==================================== FIM DO CÓDIGO EM USO ================================================== \\




/* // ===================== CUSTOM CURSOR (subtle, non-intrusive) =====================

  (function customCursor() {
    // only enable on non-touch devices
    if ('ontouchstart' in window) return;
    const cursor = document.createElement('div');
    cursor.id = 'cursor-custom';
    Object.assign(cursor.style, {
      position: 'fixed', width: '18px', height: '18px', border: '2px solid rgba(45,199,255,0.9)',
      borderRadius: '50%', pointerEvents: 'none', transform: 'translate(-50%,-50%)', transition: 'transform 120ms ease, background 120ms',
      zIndex: 99999, mixBlendMode: 'difference'
    });
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // scale on hover for interactive elements
    const interactors = $$('a, button, .area-arrow, .carousel-arrow, .btn-day, .btn');
    interactors.forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1.6)'; });
      el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
    });

    // hide cursor on touch
    window.addEventListener('touchstart', () => { cursor.style.display = 'none'; }, { once: true });
  })();
*/

/*  // ===================== BACKGROUND LIGHT MOTION (low-cost) =====================
  (function subtleBackgroundMotion(){
    // gentle CSS-based approach - toggles a slight class to body to animate gradient via CSS if desired.
    // We keep JS light: alternate a CSS variable every few seconds to create slow color shift.
    let pos = 0;
    setInterval(() => {
      pos = (pos + 1) % 360;
      // small, low-cost hue-rotate via CSS variable
      document.documentElement.style.setProperty('--bgh', pos);
    }, 5000);
  })();
*/

/* === PROGRAMAÇÃO: Exibir Imagens e Lightbox ===
document.querySelectorAll('.btn-day').forEach(btn => {
  btn.addEventListener('click', () => {
   const day = btn.dataset.day;
    const img = document.getElementById(`img-${day}`);
    const closeBtn = img.nextElementSibling;

    const isVisible = img.style.display === 'block';

    document.querySelectorAll('.programacao-img, .btn-recolher').forEach(el => el.style.display = 'none');
    if (!isVisible) {
      img.style.display = 'block';
      closeBtn.style.display = 'inline-block';
    }
  });
}); 

/*document.querySelectorAll('.btn-recolher').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.previousElementSibling.style.display = 'none';
    btn.style.display = 'none';
  });
});

// Lightbox
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
lightbox.innerHTML = '<span class="lightbox-close">×</span><img src="/src/assets/imagens/bg.jpg"alt="Programação">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.programacao-img img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});

lightboxClose.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.style.display = 'none';
});


*/