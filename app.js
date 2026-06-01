const $ = (sel) => document.querySelector(sel);
const app = $('#app');

function byStatus(ids, status){ return ids.filter(id => LESSONS[id]?.status === status).length; }
function lessonLink(id, index){
  const l = LESSONS[id];
  if(!l) return '';
  return `<a class="lesson-row" href="#lesson:${id}">
    <div class="aicon">${l.icon || '📘'}</div>
    <div><h3>${index ? index + '. ' : ''}${l.title}</h3><p>${l.summary || ''}</p></div>
    <span class="badge ${l.status}">${l.status === 'published' ? 'Completed' : 'In Development'}</span>
    <span class="arrow">›</span>
  </a>`;
}
function renderHome(){
  const published = Object.values(LESSONS).filter(l => l.status === 'published').length;
  const total = Object.values(LESSONS).length;
  const pct = Math.round((published/total)*100);
  app.innerHTML = `
    <section class="hero" id="home">
      <div class="hero-main">
        <h1>LEARN.<span>GROW.</span>LEAD.</h1>
        <p>The complete knowledge hub for Kingshot players, alliance officers, rally leaders, and kingdom builders.</p>
        <a href="#lesson:welcome-to-kingshot" class="cta">Start Your Journey <span>➜</span></a>
      </div>
      <aside class="sidebar">
        <div class="box"><h3>Quick Start</h3>${QUICK_START.map(id=>`<a class="quick-item" href="#lesson:${id}"><span>${LESSONS[id].icon}</span><span>${LESSONS[id].title}</span><span>›</span></a>`).join('')}</div>
        <div class="box"><h3>Your Journey</h3><p><b>Published Lessons</b> ${published}/${total}</p><div class="progressbar"><i style="width:${pct}%"></i></div><p><b>${pct}%</b> Academy V1 content available.</p><a href="#academies" class="small-btn">View Academies</a></div>
        <div class="box"><h3>Latest Updates</h3><p>✅ Visual system approved.</p><p>✅ Master Index created.</p><p>🚧 Technical lessons expanding.</p></div>
      </aside>
    </section>
    <section class="section" id="paths"><h2 class="section-title">Choose Your Path</h2><div class="paths">${PATHS.map(p=>`<article class="path-card"><div class="icon">${p.icon}</div><h3>${p.title}</h3><p>${p.subtitle}</p><button onclick="location.hash='path:${p.id}'">Choose Path</button></article>`).join('')}</div></section>
    <section class="section" id="academies"><h2 class="section-title">Academies</h2><div class="academy-grid">${ACADEMIES.map(a=>`<a class="academy-card" href="#academy:${a.id}"><div class="aicon">${a.icon}</div><div><h3>${a.title}</h3><p>${a.subtitle}</p><small>${a.lessons.length} Lessons • ${byStatus(a.lessons,'published')} Published</small></div></a>`).join('')}</div><div class="home-note">Academy principle: <b>Do not memorize temporary answers. Learn systems, make better decisions, and adapt faster.</b></div></section>
  `;
  setActive('home');
}
function renderAcademies(){ renderHome(); setTimeout(()=>document.getElementById('academies')?.scrollIntoView(),0); }
function renderPaths(){ renderHome(); setTimeout(()=>document.getElementById('paths')?.scrollIntoView(),0); }
function renderRoadmap(){
  app.innerHTML = `<section class="academy-page"><div class="academy-banner"><div class="big">🗺️</div><div><h1>KSHOT Academy Master Index</h1><p>Complete structure for the site. Published lessons are available now. In Development lessons already have pages, planned topics, and a place in the Academy.</p></div></div>${ACADEMIES.map(a=>`<section class="section"><h2 class="section-title">${a.icon} ${a.title}</h2><div class="lesson-list">${a.lessons.map((id,i)=>lessonLink(id,i+1)).join('')}</div></section>`).join('')}</section>`;
  setActive('roadmap');
}
function renderAcademy(id){
  const a = ACADEMIES.find(x=>x.id===id); if(!a){renderHome();return;}
  app.innerHTML = `<section class="academy-page"><div class="crumb">Academies › ${a.title}</div><div class="academy-banner"><div class="big">${a.icon}</div><div><h1>${a.title}</h1><p>${a.subtitle}</p><div class="pillrow"><span class="pill">${a.lessons.length} Lessons</span><span class="pill">${byStatus(a.lessons,'published')} Published</span><span class="pill">${byStatus(a.lessons,'development')} In Development</span></div></div></div><div class="lesson-list">${a.lessons.map((id,i)=>lessonLink(id,i+1)).join('')}</div></section>`;
  setActive('academies');
}
function renderPath(id){
  const p = PATHS.find(x=>x.id===id); if(!p){renderHome();return;}
  const recommended = {
    'fighter':['understanding-combat','combat-stats','formations','rally-systems','event-overview'],
    'rally-leader':['rally-systems','combat-stats','hero-investment','bear-hunt','event-preparation'],
    'strategist':['academy-roadmap','event-reports','combat-reports','kvk','diplomacy'],
    'builder':['understanding-alliances','alliance-culture','retention','officer-mindset','kingdom-builder'],
    'leader':['leadership','trust','delegation','burnout','kingdoms']
  }[id] || [];
  app.innerHTML = `<section class="lesson-page"><div class="lesson-banner"><div class="big">${p.icon}</div><div><h1>${p.title}</h1><p>${p.subtitle}</p></div></div><div class="article"><h2>Path Overview</h2><p>${p.body}</p><h2>Recommended Lessons</h2><div class="lesson-list">${recommended.map((lid,i)=>lessonLink(lid,i+1)).join('')}</div></div></section>`;
  setActive('paths');
}
function renderLesson(id){
  const l = LESSONS[id]; if(!l){renderHome();return;}
  const sections = l.content || [];
  const toc = l.status === 'published' ? sections.map((s,i)=>`<a href="#s${i}">${s[0]}</a>`).join('') : `<a>Overview</a><a>Planned Topics</a><a>Status</a>`;
  const body = l.status === 'published' ? sections.map((s,i)=>`<h2 id="s${i}">${s[0]}</h2><p>${s[1]}</p>`).join('') : `<div class="dev-card"><div class="scroll-icon">📜</div><div><h2>This lesson is currently being developed.</h2><p>We already know where this lesson belongs in the Academy. The full content will be expanded with research, testing, player feedback, and practical examples.</p></div></div><h2>Topics Planned</h2><ul class="topics">${(l.topics||[]).map(t=>`<li>${t}</li>`).join('')}</ul><p><a class="notify" href="#roadmap">Back To Roadmap 🔔</a></p>`;
  app.innerHTML = `<section class="lesson-page"><div class="crumb">${l.academy} › ${l.title}</div><div class="lesson-banner"><div class="big">${l.icon || '📘'}</div><div><h1>${l.title}</h1><p>${l.summary || ''}</p><span class="badge ${l.status}">${l.status === 'published' ? 'Completed' : 'In Development'}</span></div></div><div class="lesson-layout"><aside class="toc"><b>In This Lesson</b>${toc}<hr><b>Lesson Status</b><p>${l.status === 'published' ? 'Completed' : 'In Development'}</p></aside><article class="article">${body}</article></div></section>`;
  setActive('');
}
function setActive(route){ document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active',a.dataset.route===route)); }
function router(){
  const hash = location.hash.replace('#','') || 'home';
  if(hash === 'home') return renderHome();
  if(hash === 'academies') return renderAcademies();
  if(hash === 'paths') return renderPaths();
  if(hash === 'roadmap') return renderRoadmap();
  if(hash.startsWith('academy:')) return renderAcademy(hash.split(':')[1]);
  if(hash.startsWith('lesson:')) return renderLesson(hash.split(':')[1]);
  if(hash.startsWith('path:')) return renderPath(hash.split(':')[1]);
  renderHome();
}
window.addEventListener('hashchange', router);
router();

const dlg = $('#searchDialog'), openSearch=$('#openSearch'), searchInput=$('#searchInput'), searchResults=$('#searchResults');
openSearch.addEventListener('click',()=>{dlg.showModal(); setTimeout(()=>searchInput.focus(),50); renderSearch('');});
function renderSearch(q){
  const query = q.trim().toLowerCase();
  const entries = Object.entries(LESSONS).filter(([id,l])=> !query || `${l.title} ${l.academy} ${l.summary} ${(l.topics||[]).join(' ')}`.toLowerCase().includes(query)).slice(0,30);
  searchResults.innerHTML = entries.map(([id,l])=>`<a href="#lesson:${id}" onclick="document.getElementById('searchDialog').close()">${l.icon||'📘'} ${l.title}<br><small>${l.academy} • ${l.status}</small></a>`).join('') || '<p>No lessons found.</p>';
}
searchInput.addEventListener('input',e=>renderSearch(e.target.value));
