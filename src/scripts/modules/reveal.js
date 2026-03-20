export function initScrollReveal($$) {
  const revealEls = $$('section, .card, .slide, .area-slide');
  if (!revealEls.length) return;

  const revealOnScroll = () => {
    const limit = window.innerHeight * 0.85;
    revealEls.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < limit && !el.classList.contains('revealed')) {
        el.classList.add('revealed');
        el.classList.remove('reveal');
        const fromLeft = i % 2 === 0;
        el.style.transform = `translateX(${fromLeft ? '-12px' : '12px'})`;
        requestAnimationFrame(() => {
          el.style.transform = 'translateX(0)';
          el.style.opacity = '1';
          el.style.transition = 'opacity 700ms ease, transform 700ms cubic-bezier(.2,.9,.2,1)';
        });
      }
    });
  };

  revealEls.forEach((el) => {
    if (!el.classList.contains('reveal') && !el.classList.contains('revealed')) {
      el.classList.add('reveal');
    }
  });

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
}

