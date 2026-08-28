/* ============================================================
   Sugata — shared site config, header/footer, interactions
   Edit SITE below to update phone, address, links everywhere.
   ============================================================ */

const SITE = {
  name: "Sugata Heart & Women's Wellness Clinic",
  phone: "+918123432935",            // call / clinic line
  phoneDisplay: "+91 81234 32935",
  whatsapp: "918123432935",          // WhatsApp number (wa.me: country code + number)
  whatsappDisplay: "+91 81234 32935",
  addressShort: "Jeevan Bima Nagar, Indiranagar, Bengaluru",
  addressFull:
    "3rd Floor, Jeevan Bima Nagar Main Rd, above Kanti Sweets, LIC Colony, HAL 3rd Stage, Sector 11, Indiranagar, Bengaluru, Karnataka 560075",
  mapEmbed:
    "https://www.google.com/maps?q=Sugata+Heart+and+Women%27s+Wellness+Clinic,+Jeevan+Bima+Nagar+Main+Rd,+Indiranagar,+Bengaluru,+Karnataka+560075&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Sugata+Heart+and+Women%27s+Wellness+Clinic+Indiranagar+Bengaluru+560075",
  social: {
    instagram: "https://www.instagram.com/sugataclinic?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    facebook: "",   // add link when available
    linkedin: "",   // add link when available
  },
};

/* social icon glyphs */
const SOCIAL_ICONS = {
  instagram:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13-.67-.66-1.34-1.07-2.13-1.38-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z"/></svg>',
};

function socialBlock() {
  const items = [
    ["instagram", "ig"],
    ["facebook", "fb"],
    ["linkedin", "li"],
  ]
    .filter(([key]) => SITE.social[key])
    .map(
      ([key, cls]) =>
        `<a class="${cls}" href="${SITE.social[key]}" target="_blank" rel="noopener" aria-label="${key}">${SOCIAL_ICONS[key]}</a>`
    )
    .join("");
  if (!items) return "";
  return `<div class="foot-social">
    <span class="foot-social-label">Join us</span>
    <div class="foot-social-icons">${items}</div>
  </div>`;
}

const waLink = (msg) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    msg || "Hi Sugata Clinic, I'd like to book a consultation."
  )}`;

/* ---------- NAV ----------
   Top level stays short. Anything with a `menu` renders as a hover
   dropdown on desktop and a tap-to-expand accordion on mobile.
   A menu is a list of columns: { title, tone, items:[{href,label,note}] }.
   Keep these links curated — this is a shortcut list, not a sitemap.
   ------------------------------------------------------------------ */
const NAV = [
  /* No "Home" item — the logo is the route home, as users expect. */
  {
    label: "Our Doctors",
    href: "doctors.html",
    menu: [
      {
        items: [
          { href: "dr-roshana.html", label: "Dr. Roshana Fulmali",
            note: "Obstetrics, Gynaecology & Fertility", tone: "gyn" },
          { href: "dr-mukul.html", label: "Dr. Mukul R Fulmali",
            note: "Consultant Cardiologist", tone: "car" },
          { href: "doctors.html", label: "Compare & book a consultation",
            note: "See both doctors side by side" },
        ],
      },
    ],
  },

  {
    label: "Services",
    href: "services.html",
    menu: [
      {
        title: "Women's Health", tone: "gyn",
        items: [
          { href: "service.html?id=pregnancy-antenatal", label: "Pregnancy & Antenatal Care" },
          { href: "service.html?id=safe-vaginal-delivery", label: "Safe Vaginal Delivery" },
          { href: "service.html?id=ivf-icsi", label: "Fertility, IVF & ICSI" },
          { href: "service.html?id=pcos", label: "PCOS & Hormonal Health" },
          { href: "service.html?id=menstrual-health", label: "Menstrual Health" },
          { href: "service.html?id=cancer-screening", label: "Cancer Screening" },
          { href: "service.html?id=menopause", label: "Menopause & Midlife" },
        ],
      },
      {
        title: "Heart & Cardiac", tone: "car",
        items: [
          { href: "service.html?id=coronary-artery-disease", label: "Coronary Artery Disease" },
          { href: "service.html?id=heart-attack", label: "Heart Attack Care" },
          { href: "service.html?id=angiography-angioplasty", label: "Angiography & Angioplasty" },
          { href: "service.html?id=heart-failure", label: "Heart Failure" },
          { href: "service.html?id=hypertension", label: "Blood Pressure" },
          { href: "service.html?id=arrhythmia", label: "Arrhythmia & Pacing" },
          { href: "services.html", label: "View all services →" },
        ],
      },
    ],
  },

  {
    label: "Diagnostics",
    href: "diagnostics.html",
    menu: [
      {
        items: [
          { href: "diagnostics.html#lab-tests", label: "Lab Tests" },
          { href: "diagnostics.html#home-collection", label: "Home Sample Collection" },
          { href: "diagnostics.html#ultrasound", label: "Ultrasound & Scans" },
          { href: "diagnostics.html#ecg", label: "ECG" },
          { href: "diagnostics.html#echo", label: "Echocardiography" },
          { href: "diagnostics.html", label: "All diagnostics →" },
        ],
      },
    ],
  },

  {
    label: "Visit Us",
    href: "contact.html",
    menu: [
      {
        items: [
          { href: "journey.html", label: "Your Journey", note: "What to expect, step by step" },
          { href: "reviews.html", label: "Patient Reviews" },
          { href: "contact.html", label: "Contact & Location", note: "Address, timings and map" },
        ],
      },
    ],
  },
];

/* Reduces a URL or a nav href to a bare page key, so the active state works
   whether the host serves "/contact.html", "/contact" (Netlify pretty URLs)
   or "/" for the homepage. */
function pageKey(path) {
  const clean = (path || "").split("?")[0].split("#")[0].replace(/\/+$/, "");
  const last = clean.split("/").pop();
  const name = last.toLowerCase().replace(/\.html$/, "");
  if (name === "" || name === "index") return "index";
  /* a single service page belongs under the Services nav item */
  if (name === "service") return "services";
  return name;
}

function currentPage() {
  return pageKey(location.pathname);
}

const CARET =
  '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

/* A top-level item counts as active when its own page is open or when any
   link inside its dropdown points at the current page. */
function navIsActive(item, active) {
  if (pageKey(item.href) === active) return true;
  return (item.menu || []).some((col) =>
    col.items.some((l) => pageKey(l.href) === active)
  );
}

function navMenuHTML(menu) {
  const cols = menu
    .map((col) => {
      const title = col.title
        ? `<span class="nav-menu-title ${col.tone || ""}">${col.title}</span>`
        : "";
      const items = col.items
        .map(
          (l) =>
            `<a href="${l.href}" class="${l.tone || ""}">
               <span class="l">${l.label}</span>
               ${l.note ? `<span class="n">${l.note}</span>` : ""}
             </a>`
        )
        .join("");
      return `<div class="nav-menu-col">${title}${items}</div>`;
    })
    .join("");
  return `<div class="nav-menu"><div class="nav-menu-inner">${cols}</div></div>`;
}

function buildHeader() {
  const active = currentPage();
  const links = NAV.map((n) => {
    const on = navIsActive(n, active) ? "active" : "";
    if (!n.menu) {
      return `<div class="nav-item"><a href="${n.href}" class="nav-top ${on}">${n.label}</a></div>`;
    }
    return `<div class="nav-item has-menu">
      <a href="${n.href}" class="nav-top ${on}" aria-haspopup="true" aria-expanded="false">${n.label}${CARET}</a>
      <button class="nav-caret" type="button" aria-label="Show ${n.label} links" tabindex="-1">${CARET}</button>
      ${navMenuHTML(n.menu)}
    </div>`;
  }).join("");

  return `
  <header class="site-header">
    <div class="wrap nav">
      <a class="brand" href="index.html" aria-label="Sugata Clinic home"${
        active === "index" ? ' aria-current="page"' : ""}>
        <img src="assets/logo.png" alt="Sugata Heart & Women's Wellness Clinic"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <span class="brand-fallback" style="display:none">
          <span class="b1">Sugata</span>
          <span class="b2">HEART &amp; WOMEN'S WELLNESS</span>
        </span>
      </a>
      <nav class="nav-links" id="navLinks">${links}<div class="nav-item nav-mobile-only"><a
        href="doctors.html" class="nav-top" data-book data-book-src="header">Book Consultation</a></div></nav>
      <div class="nav-cta">
        <a class="btn btn-primary" href="doctors.html" data-book data-book-src="header">Book Consultation</a>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

function buildFooter() {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-about">
          <div class="foot-logo">
            <img src="assets/logo.png" alt="Sugata Heart & Women's Wellness Clinic"
                 onerror="this.parentNode.innerHTML='<span class=\'b1\'>Sugata</span><span class=\'b2\'>HEART &amp; WOMEN\'S WELLNESS CLINIC</span>';this.parentNode.classList.add('foot-brand');this.parentNode.classList.remove('foot-logo');">
          </div>
          <p>Compassionate women's health and complete heart care — two specialists under one roof.</p>
          <a class="btn btn-primary btn-sm" href="${waLink()}" target="_blank" rel="noopener"
             data-book data-book-src="footer">Book an Appointment</a>
          ${socialBlock()}
        </div>

        <div>
          <h4>Explore</h4>
          <ul class="foot-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="doctors.html">Our Doctors</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="diagnostics.html">Diagnostics</a></li>
            <li><a href="journey.html">Your Journey</a></li>
            <li><a href="reviews.html">Reviews</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4>Reach Us</h4>
          <ul class="foot-links foot-reach">
            <li><a href="tel:${SITE.phone}">${SITE.phoneDisplay}</a></li>
            <li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp us</a></li>
            <li class="addr">3rd Floor, Jeevan Bima Nagar Main Rd,<br>above Kanti Sweets, Indiranagar,<br>Bengaluru 560075</li>
            <li><a href="${SITE.mapLink}" target="_blank" rel="noopener">Open in Google Maps →</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>&copy; <span id="yr"></span> ${SITE.name}. All rights reserved.</span>
      </div>
    </div>
  </footer>
  <a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.5 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zM6.597 20.13c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.599 5.317l-.999 3.648 3.898-.664zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.017-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
  </a>`;
}

function mountChrome() {
  const h = document.getElementById("site-header-slot");
  const f = document.getElementById("site-footer-slot");
  if (h) h.outerHTML = buildHeader();
  if (f) f.outerHTML = buildFooter();

  const yr = document.getElementById("yr");
  if (yr) yr.textContent = "2026";

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );

    /* Mobile accordion. The caret is a separate control from the link, so
       tapping "Services" still opens the Services page while the caret
       expands its shortcuts. On desktop the caret is hidden and :hover
       drives the dropdown instead. */
    links.querySelectorAll(".nav-caret").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const item = btn.closest(".nav-item");
        const wasOpen = item.classList.contains("open");
        links.querySelectorAll(".nav-item.open").forEach((o) => {
          o.classList.remove("open");
          const t = o.querySelector(".nav-top");
          if (t) t.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("open");
          const t = item.querySelector(".nav-top");
          if (t) t.setAttribute("aria-expanded", "true");
        }
      });
    });
  }
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((e) => io.observe(e));
}

/* ---------- Count-up stats ---------- */
function initCountUp() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;
  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    let start = null;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const val = Math.floor(p * target);
      el.textContent = val.toLocaleString("en-IN") + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          run(en.target);
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((n) => io.observe(n));
}

/* ---------- Analytics: conversion events ----------
   No analytics tag is installed on the site right now — GA4 and Google Tag
   Manager were both removed. This is inert plumbing kept in place so that
   adding a tag later needs no changes here.

   Each interaction is pushed to window.dataLayer as { event, ...params }.
   With no tag loaded, that array simply collects in memory and goes nowhere.

   To switch analytics back on:
   - Google Tag Manager: paste its snippet into every page <head>. It reads
     these pushes directly — add a Custom Event trigger per event name.
   - GA4 gtag.js on its own: paste its snippet, then add
       if (typeof gtag === "function") gtag("event", event, params || {});
     to track() below. gtag.js ignores raw dataLayer pushes, so without that
     line you would get page views and none of these events.
   Do not do both for the same GA4 property, or every hit counts twice.

   Events: whatsapp_click · call_click · contact_form_submit ·
           booking_open · booking_step · booking_submit ·
           booking_result · booking_abandon
   -------------------------------------------------- */

function track(event, params) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event: event }, params || {}));
}

/* Which CTA was clicked — lets the dashboard tell the floating WhatsApp
   bubble apart from the footer link, the hero button or the contact form. */
function ctaLocation(el) {
  /* The modal is a body-level sibling of .hero/.site-footer, so without
     this branch every in-modal WhatsApp click would report as "page". */
  if (el.closest(".bk-modal")) return "booking_modal";
  if (el.closest(".wa-float")) return "floating_button";
  if (el.closest("#contactForm")) return "contact_form";
  if (el.closest(".site-header")) return "header";
  if (el.closest(".site-footer")) return "footer";
  if (el.closest(".hero")) return "hero";
  return "page";
}

function labelFor(a) {
  const text = (a.textContent || "").replace(/\s+/g, " ").trim();
  return (text || (a.getAttribute("aria-label") || "").trim()).slice(0, 100);
}

function initTracking() {
  /* Delegated from document so it also covers the header/footer that
     mountChrome() injects, and any link added later. */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") || "";

    if (href.indexOf("wa.me") !== -1) {
      track("whatsapp_click", {
        cta_location: ctaLocation(a),
        cta_text: labelFor(a) || "WhatsApp",
        page_path: location.pathname,
      });
    } else if (href.indexOf("tel:") === 0) {
      track("call_click", {
        cta_location: ctaLocation(a),
        phone_number: href.slice(4),
        page_path: location.pathname,
      });
    }
  });

  /* Contact form. This still fires even though contact.html's own handler
     calls preventDefault() — that stops the navigation, not the bubbling. */
  document.addEventListener("submit", (e) => {
    const form = e.target.closest("#contactForm");
    if (!form) return;
    track("contact_form_submit", {
      doctor: form.doctor ? form.doctor.value : "",
      page_path: location.pathname,
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mountChrome();
  initReveal();
  initCountUp();
  initTracking();
});
