export const presets={6:{wolves:2,seer:1,witch:0,villagers:3},9:{wolves:3,seer:1,witch:1,villagers:4},12:{wolves:4,seer:1,witch:1,villagers:6}};
export const phases=[
 {name:'夜间行动',title:'天黑，请闭眼',seconds:60,script:'请所有玩家闭眼。请按主持提示，在自己的手环上完成操作。公共屏不会显示个人行动。'},
 {name:'白天讨论',title:'天亮，请睁眼',seconds:180,script:'请所有玩家睁眼，按座位顺序发言。本页面仅演示主持流程，不生成真实的死亡或查验结果。'},
 {name:'公开投票',title:'请在手环上投票',seconds:45,script:'请在自己的手环上选择投票对象并确认。正式接入后，系统将按当前规则进行结算。'},
 {name:'本轮结束',title:'本轮演示完成',seconds:0,script:'夜间、讨论和投票界面已展示完毕。此演示没有收集真实行动，也不判断游戏胜负。'}
];
export function createState(){return {view:'home',count:9,duration:180,bound:[],ack:false,phase:0,remaining:60,paused:false,round:1,volume:.65};}
export function reduce(s,event){
 const n={...s,bound:[...s.bound]};
 switch(event.type){
 case 'configure': if(s.view!=='home')return s;n.view='setup';break;
 case 'count': if(s.view!=='setup'||!presets[event.value])return s;n.count=event.value;n.bound=[];n.ack=false;break;
 case 'duration': if(s.view!=='setup'||![120,180,300].includes(event.value))return s;n.duration=event.value;break;
 case 'lobby': if(!['setup','check'].includes(s.view))return s;n.view='lobby';n.ack=false;break;
 case 'bind': if(s.view!=='lobby'||event.seat<1||event.seat>s.count||!Number.isInteger(event.seat))return s;if(!n.bound.includes(event.seat))n.bound.push(event.seat);break;
 case 'bindAll': if(s.view!=='lobby')return s;n.bound=Array.from({length:s.count},(_,i)=>i+1);break;
 case 'unbind': if(s.view!=='lobby')return s;n.bound=n.bound.filter(x=>x!==event.seat);break;
 case 'check': if(s.view!=='lobby'||s.bound.length!==s.count)return s;n.view='check';break;
 case 'ack': if(s.view!=='check')return s;n.ack=!!event.value;break;
 case 'start': if(s.view!=='check'||!s.ack||s.bound.length!==s.count)return s;n.view='play';n.phase=0;n.remaining=60;n.paused=false;break;
 case 'tick': if(s.view!=='play'||s.paused||s.remaining<=0)return s;n.remaining--;break;
 case 'pause': if(s.view!=='play')return s;n.paused=!s.paused;break;
 case 'next': if(s.view!=='play'||s.paused)return s;n.phase=Math.min(s.phase+1,3);n.remaining=n.phase===1?s.duration:phases[n.phase].seconds;break;
 case 'again': if(!['play','done'].includes(s.view))return s;n.view='check';n.ack=false;n.phase=0;n.remaining=60;n.paused=false;break;
 case 'finish': if(s.view!=='play')return s;n.view='done';n.paused=true;break;
 case 'backSetup': if(s.view!=='lobby')return s;n.view='setup';break;
 case 'home': return {...createState(),volume:s.volume};
 case 'volume': n.volume=Math.max(0,Math.min(1,event.value));break;
 default:return s;
 }return n;
}
