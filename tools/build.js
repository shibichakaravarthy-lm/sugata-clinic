/* ============================================================
   Sugata — static page generator

   Run:  node tools/build.js

   Generates, from js/services-data.js + js/seo-data.js:
     services/<slug>/index.html   one real page per service (22)
     blog/index.html              blog listing
     blog/<slug>/index.html       one page per post
     sitemap.xml                  every canonical URL
     robots.txt
     _redirects                   301s for the old ?id= URLs

   Everything is pre-rendered, so each page ships a real <title>,
   meta description, H1 and canonical in the HTML itself rather than
   relying on JavaScript. Re-run after editing services or SEO data.
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

/* ---- load the data files (plain scripts, not modules) ---- */
const seo = require(path.join(ROOT, "js", "seo-data.js"));
const { SITE_URL, PAGE_SEO, SERVICE_SEO, BLOG_SEO, BLOG_POSTS } = seo;

const sandbox = {};
new Function("exports", read("js/services-data.js") +
  "\nexports.CATEGORIES = CATEGORIES; exports.SERVICES = SERVICES;")(sandbox);
const { CATEGORIES, SERVICES } = sandbox;

/* ---- helpers ---- */
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const write = (rel, body) => {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, body);
  return rel;
};

const slugOf = (id) => SERVICE_SEO[id].slug;
const urlOf = (id) => "/services/" + slugOf(id);

const GTAG = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-88D3MYG22N"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-88D3MYG22N');
</script>`;

/* Pages generated into a subdirectory need root-absolute asset paths. */
function head(meta, extraHead) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
${GTAG}
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(meta.description)}" />
  <link rel="canonical" href="${SITE_URL}${meta.path}" />
  <meta property="og:type" content="${meta.ogType || "website"}" />
  <meta property="og:title" content="${esc(meta.title)}" />
  <meta property="og:description" content="${esc(meta.description)}" />
  <meta property="og:url" content="${SITE_URL}${meta.path}" />
  <meta property="og:site_name" content="Sugata Heart &amp; Women's Wellness Clinic" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
  <link rel="icon" href="/assets/favicon.ico" sizes="32x32">
  <link rel="icon" type="image/png" href="/assets/favicon-96x96.png" sizes="96x96">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="manifest" href="/assets/site.webmanifest">
  <meta name="theme-color" content="#e6197e">
  <link rel="stylesheet" href="/css/style.css" />
${extraHead || ""}</head>
<body>
  <div id="site-header-slot"></div>
`;
}

const FOOT = `  <div id="site-footer-slot"></div>

  <script src="/js/seo-data.js"></script>
  <script src="/js/services-data.js"></script>
  <script src="/js/site.js"></script>
  <script src="/js/booking.js"></script>
  <script>document.querySelectorAll(".reveal").forEach(function(e){e.classList.add("in");});</script>
</body>
</html>
`;

/* ---------- service pages ---------- */

function serviceJsonLd(id, m) {
  const s = SERVICES[id];
  const doctor = s.cat === "gyn" ? "Dr. Roshana Fulmali" : "Dr. Mukul R Fulmali";
  return `  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: m.h1,
    description: m.description,
    url: SITE_URL + m.path,
    about: { "@type": "MedicalProcedure", name: s.title },
    provider: {
      "@type": "MedicalClinic",
      name: "Sugata Heart & Women's Wellness Clinic",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3rd Floor, Jeevan Bima Nagar Main Rd, above Kanti Sweets",
        addressLocality: "Indiranagar, Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560075",
        addressCountry: "IN",
      },
      telephone: "+918123432935",
    },
    author: { "@type": "Physician", name: doctor },
  })}</script>\n`;
}

function servicePage(id) {
  const s = SERVICES[id];
  const m = Object.assign({}, SERVICE_SEO[id], { path: urlOf(id), ogType: "article" });
  const btn = s.cat === "gyn" ? "btn-primary" : "btn-cardiac";
  const docName = s.cat === "gyn" ? "Dr. Roshana Fulmali" : "Dr. Mukul R Fulmali";
  const docRole = s.cat === "gyn"
    ? "Obstetrician, Gynaecologist &amp; Fertility Specialist"
    : "Consultant Cardiologist";
  const docLink = s.cat === "gyn" ? "/dr-roshana" : "/dr-mukul";
  const related = Object.keys(SERVICES)
    .filter((k) => SERVICES[k].cat === s.cat && k !== id).slice(0, 5);

  const book = (src) =>
    `data-book data-book-spec="${s.cat}" data-book-type="consult"` +
    ` data-book-service="${id}" data-book-src="${src}"`;

  return head(m, serviceJsonLd(id, m)) + `
  <section class="svc-hero ${s.cat}">
    <div class="bgimg" style="background-image:url('/${s.image}')"></div>
    <div class="ov"></div>
    <div class="wrap inner">
      <nav class="crumb" style="color:rgba(255,255,255,.8)" aria-label="Breadcrumb"><a href="/" style="color:#fff">Home</a> &rsaquo; <a href="/services" style="color:#fff">Services</a> &rsaquo; ${esc(s.title)}</nav>
      <span class="stage">${esc(s.stage)}</span>
      <h1>${esc(m.h1)}</h1>
      <p>${esc(s.short)}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap svc-body">
      <div class="prose reveal">
        <h2>${esc(s.title)}</h2>
        <p>${esc(s.about)}</p>
        <h3>What this includes</h3>
        <ul>${s.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <p style="margin-top:22px;color:var(--muted);font-size:.9rem">
          This page offers general information and is not a substitute for a consultation.
          For advice specific to you, please book a visit.
        </p>
        <a class="btn ${btn} btn-lg" href="/contact" style="margin-top:12px" ${book("service_page")}>Book this consultation</a>
      </div>

      <aside class="side-card reveal">
        <h4>Your specialist</h4>
        <p style="font-weight:600;color:var(--ink);margin-bottom:2px">${docName}</p>
        <p style="font-size:.88rem;color:var(--muted);margin-bottom:14px">${docRole}</p>
        <a class="btn btn-ghost" href="${docLink}" style="width:100%;justify-content:center;margin-bottom:24px">View profile</a>

        <h4>Related care</h4>
        <ul>${related.map((k) => `<li><a href="${urlOf(k)}">${esc(SERVICES[k].title)}</a></li>`).join("")}</ul>

        <a class="btn ${btn}" href="/contact" style="width:100%;justify-content:center;margin-top:6px" ${book("service_side")}>Book an appointment</a>
      </aside>
    </div>
  </section>

` + FOOT;
}

/* ---------- blog ---------- */

function postBody(blocks) {
  return blocks.map((b) => {
    if (typeof b === "string") return `<p>${esc(b)}</p>`;
    if (b.h2) return `<h2>${esc(b.h2)}</h2>`;
    if (b.list) return `<ul>${b.list.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    return "";
  }).join("\n        ");
}

const niceDate = (iso) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function blogPost(p) {
  const m = Object.assign({}, p, { path: BLOG_SEO.path + "/" + p.slug, ogType: "article" });
  const ld = `  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.h1,
    description: p.description,
    datePublished: p.date,
    url: SITE_URL + m.path,
    publisher: { "@type": "Organization", name: "Sugata Heart & Women's Wellness Clinic" },
  })}</script>\n`;

  return head(m, ld) + `
  <section class="section">
    <div class="wrap" style="max-width:760px">
      <nav class="crumb" aria-label="Breadcrumb" style="font-size:.85rem;color:var(--muted);margin-bottom:18px">
        <a href="/">Home</a> &rsaquo; <a href="/blog">Blog</a> &rsaquo; ${esc(p.h1)}
      </nav>
      <article class="prose reveal">
        <span class="eyebrow${p.cat === "car" ? " cardiac" : ""}">${p.cat === "car" ? "Heart health" : "Women's health"}</span>
        <h1 style="margin:10px 0 8px">${esc(p.h1)}</h1>
        <p style="color:var(--muted);font-size:.88rem;margin-bottom:26px">
          <time datetime="${p.date}">${niceDate(p.date)}</time>
        </p>
        ${postBody(p.body)}
        <p style="margin-top:26px;color:var(--muted);font-size:.9rem">
          This article is general information, not medical advice. For guidance specific
          to you, please book a consultation.
        </p>
        <a class="btn ${p.cat === "car" ? "btn-cardiac" : "btn-primary"} btn-lg" href="/contact"
           style="margin-top:10px" data-book${p.cat ? ` data-book-spec="${p.cat}"` : ""} data-book-src="blog_post">Book an appointment</a>
      </article>
    </div>
  </section>

` + FOOT;
}

function blogIndex() {
  const m = Object.assign({}, BLOG_SEO);
  const posts = BLOG_POSTS.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  const cards = posts.map((p) => `
        <a class="blog-card reveal ${p.cat}" href="${BLOG_SEO.path}/${p.slug}">
          <span class="eyebrow${p.cat === "car" ? " cardiac" : ""}">${p.cat === "car" ? "Heart health" : "Women's health"}</span>
          <h2>${esc(p.h1)}</h2>
          <p>${esc(p.excerpt)}</p>
          <time datetime="${p.date}">${niceDate(p.date)}</time>
        </a>`).join("");

  const empty = `<p class="section-lead center">No articles yet — check back soon.</p>`;

  return head(m) + `
  <section class="section">
    <div class="wrap">
      <div class="center reveal" style="margin-bottom:40px">
        <span class="eyebrow">Blog</span>
        <h1 class="section-title">${esc(BLOG_SEO.h1)}</h1>
        <p class="section-lead">${esc(BLOG_SEO.description)}</p>
      </div>
      <div class="blog-grid">${posts.length ? cards : empty}
      </div>
    </div>
  </section>

` + FOOT;
}

/* ---------- sitemap / robots / redirects ---------- */

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];

  Object.keys(PAGE_SEO).forEach((f) =>
    urls.push({ loc: PAGE_SEO[f].path, pri: PAGE_SEO[f].priority || "0.7", freq: "monthly" }));

  Object.keys(SERVICE_SEO).forEach((id) =>
    urls.push({ loc: urlOf(id), pri: "0.8", freq: "monthly" }));

  urls.push({ loc: BLOG_SEO.path, pri: "0.7", freq: "weekly" });
  BLOG_POSTS.forEach((p) =>
    urls.push({ loc: BLOG_SEO.path + "/" + p.slug, pri: "0.6", freq: "yearly", mod: p.date }));

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${u.mod || today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.pri}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

const robots = () => `User-agent: *
Allow: /

# No value to search engines, and they are not real pages
Disallow: /service.html
Disallow: /*?id=

Sitemap: ${SITE_URL}/sitemap.xml
`;

function redirects() {
  const qs = Object.keys(SERVICE_SEO).map((id) =>
    `/service.html id=${id}  ${urlOf(id)}  301!`);

  return [
    "# Generated by tools/build.js — do not edit by hand.",
    "",
    "# /services is ambiguous now that a services/ directory exists next to",
    "# services.html. Rewrite (200) so it deterministically serves the listing",
    "# page, without touching /services/<slug> which are real files.",
    "/services  /services.html  200",
    "",
    "# Strip index.html so / is the only homepage URL",
    "/index.html  /  301!",
    "",
    "# Old .html URLs -> clean paths",
    ...Object.keys(PAGE_SEO)
      .filter((f) => f !== "index.html")
      .map((f) => `/${f}  ${PAGE_SEO[f].path}  301!`),
    "",
    "# Old query-string service URLs -> clean slugs",
    ...qs,
    "",
    "# Anything else on service.html goes to the services index",
    "/service.html  /services  301",
    "",
  ].join("\n") + "\n";
}

/* ---------- run ---------- */

const made = [];

Object.keys(SERVICE_SEO).forEach((id) =>
  made.push(write(`services/${slugOf(id)}/index.html`, servicePage(id))));

made.push(write("blog/index.html", blogIndex()));
BLOG_POSTS.forEach((p) => made.push(write(`blog/${p.slug}/index.html`, blogPost(p))));

made.push(write("sitemap.xml", sitemap()));
made.push(write("robots.txt", robots()));
made.push(write("_redirects", redirects()));

console.log(`generated ${made.length} files:`);
console.log("  " + made.length + " total — " +
  Object.keys(SERVICE_SEO).length + " service pages, " +
  (BLOG_POSTS.length + 1) + " blog pages, sitemap.xml, robots.txt, _redirects");
