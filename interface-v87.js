/* Interface only: original arithmetic remains in calculator.js. */
(() => {
  const start = () => {
    document.body.classList.add('wp-enhanced');
    const menu = document.querySelector('.wp-menu');
    const nav = document.getElementById('site-navigation');
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
    // Keep invalid visible inputs identifiable without changing the existing formulas.
    const inspect=input=>{
      if(!input.matches('input[type=number]')||!input.getClientRects().length)return;
      let message='';const v=input.validity;
      if(v.badInput)message='Enter a valid number.';else if(v.rangeUnderflow)message='Enter '+input.min+' or more.';else if(v.rangeOverflow)message='Enter '+input.max+' or less.';else if(v.stepMismatch)message='Use increments of '+input.step+'.';
      const id=input.id+'-error';let error=document.getElementById(id);
      if(message){input.setAttribute('aria-invalid','true');if(!error){error=document.createElement('span');error.className='wp-input-error';error.id=id;input.after(error);}error.textContent=message;const ids=new Set((input.getAttribute('aria-describedby')||'').split(' ').filter(Boolean));ids.add(id);input.setAttribute('aria-describedby',[...ids].join(' '));}
      else{input.removeAttribute('aria-invalid');error?.remove();const ids=(input.getAttribute('aria-describedby')||'').split(' ').filter(x=>x&&x!==id);if(ids.length)input.setAttribute('aria-describedby',ids.join(' '));else input.removeAttribute('aria-describedby');}
      const invalid=!!document.querySelector('input[aria-invalid=true]');document.querySelectorAll('.result,.result-panel').forEach(el=>el.classList.toggle('wp-invalid-result',invalid));
    };
    document.addEventListener('input',e=>{if(e.target instanceof HTMLInputElement)inspect(e.target);});
    document.addEventListener('change',()=>{document.querySelectorAll('input[aria-invalid=true]').forEach(i=>{if(!i.getClientRects().length){i.removeAttribute('aria-invalid');document.getElementById(i.id+'-error')?.remove();}});document.querySelectorAll('.result,.result-panel').forEach(el=>el.classList.toggle('wp-invalid-result',!!document.querySelector('input[aria-invalid=true]')));});
  };
  if(document.readyState==='complete')start();else document.addEventListener('DOMContentLoaded',start);
})();
