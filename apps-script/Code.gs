/* ============================================================
   Sugata Clinic — booking intake

   Receives appointment requests from the website booking modal
   (js/booking.js), appends a row to the Bookings sheet and emails
   the clinic.

   Deploy:  Extensions > Apps Script > Deploy > New deployment
            Type: Web app
            Execute as:      Me
            Who has access:  Anyone        <-- NOT "Anyone with a Google account"
   Then copy the /exec URL into ENDPOINT in js/booking.js.
   See SETUP.md for the full checklist.
   ============================================================ */

/* ---- Fill these in. Keep the real values here, not in the website repo. ---- */
var SHEET_ID     = "----";  // Sugata enquiries sheet
var SHEET_TAB    = "Bookings";
var CLINIC_EMAIL = "__CLINIC_EMAIL__";    // where booking alerts are sent
var SECRET       = "sugata-2026";         // must match SECRET in js/booking.js

var HEADERS = ["Timestamp", "Ref", "Specialty", "Doctor", "Type", "Service",
               "Visit mode", "Name", "Phone", "Country code", "Phone (as typed)", "Address",
               "Note", "Source page", "CTA", "Status"];

function doGet() {
  return json({ ok: true, service: "sugata-booking" });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    /* Two people booking at the same second must not collide on appendRow. */
    lock.waitLock(20000);

    var p = (e && e.parameter) || {};

    if (p.secret !== SECRET) return json({ ok: false, error: "auth" });

    /* Honeypot: a real person never fills this. Return ok so bots get no
       signal that they were caught, but write nothing. */
    if (p.company) return json({ ok: true, ref: p.ref || "" });

    if (!p.name || !p.phone) return json({ ok: false, error: "missing" });

    /* The browser enforces maxlength, but anyone can POST here directly.
       Clamp every field so a junk payload cannot bloat the sheet. */
    p.name       = clamp(p.name, 60);
    p.phone      = clamp(p.phone, 18);
    p.phone_raw  = clamp(p.phone_raw, 24);
    p.dial_code  = clamp(p.dial_code, 6);
    p.address    = clamp(p.address, 250);
    p.note       = clamp(p.note, 200);
    p.service    = clamp(p.service, 120);
    p.specialty  = clamp(p.specialty, 40);
    p.doctor     = clamp(p.doctor, 60);
    p.type       = clamp(p.type, 40);
    p.mode       = clamp(p.mode, 40);
    p.page       = clamp(p.page, 200);
    p.cta        = clamp(p.cta, 60);
    p.ref        = clamp(p.ref, 40);

    if (!/^\+?\d{10,15}$/.test(String(p.phone).replace(/\s/g, ""))) {
      return json({ ok: false, error: "phone" });
    }

    var cache = CacheService.getScriptCache();

    /* Idempotency: the browser retries and the no-cors fallback can both
       deliver the same booking. One ref = one row = one email. */
    if (p.ref && cache.get("ref:" + p.ref)) {
      return json({ ok: true, ref: p.ref, duplicate: true });
    }

    /* Light rate limit per phone number. */
    var rk = "rate:" + p.phone;
    var n = Number(cache.get(rk) || 0);
    if (n >= 3) return json({ ok: false, error: "rate" });
    cache.put(rk, String(n + 1), 600);

    sheet().appendRow([
      new Date(), p.ref || "", p.specialty || "", p.doctor || "", p.type || "",
      p.service || "", p.mode || "", p.name, p.phone, p.dial_code || "", p.phone_raw || "",
      p.address || "", p.note || "", p.page || "", p.cta || "", "New"
    ]);

    if (p.ref) cache.put("ref:" + p.ref, "1", 21600);

    notify(p);
    return json({ ok: true, ref: p.ref || "" });

  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "server" });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function sheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(SHEET_TAB) || ss.insertSheet(SHEET_TAB);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}

function notify(p) {
  var line = function (k, v) { return v ? k + ": " + v + "\n" : ""; };
  var subject = "New booking — " + p.name + " (" + (p.specialty || "") + ")";
  var body =
    "A new appointment request came in from the website.\n\n" +
    line("Name", p.name) +
    line("Phone", p.phone) +
    line("Specialty", p.specialty) +
    line("Doctor", p.doctor) +
    line("Type", p.type) +
    line("Service", p.service) +
    line("Preference", p.mode) +
    line("Address", p.address) +
    line("Note", p.note) +
    "\n" +
    line("Reference", p.ref) +
    line("Page", p.page) +
    line("Button", p.cta) +
    "\nOpen the sheet:\nhttps://docs.google.com/spreadsheets/d/" + SHEET_ID + "\n";

  MailApp.sendEmail({
    to: CLINIC_EMAIL,
    subject: subject,
    body: body,
    name: "Sugata Website"
  });
}

/* ContentService has no setHeader(), so CORS headers cannot be added here.
   They come from the script.googleusercontent.com redirect target, which is
   why the browser request must stay CORS-simple (form-encoded, no custom
   headers) — see the comment in js/booking.js. */
function clamp(v, max) {
  return String(v == null ? "" : v).trim().slice(0, max);
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
                       .setMimeType(ContentService.MimeType.JSON);
}
