export function initAtracoes($, $$) {
  let atracoesData = [];
  let fichaIndex = 0;

  function abrirFicha(index) {
    fichaIndex = index;
    const atracao = atracoesData[index];
    if (!atracao) return;

    const nome = $('#ficha-nome');
    const destaque = $('#ficha-destaque');
    const bio = $('#ficha-bio');
    const linkInsta = $('#ficha-instagram');
    const overlay = $('#overlay-ficha');
    if (!nome || !destaque || !bio || !linkInsta || !overlay) return;

    nome.textContent = atracao.nome;
    destaque.src = atracao.destaque;
    destaque.alt = `Imagem de destaque de ${atracao.nome}`;
    bio.innerHTML = atracao.bio;
    linkInsta.textContent = atracao.instagram
      ? atracao.instagram.replace('https://www.instagram.com/', '@')
      : '';
    linkInsta.href = atracao.instagram || '#';

    overlay.classList.remove('hidden');
    const closeBtn = overlay.querySelector('.btn-fechar');
    if (closeBtn) closeBtn.focus();
  }

  function abrirFichaPorId(id) {
    const index = atracoesData.findIndex((a) => a.id === id);
    if (index !== -1) abrirFicha(index);
  }

  async function carregarAtracoes() {
    const linksAtracoes = $$('.gallery a[data-id]');
    if (!linksAtracoes.length) return;

    try {
      const resposta = await fetch('src/data/atracoes.json');
      if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
      atracoesData = await resposta.json();
    } catch (err) {
      console.error('Falha ao carregar atracoes:', err);
      return;
    }

    linksAtracoes.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        abrirFichaPorId(a.dataset.id);
      });
    });
  }

  const fichaPrev = document.getElementById('ficha-prev');
  const fichaNext = document.getElementById('ficha-next');

  if (fichaPrev) {
    fichaPrev.addEventListener('click', () => {
      if (!atracoesData.length) return;
      fichaIndex = (fichaIndex - 1 + atracoesData.length) % atracoesData.length;
      abrirFicha(fichaIndex);
    });
  }
  if (fichaNext) {
    fichaNext.addEventListener('click', () => {
      if (!atracoesData.length) return;
      fichaIndex = (fichaIndex + 1) % atracoesData.length;
      abrirFicha(fichaIndex);
    });
  }

  carregarAtracoes();
}

