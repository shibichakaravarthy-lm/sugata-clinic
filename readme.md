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

Two systems, each owning a different job:

| System | ID | Owns |
|---|---|---|
| **Google tag** (gtag.js, in every page `<head>`) | `G-88D3MYG22N` | **GA4** - page views and all 8 conversion events |
| **Google Tag Manager** | `GTM-TX449K9H` | **Google Ads** - conversion tracking and remarketing |

GA4 works on its own and does not depend on GTM. The GTM container is
currently published but empty, so the Google Ads side is not set up yet.

**Never add a GA4 tag for `G-88D3MYG22N` inside GTM.** gtag.js already sends
everything to that property; a GA4 tag in GTM would double every page view and
event with no error to warn you.

Google Ads setup guide: [`docs/gtm-setup.md`](docs/gtm-setup.md)

### What the site sends

`track()` in `js/site.js` sends each interaction to both systems - a
`dataLayer` push for GTM, and a `gtag("event", ...)` call for GA4. gtag.js
ignores raw dataLayer pushes, so both lines are needed.

| Event | Fires when |
|---|---|
| `whatsapp_click` | a WhatsApp link is clicked |
| `call_click` | a `tel:` link is clicked |
| `contact_form_submit` | contact form submitted |
| `booking_open` | booking modal opened |
| `booking_step` | a booking step answered |
| `booking_submit` | **booking completed - the conversion** |
| `booking_result` | the Sheet write settles (`confirmed`/`unconfirmed`/`failed`) |
| `booking_abandon` | modal closed before submitting |

`cta_location` is one of `floating_button`, `booking_modal`, `contact_form`,
`header`, `footer`, `hero`, `page`.

### In GA4
1. **Admin > Custom definitions** - register `cta_location`, `specialty`,
   `service`, `visit_mode`, `booking_type` as custom dimensions. Parameters do
   not appear in reports until registered, and it is not retroactive.
2. **Admin > Events** - mark `booking_submit` as a key event. That is the
   conversion, not `whatsapp_click`.

### Verifying
DevTools > Network, filter `collect` - one request per event. GA4 > Realtime
shows it within ~30s; standard reports lag 24-48h. Ad blockers block all of
this, so test in a clean browser profile.
