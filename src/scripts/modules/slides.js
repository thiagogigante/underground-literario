export function initSlides($, rootMargin = '300px 0px') {
  async function carregarSlides() {
    const slidesBox = $('.slides');
    const legenda = $('.slide-legenda');
    const frame = $('.slide-frame');
    const btnNext = $('.btn-next');
    const btnPrev = $('.btn-prev');

    if (!slidesBox || !legenda || !frame || !btnNext || !btnPrev) return;

    try {
      const req = await fetch('src/data/fotos.json');
      if (!req.ok) throw new Error(`Erro HTTP ${req.status}`);
      const grupos = await req.json();

      grupos.forEach((grupo) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        grupo.fotos.forEach((src, idx) => {
          slide.innerHTML += `
            <a href="${src}" target="_blank" rel="noopener noreferrer">
              <img src="${src}" alt="Foto ${idx + 1} - ${grupo.legenda || 'Festival'}" loading="lazy" decoding="async">
            </a>
          `;
        });

        slide.dataset.legenda = grupo.legenda || '';
        slidesBox.appendChild(slide);
      });

      let slideAtual = 0;
      const atualizarSlide = () => {
        const largura = frame.offsetWidth;
        slidesBox.style.transform = `translateX(-${slideAtual * largura}px)`;
        legenda.textContent = grupos[slideAtual]?.legenda || '';
      };

      btnNext.addEventListener('click', () => {
        if (slideAtual < grupos.length - 1) slideAtual += 1;
        atualizarSlide();
      });

      btnPrev.addEventListener('click', () => {
        if (slideAtual > 0) slideAtual -= 1;
        atualizarSlide();
      });

      window.addEventListener('resize', atualizarSlide);
      atualizarSlide();
    } catch (err) {
      console.error('Falha ao carregar galeria de fotos:', err);
      legenda.textContent = 'Nao foi possivel carregar a galeria no momento.';
    }
  }

  const section = $('#galeria-fotos');
  if (!section) return;

  let loaded = false;
  const loadOnce = () => {
    if (loaded) return;
    loaded = true;
    carregarSlides();
  };

  if (!('IntersectionObserver' in window)) {
    loadOnce();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      loadOnce();
    }
  }, { rootMargin });

  observer.observe(section);
}

