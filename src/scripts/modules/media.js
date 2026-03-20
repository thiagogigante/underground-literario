export function initMediaOptimizations($, $$) {
  const heroLogo = $('#logo');
  $$('img').forEach((img) => {
    if (img === heroLogo) {
      img.loading = 'eager';
      img.decoding = 'async';
      return;
    }
    if (!img.hasAttribute('loading')) img.loading = 'lazy';
    if (!img.hasAttribute('decoding')) img.decoding = 'async';
  });

  const bgVideo = $('#bg-video');
  if (!bgVideo) return;

  bgVideo.preload = 'none';
  bgVideo.playsInline = true;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bgVideo.pause();
    bgVideo.removeAttribute('autoplay');
  }
}

