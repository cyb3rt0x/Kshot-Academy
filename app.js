const $ = (s,root=document)=>root.querySelector(s);
const app = $('#app');

function panel(cls='', inner=''){ return `<section class="panel ${cls}">${inner}</section>`; }
function setActive(route){ document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active',a.dataset.route===route)); }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

function setLanguage(code){
  const def = LANGUAGES.find(l=>l.code===code) || LANGUAGES[0];
  localStorage.setItem('kshot_lang', def.code);
  document.documentElement.lang = def.code;
  document.body.dir = def.dir || 'ltr';
  $('#currentLang').textContent = def.label;
  document.querySelectorAll('#languageMenu [data-lang]').forEach(b=>b.classList.toggle('active', b.dataset.lang===def.code));
  applyStaticTranslations();
  route(false);
}

function home(){
  app.innerHTML = `
    ${panel('hero', `<div><h1>KSHOT <span>ACADEMY</span></h1><p>${ui('homeIntro')}</p><div class="search-home"><input id="homeSearch" placeholder="${ui('searchPlaceholder')}"/><button class="kbtn gold" id="homeSearchBtn">${ui('searchButton')}</button></div></div><div class="hero-mascot"><img class="king" src="assets/academy-king.svg" alt="Academy King"/></div>`)}
    <div class="menu-grid">
      <a class="panel menu-card" href="#start"><div class="menu-icon">📖</div><h3>${ui('startHere')}</h3><p>${ui('startHereDesc')}</p></a>
      <a class="panel menu-card" href="#glossary"><div class="menu-icon">📚</div><h3>${ui('glossary')}</h3><p>${ui('glossaryDesc')}</p></a>
      <a class="panel menu-card" href="#knowledge"><div class="menu-icon">❓</div><h3>${ui('knowledge')}</h3><p>${ui('knowledgeDesc')}</p></a>
      <a class="panel menu-card" href="#academy"><div class="menu-icon">🎓</div><h3>${ui('academy')}</h3><p>${ui('academyDesc')}</p></a>
      <a class="panel menu-card" href="#alliance"><div class="menu-icon">🏰</div><h3>${ui('alliance')}</h3><p>${ui('allianceDesc')}</p></a>
    </div>
    ${panel('section', `<h2 class="section-title">${ui('forNewPlayers')}</h2><div class="grid-3"><div class="content-card panel"><h2>${ui('feelingLost')}</h2><p>${ui('feelingLostText')}</p><a class="mini-btn" href="#start">${ui('readStart')}</a></div><div class="content-card panel"><h2>${ui('chatWeird')}</h2><p>${ui('chatWeirdText')}</p><a class="mini-btn green" href="#glossary">${ui('openGlossary')}</a></div><div class="content-card panel"><h2>${ui('needAnswer')}</h2><p>${ui('needAnswerText')}</p><a class="mini-btn gold" href="#knowledge">${ui('openKnowledge')}</a></div></div>`)}
  `;
  $('#homeSearchBtn')?.addEventListener('click',()=>openSearchWith($('#homeSearch').value));
  $('#homeSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter')openSearchWith(e.target.value)});
  setActive('start');
}

function start(){
  app.innerHTML = `${panel('section', `<h1 class="page-title">${ui('startHere')}</h1><p class="notice">${ui('startNotice')}</p>${QUICK_START_SECTIONS.map(([h,t])=>`<div class="content-card panel"><h2>${h}</h2><p>${t}</p></div>`).join('')}<div class="grid-3"><a class="panel menu-card" href="#glossary"><div class="menu-icon">📚</div><h3>${ui('glossary')}</h3><p>${ui('glossaryDesc')}</p></a><a class="panel menu-card" href="#alliance"><div class="menu-icon">🏰</div><h3>${ui('alliance')}</h3><p>${ui('allianceDesc')}</p></a><a class="panel menu-card" href="#academy"><div class="menu-icon">🎓</div><h3>${ui('academy')}</h3><p>${ui('academyDesc')}</p></a></div>` )}`;
  setActive('start');
}

function glossary(){
  app.innerHTML = `${panel('section', `<h1 class="page-title">${ui('glossary')}</h1><p class="notice">${ui('termsNotice')}</p><div class="search-home"><input id="termFilter" placeholder="${ui('filterTerms')}"/><button class="kbtn">${ui('filter')}</button></div><div class="term-grid" id="termGrid"></div>` )}`;
  const render = () => {
    const q = ($('#termFilter').value||'').toLowerCase();
    $('#termGrid').innerHTML = TERMS.filter(([term,desc])=>`${term} ${desc}`.toLowerCase().includes(q)).map(([term,desc])=>`<article class="panel term"><h3>${term}</h3><p>${desc}</p></article>`).join('') || `<p>${ui('noTerm')}</p>`;
  };
  $('#termFilter').addEventListener('input',render); render();
  setActive('glossary');
}

function knowledge(){
  const cats = ['All',...new Set(FAQS.map(f=>f.cat))];
  app.innerHTML = `${panel('section', `<h1 class="page-title">${ui('knowledgeTitle')}</h1><p class="notice">${ui('knowledgeNotice')}</p><div class="filters">${cats.map(c=>`<button class="kbtn ${c==='All'?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div><div class="faq-grid" id="faqGrid"></div>` )}`;
  const render = cat => { $('#faqGrid').innerHTML = FAQS.filter(f=>cat==='All'||f.cat===cat).map(f=>`<article class="panel faq"><span class="badge">${f.cat}</span><h3>${f.q}</h3><p>${f.a}</p></article>`).join(''); };
  document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-cat]').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.cat)}));
  render('All'); setActive('knowledge');
}

function alliance(){
  app.innerHTML = `${panel('section', `<h1 class="page-title">${ui('allianceTitle')}</h1><p class="notice">${ui('allianceNotice')}</p>${ALLIANCE_GUIDE.map(([h,t])=>`<div class="content-card panel"><h2>${h}</h2><p>${t}</p></div>`).join('')}`)}`;
  setActive('alliance');
}

function academy(){
  app.innerHTML = `${panel('section', `<h1 class="page-title">${ui('academy')}</h1><p class="notice">${ui('academyNotice')}</p><div class="academy-grid">${ACADEMIES.map(([id,title,sub,icon,ready])=>`<a class="panel academy-card" href="#academy:${id}"><span class="badge ${ready?'':'dev'}">${ready?ui('v1Ready'):ui('inConstruction')}</span><h3>${icon} ${title}</h3><p>${sub}</p></a>`).join('')}</div>` )}`;
  setActive('academy');
}

function academyDetail(id){
  const a = ACADEMIES.find(x=>x[0]===id); if(!a) return academy();
  const [_,title,sub,icon,ready] = a;
  if(id==='foundation'){
    app.innerHTML = `${panel('section', `<div class="crumb">${ui('academy')} › ${title}</div><h1 class="page-title">${icon} ${title}</h1><p class="notice">${ui('foundationNotice')}</p>${FOUNDATION_LESSONS.map(([h,t],i)=>`<div class="content-card panel"><span class="badge">${ui('lesson')} ${i+1}</span><h2>${h}</h2><p>${t}</p></div>`).join('')}`)}`;
  } else {
    app.innerHTML = `${panel('section', `<div class="crumb">${ui('academy')} › ${title}</div><h1 class="page-title">${icon} ${title}</h1><div class="under-dev"><h2>${ui('underConstructionTitle')}</h2><p>${ui('underConstructionText')}</p><p>${ui('underConstructionText2')}</p></div><div class="grid-2"><a class="panel menu-card" href="#start"><div class="menu-icon">📖</div><h3>${ui('startHere')}</h3><p>${ui('startHereDesc')}</p></a><a class="panel menu-card" href="#knowledge"><div class="menu-icon">❓</div><h3>${ui('knowledge')}</h3><p>${ui('knowledgeDesc')}</p></a></div>` )}`;
  }
  setActive('academy');
}

function route(){
  const h = location.hash.replace('#','') || 'home';
  if(h==='home') return home();
  if(h==='start') return start();
  if(h==='glossary') return glossary();
  if(h==='knowledge') return knowledge();
  if(h==='alliance') return alliance();
  if(h==='academy') return academy();
  if(h.startsWith('academy:')) return academyDetail(h.split(':')[1]);
  home();
}

const dlg = $('#searchDialog'), searchInput=$('#searchInput'), searchResults=$('#searchResults');
function openSearchWith(q=''){ dlg.showModal(); setTimeout(()=>{searchInput.focus();searchInput.value=q;renderSearch(q)},40); }
$('#openSearch').addEventListener('click',()=>openSearchWith(''));
function renderSearch(q){
  q = (q||'').toLowerCase().trim();
  const rows=[];
  TERMS.forEach(([t,d])=>{ if(!q || `${t} ${d}`.toLowerCase().includes(q)) rows.push(`<a href="#glossary" onclick="document.getElementById('searchDialog').close()">📚 <b>${t}</b><br><small>${d}</small></a>`); });
  FAQS.forEach(f=>{ if(!q || `${f.cat} ${f.q} ${f.a}`.toLowerCase().includes(q)) rows.push(`<a href="#knowledge" onclick="document.getElementById('searchDialog').close()">❓ <b>${f.q}</b><br><small>${f.cat}</small></a>`); });
  QUICK_START_SECTIONS.forEach(([h,t])=>{ if(!q || `${h} ${t}`.toLowerCase().includes(q)) rows.push(`<a href="#start" onclick="document.getElementById('searchDialog').close()">📖 <b>${h}</b><br><small>${ui('startHere')}</small></a>`); });
  FOUNDATION_LESSONS.forEach(([h,t])=>{ if(!q || `${h} ${t}`.toLowerCase().includes(q)) rows.push(`<a href="#academy:foundation" onclick="document.getElementById('searchDialog').close()">🏰 <b>${h}</b><br><small>Foundation Academy</small></a>`); });
  searchResults.innerHTML = rows.slice(0,35).join('') || `<p>${ui('noResults')}</p>`;
}
searchInput.addEventListener('input',e=>renderSearch(e.target.value));

function initLanguages(){
  const menu=$('#languageMenu'), toggle=$('#languageToggle');
  const currentCode = localStorage.getItem('kshot_lang') || 'en';
  menu.innerHTML = LANGUAGES.map(l=>`<button class="${l.code===currentCode?'active':''}" data-lang="${l.code}">${l.label}</button>`).join('');
  toggle.addEventListener('click',(e)=>{ e.stopPropagation(); const shouldOpen=menu.hidden; menu.hidden=!shouldOpen; toggle.setAttribute('aria-expanded',String(shouldOpen)); });
  document.addEventListener('click',(e)=>{ if(!menu.hidden && !e.target.closest('.top-actions')){ menu.hidden=true; toggle.setAttribute('aria-expanded','false'); } });
  menu.addEventListener('click',e=>{ const b=e.target.closest('[data-lang]'); if(!b)return; e.stopPropagation(); menu.hidden=true; toggle.setAttribute('aria-expanded','false'); setLanguage(b.dataset.lang); });
  setLanguage(currentCode);
}

window.addEventListener('hashchange',route);
initLanguages();
