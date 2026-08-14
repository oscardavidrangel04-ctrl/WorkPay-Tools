const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(Number.isFinite(n)?n:0);
const num=(id,fallback=0)=>{const e=document.getElementById(id);const v=parseFloat(e?.value);return Number.isFinite(v)?v:fallback};
const val=id=>document.getElementById(id)?.value||'';
const setResult=(headline,rows)=>{document.getElementById('headline').textContent=headline;document.getElementById('breakdown').innerHTML=rows.map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('')};
function elapsedHours(start,end){if(!start||!end)return 0;const [sh,sm]=start.split(':').map(Number),[eh,em]=end.split(':').map(Number);let mins=(eh*60+em)-(sh*60+sm);if(mins<0)mins+=1440;return mins/60}
function calculate(){
 const id=document.body.dataset.calculator;
 if(!id)return;
 if(id==='overtime'||id==='weeklyPay'){
   const rate=num('rate'),hours=num('hours'),threshold=num('threshold',40),mult=num('multiplier',1.5);
   const regH=Math.min(hours,threshold),otH=Math.max(0,hours-threshold),reg=regH*rate,ot=otH*rate*mult;
   setResult(`${money(reg+ot)} / week`,[['Regular hours',regH.toFixed(2)],['Overtime hours',otH.toFixed(2)],['Overtime rate',money(rate*mult)+'/hr'],['Regular pay',money(reg)],['Overtime pay',money(ot)]]);
 } else if(id==='hourlySalary'){
   const rate=num('rate'),hours=num('hours'),weeks=num('weeks',52),weekly=rate*hours,annual=weekly*weeks;
   setResult(`${money(annual)} / year`,[['Weekly pay',money(weekly)],['Monthly average',money(annual/12)],['Annual pay',money(annual)]]);
 } else if(id==='salaryHourly'){
   const salary=num('salary'),hours=Math.max(.01,num('hours',40)),weeks=Math.max(.01,num('weeks',52)),hourly=salary/(hours*weeks);
   setResult(`${money(hourly)} / hour`,[['Weekly average',money(salary/weeks)],['Monthly average',money(salary/12)],['Annual salary',money(salary)]]);
 } else if(id==='timeCard'){
   const elapsed=elapsedHours(val('start'),val('end')),breakMin=Math.max(0,num('break')),net=Math.max(0,elapsed-breakMin/60),rate=num('rate');
   setResult(`${net.toFixed(2)} hours`,[['Elapsed shift',elapsed.toFixed(2)+' hrs'],['Unpaid break',breakMin+' min'],['Net hours',net.toFixed(2)+' hrs'],['Estimated gross pay',money(net*rate)]]);
 } else if(id==='workHours'){
   const shift=num('shift'),breakMin=num('break'),days=num('days'),netShift=Math.max(0,shift-breakMin/60),week=netShift*days;
   setResult(`${week.toFixed(2)} hours / week`,[['Net hours per shift',netShift.toFixed(2)],['Days per week',days.toFixed(0)],['Weekly net hours',week.toFixed(2)]]);
 } else if(id==='biweekly'){
   const mode=val('mode'); let pay,annual;
   if(mode==='salary'){annual=num('salary');pay=annual/26}else{const rate=num('rate'),hours=num('hours');pay=rate*hours*2;annual=pay*26}
   setResult(`${money(pay)} / paycheck`,[['Pay periods per year','26'],['Annualized gross',money(annual)],['Monthly average',money(annual/12)]]);
 } else if(id==='monthlyIncome'||id==='annualIncome'){
   const rate=num('rate'),hours=num('hours'),weeks=num('weeks',52),weekly=rate*hours,annual=weekly*weeks;
   setResult(id==='monthlyIncome'?`${money(annual/12)} / month`:`${money(annual)} / year`,[['Weekly estimate',money(weekly)],['Monthly average',money(annual/12)],['Annual estimate',money(annual)]]);
 } else if(id==='raise'){
   const salary=num('salary'),pct=num('percent'),inc=salary*pct/100,newSalary=salary+inc;
   setResult(`${money(newSalary)} / year`,[['Current salary',money(salary)],['Annual increase',money(inc)],['Monthly increase',money(inc/12)],['Biweekly increase',money(inc/26)]]);
 } else if(id==='pto'){
   const hours=num('hours'),rate=num('rate'),value=hours*rate;
   setResult(money(value),[['PTO hours',hours.toFixed(1)],['Hourly rate',money(rate)+'/hr'],['Equivalent 8-hour days',(hours/8).toFixed(2)]]);
 } else if(id==='shiftDiff'){
   const rate=num('rate'),diff=num('diff'),hours=num('hours'),base=rate*hours,premium=diff*hours;
   setResult(money(base+premium),[['Base pay',money(base)],['Differential pay',money(premium)],['Combined shift rate',money(rate+diff)+'/hr'],['Eligible hours',hours.toFixed(2)]]);
 } else if(id==='doubleTime'){
   const rate=num('rate'),hours=num('hours'),doubleRate=rate*2;
   setResult(money(doubleRate*hours),[['Base hourly rate',money(rate)+'/hr'],['Double-time rate',money(doubleRate)+'/hr'],['Double-time hours',hours.toFixed(2)]]);
 }
}
document.addEventListener('input',calculate);
document.addEventListener('change',e=>{if(e.target.id==='mode'){const salary=document.getElementById('salaryFields'),hourly=document.getElementById('hourlyFields');if(salary&&hourly){salary.hidden=e.target.value!=='salary';hourly.hidden=e.target.value!=='hourly'}}calculate()});
document.addEventListener('DOMContentLoaded',()=>{const m=document.getElementById('mode');if(m)m.dispatchEvent(new Event('change'));calculate()});
