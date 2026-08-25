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
