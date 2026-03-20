export function initEquipe($, $$) {
  let equipeData = [];

  function abrirFichaEquipe(index) {
    const pessoa = equipeData[index];
    if (!pessoa) return;

    const nome = document.getElementById('equipe-nome');
    const destaque = document.getElementById('equipe-destaque');
    const bio = document.getElementById('equipe-bio');
    const overlay = document.getElementById('overlay-equipe');
    if (!nome || !destaque || !bio || !overlay) return;

    nome.textContent = pessoa.nome;
    destaque.src = pessoa.foto;
    destaque.alt = `Foto de ${pessoa.nome}`;
    bio.innerHTML = pessoa.bio;
    overlay.classList.remove('hidden');
    const closeBtn = overlay.querySelector('.btn-fechar');
    if (closeBtn) closeBtn.focus();
  }

  async function carregarEquipe() {
    const equipeAnchors = $$('.equipe-gallery a[data-id]');
    if (!equipeAnchors.length) return;

    try {
      const resposta = await fetch('src/data/equipe.json');
      if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
      equipeData = await resposta.json();
    } catch (err) {
      console.error('Falha ao carregar equipe:', err);
      return;
    }

    equipeAnchors.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const index = equipeData.findIndex((p) => p.id === a.dataset.id);
        if (index !== -1) abrirFichaEquipe(index);
      });
    });
  }

  carregarEquipe();
}

