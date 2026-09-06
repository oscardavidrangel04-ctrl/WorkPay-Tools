# WorkPay Tools V7.9 — SERP Features, Trust, Freshness and Weekly SEO Plan

Reviewed: 2026-08-19

## Scope
This pass uses the V7.8 site as the base. It reviews current search-result patterns for time cards, overtime, hourly-to-salary and pay-frequency queries; strengthens concise answer blocks; reviews trust/freshness signals; and avoids inventing Search Console data that was not supplied as an export.

## Featured snippet / PAA opportunities

| Page | Query | Best format | Answer needed | Placement |
|---|---|---|---|---|
| /calculators/overtime-pay | what is time and a half | definition | 1.5× the regular hourly rate | directly below intro |
| /calculators/overtime-pay | how do you calculate overtime pay | formula + worked example | regular pay + overtime hours × overtime rate | directly below intro |
| /calculators/overtime-pay | does overtime start after 40 hours | short answer | general federal FLSA rule for covered nonexempt employees, with qualification | quick-answer block + FAQ |
| /calculators/time-card | how to calculate hours from clock in and out | steps | end − start − unpaid breaks | below intro |
| /calculators/time-card | how to calculate lunch break on time card | short answer | subtract only unpaid break time | below intro |
| /calculators/hourly-to-salary | how to convert hourly pay to annual salary | formula | rate × weekly hours × paid weeks | below intro |
| /calculators/hourly-to-salary | 20 an hour is how much a year | short numerical answer | $41,600 at 40×52 | below intro; links to dedicated long-tail page remain useful |
| /calculators/biweekly-pay | how many biweekly pay periods in a year | definition | 26 on a standard every-two-weeks schedule | below intro |
| /calculators/biweekly-pay | biweekly vs twice a month | comparison | 26 vs 24 | below intro + existing comparison content |
| /calculators/semimonthly-pay | how many semimonthly pay periods in a year | definition | 24 | below intro |
| /calculators/semimonthly-pay | semimonthly vs biweekly | comparison | twice monthly vs every two weeks | below intro |

The answer blocks were added once, near the top of each page. Existing FAQs remain for expanded context; no duplicate pages were created for snippets.

## Trust review

| Problem / opportunity | Risk | Solution | Ideal source | Priority |
|---|---|---|---|---|
| Editorial team existed in metadata but was not prominent on every key page | users may not see who reviewed the calculation | add a compact visible editorial-review line with links to methodology and corrections | WorkPay Tools About + Contact | High |
| Overtime claims can be mistaken for universal legal rules | legal-context overconfidence | keep wording tied to covered, nonexempt employees and state/exemption caveats | U.S. Department of Labor WHD | High |
| Time-card break treatment can be misunderstood as a legal classification | users may subtract paid breaks | explicitly say the calculator subtracts only the break entered and that compensability depends on applicable rules | U.S. Department of Labor Fact Sheet #22 | High |
| New federal overtime tax deduction is time-sensitive | stale tax claims could mislead | link directly to current IRS guidance and state that the calculator does not determine eligibility | IRS | High |
| Pure arithmetic conversion pages need less disclaimer text, not more | excessive warnings reduce usability | keep formula, assumptions and gross-pay label; route detailed methodology to About | transparent on-page math | Medium |

## Freshness audit

### Still valid
- Hourly-to-salary arithmetic: hourly rate × weekly hours × paid weeks.
- Standard biweekly comparison: 26 every-two-weeks pay periods in a 52-week year.
- Standard semimonthly comparison: 24 twice-monthly pay periods.
- General federal FLSA overtime baseline: covered, nonexempt employees generally receive at least 1.5× the regular rate for hours over 40 in a workweek.
- DOL Fact Sheet #22 remains the official federal reference for hours-worked concepts even though the fact sheet itself shows an older revision date.

### Needs active monitoring
- IRS guidance for the qualified overtime compensation deduction because reporting/forms/guidance are evolving in 2026.
- Any page that makes a legal eligibility statement rather than a mathematical estimate.

### Incorrect item fixed
- `/calculators/semimonthly-pay` breadcrumb incorrectly said “Annual Income Calculator.” It now says “Semimonthly Pay Calculator.”

### No-value changes avoided
- No blanket year insertion in every title.
- No new pages created only for PAA variants.
- No rewrite of stable arithmetic sections merely to appear “fresh.”

## CTR analysis limitation
No query-level Search Console export (query, page, impressions, clicks, CTR and average position) was supplied with this pass. Therefore no page is labeled “low CTR because of title” without evidence. Existing V7.7 title/meta improvements remain. When GSC data is supplied, prioritize queries with meaningful impressions and positions 5–20, separating ranking limitations from snippet limitations.

## Five actions with highest potential this week

1. **/calculators/overtime-pay** → high-value SERP + trust opportunity → keep the new concise answer block and current DOL/IRS source links → overtime is both competitive and legally/time-sensitive → **Impact: High / Effort: Low**.
2. **/calculators/time-card** → strong PAA/snippet fit → keep direct clock-in/out, break and overnight-shift answers near the top → SERPs reward direct utility around hours + breaks → **Impact: High / Effort: Low**.
3. **/calculators/hourly-to-salary** → broad commercial/informational demand → keep formula and concrete $20/hour answer concise, then funnel specific amounts to long-tail pages → preserves pillar intent while supporting long-tail cluster → **Impact: High / Effort: Low**.
4. **/calculators/biweekly-pay + /calculators/semimonthly-pay** → comparison intent → reinforce 26 vs 24 and cross-link both ways → search results repeatedly explain this distinction → **Impact: Medium-High / Effort: Low**.
5. **Search Console decision pass** → do not rewrite more pages blindly → export last 28 days by query + page and review positions 11–20 / rising impressions first → prevents unnecessary churn on pages that are still being discovered → **Impact: High / Effort: Medium**.

## Do this week
- Deploy V7.9.
- Request recrawl only for the five materially edited calculator URLs if using Search Console URL Inspection.
- Export GSC query/page data for the last 28 days and compare with the previous period before changing more titles.

## Observe without touching
- Specific `$15/$20/$25/$30/$35/$40 an hour` pages.
- Specific `$40k/$50k/$60k/$70k/$80k/$100k salary to hourly` pages.
- Annual Income vs Hourly to Salary after the V7.8 intent differentiation.

## Leave for later
- Creating additional guide URLs until current calculators show which informational queries receive impressions.
- Large sitewide rewrites.
- Adding years to stable arithmetic titles unless query data demonstrates a freshness intent.
