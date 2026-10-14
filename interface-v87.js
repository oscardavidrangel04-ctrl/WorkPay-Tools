/* Interface only: original arithmetic remains in calculator.js. */
(() => {
  const start = () => {
    const nav = document.querySelector('.site-header .nav');
    let menu = document.querySelector('.site-header .wp-menu');
    // Only collapse navigation once a working, accessible toggle exists.
    if (nav) {
      if (!nav.id) nav.id = 'site-navigation';
      if (!nav.hasAttribute('aria-label')) nav.setAttribute('aria-label', 'Main navigation');
      if (!menu) {
        menu = document.createElement('button');
        menu.type = 'button';
        menu.className = 'wp-menu';
        menu.textContent = 'Menu';
        nav.after(menu);
      }
      menu.setAttribute('aria-controls', nav.id);
      menu.setAttribute('aria-expanded', 'false');
      document.body.classList.add('wp-enhanced');
    }
    const close = () => { nav?.classList.remove('is-open'); menu?.setAttribute('aria-expanded','false'); if(menu) menu.textContent='Menu'; };
    menu?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close menu':'Menu';});
    nav?.addEventListener('click',e=>{if(e.target.closest('a'))close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){close();menu.focus();}});
    matchMedia('(min-width:961px)').addEventListener('change',e=>{if(e.matches)close();});
    const type=document.body.dataset.calculator;
    // Narrow, explicit scenario parameters, checked against each existing input's limits.
    if(type==='salaryHourly'||type==='hourlySalary'){
      const query=new URLSearchParams(location.search);
      const keys=type==='salaryHourly'?['salary','hours','weeks']:['rate','hours','weeks'];
      let loaded=false;
      keys.forEach(key=>{const input=document.getElementById(key),raw=query.get(key);if(!input||raw===null||raw.trim()==='')return;const n=Number(raw);if(!Number.isFinite(n)||n<0||n>1e9)return;if(input.min!==''&&n<Number(input.min))return;if(input.max!==''&&n>Number(input.max))return;input.value=String(n);loaded=true;});
      if(loaded){const f=document.getElementById('salaryFrequency');if(f)f.value='annual';if(typeof calculate==='function')calculate();const note=document.createElement('p');note.className='wp-load-note';note.setAttribute('role','status');note.textContent='Example loaded from the guide. Adjust the hours, weeks or pay to use your own scenario.';const field=document.getElementById(keys[0]);field?.closest('.calc-card,.input-panel')?.prepend(note);}
    }
    document.addEventListener('change',()=>window.validatePayInputs?.());
  };
  if(document.readyState==='complete')start();else document.addEventListener('DOMContentLoaded',start);
})();
