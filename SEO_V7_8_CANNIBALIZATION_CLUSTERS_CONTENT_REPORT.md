# WorkPay Tools V7.8 — Cannibalization, SEO Clusters & Topical Coverage Audit

## Scope
Site analyzed: WorkPay Tools
Base version: V7.7 CTR + Internal Linking
Focus topic used for cluster planning: pay, salary, overtime and work-hours calculators for U.S. users.

---

# 1) Keyword Cannibalization Audit

## A. /calculators/hourly-to-salary vs /calculators/annual-income

**Classification:** Solapamiento leve → medium risk if both are allowed to drift toward the same copy.

- Hourly-to-salary primary intent: convert an hourly wage into annual/monthly/biweekly/weekly salary equivalents.
- Annual-income primary intent after V7.8 differentiation: project yearly gross earnings from an actual hourly schedule, especially when paid weeks or average weekly hours vary.
- Primary keywords:
  - hourly-to-salary: hourly to salary calculator
  - annual-income: annual income calculator from hourly pay / yearly income from work schedule
- Secondary overlap: hourly wage to yearly income, annual gross pay, hours per week, weeks per year.
- Why Google could confuse them: both use hourly rate × weekly hours × paid weeks and both return annual gross income.
- V7.8 action: differentiate title/H1/meta and position annual-income as a schedule-based annual projection rather than a general salary conversion.
- Recommended internal-link relationship: annual-income → hourly-to-salary with anchor such as “compare the same hourly rate across standard pay periods”; hourly-to-salary → annual-income with anchor such as “project annual income with your actual paid weeks.”
- Do not canonicalize while the pages keep distinct use cases and copy.
- If Search Console later shows both URLs receiving the same core query and swapping positions repeatedly, consolidate annual-income into hourly-to-salary rather than forcing a canonical onto substantially different content.

## B. /calculators/time-card vs /calculators/work-hours

**Classification:** Solapamiento leve.

- Time Card intent: total actual clock-in/clock-out entries, subtract breaks, produce daily/weekly totals, decimal hours, overtime/pay context.
- Work Hours intent: estimate scheduled weekly paid hours from recurring shift length × days minus unpaid breaks.
- Primary keywords:
  - time-card: time card calculator / clock in clock out calculator
  - work-hours: scheduled work hours calculator / weekly work hours from shifts
- Why overlap exists: both discuss breaks, weekly hours and paid time.
- Why they should stay separate: inputs are meaningfully different—actual timestamps vs repeating schedule assumptions.
- V7.8 action: rename Work Hours to “Scheduled Work Hours Calculator” in title/H1/meta and explicitly direct users who have clock-in/out records to Time Card.
- Recommended links:
  - work-hours → time-card: “total actual clock-in and clock-out times”
  - time-card → work-hours: “estimate a repeating weekly schedule”
- Do not merge or canonicalize.

## C. /calculators/weekly-pay vs /calculators/overtime-pay

**Classification:** Solapamiento leve.

- Weekly Pay intent: calculate total weekly gross earnings.
- Overtime Pay intent: isolate overtime rate, overtime premium/earnings and resulting weekly gross pay.
- Primary keywords:
  - weekly-pay: weekly pay calculator / weekly gross pay calculator
  - overtime-pay: overtime pay calculator / time-and-a-half calculator
- Overlap: both may accept hourly rate, weekly hours, OT threshold and multiplier.
- V7.8 action: sharpen Weekly Pay around “total weekly gross pay” and keep Overtime Pay focused on overtime itself.
- Recommended links:
  - weekly-pay → overtime-pay: “inspect the overtime portion in detail”
  - overtime-pay → weekly-pay: “estimate the full weekly paycheck”
- Do not merge.

## D. /calculators/overtime-pay vs /calculators/double-time

**Classification:** No hay problema / very light overlap.

- Overtime Pay: general overtime, usually configurable multipliers and thresholds.
- Double Time: specific 2× premium rate and earnings.
- Keep Double Time as a long-tail specialist page.
- Link double-time → overtime-pay for users who need a different multiplier.

## E. /calculators/biweekly-pay vs /calculators/semimonthly-pay

**Classification:** No hay problema.

- Biweekly: every 2 weeks / commonly 26 pay periods.
- Semimonthly: twice per month / 24 pay periods.
- These are commonly confused concepts but distinct user intentions.
- Strong cross-linking is useful because comparison is part of the user's task.

## F. /calculators/hourly-to-salary vs $15/$20/$25/$30/$35/$40-an-hour-is-how-much-a-year

**Classification:** No hay problema if supporting pages remain fixed-value answers.

- Generic calculator intent: interactive conversion for any rate and schedule.
- Fixed-value page intent: immediate answer for one exact hourly rate.
- Keep fixed pages concise, exact and strongly linked to the generic converter.
- Avoid turning fixed-value pages into full duplicate copies of hourly-to-salary.

## G. /calculators/salary-to-hourly vs $40k/$50k/$60k/$70k/$80k/$100k-salary-to-hourly

**Classification:** No hay problema if supporting pages remain fixed-value answers.

- Generic calculator intent: convert any salary to effective/standard hourly rate.
- Fixed-value intent: answer one exact “$X a year is how much an hour?” query.
- Keep fixed pages narrow and link back to the generic calculator for custom hours/weeks.

## H. /calculators/monthly-income vs /calculators/hourly-to-salary

**Classification:** Solapamiento leve.

- Monthly Income intent: answer “how much do I make per month?” and explain average monthly gross pay.
- Hourly-to-Salary intent: multi-period salary equivalence.
- V7.8 action: emphasize average monthly income and the 52/12 relationship; do not broaden it into a full salary converter.

### Consolidation watchlist
1. Annual Income ↔ Hourly to Salary — highest watch priority.
2. Time Card ↔ Scheduled Work Hours — medium watch priority.
3. Weekly Gross Pay ↔ Overtime Pay — medium-low watch priority.

### Pages that should NOT be deleted now
All current fixed-value long-tail pages, Double Time, Biweekly, Semimonthly, Shift Differential, PTO Value and Pay Raise have sufficiently distinct user jobs when their copy remains focused.

---

# 2) SEO Cluster Architecture

## Site-wide pillar
**URL:** /calculators/
**Keyword:** pay calculators / salary calculators / work hours calculators
**Intent:** discovery / navigation
**Role:** catalog and parent hub; should introduce the major jobs users can solve and route them into subclusters.

## Cluster 1 — Salary & Income Conversion

### Primary hub
- /calculators/hourly-to-salary
- Keyword: hourly to salary calculator
- Intent: transactional/calculation
- Content: convert hourly pay to annual, monthly, biweekly and weekly gross equivalents; adjustable hours and paid weeks; job comparison.
- Links from pillar: “convert hourly pay to salary”
- Links back to pillar: “browse all pay calculators”

### Reverse converter
- /calculators/salary-to-hourly
- Keyword: salary to hourly calculator
- Intent: transactional/calculation
- Content: convert annual/monthly/weekly salary to an hourly rate; standard vs effective rate.
- Cross-link with hourly-to-salary using natural reverse-conversion anchors.

### Secondary calculator
- /calculators/annual-income
- Keyword: annual income calculator from hourly schedule
- Intent: transactional/planning
- Content: project yearly gross earnings using actual hourly rate, average weekly hours and paid weeks.

### Secondary calculator
- /calculators/monthly-income
- Keyword: monthly income calculator from hourly pay
- Intent: transactional/planning
- Content: estimate average monthly gross income; explain why annual/12 differs from “four weekly checks.”

### Supporting long-tail pages already present
- /15-an-hour-is-how-much-a-year
- /20-an-hour-is-how-much-a-year
- /25-an-hour-is-how-much-a-year
- /30-an-hour-is-how-much-a-year
- /35-an-hour-is-how-much-a-year
- /40-an-hour-is-how-much-a-year
- /40000-salary-to-hourly
- /50000-salary-to-hourly
- /60000-salary-to-hourly
- /70000-salary-to-hourly
- /80000-salary-to-hourly
- /100000-salary-to-hourly

### High-value informational article opportunities
Only create if the site wants article content; these have different informational intent from the calculators.
- /guides/hourly-vs-salary — “hourly vs salary” — informational/comparison — explain tradeoffs and how to compare compensation without turning it into another converter.
- /guides/how-many-work-hours-in-a-year — “how many work hours in a year” — informational — explain 2,080-hour convention, paid weeks, unpaid time and variable schedules.
- /guides/gross-pay-vs-take-home-pay — “gross pay vs net pay” — informational — clarify why WorkPay estimates gross amounts and what is not included.

### Long-tail questions to answer inside existing pages, not create as new URLs
- How much is $X an hour per year?
- Does 40 hours × 52 weeks always apply?
- What if I work 35 hours a week?
- What if I take unpaid weeks off?
- How do I compare an hourly job with a salary offer?

## Cluster 2 — Time Tracking & Work Hours

### Primary transactional page
- /calculators/time-card
- Keyword: time card calculator
- Intent: calculate actual worked time
- Content: clock-in/out rows, breaks, daily/weekly total, decimal hours, overtime/pay context.

### Secondary scheduled-hours page
- /calculators/work-hours
- Keyword: scheduled work hours calculator
- Intent: estimate repeating schedule
- Content: shift length × workdays minus unpaid breaks.

### Utility page
- /calculators/hours-to-decimal
- Keyword: hours to decimal calculator
- Intent: conversion
- Content: convert hours/minutes into decimal format for payroll/timesheets.

### Informational opportunity
- /guides/decimal-hours-for-payroll — “decimal hours chart / convert minutes for payroll” — informational; complements rather than duplicates the calculator.

### Long-tail questions to answer on current pages
- How do I subtract a lunch break from work hours?
- What is 7 hours 30 minutes in decimal hours?
- Should I use a time card or a scheduled-hours calculator?
- How do overnight shifts affect time totals?

## Cluster 3 — Overtime & Premium Pay

### Primary page
- /calculators/overtime-pay
- Keyword: overtime pay calculator
- Intent: calculate overtime earnings
- Content: regular pay, OT rate, OT earnings, total weekly gross pay, configurable threshold/multiplier.

### Secondary pages
- /calculators/double-time — double time calculator — transactional
- /calculators/shift-differential — shift differential calculator — transactional
- /calculators/weekly-pay — weekly gross pay calculator — transactional, total-week focus

### Informational opportunities
- /guides/time-and-a-half-explained — “what is time and a half” — informational; formula and examples, not another calculator.
- /guides/overtime-vs-shift-differential — informational/comparison; clarify the difference between overtime and premium shifts.

### Long-tail questions to answer inside calculators
- What is time-and-a-half for $X/hour?
- Is double time the same as overtime?
- How does a shift differential change gross pay?
- Why can weekly gross pay differ from overtime pay alone?

## Cluster 4 — Pay Frequency

### Primary comparison path
- /calculators/biweekly-pay — biweekly pay calculator — transactional
- /calculators/semimonthly-pay — semimonthly pay calculator — transactional
- /calculators/weekly-pay — weekly gross pay calculator — transactional

### Informational opportunity
- /guides/biweekly-vs-semimonthly-pay — “biweekly vs semimonthly” — informational/comparison; explain 26 vs 24 periods, paycheck timing and why per-check amounts differ.

### Long-tail questions to keep within existing pages
- Is biweekly twice a month?
- Why are biweekly paychecks smaller/larger than semimonthly?
- How many biweekly checks are there per year?
- How many semimonthly checks are there per year?

## Cluster 5 — Compensation Changes & Benefits Value

- /calculators/pay-raise — pay raise calculator — transactional
- /calculators/pto-value — PTO value calculator — transactional

### Informational opportunities
- /guides/how-to-compare-a-raise — informational; explain percentage vs dollar raises and annual/monthly impact.
- /guides/what-is-pto-worth — informational; explain wage-value framing without implying payout eligibility.

---

# 3) Topical Coverage Audit of Priority Pages

## /calculators/hourly-to-salary

**Maintain**
- Adjustable hourly rate, hours/week and weeks/year.
- Annual/monthly/biweekly/weekly outputs.
- Gross-pay disclaimer.
- Examples and comparison table.

**Add**
- A short “Use this vs Annual Income Calculator” decision note: use Hourly-to-Salary for pay-period equivalence; use Annual Income for schedule-based yearly projection.
- A compact explanation of the 2,080-hour convention and why it is only a standard assumption.

**Expand**
- Job-offer comparison example with the same weekly hours on both sides.
- Unpaid-time example showing 52 vs 50 paid weeks.

**Reduce**
- Repeated statements that hourly × hours × weeks = annual pay if they appear in multiple adjacent sections.

**Do not add**
- Tax/take-home estimates unless a real tax engine is built.

## /calculators/salary-to-hourly

**Maintain**
- Annual/monthly/weekly salary input options.
- Standard and effective hourly-rate concepts.

**Add**
- One concrete comparison showing how the effective hourly rate changes if weekly hours rise from 40 to 50 while salary stays fixed.
- A concise note distinguishing “contract equivalent hourly rate” from actual payroll hourly wages.

**Expand**
- Explain paid weeks only where it changes the interpretation.

**Reduce**
- Generic salary definitions that do not help the conversion.

## /calculators/time-card

**Maintain**
- Clock-in/out entries.
- Break subtraction.
- Decimal hours.
- Weekly totals.

**Add**
- Explicit handling/communication for shifts that cross midnight if supported by the current calculator; if not supported, clearly state the limitation instead of adding explanatory filler.
- One example with different break lengths on different days.
- A “use Scheduled Work Hours instead” note for repeating schedules where actual timestamps are unnecessary.

**Expand**
- Explain why decimal hours are useful for payroll without suggesting they are the only accepted format.

**Reduce**
- Repeated explanations of break subtraction.

## /calculators/work-hours

**Maintain**
- Shift length, unpaid break and days/week inputs.

**Add**
- A strong first-screen sentence: “Use this for a repeating schedule; use Time Card if you have actual clock-in/out times.”
- A part-time example and a 4-day schedule example.

**Expand**
- Explain paid vs scheduled hours when unpaid breaks are present.

**Reduce**
- Any copy that describes it as a full time-card tool.

## /calculators/overtime-pay

**Maintain**
- Regular pay, OT pay and weekly total.
- Configurable threshold and multiplier.
- Clear assumptions and gross-pay framing.

**Add**
- A plain-language distinction among overtime rate, overtime earnings and overtime premium.
- A pointer to Double Time when the user specifically needs 2× pay.
- A pointer to Weekly Gross Pay when the user mainly wants total weekly earnings.

**Expand**
- One example where total hours are below the configured threshold so the user understands the zero-OT case.

**Reduce**
- Repeated time-and-a-half definitions if already explained immediately beside the formula.

**Important scope control**
- Keep legal context informational and clearly separated from the calculator assumptions; do not promise legal compliance for every worker/state/industry.

## /calculators/weekly-pay

**Maintain**
- Total regular + overtime weekly earnings.

**Add**
- Explicit wording that this page answers “What is my total gross pay this week?” while Overtime Pay answers “How much of it is overtime?”

**Reduce**
- Deep overtime-law discussion that belongs on the Overtime page.

## /calculators/annual-income

**Maintain**
- Hourly rate, average hours/week and paid weeks/year.

**Add**
- Variable-schedule framing.
- Unpaid-weeks example.
- Link to Hourly-to-Salary for standard period conversions.

**Reduce**
- Multi-pay-period conversion copy that duplicates Hourly-to-Salary.

## /calculators/monthly-income

**Maintain**
- Monthly focus.

**Add**
- Explain annual ÷ 12 versus weekly × 4 with a short numerical example.
- Explain that this is an average gross month, not necessarily the amount received in each calendar month under every pay schedule.

**Reduce**
- Full annual-salary conversion coverage already handled by Hourly-to-Salary.

---

# 4) Priority Implementation Order

## Priority 1 — protect distinct intents
1. Hourly-to-Salary vs Annual Income.
2. Time Card vs Scheduled Work Hours.
3. Weekly Gross Pay vs Overtime Pay.

## Priority 2 — strengthen clusters
1. Link all fixed hourly-value pages to Hourly-to-Salary.
2. Link all fixed salary-value pages to Salary-to-Hourly.
3. Cross-link Biweekly and Semimonthly naturally.
4. Cross-link Overtime, Double Time, Shift Differential and Weekly Gross Pay by user need.

## Priority 3 — create only high-value informational support
Recommended first three articles if expansion is desired:
1. /guides/biweekly-vs-semimonthly-pay
2. /guides/how-many-work-hours-in-a-year
3. /guides/hourly-vs-salary

Do not create separate pages for tiny keyword variants such as “hourly wage to yearly salary,” “hourly pay to annual salary,” and “hourly rate to yearly income” when they represent the same core intent as Hourly-to-Salary.

---

# 5) V7.8 Changes Applied

To reduce overlap without deleting useful pages, V7.8 changes these four pages:

- Annual Income: repositioned around schedule-based yearly gross-income projection.
- Monthly Income: repositioned around average monthly gross income and monthly-specific interpretation.
- Work Hours: renamed to Scheduled Work Hours Calculator to separate it from Time Card intent.
- Weekly Pay: renamed to Weekly Gross Pay Calculator to separate total weekly earnings from overtime-specific intent.

For all four, title, H1, meta description, Open Graph and Twitter metadata were synchronized.

No canonicals were changed and no URLs were removed in this pass.
