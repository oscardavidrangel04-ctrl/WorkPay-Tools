const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(Number.isFinite(n)?n:0);
const num=(id,fallback=0)=>{const e=document.getElementById(id);const v=parseFloat(e?.value);return Number.isFinite(v)?v:fallback};
const val=id=>document.getElementById(id)?.value||'';
const setResult=(headline,rows)=>{document.getElementById('headline').textContent=headline;document.getElementById('breakdown').innerHTML=rows.map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('')};
function elapsedHours(start,end){if(!start||!end)return 0;const [sh,sm]=start.split(':').map(Number),[eh,em]=end.split(':').map(Number);let mins=(eh*60+em)-(sh*60+sm);if(mins<0)mins+=1440;return mins/60}
function calculate(){
 const id=document.body.dataset.calculator;
 if(!id)return;
 if(id==='overtime'||id==='weeklyPay'){
   const rate=Math.max(0,num('rate')),hours=Math.max(0,num('hours')),threshold=Math.max(0,num('threshold',40)),mult=Math.max(1,num('multiplier',1.5));
   if(id==='overtime'){
     const mode=document.body.dataset.overtimeMode||'basic', bonus=Math.max(0,num('bonus'));
     const r=calculateOvertimeModel(rate,hours,threshold,mult,mode,bonus);
     const rows=[['Calculation mode',mode==='advanced'?'Advanced regular-rate estimate':'Basic hourly estimate'],['Regular hourly rate',money(rate)+'/hr'],['Regular hours',r.regularHours.toFixed(2)],['Overtime hours',r.overtimeHours.toFixed(2)],['Overtime rate',money(r.overtimeRate)+'/hr']];
     if(mode==='advanced'){rows.push(['Eligible additional compensation',money(bonus)],['Estimated regular rate',money(r.regularRate)+'/hr']);}
     rows.push(['Regular / straight-time pay',money(r.straightTime)],['Overtime premium',money(r.overtimePremium)],['Total gross pay',money(r.total)]);
     setResult(`${money(r.total)} / week`,rows);
     updateOvertimeComparison(r); updateOvertimeExtras(rate,threshold,mult,mode,bonus); updateScenarioComparison(rate,threshold,mult,mode,bonus,r); updatePremiumTracker(r); updateMultiRateSummary(); updateOvertimeGuidance(rate,hours,threshold,mult,mode,bonus,r); updateResultInsight(rate,hours,threshold,mult,mode,r); saveOvertimeState();
   } else {
     const regH=Math.min(hours,threshold),otH=Math.max(0,hours-threshold),reg=regH*rate,ot=otH*rate*mult;
     setResult(`${money(reg+ot)} / week`,[['Regular hourly rate',money(rate)+'/hr'],['Regular hours',regH.toFixed(2)],['Overtime hours',otH.toFixed(2)],['Overtime rate',money(rate*mult)+'/hr'],['Regular pay',money(reg)],['Overtime pay',money(ot)],['Total gross pay',money(reg+ot)]]);
   }
 } else if(id==='hourlySalary'){
   const rate=Math.max(0,num('rate')),hours=Math.max(0,num('hours')),weeks=Math.min(53,Math.max(0,num('weeks',52))),weekly=rate*hours,annual=weekly*weeks;
   setResult(`${money(annual)} / year`,[['Hourly rate',money(rate)+'/hr'],['Paid hours / week',hours.toFixed(2)],['Paid weeks / year',weeks.toFixed(0)],['Weekly gross',money(weekly)],['Biweekly average',money(annual/26)],['Semimonthly average',money(annual/24)],['Monthly average',money(annual/12)],['Annual gross pay',money(annual)]]);
   updateHourlySalaryPage(rate,hours,weeks,weekly,annual);
 } else if(id==='salaryHourly'){
   const salary=Math.max(0,num('salary')),hours=Math.max(.01,num('hours',40)),weeks=Math.max(.01,num('weeks',52)),annualHours=hours*weeks,hourly=salary/annualHours;
   setResult(`${money(hourly)} / hour`,[
     ['Annual salary',money(salary)],
     ['Annual work hours',annualHours.toLocaleString('en-US',{maximumFractionDigits:2})+' hrs'],
     ['Weekly average',money(salary/weeks)],
     ['Biweekly average',money(salary/26)],
     ['Semimonthly average',money(salary/24)],
     ['Monthly average',money(salary/12)],
     ['8-hour day equivalent',money(hourly*8)],
     ['Hourly equivalent',money(hourly)+'/hr']
   ]);
   const eq=document.getElementById('salaryHourlyEquation');
   if(eq)eq.textContent=`${money(salary)} ÷ ${annualHours.toLocaleString('en-US',{maximumFractionDigits:2})} annual work hours = ${money(hourly)} per hour.`;
 } else if(id==='timeCard'){
   const elapsed=elapsedHours(val('start'),val('end')),breakMin=Math.max(0,num('break')),net=Math.max(0,elapsed-breakMin/60),rate=num('rate');
   setResult(`${net.toFixed(2)} hours`,[['Elapsed shift',elapsed.toFixed(2)+' hrs'],['Unpaid break',breakMin+' min'],['Net hours',net.toFixed(2)+' hrs'],['Estimated gross pay',money(net*rate)]]);
 } else if(id==='timeCardWeekly'){
   calculateWeeklyTimeCard();
 } else if(id==='semimonthly'){
   const mode=val('mode'); let pay=0,annual=0;
   if(mode==='salary'){
     annual=Math.max(0,num('salary'));
     pay=annual/24;
   }else{
     const rate=Math.max(0,num('rate')),hours=Math.max(0,num('hours',40)),weeks=Math.max(0,num('weeks',52));
     annual=rate*hours*weeks;
     pay=annual/24;
   }
   setResult(`${money(pay)} / semimonthly paycheck`,[
     ['Pay periods per year','24'],
     ['Annualized gross',money(annual)],
     ['Monthly average',money(annual/12)],
     ['Biweekly comparison (26)',money(annual/26)]
   ]);
 } else if(id==='hoursDecimal'){
   const h=Math.max(0,num('hoursWhole')),m=Math.min(59,Math.max(0,num('minutesPart'))),decimal=h+m/60;
   setResult(`${decimal.toFixed(2)} decimal hours`,[
     ['Hours',h.toFixed(0)],
     ['Minutes',m.toFixed(0)],
     ['Decimal hours',decimal.toFixed(4)],
     ['Payroll hundredths',decimal.toFixed(2)]
   ]);
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
document.addEventListener('DOMContentLoaded',()=>{const m=document.getElementById('mode');if(m)m.dispatchEvent(new Event('change'));if(document.body.dataset.calculator==='overtime')initOvertimePage();if(document.body.dataset.calculator==='hourlySalary')initHourlySalaryPage();if(document.body.dataset.calculator==='timeCardWeekly')initWeeklyTimeCard();calculate()});

document.addEventListener('click',async e=>{
 if(e.target.matches('[data-print-result]')){window.print();return}
 if(e.target.matches('[data-overtime-mode]')){setOvertimeMode(e.target.dataset.overtimeMode);calculate();return}
 if(e.target.matches('[data-hours-preset]')){const h=document.getElementById('hours');if(h){h.value=e.target.dataset.hoursPreset;calculate()}return}
 if(e.target.matches('[data-rate-preset]')){const rate=document.getElementById('rate'),hours=document.getElementById('hours'),threshold=document.getElementById('threshold'),mult=document.getElementById('multiplier');if(rate)rate.value=e.target.dataset.ratePreset;if(hours)hours.value=45;if(threshold)threshold.value=40;if(mult)mult.value=1.5;setOvertimeMode('basic');calculate();document.getElementById('calculator')?.scrollIntoView({behavior:'smooth',block:'start'});return}
 if(e.target.matches('[data-result-view]')){setResultView(e.target.dataset.resultView);return}
 if(e.target.matches('[data-use-daily-total]')){const h=document.getElementById('hours');if(h){h.value=getDailyTotal().toFixed(2);calculate()}return}
 if(e.target.matches('[data-use-multi-rate]')){applyMultiRateWorkweek();return}
 if(e.target.matches('[data-reset-overtime]')){resetOvertime();return}
 if(e.target.matches('[data-share-result]')){const url=buildOvertimeShareUrl();try{await navigator.clipboard.writeText(url);setShareStatus('Share link copied.')}catch{setShareStatus('Copy this URL from your address bar: '+url)}return}
 if(e.target.matches('[data-hourly-hours]')){const el=document.getElementById('hours');if(el){el.value=e.target.dataset.hourlyHours;calculate();syncHourlyPresets()}return}
 if(e.target.matches('[data-hourly-weeks]')){const el=document.getElementById('weeks');if(el){el.value=e.target.dataset.hourlyWeeks;calculate();syncHourlyPresets()}return}
 if(e.target.matches('[data-hourly-rate]')){const rate=document.getElementById('rate'),hours=document.getElementById('hours'),weeks=document.getElementById('weeks');if(rate)rate.value=e.target.dataset.hourlyRate;if(hours)hours.value=40;if(weeks)weeks.value=52;calculate();syncHourlyPresets();document.getElementById('calculator')?.scrollIntoView({behavior:'smooth',block:'start'});return}
 if(e.target.matches('[data-focus-hourly-result]')){document.getElementById('hourlyResultPanel')?.scrollIntoView({behavior:'smooth',block:'start'});return}
 if(e.target.matches('[data-reset-hourly]')){resetHourlySalary();return}
 if(e.target.matches('[data-share-hourly]')){const url=buildHourlySalaryShareUrl();try{await navigator.clipboard.writeText(url);setHourlyShareStatus('Share link copied.')}catch{setHourlyShareStatus('Copy this URL from your address bar: '+url)}return}
 if(e.target.matches('[data-salary-preset]')){const s=document.getElementById('salary');if(s){s.value=e.target.dataset.salaryPreset;calculate();document.getElementById('calculator')?.scrollIntoView({behavior:'smooth',block:'start'})}return}
 if(e.target.matches('[data-timecard-reset]')){resetWeeklyTimeCard();return}
 if(e.target.matches('[data-timecard-preset]')){loadStandardTimeCard();return}
 if(e.target.matches('[data-export-timecard]')){exportWeeklyTimeCard();return}
 if(e.target.matches('[data-copy-result]')){
   const headline=document.getElementById('headline')?.textContent||'';
   const rows=[...document.querySelectorAll('#breakdown div')].map(x=>x.innerText.replace(/\n/g,': ')).join('\n');
   const text=`WorkPay Tools estimate\n${headline}\n${rows}`;
   try{await navigator.clipboard.writeText(text);e.target.textContent='Copied';setTimeout(()=>e.target.textContent='Copy result',1400)}catch{}
 }
});


const TIMECARD_DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function initWeeklyTimeCard(){
 const tbody=document.getElementById('timecardRows'); if(!tbody)return;
 if(tbody.children.length)return;
 tbody.innerHTML=TIMECARD_DAYS.map((day,i)=>{
   const on=i<5;
   return `<tr data-tc-row="${i}">
     <th scope="row">${day}</th>
     <td><input aria-label="${day} clock in" class="tc-input" id="tcStart${i}" type="time" value="${on?'09:00':''}"></td>
     <td><input aria-label="${day} clock out" class="tc-input" id="tcEnd${i}" type="time" value="${on?'17:30':''}"></td>
     <td><input aria-label="${day} unpaid break minutes" class="tc-break" id="tcBreak${i}" type="number" min="0" step="5" value="${on?'30':'0'}"></td>
     <td><strong id="tcPaid${i}">${on?'8.00':'0.00'} h</strong></td>
   </tr>`;
 }).join('');
}

function getWeeklyTimeCard(){
 let total=0,workedDays=0,breakMinutes=0;
 const rows=TIMECARD_DAYS.map((day,i)=>{
   const start=val('tcStart'+i),end=val('tcEnd'+i),br=Math.max(0,num('tcBreak'+i));
   const elapsed=(start&&end)?elapsedHours(start,end):0;
   const net=(start&&end)?Math.max(0,elapsed-br/60):0;
   const paid=document.getElementById('tcPaid'+i); if(paid)paid.textContent=net.toFixed(2)+' h';
   if(start&&end){workedDays++;breakMinutes+=br}
   total+=net;
   return {day,start,end,breakMinutes:br,elapsed,net};
 });
 return {rows,total,workedDays,breakMinutes};
}

function hoursMinutes(decimal){
 const totalMins=Math.round(decimal*60),h=Math.floor(totalMins/60),m=totalMins%60;
 return `${h}h ${String(m).padStart(2,'0')}m`;
}

function calculateWeeklyTimeCard(){
 initWeeklyTimeCard();
 const data=getWeeklyTimeCard(),rate=Math.max(0,num('rate')),threshold=Math.max(0,num('tcThreshold',40)),mult=Math.max(1,num('tcMultiplier',1.5));
 const regH=Math.min(data.total,threshold),otH=Math.max(0,data.total-threshold),regularPay=regH*rate,otPay=otH*rate*mult,totalPay=regularPay+otPay;
 setResult(`${hoursMinutes(data.total)} (${data.total.toFixed(2)} hrs)`,[
   ['Worked days',String(data.workedDays)],
   ['Unpaid breaks',data.breakMinutes+' min'],
   ['Regular hours',regH.toFixed(2)+' hrs'],
   ['Overtime hours',otH.toFixed(2)+' hrs'],
   ['Decimal hours',data.total.toFixed(2)],
   ['Regular pay',money(regularPay)],
   ['Overtime pay',money(otPay)],
   ['Estimated gross pay',money(totalPay)]
 ]);
}

function resetWeeklyTimeCard(){
 TIMECARD_DAYS.forEach((_,i)=>{
   const s=document.getElementById('tcStart'+i),e=document.getElementById('tcEnd'+i),b=document.getElementById('tcBreak'+i);
   if(s)s.value=''; if(e)e.value=''; if(b)b.value='0';
 });
 const r=document.getElementById('rate'); if(r)r.value='20';
 const t=document.getElementById('tcThreshold'); if(t)t.value='40';
 const m=document.getElementById('tcMultiplier'); if(m)m.value='1.5';
 calculate();
}

function loadStandardTimeCard(){
 TIMECARD_DAYS.forEach((_,i)=>{
   const s=document.getElementById('tcStart'+i),e=document.getElementById('tcEnd'+i),b=document.getElementById('tcBreak'+i);
   const on=i<5;
   if(s)s.value=on?'09:00':''; if(e)e.value=on?'17:30':''; if(b)b.value=on?'30':'0';
 });
 calculate();
}

function exportWeeklyTimeCard(){
 const d=getWeeklyTimeCard(),rate=Math.max(0,num('rate'));
 const lines=[['Day','Clock in','Clock out','Unpaid break (min)','Paid hours']];
 d.rows.forEach(r=>lines.push([r.day,r.start,r.end,r.breakMinutes,r.net.toFixed(2)]));
 lines.push([]);
 lines.push(['Weekly total','','','',d.total.toFixed(2)]);
 lines.push(['Hourly rate','','','',rate.toFixed(2)]);
 const csv=lines.map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='workpay-time-card.csv';a.click();URL.revokeObjectURL(url);
}

function calculateOvertimeModel(rate,hours,threshold,mult,mode='basic',bonus=0){
 const safeRate=Math.max(0,rate),safeHours=Math.max(0,hours),safeThreshold=Math.max(0,threshold),safeMult=Math.max(1,mult),safeBonus=Math.max(0,bonus);
 const regularHours=Math.min(safeHours,safeThreshold),overtimeHours=Math.max(0,safeHours-safeThreshold);
 if(mode==='advanced' && safeHours>0){
   const baseWages=safeRate*safeHours,straightTime=baseWages+safeBonus,regularRate=straightTime/safeHours;
   const overtimePremium=overtimeHours*regularRate*Math.max(0,safeMult-1),overtimeRate=regularRate*safeMult,total=straightTime+overtimePremium;
   return {regularHours,overtimeHours,regularRate,overtimeRate,straightTime,overtimePremium,total};
 }
 const regularPay=regularHours*safeRate,overtimePay=overtimeHours*safeRate*safeMult,total=regularPay+overtimePay;
 const straightTime=safeRate*safeHours,overtimePremium=Math.max(0,total-straightTime);
 return {regularHours,overtimeHours,regularRate:safeRate,overtimeRate:safeRate*safeMult,straightTime,overtimePremium,total};
}
function overtimeAtHours(rate,hours,threshold,mult,mode='basic',bonus=0){
 const r=calculateOvertimeModel(rate,hours,threshold,mult,mode,bonus);
 return {regularHours:r.regularHours,overtimeHours:r.overtimeHours,regularPay:r.straightTime-r.overtimeHours*rate,overtimePay:r.total-(r.straightTime-r.overtimeHours*rate),total:r.total};
}
function updateOvertimeComparison(r){
 const straight=document.getElementById('straightTimePay'),withOt=document.getElementById('withOvertimePay'),premium=document.getElementById('overtimePremium');
 if(straight)straight.textContent=money(r.straightTime);if(withOt)withOt.textContent=money(r.total);if(premium)premium.textContent='+'+money(r.overtimePremium);
}
function updateOvertimeExtras(rate,threshold,mult,mode='basic',bonus=0){
 const tbody=document.getElementById('overtimeExamples');
 if(tbody){
   const raw=[threshold,threshold+5,threshold+10,threshold+15,threshold+20];
   const hoursList=[...new Set(raw.map(x=>Math.max(0,Math.round(x*100)/100)))];
   tbody.innerHTML=hoursList.map(hours=>{const r=calculateOvertimeModel(rate,hours,threshold,mult,mode,bonus);return `<tr><td>${hours.toFixed(2)}</td><td>${money(r.straightTime)}</td><td>${money(r.overtimePremium)}</td><td><strong>${money(r.total)}</strong></td></tr>`}).join('');
 }
 drawOvertimeChart(rate,threshold,mult,mode,bonus);
}
function drawOvertimeChart(rate,threshold,mult,mode='basic',bonus=0){
 const canvas=document.getElementById('overtimeChart'); if(!canvas)return;
 const ctx=canvas.getContext('2d'); if(!ctx)return;
 const dpr=Math.max(1,window.devicePixelRatio||1),cssW=Math.max(280,canvas.parentElement?.clientWidth||760),cssH=300;
 canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);canvas.style.width=cssW+'px';canvas.style.height=cssH+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
 ctx.clearRect(0,0,cssW,cssH);
 const start=Math.max(0,threshold),points=Array.from({length:9},(_,i)=>start+i*2.5),values=points.map(h=>calculateOvertimeModel(rate,h,threshold,mult,mode,bonus).total),max=Math.max(1,...values);
 const pad={l:62,r:20,t:20,b:42},w=cssW-pad.l-pad.r,h=cssH-pad.t-pad.b;
 ctx.strokeStyle='#dbe5f0';ctx.lineWidth=1;ctx.fillStyle='#64748b';ctx.font='12px system-ui';ctx.textAlign='right';ctx.textBaseline='middle';
 for(let i=0;i<=4;i++){const y=pad.t+h-(h*i/4),v=max*i/4;ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(cssW-pad.r,y);ctx.stroke();ctx.fillText('$'+Math.round(v).toLocaleString('en-US'),pad.l-8,y)}
 ctx.textAlign='center';ctx.textBaseline='top';points.forEach((p,i)=>{if(i%2===0||i===points.length-1){const x=pad.l+w*i/(points.length-1);ctx.fillText(p.toFixed(p%1?1:0)+'h',x,cssH-pad.b+10)}});
 ctx.strokeStyle='#2563eb';ctx.lineWidth=3;ctx.lineJoin='round';ctx.lineCap='round';ctx.beginPath();values.forEach((v,i)=>{const x=pad.l+w*i/(values.length-1),y=pad.t+h-(v/max*h);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();
 ctx.fillStyle='#2563eb';values.forEach((v,i)=>{const x=pad.l+w*i/(values.length-1),y=pad.t+h-(v/max*h);ctx.beginPath();ctx.arc(x,y,3.5,0,Math.PI*2);ctx.fill()});
 const summary=document.getElementById('chartSummary');if(summary)summary.textContent=`At ${money(rate)}/hr with a ${mult.toFixed(2)}× multiplier, estimated gross pay rises from ${money(values[0])} at ${points[0].toFixed(2)} hours to ${money(values.at(-1))} at ${points.at(-1).toFixed(2)} hours${mode==='advanced'&&bonus>0?' using the advanced compensation estimate':''}.`;
}
function getMultiRateData(){
 const rows=[1,2,3].map(i=>({rate:Math.max(0,num('mrRate'+i)),hours:Math.max(0,num('mrHours'+i))}));
 const hours=rows.reduce((a,r)=>a+r.hours,0),wages=rows.reduce((a,r)=>a+r.rate*r.hours,0),weighted=hours>0?wages/hours:0;
 return {rows,hours,wages,weighted};
}
function updateMultiRateSummary(){
 const d=getMultiRateData(),rate=document.getElementById('mrWeightedRate'),hours=document.getElementById('mrTotalHours');
 if(rate)rate.textContent=money(d.weighted)+'/hr';if(hours)hours.textContent=d.hours.toFixed(2)+' h';
}
function applyMultiRateWorkweek(){
 const d=getMultiRateData();if(d.hours<=0){setShareStatus('Add hours to the multiple-rate worksheet first.');return}
 const rate=document.getElementById('rate'),hours=document.getElementById('hours');if(rate)rate.value=d.weighted.toFixed(4);if(hours)hours.value=d.hours.toFixed(2);setOvertimeMode('advanced');calculate();setShareStatus('Weighted workweek applied to the advanced estimate.');
}
function updateScenarioComparison(rate,threshold,mult,mode,bonus,current){
 const h=Math.max(0,num('scenarioHours',50)),b=calculateOvertimeModel(rate,h,threshold,mult,mode,bonus),currentEl=document.getElementById('scenarioCurrent'),bEl=document.getElementById('scenarioB'),diffEl=document.getElementById('scenarioDifference');
 if(currentEl)currentEl.textContent=money(current.total);if(bEl)bEl.textContent=money(b.total);if(diffEl){const d=b.total-current.total;diffEl.textContent=(d>=0?'+':'−')+money(Math.abs(d));diffEl.dataset.direction=d>=0?'up':'down';}
}
function updatePremiumTracker(r){
 const weeks=Math.min(52,Math.max(1,Math.round(num('premiumWeeks',52)))),weekly=document.getElementById('weeklyPremiumTracker'),annual=document.getElementById('annualPremiumTracker');
 if(weekly)weekly.textContent=money(r.overtimePremium)+' / week';if(annual)annual.textContent=money(r.overtimePremium*weeks);
}
const OT_STATE_KEY='workpay:overtime:v52';
function overtimeStateIds(){return ['rate','hours','threshold','multiplier','bonus','scenarioHours','premiumWeeks','dayMon','dayTue','dayWed','dayThu','dayFri','daySat','daySun','mrRate1','mrHours1','mrRate2','mrHours2','mrRate3','mrHours3']}
function saveOvertimeState(){
 try{const values={};overtimeStateIds().forEach(id=>{const el=document.getElementById(id);if(el)values[id]=el.value});localStorage.setItem(OT_STATE_KEY,JSON.stringify({mode:document.body.dataset.overtimeMode||'basic',values}))}catch{}
}
function restoreOvertimeState(){
 if(location.search)return false;try{const raw=localStorage.getItem(OT_STATE_KEY);if(!raw)return false;const state=JSON.parse(raw);Object.entries(state.values||{}).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.value=v});setOvertimeMode(state.mode==='advanced'?'advanced':'basic');return true}catch{return false}
}
function setOvertimeMode(mode){
 const safe=mode==='advanced'?'advanced':'basic';document.body.dataset.overtimeMode=safe;
 document.querySelectorAll('[data-overtime-mode]').forEach(b=>{const active=b.dataset.overtimeMode===safe;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
 document.querySelectorAll('.advanced-only').forEach(el=>el.hidden=safe!=='advanced');
}
function getDailyTotal(){return ['dayMon','dayTue','dayWed','dayThu','dayFri','daySat','daySun'].reduce((sum,id)=>sum+Math.max(0,num(id)),0)}
function updateDailyTotal(){const out=document.getElementById('dailyTotal');if(out)out.textContent=getDailyTotal().toFixed(2)+' hours'}
function buildOvertimeShareUrl(){
 const u=new URL(window.location.href);u.search='';const params={rate:num('rate'),hours:num('hours'),threshold:num('threshold',40),multiplier:num('multiplier',1.5),mode:document.body.dataset.overtimeMode||'basic'};
 if(params.mode==='advanced'&&num('bonus')>0)params.bonus=num('bonus');
 if(num('scenarioHours',50)!==50)params.scenario=num('scenarioHours',50); if(num('premiumWeeks',52)!==52)params.weeks=num('premiumWeeks',52);
 [1,2,3].forEach(i=>{const rr=num('mrRate'+i),hh=num('mrHours'+i);if(hh>0){params['r'+i]=rr;params['h'+i]=hh}});
 const days=['dayMon','dayTue','dayWed','dayThu','dayFri','daySat','daySun'];days.forEach((id,i)=>{const v=num(id);if(v>0)params['d'+(i+1)]=v});
 Object.entries(params).forEach(([k,v])=>u.searchParams.set(k,String(v)));return u.toString();
}
function setShareStatus(text){const el=document.getElementById('shareStatus');if(el){el.textContent=text;setTimeout(()=>{if(el.textContent===text)el.textContent=''},2600)}}
function loadOvertimeFromUrl(){
 const p=new URLSearchParams(location.search),ids={rate:'rate',hours:'hours',threshold:'threshold',multiplier:'multiplier',bonus:'bonus'};
 Object.entries(ids).forEach(([key,id])=>{if(p.has(key)){const el=document.getElementById(id),v=parseFloat(p.get(key));if(el&&Number.isFinite(v)&&v>=0)el.value=v}});
 const mode=p.get('mode');setOvertimeMode(mode==='advanced'?'advanced':'basic');
 if(p.has('scenario')){const el=document.getElementById('scenarioHours'),v=parseFloat(p.get('scenario'));if(el&&Number.isFinite(v)&&v>=0)el.value=v} if(p.has('weeks')){const el=document.getElementById('premiumWeeks'),v=parseFloat(p.get('weeks'));if(el&&Number.isFinite(v))el.value=Math.min(52,Math.max(1,v))}
 [1,2,3].forEach(i=>{for(const [key,id] of [['r'+i,'mrRate'+i],['h'+i,'mrHours'+i]]){if(p.has(key)){const el=document.getElementById(id),v=parseFloat(p.get(key));if(el&&Number.isFinite(v)&&v>=0)el.value=v}}});
 ['dayMon','dayTue','dayWed','dayThu','dayFri','daySat','daySun'].forEach((id,i)=>{const v=parseFloat(p.get('d'+(i+1)));const el=document.getElementById(id);if(el&&Number.isFinite(v)&&v>=0)el.value=v});updateDailyTotal();
}
function resetOvertime(){
 const defaults={rate:20,hours:45,threshold:40,multiplier:1.5,bonus:0,scenarioHours:50,premiumWeeks:52,dayMon:0,dayTue:0,dayWed:0,dayThu:0,dayFri:0,daySat:0,daySun:0,mrRate1:20,mrHours1:40,mrRate2:25,mrHours2:5,mrRate3:0,mrHours3:0};for(const [id,value] of Object.entries(defaults)){const el=document.getElementById(id);if(el)el.value=value}setOvertimeMode('basic');history.replaceState(null,'',location.pathname);try{localStorage.removeItem(OT_STATE_KEY)}catch{}updateDailyTotal();updateMultiRateSummary();calculate();
}
function initOvertimePage(){if(!restoreOvertimeState())loadOvertimeFromUrl();updateDailyTotal();updateMultiRateSummary();setResultView(localStorage.getItem('workpay:overtime:view')||'detailed');document.querySelectorAll('.daily-grid input').forEach(el=>el.addEventListener('input',updateDailyTotal));}
window.addEventListener('resize',()=>{if(document.body.dataset.calculator==='overtime')updateOvertimeExtras(num('rate'),num('threshold',40),num('multiplier',1.5),document.body.dataset.overtimeMode||'basic',num('bonus'))});



function syncHourPresetState(){
 const hours=num('hours');document.querySelectorAll('[data-hours-preset]').forEach(btn=>btn.classList.toggle('active',Math.abs(Number(btn.dataset.hoursPreset)-hours)<0.001));
}
function setResultView(view){
 const safe=view==='simple'?'simple':'detailed',card=document.querySelector('.result-panel');
 if(card)card.classList.toggle('simple-result',safe==='simple');
 document.querySelectorAll('[data-result-view]').forEach(btn=>{const active=btn.dataset.resultView===safe;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active))});
 try{localStorage.setItem('workpay:overtime:view',safe)}catch{}
}
function updateOvertimeGuidance(rate,hours,threshold,mult,mode,bonus,r){
 const box=document.getElementById('inputGuidance');if(!box)return;
 let text='',kind='good';
 const rawRate=num('rate'),rawHours=num('hours'),rawThreshold=num('threshold',40),rawMult=num('multiplier',1.5);
 if(rawRate<0||rawHours<0||rawThreshold<0){text='Use zero or positive values for rate, hours and threshold.';kind='warn'}
 else if(hours>168){text='A seven-day workweek contains 168 hours. Double-check the hours entered.';kind='warn'}
 else if(threshold>168){text='The overtime threshold is above the number of hours in a seven-day week. Check this planning assumption.';kind='warn'}
 else if(mult>3){text='This overtime multiplier is unusually high. Confirm that it matches the rule or agreement you are modeling.';kind='warn'}
 else if(rate===0){text='Enter an hourly rate above $0 to calculate meaningful earnings.';kind='warn'}
 else if(hours<=threshold){text=`No overtime hours are triggered by these inputs: ${hours.toFixed(2)} hours is at or below the ${threshold.toFixed(2)}-hour threshold.`;kind='good'}
 else if(mode==='advanced'&&bonus===0){text='Advanced mode is active, but no additional compensation is entered. The result may match the basic hourly estimate.';kind='good'}
 else if(r.overtimeHours>0){text=`${r.overtimeHours.toFixed(2)} overtime hours are included using a ${mult.toFixed(2)}× multiplier.`;kind='good'}
 box.innerHTML=text?`<div class="guidance-item ${kind}">${text}</div>`:'';
}
function updateResultInsight(rate,hours,threshold,mult,mode,r){
 const el=document.getElementById('resultInsight');if(!el)return;
 if(rate<=0){el.textContent='Enter your hourly rate to see an explanation of the estimate.';return}
 if(r.overtimeHours<=0){el.textContent=`At ${money(rate)}/hr for ${hours.toFixed(2)} hours, this scenario stays within the ${threshold.toFixed(2)}-hour threshold, so the estimate contains no overtime premium.`;return}
 const modeText=mode==='advanced'?'advanced regular-rate estimate':'basic hourly-rate model';
 el.textContent=`At ${money(rate)}/hr for ${hours.toFixed(2)} hours, ${r.overtimeHours.toFixed(2)} hours fall above the ${threshold.toFixed(2)}-hour threshold. Using the ${modeText} and a ${mult.toFixed(2)}× multiplier, the estimated overtime premium adds ${money(r.overtimePremium)}, bringing weekly gross pay to ${money(r.total)}.`;
}


document.addEventListener('click',e=>{const focus=e.target.closest('[data-focus-result]');if(focus){document.getElementById('resultPanel')?.scrollIntoView({behavior:'smooth',block:'start'});}const preset=e.target.closest('[data-hours-preset]');if(preset)setTimeout(syncHourPresetState,0);});
document.getElementById('hours')?.addEventListener('input',syncHourPresetState);


/* Hourly to Salary flagship V6.4 */
const HOURLY_SALARY_STATE_KEY='workpay:hourly-salary:v64';
function updateHourlySalaryPage(rate,hours,weeks,weekly,annual){
 const set=(id,text)=>{const el=document.getElementById(id);if(el)el.textContent=text};
 set('hourlyWeekly',money(weekly));set('hourlyBiweekly',money(annual/26));set('hourlySemimonthly',money(annual/24));set('hourlyMonthly',money(annual/12));
 const annualHours=hours*weeks;set('hourlyAnnualHours',annualHours.toLocaleString('en-US',{maximumFractionDigits:2})+' hours');
 const bar=document.getElementById('hourlyHoursBar');if(bar)bar.style.width=Math.min(100,annualHours/2080*100)+'%';
 const insight=document.getElementById('hourlyResultInsight');if(insight){
   if(rate<=0||hours<=0||weeks<=0) insight.textContent='Enter an hourly rate, weekly hours and paid weeks to see a meaningful annualized estimate.';
   else insight.textContent=`At ${money(rate)}/hour for ${hours.toFixed(2)} paid hours per week and ${weeks.toFixed(0)} paid weeks, estimated annual gross pay is ${money(annual)}. That averages ${money(annual/12)} per month before taxes and deductions.`;
 }
 const guide=document.getElementById('hourlyGuidance');if(guide){let text='',kind='good';if(hours>168){text='A seven-day week contains 168 hours. Double-check the weekly hours entered.';kind='warn'}else if(weeks>53){text='Paid weeks should normally be 53 or fewer. Check the value entered.';kind='warn'}else if(rate===0){text='Enter an hourly rate above $0 to calculate earnings.';kind='warn'}else if(hours===0||weeks===0){text='Hours and paid weeks must be above zero for an annualized estimate.';kind='warn'}else if(hours>40){text='This single-rate conversion does not add an overtime premium. If overtime applies, use the Overtime Pay Calculator.';kind='warn'}else if(weeks<52){text=`This scenario models ${52-weeks} week${Math.abs(52-weeks)===1?'':'s'} outside a 52-week paid year.`;kind='good'}else{text='This scenario assumes one regular hourly rate across the paid schedule entered.';kind='good'}guide.innerHTML=`<div class="guidance-item ${kind}">${text}</div>`;}
 updateHourlyRateComparison(rate,hours,weeks,annual);syncHourlyPresets();saveHourlySalaryState();
}
function updateHourlyRateComparison(rate,hours,weeks,currentAnnual){
 const set=(id,text)=>{const el=document.getElementById(id);if(el)el.textContent=text};
 const scenarios=[[0,'Current'],[1,'Plus1'],[2,'Plus2'],[5,'Plus5']];
 scenarios.forEach(([inc,key])=>{const r=rate+inc,a=r*hours*weeks;set('compare'+key+'Rate',money(r)+'/hr');set('compare'+key+'Annual',money(a)+'/year');if(inc>0)set('compare'+key+'Diff','+'+money(a-currentAnnual)+' / year');});
}
function syncHourlyPresets(){
 const hours=num('hours'),weeks=num('weeks',52);document.querySelectorAll('[data-hourly-hours]').forEach(b=>b.classList.toggle('active',Math.abs(Number(b.dataset.hourlyHours)-hours)<.001));document.querySelectorAll('[data-hourly-weeks]').forEach(b=>b.classList.toggle('active',Math.abs(Number(b.dataset.hourlyWeeks)-weeks)<.001));
}
function buildHourlySalaryShareUrl(){const u=new URL(location.href);u.search='';u.searchParams.set('rate',String(Math.max(0,num('rate'))));u.searchParams.set('hours',String(Math.max(0,num('hours'))));u.searchParams.set('weeks',String(Math.max(0,num('weeks',52))));return u.toString()}
function setHourlyShareStatus(text){const el=document.getElementById('hourlyShareStatus');if(el){el.textContent=text;setTimeout(()=>{if(el.textContent===text)el.textContent=''},2200)}}
function saveHourlySalaryState(){try{const state={rate:val('rate'),hours:val('hours'),weeks:val('weeks')};localStorage.setItem(HOURLY_SALARY_STATE_KEY,JSON.stringify(state))}catch{}}
function restoreHourlySalaryState(){if(location.search)return false;try{const raw=localStorage.getItem(HOURLY_SALARY_STATE_KEY);if(!raw)return false;const state=JSON.parse(raw);['rate','hours','weeks'].forEach(id=>{const el=document.getElementById(id);if(el&&state[id]!==undefined)el.value=state[id]});return true}catch{return false}}
function loadHourlySalaryFromUrl(){const p=new URLSearchParams(location.search);[['rate',0,100000],['hours',0,168],['weeks',0,53]].forEach(([id,min,max])=>{if(!p.has(id))return;const v=parseFloat(p.get(id)),el=document.getElementById(id);if(el&&Number.isFinite(v))el.value=Math.min(max,Math.max(min,v))})}
function resetHourlySalary(){const defaults={rate:25,hours:40,weeks:52};Object.entries(defaults).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.value=v});try{localStorage.removeItem(HOURLY_SALARY_STATE_KEY)}catch{}history.replaceState(null,'',location.pathname);calculate();syncHourlyPresets();setHourlyShareStatus('Reset to the default example.')}
function initHourlySalaryPage(){if(!restoreHourlySalaryState())loadHourlySalaryFromUrl();syncHourlyPresets();}
