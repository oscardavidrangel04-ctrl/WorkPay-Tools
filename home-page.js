
(() => {
  const tools = window.WORKPAY_TOOLS;
  const normalize = s => s.toLowerCase().replace(/[^a-z0-9.]+/g,' ').trim();
  const track = (event, detail={}) => {
    const payload = {event, ...detail};
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent('workpay:interaction',{detail:payload}));
  };
  const search = document.getElementById('home-tool-search');
  const results = document.getElementById('home-search-results');
  if (search && results) {
    let activeIndex = -1;
    const score = (tool,q) => {
      const hay = normalize(`${tool.name} ${tool.desc} ${tool.keys}`);
      if (normalize(tool.name).startsWith(q)) return 100;
      if (hay.includes(q)) return 70;
      const words=q.split(' ').filter(Boolean);
      return words.reduce((n,w)=>n+(hay.includes(w)?10:0),0);
    };
    const render = () => {
      const q = normalize(search.value);
      activeIndex=-1;
      if (!q) { results.innerHTML=''; results.classList.remove('open'); search.setAttribute('aria-expanded','false'); return; }
      const matched = tools.map(t=>[t,score(t,q)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x[0]);
      results.innerHTML = matched.length ? matched.map((t,i)=>`<a role="option" id="tool-option-${i}" data-search-result="${t.name}" href="${t.url}"><strong>${t.name}</strong><span>${t.desc}</span><b>→</b></a>`).join('') : '<p>No exact match. <a href="/calculators">Browse all 18 calculators →</a></p>';
      results.classList.add('open'); search.setAttribute('aria-expanded','true');
    };
    search.setAttribute('role','combobox'); search.setAttribute('aria-autocomplete','list'); search.setAttribute('aria-controls','home-search-results'); search.setAttribute('aria-expanded','false'); results.setAttribute('role','listbox');
    search.addEventListener('input',()=>{render(); if(search.value.trim().length>=2) track('calculator_search',{query:search.value.trim().toLowerCase()});});
    search.addEventListener('focus',render);
    search.addEventListener('keydown',e=>{
      const opts=[...results.querySelectorAll('[role="option"]')]; if(!opts.length) return;
      if(e.key==='ArrowDown'){e.preventDefault();activeIndex=(activeIndex+1)%opts.length;opts[activeIndex].focus();}
      if(e.key==='Escape'){results.classList.remove('open');search.setAttribute('aria-expanded','false');}
      if(e.key==='Enter' && opts[0] && activeIndex<0){e.preventDefault();opts[0].click();}
    });
    results.addEventListener('click',e=>{const a=e.target.closest('[data-search-result]');if(a)track('calculator_search_result_click',{calculator:a.dataset.searchResult});});
    document.addEventListener('click',e=>{if(!e.target.closest('.home-search-card')){results.classList.remove('open');search.setAttribute('aria-expanded','false');}});
  }

  const persona = {
    hourly:[
      ['Overtime Pay','Estimate regular and overtime earnings.','/calculators/overtime-pay'],
      ['Hourly to Salary','Convert your wage to annual pay.','/calculators/hourly-to-salary'],
      ['Time Card','Calculate worked hours after breaks.','/calculators/time-card']
    ],
    salary:[
      ['Salary to Hourly','Find an equivalent hourly rate.','/calculators/salary-to-hourly'],
      ['Pay Raise','Compare your current salary with a raise.','/calculators/pay-raise'],
      ['PTO Value','Estimate the wage value of paid leave.','/calculators/pto-value']
    ]
  };
  const personaResults=document.getElementById('home-persona-results');
  document.querySelectorAll('[data-pay-type]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-pay-type]').forEach(b=>{const on=b===btn;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
    const list=persona[btn.dataset.payType]; personaResults.innerHTML=list.map(x=>`<a href="${x[2]}"><strong>${x[0]}</strong><span>${x[1]}</span></a>`).join('');
    track('pay_type_select',{pay_type:btn.dataset.payType});
  }));

  const recentKey='workpay_recent_tools_v1';
  const toolByUrl=Object.fromEntries(tools.map(t=>[t.url,t]));
  const readRecent=()=>{try{return JSON.parse(localStorage.getItem(recentKey)||'[]').filter(u=>toolByUrl[u]).slice(0,4)}catch{return[]}};
  const writeRecent=url=>{try{const next=[url,...readRecent().filter(u=>u!==url)].slice(0,4);localStorage.setItem(recentKey,JSON.stringify(next));}catch{}};
  const renderRecent=()=>{
    const wrap=document.getElementById('recent-tools-wrap'), grid=document.getElementById('recent-tools'); if(!wrap||!grid)return;
    const recent=readRecent(); wrap.hidden=!recent.length; grid.innerHTML=recent.map(u=>{const t=toolByUrl[u];return `<a href="${t.url}"><strong>${t.name}</strong><span>${t.desc}</span><b>Continue →</b></a>`}).join('');
  };
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="/calculators/"]'); if(a && toolByUrl[a.getAttribute('href')]){writeRecent(a.getAttribute('href'));track('calculator_card_click',{path:a.getAttribute('href')});}
    const intent=e.target.closest('[data-track]'); if(intent)track('intent_click',{intent:intent.dataset.track});
    const cat=e.target.closest('.home-category-grid a'); if(cat)track('category_click',{path:cat.getAttribute('href')});
  });
  document.getElementById('clear-recent')?.addEventListener('click',()=>{try{localStorage.removeItem(recentKey)}catch{}renderRecent();track('recent_tools_clear');});
  renderRecent();

  const rate=document.getElementById('quick-rate'), hours=document.getElementById('quick-hours'), total=document.getElementById('quick-total'), detail=document.getElementById('quick-detail');
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
  const calc=()=>{
    const r=Math.max(0,Number(rate.value)||0), h=Math.min(168,Math.max(0,Number(hours.value)||0));
    const regularHours=Math.min(h,40), overtimeHours=Math.max(0,h-40), pay=regularHours*r+overtimeHours*r*1.5;
    total.textContent=money(pay);detail.textContent=`${regularHours.toFixed(2).replace('.00','')} regular hours + ${overtimeHours.toFixed(2).replace('.00','')} overtime hours`;
  };
  let calcTimer;
  [rate,hours].forEach(el=>el&&el.addEventListener('input',()=>{calc();clearTimeout(calcTimer);calcTimer=setTimeout(()=>track('home_overtime_calculation',{rate:Number(rate.value)||0,hours:Number(hours.value)||0}),500);})); calc();
})();
