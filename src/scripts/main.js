// ===== EXPANDIR / RECOLHER PROGRAMACAO =====
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const alvo = document.querySelector(btn.dataset.target);
    alvo.classList.toggle('hidden');
  });
});

document.querySelectorAll('.recolher').forEach(btn => {
  btn.addEventListener('click', () => {
    const alvo = document.querySelector(btn.dataset.target);
    alvo.classList.add('hidden');
  });
});


// ===== CARROSSEL AUTOMÁTICO =====
const container = document.querySelector('.carousel-container');
if (container) {
  let pos = 0;
  const velocidade = 0.6; // pixels por frame
  const loop = () => {
    pos -= velocidade;
    if (Math.abs(pos) > container.scrollWidth / 2) pos = 0;
    container.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(loop);
  };
  loop();
}


// ===== SCROLL REVEAL =====
const revelar = document.querySelectorAll('section, .card, .slide');
const revelarNaTela = () => {
  const limite = window.innerHeight * 0.85;
  revelar.forEach(el => {
    const topo = el.getBoundingClientRect().top;
    if (topo < limite) el.classList.add('visivel');
  });
};
window.addEventListener('scroll', revelarNaTela);
revelarNaTela(); // ativa no load

// CSS pra animação de entrada
const style = document.createElement('style');
style.innerHTML = `
  .visivel {
    opacity: 1 !important;
    transform: translateY(0) scale(1) !important;
    transition: all 0.8s ease-out;
  }
  section, .card, .slide {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
`;
document.head.appendChild(style);


// ===== EFEITO DE CURSOR CUSTOMIZADO =====
const cursor = document.createElement('div');
cursor.id = 'cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const cursorStyle = document.createElement('style');
cursorStyle.innerHTML = `
  #cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 255, 180, 0.8);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease;
    z-index: 9999;
    mix-blend-mode: difference;
  }
  a:hover ~ #cursor, button:hover ~ #cursor {
    transform: scale(1.5) translate(-50%, -50%);
  }
`;
document.head.appendChild(cursorStyle);


// ===== EFEITO DE FUNDO DINÂMICO (GRADIENTE MUDANDO) =====
let gradPos = 0;
setInterval(() => {
  gradPos += 0.002;
  document.body.style.background = `
    radial-gradient(circle at top,
      rgba(60,100,60,0.9) ${Math.sin(gradPos) * 20 + 40}%,
      #0f150f 80%)
  `;
}, 50);

