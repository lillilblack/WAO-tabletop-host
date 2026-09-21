(() => {
  const start = () => {
    document.body.insertAdjacentHTML('afterbegin', '<div class="wao-particles" aria-hidden="true"></div>');
    const particles = document.querySelector('.wao-particles');
    for (let i = 0; i < 24; i += 1) {
      const dot = document.createElement('i'); dot.className = 'wao-particle';
      dot.style.cssText = `left:${Math.random()*100}%;bottom:${Math.random()*95}%;--d:${12+Math.random()*16}s;animation-delay:-${Math.random()*18}s`;
      particles.append(dot);
    }
    document.querySelectorAll('.brand').forEach((brand) => { brand.textContent = brand.textContent.replace(/^W ·\s*/, '').replace(/^☾\s*|^♜\s*/, ''); });
    const markInteractive = (root = document) => root.querySelectorAll('button').forEach((button) => {
      if (button.dataset.waoMotion) return;
      button.dataset.waoMotion = '1';
      button.addEventListener('click', () => { button.classList.remove('wao-pulse'); requestAnimationFrame(() => button.classList.add('wao-pulse')); });
    });
    markInteractive();
    const observer = new MutationObserver(() => markInteractive());
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => {
      const status = document.querySelector('#hub .top span:last-child');
      if (status) { status.classList.add('wao-live'); status.textContent = '● 主机在线 · 等待选择游戏'; }
      document.querySelectorAll('#hub .card').forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `游戏包 ${index + 1}`);
      });
    }, 1800);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
