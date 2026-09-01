# Sugata Heart & Women's Wellness Clinic — Website

A fast, responsive, static website (plain HTML/CSS/JS — no build step). Just open the
files or host the folder anywhere (Netlify, Vercel, GitHub Pages, any web host).

## Run locally
From this folder:
```
python3 -m http.server 8080
```
then open http://localhost:8080

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, USP, patient count, both doctors, reviews, map |
| `services.html` | All services, gynae grouped by life stage + cardiac |
| `service.html?id=<id>` | Inner page for any single service (data-driven) |
| `dr-roshana.html` | Dr. Roshana profile (women's health) |
| `dr-mukul.html` | Dr. Mukul profile (cardiology) |
| `journey.html` | "Your Journey" — how care works |
| `reviews.html` | Patient reviews |
| `contact.html` | Contact form, address, phone, Google Map |

## ▶ What to drop in as the client sends inputs

### 1. Logo
Save the clinic logo as **`assets/logo.png`** (PNG with transparent background works best).
Until then, a styled "Sugata" text logo shows automatically.

### 2. Doctor photos (from the professional shoot)
- **`assets/doctors/dr-roshana.jpg`**
- **`assets/doctors/dr-mukul.jpg`**
Portrait orientation (roughly 4:5). Until added, a coloured placeholder with the
doctor's initial shows.

### 3. Service background images (removes the "empty box" look)
Drop photos into **`assets/services/`** with these exact names:
```
adolescent.jpg  menstrual.jpg  pregnancy.jpg  delivery.jpg  fertility.jpg
pcos.jpg  screening.jpg  wellness.jpg  menopause.jpg
cad.jpg  heart-attack.jpg  angioplasty.jpg  heart-failure.jpg
hypertension.jpg  arrhythmia.jpg  structural.jpg  peripheral.jpg
```
Any missing image falls back to a clean brand gradient — nothing breaks.

### 4. Testimonials + photos
Edit **`js/reviews-data.js`** — replace the text/names, and to add a face set
`photo: "assets/testimonials/name.jpg"` on that review.

## ✏ Easy edits (no coding needed)
- **Phone / address / WhatsApp / map** → top of `js/site.js` (the `SITE` object). Change once, updates everywhere.
- **Service content** (~100 words each) → `js/services-data.js`.
- **Dr. Roshana credentials** → `dr-roshana.html` (search "Qualifications"). *Waiting on the doctor's exact FRM/OBGY wording in writing.*
- **Patient count number** → `index.html`, the `data-count="20000"` value in the stats strip.

## Colour system (per client brief)
- **Dr. Roshana / Women's health** → magenta & pink
- **Dr. Mukul / Cardiology** → deep purple / indigo (soothing)
Both pulled from the logo so the two doctors read distinctly but stay on-brand.

## SEO & URLs

Service pages, the blog, `sitemap.xml`, `robots.txt` and `_redirects` are
**generated** - do not edit them by hand. After changing a service or any SEO
copy, run:

    node tools/build.js

That regenerates 22 service pages, the blog, the sitemap and the redirect map.

### Where things live
| What | File |
|---|---|
| Titles, meta descriptions, H1s, URL slugs | `js/seo-data.js` |
| Generator | `tools/build.js` |
| Service copy | `js/services-data.js` |
| Blog posts | `BLOG_POSTS` in `js/seo-data.js` |

### URLs
- Homepage is `/` - `/index.html` 301s to it.
- Pages are extensionless: `/contact`, `/doctors`, `/dr-roshana`.
- Services are `/services/<slug>` e.g. `/services/pcos-treatment`.
  The old `service.html?id=<id>` URLs 301 to the new ones.
- Blog is `/blog` and `/blog/<slug>`.

Every page carries a self-referencing canonical, Open Graph tags and exactly
one H1. Service pages also carry MedicalWebPage JSON-LD; blog posts carry
BlogPosting.

### Adding a service
1. Add it to `SERVICES` (and a stage in `CATEGORIES`) in `js/services-data.js`.
2. Add a matching entry to `SERVICE_SEO` in `js/seo-data.js` with a `slug`,
   `title`, `description` and `h1`.
3. Run `node tools/build.js`. The page, its sitemap entry and its nav links
   appear automatically.

The build fails loudly if a service has no SEO entry, so the two files cannot
drift apart.

### Adding a blog post
Append an entry to `BLOG_POSTS` in `js/seo-data.js` (`slug`, `title`,
`description`, `h1`, `date`, `cat` of `gyn`/`car`, `excerpt`, `body`), then run
the build. `body` accepts plain strings for paragraphs, `{ h2: "..." }` for
headings and `{ list: [...] }` for bullets.

## Appointment booking

Clicking any **Book** button opens a guided flow: specialty -> consultation or
lab test -> (which service) -> in-clinic or online -> name and phone. The
request is written to a Google Sheet and emailed to the clinic.

- Flow logic: `js/booking.js` (one IIFE, no globals). Styling: the `.bk-*`
  block at the end of `css/style.css`.
- Backend: `apps-script/Code.gs`, deployed as a Google Apps Script Web App.
  **Setup: [`apps-script/SETUP.md`](apps-script/SETUP.md).**
- After deploying, paste the `/exec` URL into `ENDPOINT` at the top of
  `js/booking.js`. Until that is set, the flow ends on an honest "request sent,
  unconfirmed" screen with a WhatsApp fallback -- it never claims a booking was
  saved when it wasn't.

Chat CTAs ("Ask on WhatsApp", "Chat with us"), the floating WhatsApp bubble,
all phone links and the contact form are deliberately untouched -- someone who
just wants to ask a question shouldn't be pushed through a form.

### Still needs a backend
- **Live booking slots** and **WhatsApp auto-reply** still need a booking tool /
  WhatsApp Business API. The flow above captures the request; it does not hold
  a calendar slot.

## Analytics

**Nothing is installed.** GA4 and Google Tag Manager were both removed - there
are no tracking scripts on any page, and no data is being collected.

The event instrumentation in `js/site.js` was deliberately left in place. It is
inert: `track()` pushes each interaction to `window.dataLayer`, which with no
tag loaded just collects in memory and goes nowhere. It means switching
analytics on later is a paste job, not a rewrite.

### Events already instrumented

| Event | Fires when |
|---|---|
| `whatsapp_click` | a WhatsApp link is clicked |
| `call_click` | a `tel:` link is clicked |
| `contact_form_submit` | contact form submitted |
| `booking_open` | booking modal opened |
| `booking_step` | a booking step answered |
| `booking_submit` | **booking completed - the natural conversion** |
| `booking_result` | the Sheet write settles (`confirmed`/`unconfirmed`/`failed`) |
| `booking_abandon` | modal closed before submitting |

`cta_location` is one of `floating_button`, `booking_modal`, `contact_form`,
`header`, `footer`, `hero`, `page`.

### Turning it back on

Pick **one** system - not both for the same GA4 property, or every hit counts
twice.

**Google Tag Manager.** Paste its snippet into every page `<head>` plus the
`<noscript>` after `<body>`. GTM reads the dataLayer pushes directly; add a
Custom Event trigger per event name, then a tag for each. Remember to
**publish** the container - saving a tag changes nothing on the site.

**GA4 gtag.js on its own.** Paste its snippet into every page `<head>`, then
add this line to `track()` in `js/site.js`:

    if (typeof gtag === "function") gtag("event", event, params || {});

gtag.js ignores raw dataLayer pushes, so without that line you get page views
and none of the events above.

Whichever you choose, verify with DevTools > Network filtered to `collect` -
one request per event, and never two.
