
(()=>{
const tools=window.WORKPAY_TOOLS;
const originalCards=[...document.querySelectorAll('[data-tool-card]')], grid=document.getElementById('catalog-grid'), input=document.getElementById('catalog-query'), suggestions=document.getElementById('search-suggestions'), noResults=document.getElementById('no-results');
let activeFilter='All', showComplete=false;
let cards=[...originalCards];
function closeSuggestions(){suggestions.classList.remove('open');input.setAttribute('aria-expanded','false');}
function selectButtons(selector,selected=null){document.querySelectorAll(selector).forEach(button=>{const active=button===selected;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});}
function clearRecommendations(){selectButtons('[data-intent]');selectButtons('[data-paytype]');}
function selectFilter(value){activeFilter=value;selectButtons('[data-filter]',[...document.querySelectorAll('[data-filter]')].find(button=>button.dataset.filter===value));}
input.setAttribute('role','combobox');input.setAttribute('aria-autocomplete','list');
clearRecommendations();
const originalBySlug=new Map(originalCards.map(c=>{const a=c.querySelector('a[href]');const slug=a.dataset.trackTool||a.getAttribute('href').split('/').pop();a.dataset.trackTool=slug;return[slug,c]}));
function renderCards(list){
  const nodes=list.map(t=>{
    if(originalBySlug.has(t.slug))return originalBySlug.get(t.slug).cloneNode(true);
    const card=document.createElement('article');card.className='catalog-card';card.dataset.toolCard='';card.dataset.category=t.category;card.dataset.search=t.search;
    const link=document.createElement('a');link.className='catalog-card-link';link.href=t.url;link.dataset.trackTool=t.slug;
    const heading=document.createElement('h3');heading.textContent=t.name;
    const desc=document.createElement('p');desc.textContent=t.desc;
    const action=document.createElement('span');action.className='open-link';action.textContent='Open calculator →';
    link.append(heading,desc,action);card.append(link);return card;
  });grid.replaceChildren(...nodes);cards=nodes;
}
const aliases={'time and a half':'overtime','clock in':'time card','clock out':'time card','timesheet':'time card','vacation':'pto','paid time off':'pto','promotion':'raise','yearly':'annual income','every two weeks':'biweekly','night shift':'shift differential'};
function norm(v){let q=v.toLowerCase().trim();Object.entries(aliases).forEach(([a,b])=>{if(q.includes(a))q=q.replaceAll(a,b)});return q}
function track(event,params={}){if(typeof window.gtag==='function')window.gtag('event',event,params);window.dispatchEvent(new CustomEvent('workpay:analytics',{detail:{event,...params}}))}
function apply(matchAny=false){const q=norm(input.value);const list=tools.filter(t=>(activeFilter==='All'||t.category===activeFilter)&&(!q||q.split(/\s+/)[matchAny?'some':'every'](w=>norm(t.search).includes(w)))&&(showComplete||q||activeFilter!=='All'||originalBySlug.has(t.slug)));renderCards(list);noResults.classList.toggle('show',list.length===0);const status=document.getElementById('catalog-count');if(status)status.textContent=list.length+' of '+tools.length+' calculators';}
input.value=new URLSearchParams(location.search).get('q')||'';apply();
function renderSuggestions(){const q=norm(input.value);if(!q){closeSuggestions();return}const match=tools.filter(t=>norm(t.search).includes(q)||q.split(/\s+/).some(w=>norm(t.search).includes(w))).slice(0,5);suggestions.innerHTML=match.map(t=>`<a role="option" href="/calculators/${t.slug}" data-suggest="${t.slug}"><span>${t.name}</span><small>${t.example}</small></a>`).join('');suggestions.classList.toggle('open',!!match.length);input.setAttribute('aria-expanded',String(!!match.length));}
input.addEventListener('input',()=>{clearRecommendations();apply();renderSuggestions()});document.getElementById('catalog-search').addEventListener('submit',e=>{e.preventDefault();selectButtons('[data-paytype]');apply(!!document.querySelector('[data-intent].active'));closeSuggestions();track('catalog_search',{search_term:input.value});const first=cards.find(c=>!c.hidden);if(first)first.scrollIntoView({behavior:'smooth',block:'center'})});
suggestions.addEventListener('click',e=>{const a=e.target.closest('[data-suggest]');if(a){track('catalog_search_result_click',{calculator:a.dataset.suggest});remember(a.dataset.suggest)}});
document.addEventListener('click',e=>{if(!e.target.closest('.catalog-search-wrap'))closeSuggestions();});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{if(document.querySelector('[data-intent].active'))input.value='';showComplete=true;clearRecommendations();selectFilter(b.dataset.filter);closeSuggestions();apply();track('catalog_filter',{filter:activeFilter})}));
document.querySelectorAll('[data-intent]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.intent;clearRecommendations();selectButtons('[data-intent]',b);selectFilter('All');closeSuggestions();apply(true);document.getElementById('all-title').scrollIntoView({behavior:'smooth'});track('intent_click',{intent:b.querySelector('strong').textContent})}));
const paymap={hourly:['overtime-pay','hourly-to-salary','time-card','work-hours','weekly-pay','annual-income','shift-differential','double-time'],salary:['salary-to-hourly','pay-raise','salary-growth','contractor-salary','compensation-package','biweekly-pay','pto-value','monthly-income']};
document.querySelectorAll('[data-paytype]').forEach(b=>b.addEventListener('click',()=>{input.value='';showComplete=true;clearRecommendations();selectButtons('[data-paytype]',b);selectFilter('All');closeSuggestions();renderCards(tools);const set=new Set(paymap[b.dataset.paytype]);cards.forEach(c=>c.hidden=!set.has(c.querySelector('[data-track-tool]').dataset.trackTool));noResults.classList.remove('show');document.getElementById('catalog-count').textContent=cards.filter(c=>!c.hidden).length+' of '+tools.length+' calculators';document.getElementById('all-title').scrollIntoView({behavior:'smooth'});track('pay_type_select',{pay_type:b.dataset.paytype})}));
function remember(slug){try{let a=JSON.parse(localStorage.getItem('workpay_recent_tools')||'[]').filter(x=>x!==slug);a.unshift(slug);localStorage.setItem('workpay_recent_tools',JSON.stringify(a.slice(0,4)))}catch(e){}}
function renderRecent(){let a=[];try{a=JSON.parse(localStorage.getItem('workpay_recent_tools')||'[]')}catch(e){}const box=document.getElementById('recent-grid');box.innerHTML=a.map(s=>{const t=tools.find(x=>x.slug===s);return t?`<a class="recent-link" href="/calculators/${t.slug}" data-recent="${t.slug}">${t.name} →</a>`:''}).join('')}renderRecent();
grid.addEventListener('click',e=>{const a=e.target.closest('[data-track-tool]');if(a){remember(a.dataset.trackTool);track('calculator_open',{calculator:a.dataset.trackTool,source:'catalog_card'});}});document.querySelectorAll('[data-recent]').forEach(a=>a.addEventListener('click',()=>track('calculator_open',{calculator:a.dataset.recent,source:'recent'})));
document.getElementById('clear-search').addEventListener('click',()=>{input.value='';showComplete=true;clearRecommendations();selectFilter('All');closeSuggestions();apply();input.focus()});
input.addEventListener('keydown',e=>{if(e.key==='ArrowDown'&&suggestions.classList.contains('open')){e.preventDefault();suggestions.querySelector('a')?.focus()}if(e.key==='Escape'){e.preventDefault();closeSuggestions()}});suggestions.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const as=[...suggestions.querySelectorAll('a')],i=as.indexOf(document.activeElement),n=e.key==='ArrowDown'?Math.min(i+1,as.length-1):Math.max(i-1,0);as[n]?.focus()}if(e.key==='Escape'){e.preventDefault();closeSuggestions();input.focus()}})
})();
