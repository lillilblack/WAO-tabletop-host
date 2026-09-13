window.addEventListener('DOMContentLoaded', () => {
  window.setTimeout(() => {
    const panel = document.querySelector('#waoSoundToggle')?.parentElement;
    const select = document.querySelector('#waoSoundMode');
    const toggle = document.querySelector('#waoSoundToggle');
    if (!panel || !select || !toggle) return;

    [...panel.querySelectorAll('button')]
      .filter((button) => button.textContent.includes('测试声音'))
      .forEach((button) => button.remove());
    panel.firstElementChild.textContent = '♫ WAO 背景音乐';

    const tracks = {
      lonely: 'assets/music/lonely.mp3',
      years: 'assets/music/those-years.mp3',
      boy: 'assets/music/boy.mp3',
      scenery: 'assets/music/scenery.mp3',
      take: 'assets/music/take-all.mp3',
      you: 'assets/music/its-you.mp3',
      missing: 'assets/music/missing.mp3',
    };
    select.innerHTML = `
      <option value="lonely">孤单心事</option>
      <option value="years">那些年</option>
      <option value="boy">男孩</option>
      <option value="scenery">你就是我的风景</option>
      <option value="take">你要的全带走</option>
      <option value="you">是你</option>
      <option value="missing">我想念</option>`;

    const player = new Audio();
    player.loop = true;
    player.preload = 'metadata';
    let isPlaying = false;

    async function playSelected() {
      player.src = tracks[select.value];
      try {
        await player.play();
        isPlaying = true;
        toggle.textContent = '关闭音乐';
      } catch (error) {
        isPlaying = false;
        toggle.textContent = '点击播放音乐';
        console.error('背景音乐无法播放：', error);
      }
    }

    function stop() {
      player.pause();
      player.currentTime = 0;
      isPlaying = false;
      toggle.textContent = '播放音乐';
    }

    toggle.onclick = () => (isPlaying ? stop() : playSelected());
    select.onchange = () => { if (isPlaying) playSelected(); };
    toggle.textContent = '播放音乐';
  }, 950);
});
