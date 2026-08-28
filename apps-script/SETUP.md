# Booking → Google Sheet: one-time setup

The website posts each appointment request to a Google Apps Script Web App,
which writes a row to a Google Sheet and emails the clinic. Nothing runs on
the website's server — there isn't one.

## 1. Create the sheet
1. New Google Sheet, name it e.g. **Sugata Bookings**.
2. Copy its ID from the URL — `docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`.

The `Bookings` tab and its header row are created automatically on the first
booking. Don't rename the tab or reorder the columns.

## 2. Add the script
1. In the sheet: **Extensions → Apps Script**.
2. Delete the placeholder code, paste the whole of `Code.gs` from this folder.
3. Fill in the three values at the top:
   - `SHEET_ID` — from step 1
   - `CLINIC_EMAIL` — where booking alerts should go
   - `SECRET` — any phrase you like, but it **must match** `SECRET` in
     `js/booking.js` (currently `sugata-2026`)
4. Save.

## 3. Deploy
**Deploy → New deployment → Web app**

| Setting | Value |
|---|---|
| Execute as | **Me** |
| Who has access | **Anyone** |

"Anyone **with a Google account**" will not work — visitors aren't signed in,
and Google returns a login page instead of saving the booking.

Authorise when prompted. Google shows an "unverified app" warning because you
wrote the script yourself: **Advanced → Go to (project name)**. It needs
permission to edit the sheet and send mail as you.

Copy the **`/exec`** URL it gives you.

## 4. Connect the website
Open `js/booking.js` and paste the URL into `ENDPOINT` near the top:

```js
var ENDPOINT = "https://script.google.com/macros/s/AKfy.../exec";
```

Commit and push. Netlify deploys automatically.

## 5. Check it works
Open the site, click any **Book** button, complete the flow. Within a few
seconds you should get a new row in the sheet and an email.

Visiting the `/exec` URL directly in a browser should show
`{"ok":true,"service":"sugata-booking"}` — a quick way to confirm the
deployment is live.

---

## Things that catch people out

**Editing the script doesn't change the live site.** Apps Script keeps serving
the deployed version. After any edit: **Deploy → Manage deployments → edit
(pencil) → Version: New version → Deploy**. Use *Manage deployments*, not
*New deployment* — a new deployment gives you a different `/exec` URL and the
website keeps calling the old one.

**Don't use the `/dev` URL.** It only works while you're signed in as the
script's owner, so it appears to work for you and fails for every patient.

**Don't add headers to the request** in `js/booking.js`. Sending
`Content-Type: application/json` makes the browser send a CORS preflight
first, and Apps Script cannot answer one — the request fails every time. The
form-encoded body it uses now is deliberately preflight-exempt.

**Email limits.** `MailApp` allows 100 emails/day on a personal Gmail account,
1500/day on Google Workspace. Well above normal clinic volume, but that's the
ceiling.

**The endpoint URL is public.** Anyone viewing the page source can find it.
The shared secret, the honeypot field and the rate limit stop casual bots;
they are not real security. The worst case is junk rows in the sheet — no
patient data can be read back out, because the script only ever writes.

**The `Status` column** is yours to use — New / Called / Booked. The script
never touches it after creating the row.
