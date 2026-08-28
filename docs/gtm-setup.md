# Google Tag Manager setup — Google Ads only

Container **`GTM-TX449K9H`**, already on all 10 pages. Nothing in the code
needs changing; everything below happens at tagmanager.google.com.

## Who owns what

| System | ID | Owns |
|---|---|---|
| **Google tag** (gtag.js, in the page `<head>`) | `G-88D3MYG22N` | **GA4** — page views and all 8 conversion events |
| **GTM** (this container) | `GTM-TX449K9H` | **Google Ads** — conversion tracking and remarketing |

GA4 already works and does not depend on this container. If you never touch
GTM, analytics keeps running.

> ### The one rule
> **Never add a GA4 tag for `G-88D3MYG22N` inside this container.**
> gtag.js is already sending page views and events to that property. A GA4
> tag here would send everything a second time and silently double every
> number in your reports — with no error to warn you.
>
> GTM is for Google Ads tags only.

---

## What the website pushes to dataLayer

`track()` in `js/site.js` pushes each interaction. GTM sees each as a
**Custom Event** of that name. (These same events also go to GA4 directly via
gtag — that path needs no GTM setup.)

| Event | Fires when | Useful parameters |
|---|---|---|
| `whatsapp_click` | a WhatsApp link is clicked | `cta_location`, `cta_text` |
| `call_click` | a `tel:` link is clicked | `cta_location`, `phone_number` |
| `contact_form_submit` | contact form submitted | `doctor` |
| `booking_open` | booking modal opened | `cta_location`, `prefill_spec`, `prefill_service` |
| `booking_step` | a booking step answered | `step`, `value`, `step_index`, `step_count` |
| `booking_submit` | **booking completed — the conversion** | `specialty`, `doctor`, `booking_type`, `service`, `visit_mode`, `booking_ref` |
| `booking_result` | Sheet write settles | `status`, `booking_ref`, `reason` |
| `booking_abandon` | modal closed before submitting | `last_step`, `step_index` |

---

## 1. Get your Google Ads IDs

Google Ads → **Tools → Conversions**. Create a conversion action of type
**Website** if you don't have one. You need:

- **Conversion ID** — looks like `AW-123456789`
- **Conversion Label** — a short string like `AbC-D_efGh12345`

## 2. Conversion linker

**Tags → New → Conversion Linker**, trigger **All Pages**. Name it
`Conversion Linker`.

Add this first. It preserves ad-click information across pages; without it
conversions get attributed poorly and you may never notice.

## 3. Trigger for the conversion

**Triggers → New → Custom Event**

| Field | Value |
|---|---|
| Event name | `booking_submit` |
| Fires on | All Custom Events |

Name it `CE - booking_submit`.

Use `booking_submit`, **not** `booking_open` — a started booking is not a
booking. And never All Pages: every page view would count as a converted
appointment and your cost-per-conversion would be meaningless.

## 4. Conversion tracking tag

**Tags → New → Google Ads Conversion Tracking**

| Field | Value |
|---|---|
| Conversion ID | your `AW-…` |
| Conversion Label | your label |
| Trigger | `CE - booking_submit` |

Leave Conversion Value empty unless you want to assign a rupee value per
appointment.

Optional, to see which specialty converts: **Variables → New → Data Layer
Variable**, name `dlv - specialty`, variable name `specialty`. You can then
pass it through on the tag.

## 5. Remarketing tag

**Tags → New → Google Ads Remarketing**

| Field | Value |
|---|---|
| Conversion ID | the same `AW-…` |
| Trigger | **All Pages** |

For the audience you wanted — people who started a booking but didn't finish —
build it in **Google Ads → Audience Manager** from the `booking_open` event
with `booking_submit` excluded. Both events already reach GA4, so link your
GA4 property to Google Ads and the audience becomes available there.

## 6. Publish

**Submit → name the version → Publish.**

Nothing above is live until you do this. Saving a tag changes nothing on the
website. This container has been published-but-empty since it was created,
which is exactly what that mistake looks like.

---

## Verifying

**GTM Preview** — click *Preview*, enter `https://sugataclinic.com`, complete a
booking. `booking_submit` should appear in the timeline with the conversion tag
firing. It should fire **once**.

**Google Ads** → Tools → Conversions. Status moves from "No recent
conversions" to "Recording conversions" within ~24h of the first real booking.

**Check the container is genuinely published:**

    curl -s "https://www.googletagmanager.com/gtm.js?id=GTM-TX449K9H" | grep -o '"tags":.\{0,60\}'

An empty `tags` array means nothing is live yet.

**Check you haven't double-tagged GA4** — the failure this setup is designed to
avoid:

    curl -s "https://www.googletagmanager.com/gtm.js?id=GTM-TX449K9H" | grep -c "G-88D3MYG22N"

This must print **0**. Anything else means a GA4 tag has been added to the
container and your GA4 numbers are now doubled.

---

## Traps

- **Publishing is separate from saving.** The single most common cause of
  "I set it up and nothing happened".
- **No GA4 tag in this container.** See the rule at the top.
- **Never fire an Ads conversion on All Pages.**
- **Ad blockers block GTM and gtag.js both.** Verify in a clean browser profile
  before concluding anything is broken.
