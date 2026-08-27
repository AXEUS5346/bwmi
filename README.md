# BWMI — MCA Portal Route Map

Complete visualization of **Ministry of Corporate Affairs (MCA) Portal** — every route, every inch.

## Live Demo
Open `mca-portal-complete-map.html` in any browser (no server needed).

## Files
- `mca-portal-complete-map.html` (693 KB) — Interactive D3 visualization (Hierarchical Tree, Radial, Sunburst, Table, Architecture)
- `MCA_Routes_Complete_v1.xlsx` (46 KB) — 5 sheets: Overview, All Routes (346), Unique Links (354), Architecture Notes, Stats
- `mca_tree.json` (308 KB) — Hierarchical tree (9 → 346 nodes)
- `mca_flat.json` / `mca_flat.csv` — Flat rows for analysis
- `mca_sitemap_raw.html` (371 KB) — Raw sitemap source

## Stats
- **346** hierarchical nodes, **701** total links, **354** unique routes
- **9** top-level: HOME, About MCA, Acts & Rules, My Application, MCA Services, Additional Services, Data & Reports, Help & FAQs, Contact Us
- Max depth 4, extracted from `#primaryMenu` in `/content/mca/global/en/sitemap.html` via headed Chrome + valid `bm_sv` cookie (bypassed Akamai Bot Manager + AEM restrinewtab)

## Features
- Hierarchical D3 tree (collapsible, zoom/pan, fullscreen ⛶, search, level filter)
- Radial dendrogram & Sunburst
- Searchable table (700+ rows)
- Click node → opens live MCA route in new tab (`https://www.mca.gov.in` + href)
- Architecture notes (AEM Sling, SSO, V2 vs V3, external portals)

## Usage
```bash
xdg-open mca-portal-complete-map.html
# or
python3 -m http.server 8000
# open http://localhost:8000/mca-portal-complete-map.html
```

Built with headed Chrome (agent-browser), D3 v7, Tailwind.
