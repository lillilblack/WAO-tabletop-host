window.addEventListener('DOMContentLoaded', () => {
  window.setTimeout(() => {
    const root = document.querySelector('#dnd');
    const setup = root?.querySelector('#campaignSetup');
    if (!root || !setup || setup.querySelector('#sceneLibrary')) return;

    const scenes = {
      city: { name: '城镇与阴谋', intro: '在拥挤街巷、酒馆和权力关系中调查、交涉或抉择。', places: ['酒馆', '市场', '议事厅'], icon: '🏙' },
      wild: { name: '荒野旅行', intro: '穿越道路、森林、山地或冰原，管理补给、天气、迷路与营地。', places: ['林间小径', '山口', '临时营地'], icon: '🌲' },
      dungeon: { name: '地下城探索', intro: '探索房间、机关、秘密通道与怪物巢穴；地图和资源同样重要。', places: ['入口大厅', '岔路走廊', '封印石门'], icon: '🗝' },
      ruin: { name: '古代遗迹', intro: '发掘失落文明的谜题、遗物与被遗忘的历史。', places: ['断碑广场', '沉没圣所', '密室'], icon: '🏛' },
      sea: { name: '海上与河流', intro: '让航线、风暴、港口、海盗与船员关系共同推动冒险。', places: ['甲板', '雾中海峡', '陌生港口'], icon: '⚓' },
      stronghold: { name: '要塞与围城', intro: '防守、潜入、谈判或攻破一座拥有明确阵营和防线的据点。', places: ['外墙', '军械库', '指挥室'], icon: '🏰' },
      mystery: { name: '恐怖与调查', intro: '通过线索、气氛和逐步揭开的真相推进；战斗并非唯一答案。', places: ['封闭庄园', '档案室', '地下祭坛'], icon: '🕯' },
      heist: { name: '潜入与劫掠', intro: '先制订计划，再面对警戒、伪装、意外与撤离路线。', places: ['目标外围', '守卫岗', '宝库'], icon: '🗝' },
      court: { name: '宫廷与政治', intro: '阵营、声望、承诺与秘密比单纯战斗更能决定结果。', places: ['宴会厅', '花园密谈', '王座厅'], icon: '👑' },
      frontier: { name: '元素与奇境', intro: '进入火山、浮空岛、魔法荒原等非常规环境，适应规则改变。', places: ['元素裂隙', '浮空遗址', '能量核心'], icon: '✨' },
      planar: { name: '异界旅行', intro: '以陌生世界的规则、当地向导与回归条件构成冒险核心。', places: ['传送门', '异界集市', '边界之地'], icon: '🌌' },
      custom: { name: '自定义场景', intro: '使用你自己的模组、原创剧本或公开规则资料建立场景。', places: ['起始地点', '关键地点', '隐藏地点'], icon: '✦' },
    };

    const library = document.createElement('article');
    library.className = 'card';
    library.id = 'sceneLibrary';
    library.style.minHeight = 'auto';
    library.innerHTML = `<span class="tag">场景库</span><h2>这局从哪里开始？</h2><p>选择一种场景结构，再由玩家决定具体目标和行动。</p><div id="sceneChoices" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px"></div><label style="display:block;margin-top:12px">自定义冒险名称<br><input id="customAdventure" placeholder="例如：失落矿井的救援" style="box-sizing:border-box;width:100%;margin-top:7px;padding:9px;background:#0a1626;color:#fff;border:1px solid #466987;border-radius:6px"></label>`;
    setup.querySelector('.cards').append(library);
    const choices = library.querySelector('#sceneChoices');

    Object.entries(scenes).forEach(([key, scene]) => {
      const button = document.createElement('button');
      button.className = 'event';
      button.style.margin = '0';
      button.dataset.scene = key;
      button.innerHTML = `${scene.icon} ${scene.name}`;
      choices.append(button);
      button.onclick = () => selectScene(key);
    });

    function selectScene(key) {
      const scene = scenes[key];
      window.waoSelectedScene = key;
      window.waoSelectedAdventure = scene.name;
      choices.querySelectorAll('button').forEach((button) => { button.style.outline = ''; });
      choices.querySelector(`[data-scene="${key}"]`).style.outline = '2px solid #e6b55a';
      library.querySelector('p').textContent = scene.intro;
    }

    root.querySelectorAll('.adventure').forEach((button) => {
      button.addEventListener('click', () => { window.waoSelectedScene = 'city'; });
    });

    root.querySelector('#startCampaign').onclick = () => {
      const custom = library.querySelector('#customAdventure').value.trim();
      const selectedKey = custom ? 'custom' : (window.waoSelectedScene || 'city');
      const scene = scenes[selectedKey];
      const name = custom || window.waoSelectedAdventure || scene.name;
      const count = root.querySelector('#customPartyCount')?.value.trim();
      if (!count) { alert('请填写本局实际参与人数'); return; }

      root.querySelector('#campaignSetup').classList.add('hidden');
      root.querySelector('#campaignPlay').classList.remove('hidden');
      root.querySelector('#campaignState').textContent = `${name} · ${count} 位冒险者 · 进行中`;
      root.querySelector('#act').textContent = `${scene.name} · 自由探索`;
      root.querySelector('#place').textContent = `${scene.icon} ${scene.places[0]}`;
      root.querySelector('#sceneTitle').textContent = name;
      root.querySelector('#sceneText').textContent = scene.intro;
      root.querySelector('#memory').textContent = `待建立：任务目标、关键 NPC、已知线索与未解问题。`;
      root.querySelector('#guide').textContent = '由玩家描述第一步行动。WAO 根据场景提示可能的检定、风险与后果，不替玩家决定路线。';
      root.querySelectorAll('.place').forEach((button, index) => {
        button.textContent = scene.places[index] || `地点 ${index + 1}`;
        button.dataset.p = scene.places[index] || `地点 ${index + 1}`;
      });
    };
  }, 1600);
});
