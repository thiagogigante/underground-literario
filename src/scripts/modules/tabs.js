export function initTabs($$) {
  const tabs = $$('.tab');
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      $$('.tab-content').forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

export function initDayTabs($$) {
  $$('.btn-day[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.btn-day[data-tab]').forEach((b) => b.classList.remove('active'));
      $$('.cartazarea').forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target && target.classList.contains('cartazarea')) {
        target.classList.add('active');
      }
    });
  });
}

