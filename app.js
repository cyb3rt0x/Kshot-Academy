const $ = (sel) => document.querySelector(sel);
const app = $('#app');

const ICONS = {
  foundation:'assets/icons/foundation.svg', player:'assets/icons/player.svg', combat:'assets/icons/combat.svg', hero:'assets/icons/hero.svg', event:'assets/icons/event.svg', alliance:'assets/icons/alliance.svg', officer:'assets/icons/officer.svg', leadership:'assets/icons/leadership.svg', kingdom:'assets/icons/kingdom.svg', builder:'assets/icons/builder.svg',
  fighter:'assets/icons/fighter.svg', 'rally-leader':'assets/icons/rally-leader.svg', strategist:'assets/icons/strategist.svg', leader:'assets/icons/leader.svg', default:'assets/icons/default.svg'
};
const ACADEMY_ICON_MAP = { 'Foundation Academy':'foundation','Player Academy':'player','Combat Academy':'combat','Hero Academy':'hero','Event Academy':'event','Alliance Academy':'alliance','Officer Playbook':'officer','Leadership Academy':'leadership','Kingdom Academy':'kingdom','Kingdom Builder':'builder','Welcome Package':'default' };
const FAQS = [
  {cat:'Beginner', q:'What should I do first in Kingshot?', a:'Join an active alliance, learn the interface, participate in events, and choose a realistic role based on your available time.', related:'Welcome To Kingshot'},
  {cat:'Beginner', q:'Should I chase power as fast as possible?', a:'Power is useful, but it is only a measurement. Your first goal should be learning systems and growing with purpose.', related:'Understanding Progress'},
  {cat:'Beginner', q:'Why should I choose a path?', a:'A path gives direction. It helps you decide whether you want to focus on fighting, rally leadership, strategy, building, or leadership.', related:'Choose Your Path'},
  {cat:'Beginner', q:'What is the most important resource?', a:'Time. Resources can be earned again, but time and attention determine what role you can realistically play.', related:'Understanding Time'},
  {cat:'Heroes', q:'What is the best hero?', a:'There is no permanent best hero. The best hero depends on role, generation, event, skills, investment level, and your objective.', related:'Understanding Hero Evaluation'},
  {cat:'Heroes', q:'How do I decide which hero to invest in?', a:'Ask what role the hero performs, whether it supports your objective, and what opportunity cost the investment creates.', related:'Hero Investment'},
  {cat:'Heroes', q:'Why does this Academy avoid fixed hero lists?', a:'Hero names change. Functions endure. We teach evaluation so players can adapt when new generations arrive.', related:'Understanding Hero Generations'},
  {cat:'Combat', q:'Why did I lose with more power?', a:'Power does not show everything. Hero quality, research, stats, formation, troop composition, buffs, and objectives all matter.', related:'Understanding Combat'},
  {cat:'Combat', q:'What should I read in combat reports?', a:'Look beyond victory or defeat. Identify patterns, weaknesses, hero performance, stats, and formation issues.', related:'Combat Reports'},
  {cat:'Combat', q:'How do rallies work?', a:'A rally concentrates collective strength. Rally leaders provide the foundation, while joiners provide scale, support, and participation.', related:'Rally Systems'},
  {cat:'Events', q:'Why is Bear Hunt important?', a:'Bear Hunt teaches rally mechanics, hero evaluation, joiner value, participation, and report analysis.', related:'Bear Hunt'},
  {cat:'Events', q:'How do I improve Bear Hunt damage?', a:'Improve hero order, joiner decisions, rally participation, reporting analysis, and alliance coordination before chasing tiny ratio optimizations.', related:'Bear Hunt Advanced'},
  {cat:'Events', q:'How should I prepare for KvK?', a:'KvK readiness begins long before the event with account growth, resources, leadership development, communication, and kingdom cooperation.', related:'KvK Preparation'},
  {cat:'Alliance', q:'Why contribute to alliance technology?', a:'Alliance technology benefits everyone and is one of the simplest signs of participation and commitment.', related:'Alliance Quick Start'},
  {cat:'Alliance', q:'Why do alliances remove inactive members?', a:'Inactivity management protects active players and keeps the alliance healthy. Communication prevents misunderstandings.', related:'Inactivity Systems'},
  {cat:'Alliance', q:'How are promotions decided?', a:'Promotions should be based on activity, reliability, willingness, communication, and responsibility, not power alone.', related:'Promotion Systems'},
  {cat:'Leadership', q:'What makes a good officer?', a:'A good officer communicates, supports members, coordinates events, develops others, and sets the example through behavior.', related:'Officer Mindset'},
  {cat:'Leadership', q:'How do leaders avoid burnout?', a:'Share responsibility, delegate, build backup officers, and create systems instead of doing everything personally.', related:'Burnout Prevention'},
  {cat:'Kingdom', q:'What is kingdom health?', a:'Kingdom health is the stability of activity, retention, leadership, communication, diplomacy, and cooperation.', related:'Kingdom Health'},
  {cat:'Kingdom', q:'Why do kingdoms collapse?', a:'Usually through gradual participation loss, leadership drain, alliance collapse, internal conflict, and unresolved problems.', related:'Kingdom Collapse'}
];
function iconForAcademy(a){ return ICONS[ACADEMY_ICON_MAP[a] || 'default']; }
function iconForPath(p){ return ICONS[p] || ICONS.default; }
function byStatus(ids, status){ return ids.filter(id => LESSONS[id]?.status === status).length; }
function statusLabel(status){ return status === 'published' ? t('published') : t('development'); }
function lessonLink(id, index){
  const l = LESSONS[id]; if(!l) return '';
  return `<a class="lesson-row" href="#lesson:${id}">
    <div class="aicon">${l.icon || '📘'}</div>
    <div><h3>${index ? index + '. ' : ''}${l.title}</h3><p>${l.summary || ''}</p></div>
    <span class="badge ${l.status}">${statusLabel(l.status)}</span><span class="arrow">›</span>
  </a>`;
}
function academyIconImg(a){ return `<img src="${iconForAcademy(a.title)}" alt="" />`; }
function academyIconByName(name){ return `<img src="${iconForAcademy(name)}" alt="" />`; }
function renderHome(){
  const published = Object.values(LESSONS).filter(l => l.status === 'published').length;
  const total = Object.values(LESSONS).length;
  const pct = Math.round((published/total)*100);
  app.innerHTML = `
    <section class="hero" id="home">
      <div class="hero-main">
        <div class="hero-copy">
          <h1>LEARN.<span>GROW.</span>LEAD.</h1>
          <p>The complete Kingshot learning hub for players, officers, rally leaders, and kingdom builders.</p>
          <div class="cta-row"><a href="#lesson:welcome-to-kingshot" class="cta">${t('start')} ➜</a><a href="#knowledge" class="cta gold-btn">Knowledge Base</a></div>
          <div class="search-strip"><input id="homeSearch" placeholder="Search heroes, Bear Hunt, VIP, rallies..." /><button class="kbtn" id="homeSearchBtn">Search</button></div>
        </div>
        <div class="hero-mascot"><img src="assets/academy-king.svg" alt="KSHOT Academy King" /></div>
      </div>
      <aside class="sidebar">
        <div class="box"><h3>Quick Start</h3><div class="quick-list">${QUICK_START.map(id=>`<a class="quick-item" href="#lesson:${id}"><span class="qicon">${LESSONS[id].icon}</span><span>${LESSONS[id].title}</span><span>›</span></a>`).join('')}</div></div>
        <div class="box"><h3>Academy Progress</h3><p><b>Published Lessons</b> ${published}/${total}</p><div class="progressbar"><i style="width:${pct}%"></i></div><p><b>${pct}%</b> V1 content available.</p><a href="#roadmap" class="small-btn">Master Index</a></div>
        <div class="box"><h3>Language</h3><p>English is the default. UI translation is ready for 7 global languages. Lesson translations can expand progressively.</p><button class="small-btn green-btn" onclick="document.getElementById('languageToggle').click()">Change Language</button></div>
      </aside>
    </section>
    <section class="section" id="paths"><h2 class="section-title">Choose Your Path</h2><div class="paths">${PATHS.map(p=>`<article class="path-card"><img class="icon-img" src="${iconForPath(p.id)}" alt="" /><h3>${p.title}</h3><p>${p.subtitle}</p><button onclick="location.hash='path:${p.id}'">Choose Path</button></article>`).join('')}</div></section>
    <section class="section" id="academies"><h2 class="section-title">Academies</h2><div class="academy-grid">${ACADEMIES.map(a=>`<a class="academy-card" href="#academy:${a.id}"><img class="icon-img" src="${iconForAcademy(a.title)}" alt="" /><div><h3>${a.title}</h3><p>${a.subtitle}</p><small>${a.lessons.length} Lessons • ${byStatus(a.lessons,'published')} Published</small></div></a>`).join('')}</div><div class="home-note">Academy principle: <b>Do not memorize temporary answers. Learn systems, make better decisions, and adapt faster.</b></div></section>
    <section class="section"><h2 class="section-title">Knowledge Base</h2><div class="faq-grid">${FAQS.slice(0,6).map(f=>faqCard(f)).join('')}</div><p style="text-align:center;margin-top:16px"><a class="small-btn gold-btn" href="#knowledge">Open Full FAQ</a></p></section>
  `;
  const hs = $('#homeSearch'); const hb = $('#homeSearchBtn');
  if(hs && hb){ hb.addEventListener('click',()=>{ openSearchWith(hs.value); }); hs.addEventListener('keydown',e=>{ if(e.key==='Enter') openSearchWith(hs.value); }); }
  setActive('home');
}
function faqCard(f){ return `<article class="faq-card"><h3>${f.q}</h3><p>${f.a}</p><p><small><b>Related:</b> ${f.related}</small></p></article>`; }
function renderKnowledge(){
  const cats = ['All',...new Set(FAQS.map(f=>f.cat))];
  app.innerHTML = `<section class="academy-page"><div class="academy-banner"><div class="big">${academyIconByName('Welcome Package')}</div><div><h1>Knowledge Base</h1><p>Frequently asked questions from players, organized by category.</p></div></div><div class="category-tabs">${cats.map(c=>`<button class="kbtn ${c==='All'?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div><div class="faq-grid" id="faqGrid">${FAQS.map(f=>faqCard(f)).join('')}</div></section>`;
  document.querySelectorAll('[data-cat]').forEach(btn=>btn.addEventListener('click',()=>{ document.querySelectorAll('[data-cat]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const c=btn.dataset.cat; $('#faqGrid').innerHTML = FAQS.filter(f=>c==='All'||f.cat===c).map(f=>faqCard(f)).join(''); }));
  setActive('knowledge');
}
function renderAcademies(){ renderHome(); setTimeout(()=>document.getElementById('academies')?.scrollIntoView(),0); setActive('academies'); }
function renderPaths(){ renderHome(); setTimeout(()=>document.getElementById('paths')?.scrollIntoView(),0); setActive('paths'); }
function renderRoadmap(){
  app.innerHTML = `<section class="academy-page"><div class="academy-banner"><div class="big">${academyIconByName('Welcome Package')}</div><div><h1>KSHOT Academy Master Index</h1><p>Complete site structure. In Development lessons already have pages, planned topics, and a fixed place in the Academy.</p></div></div>${ACADEMIES.map(a=>`<section class="section"><h2 class="section-title">${a.title}</h2><div class="lesson-list">${a.lessons.map((id,i)=>lessonLink(id,i+1)).join('')}</div></section>`).join('')}</section>`;
  setActive('roadmap');
}
function renderAcademy(id){
  const a = ACADEMIES.find(x=>x.id===id); if(!a){renderHome();return;}
  app.innerHTML = `<section class="academy-page"><div class="crumb">Academies › ${a.title}</div><div class="academy-banner"><div class="big">${academyIconImg(a)}</div><div><h1>${a.title}</h1><p>${a.subtitle}</p><div class="pillrow"><span class="pill">${a.lessons.length} Lessons</span><span class="pill">${byStatus(a.lessons,'published')} Published</span><span class="pill">${byStatus(a.lessons,'development')} In Development</span></div></div></div><div class="lesson-list">${a.lessons.map((id,i)=>lessonLink(id,i+1)).join('')}</div></section>`;
  setActive('academies');
}
function renderPath(id){
  const p = PATHS.find(x=>x.id===id); if(!p){renderHome();return;}
  const recommended = {'fighter':['understanding-combat','combat-stats','formations','rally-systems','event-overview'],'rally-leader':['rally-systems','combat-stats','hero-investment','bear-hunt','event-preparation'],'strategist':['academy-roadmap','event-reports','combat-reports','kvk','diplomacy'],'builder':['understanding-alliances','alliance-culture','retention','officer-mindset','kingdom-builder'],'leader':['leadership','trust','delegation','burnout','kingdoms']}[id] || [];
  app.innerHTML = `<section class="lesson-page"><div class="lesson-banner"><div class="big"><img src="${iconForPath(p.id)}" alt="" /></div><div><h1>${p.title}</h1><p>${p.subtitle}</p></div></div><div class="article"><h2>Path Overview</h2><p>${p.body}</p><h2>Recommended Lessons</h2><div class="lesson-list">${recommended.map((lid,i)=>lessonLink(lid,i+1)).join('')}</div></div></section>`;
  setActive('paths');
}
function renderLesson(id){
  const l = LESSONS[id]; if(!l){renderHome();return;}
  const sections = l.content || [];
  const toc = l.status === 'published' ? sections.map((s,i)=>`<a href="#s${i}">${s[0]}</a>`).join('') : `<a>Overview</a><a>Planned Topics</a><a>Status</a>`;
  const body = l.status === 'published' ? sections.map((s,i)=>`<h2 id="s${i}">${s[0]}</h2><p>${s[1]}</p>`).join('') : `<div class="dev-card"><div class="scroll-icon">📜</div><div><h2>This lesson is currently being developed.</h2><p>We already know where this lesson belongs in the Academy. The full content will be expanded with research, testing, player feedback, and practical examples.</p></div></div><h2>Topics Planned</h2><ul class="topics">${(l.topics||[]).map(t=>`<li>${t}</li>`).join('')}</ul><p><a class="notify" href="#roadmap">Back To Roadmap 🔔</a></p>`;
  app.innerHTML = `<section class="lesson-page"><div class="crumb">${l.academy} › ${l.title}</div><div class="lesson-banner"><div class="big">${academyIconByName(l.academy)}</div><div><h1>${l.title}</h1><p>${l.summary || ''}</p><span class="badge ${l.status}">${statusLabel(l.status)}</span></div></div><div class="lesson-layout"><aside class="toc"><b>In This Lesson</b>${toc}<hr><b>Lesson Status</b><p>${statusLabel(l.status)}</p></aside><article class="article">${body}</article></div></section>`;
  setActive('');
}
function setActive(route){ document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active',a.dataset.route===route)); }
function router(){
  const hash = location.hash.replace('#','') || 'home';
  if(hash === 'home') return renderHome();
  if(hash === 'academies') return renderAcademies();
  if(hash === 'paths') return renderPaths();
  if(hash === 'roadmap') return renderRoadmap();
  if(hash === 'knowledge') return renderKnowledge();
  if(hash.startsWith('academy:')) return renderAcademy(hash.split(':')[1]);
  if(hash.startsWith('lesson:')) return renderLesson(hash.split(':')[1]);
  if(hash.startsWith('path:')) return renderPath(hash.split(':')[1]);
  renderHome();
}
window.addEventListener('hashchange', router);

const dlg = $('#searchDialog'), openSearch=$('#openSearch'), searchInput=$('#searchInput'), searchResults=$('#searchResults');
function openSearchWith(q=''){ dlg.showModal(); setTimeout(()=>{searchInput.focus(); searchInput.value=q; renderSearch(q);},50); }
openSearch.addEventListener('click',()=>openSearchWith(''));
function renderSearch(q){
  const query = q.trim().toLowerCase();
  const lessonEntries = Object.entries(LESSONS).filter(([id,l])=> !query || `${l.title} ${l.academy} ${l.summary} ${(l.topics||[]).join(' ')} ${(l.content||[]).flat().join(' ')}`.toLowerCase().includes(query)).slice(0,20);
  const faqEntries = FAQS.filter(f=> !query || `${f.cat} ${f.q} ${f.a} ${f.related}`.toLowerCase().includes(query)).slice(0,12);
  searchResults.innerHTML = [
    ...lessonEntries.map(([id,l])=>`<a href="#lesson:${id}" onclick="document.getElementById('searchDialog').close()">${l.icon||'📘'} ${l.title}<br><small>${l.academy} • ${statusLabel(l.status)}</small></a>`),
    ...faqEntries.map(f=>`<a href="#knowledge" onclick="document.getElementById('searchDialog').close()">❓ ${f.q}<br><small>${f.cat} FAQ • ${f.related}</small></a>`)
  ].join('') || '<p>No results found.</p>';
}
searchInput.addEventListener('input',e=>renderSearch(e.target.value));

function initLanguages(){
  const menu=$('#languageMenu'), toggle=$('#languageToggle'), current=$('#currentLang');
  const lang = localStorage.getItem('kshot_lang') || 'en';
  const def = LANGUAGES.find(l=>l.code===lang) || LANGUAGES[0];
  document.documentElement.lang = def.code; document.body.dir = def.dir; current.textContent = def.label;
  menu.innerHTML = LANGUAGES.map(l=>`<button class="${l.code===def.code?'active':''}" data-lang="${l.code}">${l.label}</button>`).join('');
  toggle.addEventListener('click',()=>{ const open=menu.hidden; menu.hidden=!open; toggle.setAttribute('aria-expanded',String(open)); });
  menu.addEventListener('click',e=>{ const b=e.target.closest('[data-lang]'); if(!b) return; localStorage.setItem('kshot_lang',b.dataset.lang); menu.hidden=true; router(); initLanguages(); });
}
initLanguages();
router();
