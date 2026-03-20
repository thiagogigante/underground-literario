export function initNoteBubbles($) {
  const bubbles = document.querySelectorAll('[data-bubble]');
  if (!bubbles.length) return;

  bubbles.forEach((bubble) => {
    const closeBtn = bubble.querySelector('.note-close');
    if (!closeBtn) return;

    closeBtn.addEventListener('click', () => {
      bubble.classList.add('is-hidden');
    });
  });
}
