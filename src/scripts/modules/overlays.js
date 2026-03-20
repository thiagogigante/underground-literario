export function initOverlayClose() {
  const close = (id) => {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.add('hidden');
  };

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-fechar') || e.target.id === 'overlay-ficha') {
      close('overlay-ficha');
    }
    if (e.target.classList.contains('btn-fechar') || e.target.id === 'overlay-equipe') {
      close('overlay-equipe');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    close('overlay-ficha');
    close('overlay-equipe');
  });
}

