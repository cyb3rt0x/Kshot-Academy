const $ = (s,root=document)=>root.querySelector(s);
const app = $('#app');

function panel(cls='', inner=''){ return `<section class="panel ${cls}">${inner}</section>`; }
function card(cls='', inner=''){ return `<article class="panel ${cls}">${inner}</article>`; }
function setActive(route){ document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active',a.dataset.route===route)); }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

function home(){
  app.innerHTML = `
    <div class="language-strip panel">
      <b>🌐 Language</b>
      <button class="kbtn" onclick="document.getElementById('languageToggle').click()">English ▼</button>
    </div>
    ${panel('hero', `<div><h1>KSHOT <span>ACADEMY</span></h1><p>A friendly academy for Kingshot players: start simple, learn the language, answer your questions, then enter the deeper lessons.</p><div class="search-home"><input id="homeSearch" placeholder="Search: Bear, R4, NAP, VIP, gems..."/><button class="kbtn gold" id="homeSearchBtn">Search</button></div></div><div class="hero-mascot"><img class="king" src="assets/academy-king.svg" alt="Academy King"/></div>`)}
    <div class="menu-grid">
      <a class="panel menu-card" href="#start"><div class="menu-icon">📖</div><h3>Start Here</h3><p>New or returning? Begin here.</p></a>
      <a class="panel menu-card" href="#glossary"><div class="menu-icon">📚</div><h3>Glossary</h3><p>Understand game terms fast.</p></a>
      <a class="panel menu-card" href="#knowledge"><div class="menu-icon">❓</div><h3>Knowledge</h3><p>Common questions answered.</p></a>
      <a class="panel menu-card" href="#academy"><div class="menu-icon">🎓</div><h3>Academy</h3><p>Lessons and roadmaps.</p></a>
      <a class="panel menu-card" href="#alliance"><div class="menu-icon">🏰</div><h3>Alliance</h3><p>How to be useful fast.</p></a>
    </div>
    ${panel('section', `<h2 class="section-title">For New Players</h2><div class="grid-3"><div class="content-card panel"><h2>Feeling lost?</h2><p>Good. That means you found the right place. Kingshot has a lot of systems, and nobody understands them all on day one.</p><a class="mini-btn" href="#start">Read Start Here</a></div><div class="content-card panel"><h2>Chat sounds weird?</h2><p>NAP, R4, Bear, Rally, Whale... the Glossary explains the words players use every day.</p><a class="mini-btn green" href="#glossary">Open Glossary</a></div><div class="content-card panel"><h2>Need an answer?</h2><p>Use the Knowledge Base for quick answers about resources, events, alliances, heroes and spending.</p><a class="mini-btn gold" href="#knowledge">Open Knowledge Base</a></div></div>`)}
  `;
  $('#homeSearchBtn')?.addEventListener('click',()=>openSearchWith($('#homeSearch').value));
  $('#homeSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter')openSearchWith(e.target.value)});
  setActive('start');
}

function start(){
  app.innerHTML = `${panel('section', `<h1 class="page-title">Start Here</h1><p class="notice">You do not need to understand everything today. You only need the next useful step.</p>${QUICK_START_SECTIONS.map(([h,t])=>`<div class="content-card panel"><h2>${h}</h2><p>${t}</p></div>`).join('')}<div class="grid-3"><a class="panel menu-card" href="#glossary"><div class="menu-icon">📚</div><h3>Glossary</h3><p>Learn the words.</p></a><a class="panel menu-card" href="#alliance"><div class="menu-icon">🏰</div><h3>Alliance Guide</h3><p>Join the team.</p></a><a class="panel menu-card" href="#academy"><div class="menu-icon">🎓</div><h3>Academy</h3><p>Go deeper.</p></a></div>` )}`;
  setActive('start');
}

function glossary(){
  app.innerHTML = `${panel('section', `<h1 class="page-title">Glossary</h1><p class="notice">Use this when the chat starts sounding like another language.</p><div class="search-home"><input id="termFilter" placeholder="Filter terms: R4, NAP, Bear, whale..."/><button class="kbtn">Filter</button></div><div class="term-grid" id="termGrid"></div>` )}`;
  const render = () => {
    const q = ($('#termFilter').value||'').toLowerCase();
    $('#termGrid').innerHTML = TERMS.filter(([term,desc])=>`${term} ${desc}`.toLowerCase().includes(q)).map(([term,desc])=>`<article class="panel term"><h3>${term}</h3><p>${desc}</p></article>`).join('') || `<p>No term found.</p>`;
  };
  $('#termFilter').addEventListener('input',render); render();
  setActive('glossary');
}

function knowledge(){
  const cats = ['All',...new Set(FAQS.map(f=>f.cat))];
  app.innerHTML = `${panel('section', `<h1 class="page-title">Knowledge Base</h1><p class="notice">Fast answers to questions real players ask every day.</p><div class="filters">${cats.map(c=>`<button class="kbtn ${c==='All'?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div><div class="faq-grid" id="faqGrid"></div>` )}`;
  const render = cat => { $('#faqGrid').innerHTML = FAQS.filter(f=>cat==='All'||f.cat===cat).map(f=>`<article class="panel faq"><span class="badge">${f.cat}</span><h3>${f.q}</h3><p>${f.a}</p></article>`).join(''); };
  document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-cat]').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.cat)}));
  render('All'); setActive('knowledge');
}

function alliance(){
  app.innerHTML = `${panel('section', `<h1 class="page-title">Alliance Guide</h1><p class="notice">Not a rulebook. A friendly guide for becoming useful inside an alliance.</p>${ALLIANCE_GUIDE.map(([h,t])=>`<div class="content-card panel"><h2>${h}</h2><p>${t}</p></div>`).join('')}`)}`;
  setActive('alliance');
}

function academy(){
  app.innerHTML = `${panel('section', `<h1 class="page-title">Academy</h1><p class="notice">Enter the deeper lessons when you are ready. Some academies are published as V1; advanced sections are marked as under construction.</p><div class="academy-grid">${ACADEMIES.map(([id,title,sub,icon,ready])=>`<a class="panel academy-card" href="#academy:${id}"><span class="badge ${ready?'':'dev'}">${ready?'V1 Ready':'🚧 In Construction'}</span><h3>${icon} ${title}</h3><p>${sub}</p></a>`).join('')}</div>` )}`;
  setActive('academy');
}

function academyDetail(id){
  const a = ACADEMIES.find(x=>x[0]===id); if(!a) return academy();
  const [_,title,sub,icon,ready] = a;
  if(id==='foundation'){
    app.innerHTML = `${panel('section', `<div class="crumb">Academy › ${title}</div><h1 class="page-title">${icon} ${title}</h1><p class="notice">Foundation is the first real academy. It teaches the ideas that make every other part of Kingshot easier.</p>${FOUNDATION_LESSONS.map(([h,t],i)=>`<div class="content-card panel"><span class="badge">Lesson ${i+1}</span><h2>${h}</h2><p>${t}</p></div>`).join('')}`)}`;
  } else {
    app.innerHTML = `${panel('section', `<div class="crumb">Academy › ${title}</div><h1 class="page-title">${icon} ${title}</h1><div class="under-dev"><h2>🚧 Academy Under Construction</h2><p>This section already has a fixed place in the KSHOT Academy. It will be expanded with practical examples, reports, screenshots and player feedback.</p><p>For now, use Start Here, Glossary, Knowledge Base and Foundation Academy as your base.</p></div><div class="grid-2"><a class="panel menu-card" href="#start"><div class="menu-icon">📖</div><h3>Start Here</h3><p>Refresh the basics.</p></a><a class="panel menu-card" href="#knowledge"><div class="menu-icon">❓</div><h3>Knowledge</h3><p>Find quick answers.</p></a></div>` )}`;
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
  QUICK_START_SECTIONS.forEach(([h,t])=>{ if(!q || `${h} ${t}`.toLowerCase().includes(q)) rows.push(`<a href="#start" onclick="document.getElementById('searchDialog').close()">📖 <b>${h}</b><br><small>Start Here</small></a>`); });
  FOUNDATION_LESSONS.forEach(([h,t])=>{ if(!q || `${h} ${t}`.toLowerCase().includes(q)) rows.push(`<a href="#academy:foundation" onclick="document.getElementById('searchDialog').close()">🏰 <b>${h}</b><br><small>Foundation Academy</small></a>`); });
  searchResults.innerHTML = rows.slice(0,35).join('') || '<p>No results found.</p>';
}
searchInput.addEventListener('input',e=>renderSearch(e.target.value));

function initLanguages(){
  const menu=$('#languageMenu'), toggle=$('#languageToggle'), current=$('#currentLang');
  const lang = localStorage.getItem('kshot_lang') || 'en';
  const def = LANGUAGES.find(l=>l.code===lang) || LANGUAGES[0];
  document.documentElement.lang = def.code; document.body.dir = def.dir; current.textContent = def.label;
  menu.innerHTML = LANGUAGES.map(l=>`<button class="${l.code===def.code?'active':''}" data-lang="${l.code}">${l.label}</button>`).join('');
  toggle.addEventListener('click',()=>{ const open=menu.hidden; menu.hidden=!open; toggle.setAttribute('aria-expanded',String(open)); });
  menu.addEventListener('click',e=>{ const b=e.target.closest('[data-lang]'); if(!b)return; localStorage.setItem('kshot_lang',b.dataset.lang); location.reload(); });
}

window.addEventListener('hashchange',route); initLanguages(); route();
