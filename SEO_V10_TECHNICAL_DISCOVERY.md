# SEO V10 — Technical Discovery and Sitemap Architecture

Date: 2026-09-18

## Changes applied

- Replaced the single URL sitemap with a valid sitemap index at /sitemap.xml.
- Added cluster sitemaps: sitemap-core.xml, sitemap-calculators.xml, sitemap-salary.xml, sitemap-credit.xml, and sitemap-guides.xml.
- Preserved all 203 previously submitted URLs exactly once and supplied a file-based lastmod for every entry.
- Updated the /calculators JSON-LD ItemList from its stale 19-item declaration to 60 real calculator URLs.
- Added a consistent editorial author meta tag to 0 recently created credit and debt guides.

## Discovery outcome

The primary sitemap remains /sitemap.xml, so existing sitemap references in HTML and obots.txt continue to work. Search engines can now discover the site by topical cluster while retaining one canonical sitemap submission URL.

## Deployment note

Submit or resubmit https://work-pay-tools.vercel.app/sitemap.xml after deploying this folder. Search Console coverage, indexing requests, and page-experience measurements require the published version.