(() => {
  function buildPortal() {
    const hub = document.getElementById('hub');
    hub.className = 'portal';
    hub.innerHTML = `
      <header class="p-nav"><div class="p-wrap"><a class="p-brand" href="#"><strong>WAO</strong><span>桌面主持人</span></a><nav class="p-links" aria-label="主导航"><a href="#games">游戏大厅</a><a href="#tools">桌游工具</a><a href="#guide-home">新手指南</a><a href="#resources">规则资源</a></nav><span class="p-state">让故事回到桌面</span></div></header>
      <section class="p-hero"><img class="p-landscape" src="assets/adventure-landscape.svg" alt="群山和月光之间的古堡，山路通向冒险的起点"><div class="p-wrap"><div class="p-hero-copy"><p class="p-eyebrow">GATHER YOUR PARTY · 开启桌面冒险</p><h1><span>围坐一桌，</span><span>走进同一个世界。</span></h1><p class="p-description">选择一场冒险，掷出你的骰子。<br>让 WAO 协助主持、整理线索与掌控节奏，<br>把故事交给在场的每一个人。</p><div class="p-buttons"><button class="p-button" data-play="dnd">开启 5E 冒险　↗</button><a class="p-button p-outline" href="#games">探索全部游戏</a></div></div></div></section>
      <div class="p-caption"><div class="p-wrap"><span>FEATURED · 5E 跑团导演台</span><span>真实骰子 / 面对面交流 / 自由选择</span></div></div>
      <section class="p-shortcuts" aria-label="快捷工具"><div class="p-wrap p-shortcut-grid"><button class="p-shortcut" data-play="dnd"><i>♜</i><span><b>跑团导演台</b><small>设定队伍，选择场景</small></span></button><button class="p-shortcut" data-play="wolf"><i>☾</i><span><b>狼人杀主持台</b><small>入座确认，开启推理</small></span></button><a class="p-shortcut" href="#tools"><i>⚄</i><span><b>实体骰子工具</b><small>录入点数，计算加值</small></span></a><a class="p-shortcut" href="#guide-home"><i>◇</i><span><b>第一次玩？</b><small>从开团准备开始</small></span></a></div></section>
      <section class="p-section p-wrap" id="games"><div class="p-heading"><div><p class="p-eyebrow">CHOOSE YOUR ADVENTURE</p><h2>今晚，玩点什么？</h2><p>从熟悉的推理游戏，到一起探索的奇幻世界。</p></div><label class="p-search">查找游戏<input type="search" placeholder="搜索名称或玩法" id="portalSearch"></label></div><div class="p-filters" aria-label="游戏分类"><button aria-pressed="true" data-filter="all">全部游戏</button><button aria-pressed="false" data-filter="adventure">叙事冒险</button><button aria-pressed="false" data-filter="social">社交推理</button></div><div class="p-games"><article class="p-game" data-category="adventure" data-search="5E 龙与地下城 DND 跑团 叙事 冒险"><div class="p-game-art"></div><div class="p-game-body"><small>叙事冒险 · 主持辅助</small><h3>5E 跑团导演台</h3><p>城镇、荒野、地下城……选择场景，和伙伴一起决定下一步行动。</p><button class="p-button" data-play="dnd">进入导演台　→</button></div></article><article class="p-game" data-category="social" data-search="狼人杀 社交 推理"><div class="p-game-art wolf-art"></div><div class="p-game-body"><small>社交推理 · 对局流程</small><h3>狼人杀</h3><p>确认参与人数，依次入座，在夜晚行动与白天讨论之间寻找真相。</p><button class="p-button" data-play="wolf">进入主持台　→</button></div></article><article class="p-game" data-category="future" data-search="更多游戏 游戏包"><div class="p-game-art future-art">✧</div><div class="p-game-body"><small>游戏包 · 开发计划</small><h3>更多故事，正在路上</h3><p>合作冒险、调查解谜与更多桌游，将逐步加入同一个主持平台。</p><div class="p-future">筹备中</div></div></article></div><p class="p-empty" hidden>没有找到匹配的游戏，试试“5E”或“狼人杀”。</p></section>
      <section class="p-section p-tools" id="tools"><div class="p-wrap"><div class="p-heading"><div><p class="p-eyebrow">LESS SETUP. MORE PLAY.</p><h2>把准备留给工具，把时间留给游戏。</h2><p>桌面常用工具，随手就能打开。</p></div></div><div class="p-tools-grid"><form class="p-tool-box" id="portalDice"><h3>实体骰子 · 点数计算</h3><p>掷完骰子，输入骰面和角色加值。工具计算总值，结果由本次检定规则决定。</p><div class="p-roll-inputs"><label>D20 骰面<input name="face" type="number" min="1" max="20" step="1" placeholder="1—20" required></label><label>角色加值<input name="bonus" type="number" step="1" value="0" required></label></div><button class="p-button" type="submit">计算检定总值</button><output class="p-roll-result" aria-live="polite">等待你的骰子落定。</output></form><div class="p-tool-box"><h3>你的下一场冒险</h3><p>在导演台设置参与人数、游戏风格与场景类型。人物卡提前准备好，正式游戏时与伙伴面对面交流。</p><p>城镇调查 / 荒野旅行 / 地下城探索 / 自定义场景</p><button class="p-button" data-play="dnd">打开冒险设置　→</button></div></div></div></section>
      <section class="p-section p-wrap" id="guide-home"><div class="p-heading"><div><p class="p-eyebrow">YOUR FIRST SESSION</p><h2>第一次冒险，从这里开始。</h2></div></div><div class="p-guide"><article><b>01</b><h3>召集伙伴，准备人物卡</h3><p>开团前用你熟悉的人物卡工具完成角色，带上实体骰子，约定本次游戏的风格。</p></article><article><b>02</b><h3>选一个故事的起点</h3><p>进入 5E 导演台，填写本局人数、选择场景。由玩家共同决定冒险目标。</p></article><article><b>03</b><h3>描述行动，再掷骰子</h3><p>说出角色想做什么。需要检定时，再按主持裁定掷骰、计算结果并继续故事。</p></article></div><div class="p-resources" id="resources"><a href="https://www.dndbeyond.com/how-to-play-dnd" target="_blank" rel="noopener">D&D 官方入门指南 ↗</a><a href="https://www.dndbeyond.com/sources/dnd/free-rules" target="_blank" rel="noopener">官方免费规则（英文）↗</a></div></section>
      <footer class="p-footer"><div class="p-wrap"><div><strong>WAO</strong><p>桌面主持人 · 让故事回到桌面</p></div><p>当前为可交互原型 · 手环连接与 AI 自动主持持续开发中<br>独立桌游项目，与 D&D Beyond 无隶属关系。</p></div></footer>`;
    const musicPanel = document.getElementById('waoSoundToggle')?.parentElement;
    if (musicPanel) {
      const slot = document.createElement('div');
      slot.className = 'p-music-slot';
      hub.querySelector('#tools .p-wrap').append(slot);
      musicPanel.classList.add('p-music-panel');
      slot.append(musicPanel);
      const previousView = window.openView;
      window.openView = function(view) {
        previousView(view);
        (view === 'hub' ? slot : document.body).append(musicPanel);
      };
    }
    hub.addEventListener('click', (event) => {
      const play = event.target.closest('[data-play]');
      if (play) window.openView(play.dataset.play);
    });
    let filter = 'all';
    const search = hub.querySelector('#portalSearch');
    function filterGames() {
      let count = 0;
      hub.querySelectorAll('.p-game').forEach(card => {
        card.hidden = !((filter === 'all' || card.dataset.category === filter) && card.dataset.search.toLowerCase().includes(search.value.trim().toLowerCase()));
        if (!card.hidden) count++;
      });
      hub.querySelector('.p-empty').hidden = count > 0;
    }
    search.addEventListener('input', filterGames);
    hub.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      filter = button.dataset.filter;
      hub.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      filterGames();
    }));
    hub.querySelector('#portalDice').addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget), face = Number(data.get('face')), bonus = Number(data.get('bonus'));
      hub.querySelector('.p-roll-result').textContent = `骰面 ${face} ${bonus < 0 ? '−' : '+'} 加值 ${Math.abs(bonus)} = 总值 ${face + bonus}。`;
    });
  }
  // Run after legacy DOMContentLoaded handlers, without timed home-page replacements.
  if (document.readyState === 'complete') buildPortal(); else window.addEventListener('load', buildPortal, {once: true});
})();
