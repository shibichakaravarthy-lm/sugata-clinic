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

## Still needs a backend (flagged in the brief)
- **Live booking slots** and **WhatsApp auto-reply** need a booking tool / WhatsApp
  Business API. Right now every "Book" button opens WhatsApp with a pre-filled message
  (reliable, works today). Wire up the automation when that service is chosen.

## Analytics (Google Tag Manager)

The site loads **one** tag: GTM container `GTM-TX449K9H`, inline at the top of
`<head>` on every page. There is no direct `gtag.js` — **GA4 (`G-846S2LVMRY`)
must be configured as a tag inside GTM**, or no data reaches the dashboard.

### Required GTM setup (one-time, in the GTM UI)
1. **GA4 Configuration tag** → Measurement ID `G-846S2LVMRY`, trigger *All Pages*.
   This alone gives you page views.
2. **Conversion events** — the site pushes these to `dataLayer` (see
   `initTracking()` in `js/site.js`). For each one, create a *Custom Event*
   trigger with the matching event name, and a **GA4 Event** tag that uses it:

   | Event name | Fires when | Parameters sent |
   |---|---|---|
   | `whatsapp_click` | any WhatsApp link/button is clicked | `cta_location`, `cta_text`, `page_path` |
   | `call_click` | any `tel:` phone link is clicked | `cta_location`, `phone_number`, `page_path` |
   | `contact_form_submit` | the contact form is submitted | `doctor`, `page_path` |

   `cta_location` is one of `floating_button`, `contact_form`, `header`,
   `footer`, `hero`, `page` — so you can see which CTA actually converts.
3. Register the parameters as **custom dimensions** in GA4
   (*Admin → Custom definitions*) if you want them in reports, then mark
   the events as **key events** (*Admin → Events*) to count them as conversions.
4. **Publish the container.** An unpublished GTM container loads and does nothing.

### Verifying
GTM *Preview* mode, or DevTools → Network filtered to `googletagmanager` —
`gtm.js?id=GTM-TX449K9H` should return 200, and clicking a WhatsApp button
should produce a `collect?...tid=G-846S2LVMRY` request. GA4 → *Realtime*
shows it within ~30s. Standard reports lag 24–48h. Ad blockers block all of
this, so test in a clean browser profile.
