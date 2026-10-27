
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
    const closeSuggestions = (restoreFocus=false) => {
      // Focusing the input renders suggestions; close after restoring focus.
      if (restoreFocus) search.focus();
      results.classList.remove('open');
      search.setAttribute('aria-expanded','false');
      activeIndex=-1;
    };
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
      results.innerHTML = matched.length ? matched.map((t,i)=>`<a role="option" id="tool-option-${i}" data-search-result="${t.name}" href="${t.url}"><strong>${t.name}</strong><span>${t.desc}</span><b>→</b></a>`).join('') : '<p>No exact match. <a href="/calculators">Browse all calculators →</a></p>';
      results.classList.add('open'); search.setAttribute('aria-expanded','true');
    };
    search.setAttribute('role','combobox'); search.setAttribute('aria-autocomplete','list'); search.setAttribute('aria-controls','home-search-results'); search.setAttribute('aria-expanded','false'); results.setAttribute('role','listbox');
    search.addEventListener('input',()=>{render(); if(search.value.trim().length>=2) track('calculator_search',{query:search.value.trim().toLowerCase()});});
    search.addEventListener('focus',render);
    search.addEventListener('keydown',e=>{
      if(e.key==='Escape'){e.preventDefault();closeSuggestions();return;}
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){
        e.preventDefault();
        if(!results.classList.contains('open'))render();
        const opts=[...results.querySelectorAll('[role="option"]')];
        if(opts.length){activeIndex=e.key==='ArrowDown'?0:opts.length-1;opts[activeIndex].focus();}
        return;
      }
      const first=results.querySelector('[role="option"]');
      if(e.key==='Enter'&&first&&results.classList.contains('open')){e.preventDefault();first.click();}
    });
    results.addEventListener('keydown',e=>{
      if(e.key==='Escape'){e.preventDefault();closeSuggestions(true);return;}
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){
        e.preventDefault();
        const opts=[...results.querySelectorAll('[role="option"]')],index=opts.indexOf(document.activeElement);
        if(!opts.length)return;
        activeIndex=e.key==='ArrowDown'?Math.min(index+1,opts.length-1):Math.max(index-1,0);
        opts[activeIndex].focus();
      }
    });
    results.addEventListener('click',e=>{const a=e.target.closest('[data-search-result]');if(a)track('calculator_search_result_click',{calculator:a.dataset.searchResult});});
    document.addEventListener('click',e=>{if(!e.target.closest('.home-search-card'))closeSuggestions();});
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
    let invalid=false;
    for(const input of [rate,hours]){
      const value=Number(input.value);
      const message=input.value.trim()===''||!Number.isFinite(value)?'Enter a number.':input.validity.rangeUnderflow?'Enter '+input.min+' or more.':input.validity.rangeOverflow?'Enter '+input.max+' or less.':input.validity.stepMismatch?'Use increments of '+(input.step||'1')+'.':'';
      const errorId=input.id+'-input-error';
      let error=document.getElementById(errorId);
      const ids=new Set((input.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean));
      if(message){
        invalid=true;input.setAttribute('aria-invalid','true');
        if(!error){error=document.createElement('span');error.id=errorId;error.className='wp-input-error';error.style.display='block';(input.closest('.input-shell')||input).after(error);}
        error.textContent=message;ids.add(errorId);
      }else{input.removeAttribute('aria-invalid');if(error)error.remove();ids.delete(errorId);}
      if(ids.size)input.setAttribute('aria-describedby',[...ids].join(' '));else input.removeAttribute('aria-describedby');
    }
    if(invalid){total.textContent='Check inputs';detail.textContent='Correct the highlighted inputs to estimate weekly gross pay.';return false;}
    const r=Number(rate.value),h=Number(hours.value);
    const regularHours=Math.min(h,40),overtimeHours=Math.max(0,h-40),pay=regularHours*r+overtimeHours*r*1.5;
    if(!Number.isFinite(pay)){total.textContent='Result unavailable';detail.textContent='The entered amounts are too large to calculate. Check your hourly rate.';return false;}
    total.textContent=money(pay);detail.textContent=regularHours.toFixed(2).replace('.00','')+' regular hours + '+overtimeHours.toFixed(2).replace('.00','')+' overtime hours';
    return true;
  };
  let calcTimer;
  [rate,hours].forEach(el=>el&&el.addEventListener('input',()=>{clearTimeout(calcTimer);if(calc())calcTimer=setTimeout(()=>track('home_overtime_calculation',{rate:Number(rate.value),hours:Number(hours.value)}),500);}));calc();
})();
