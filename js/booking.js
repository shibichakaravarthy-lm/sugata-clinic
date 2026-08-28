/* ============================================================
   Sugata — appointment booking flow

   A guided modal: specialty → type → (service) → visit mode →
   name + phone, posted to a Google Apps Script Web App which
   appends a row to a Google Sheet and emails the clinic.

   SETUP: deploy apps-script/Code.gs, then paste its /exec URL
   into ENDPOINT below. See apps-script/SETUP.md.

   Everything lives inside this IIFE. Page inline scripts already
   declare globals named wa, base, msg, lb, id, s, card, html,
   DOCTORS, FEES, render… — a single re-declared global here
   would throw and kill the whole page script.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Config ---------- */

  /* Paste the Apps Script Web App /exec URL here. Until it is set the
     flow still runs and falls back to WhatsApp, so the site never has a
     dead Book button. */
  var ENDPOINT = "";

  var SECRET = "sugata-2026";   /* must match SECRET in apps-script/Code.gs */
  var TIMEOUT_MS = 12000;
  var MIN_FILL_MS = 2500;       /* faster than this = bot */

  var CLINIC_HOURS = "Mon–Sat, 9:30 AM – 8:30 PM";

  /* Fallback labels, used only if services-data.js failed to load. */
  var DOCTOR_FALLBACK = { gyn: "Dr. Roshana Fulmali", car: "Dr. Mukul R Fulmali" };
  var ROLE_FALLBACK = {
    gyn: "Obstetrician, Gynaecologist & Fertility Specialist",
    car: "Consultant Cardiologist",
  };

  /* ---------- State ---------- */

  var state = null;      /* current booking, reset on every open */
  var root = null;       /* modal element, built once on first open */
  var stepIndex = 0;
  var locked = 0;        /* steps below this were prefilled; Back can't reach them */
  var lastFocus = null;
  var openedAt = 0;
  var sending = false;
  var settled = false;   /* a terminal screen is showing */

  function blankState() {
    return {
      spec: null,        /* "gyn" | "car"   */
      type: null,        /* "lab" | "consult" */
      service: null,     /* service id */
      mode: null,        /* "direct" | "online" */
      name: "",
      phone: "",
      phoneRaw: "",
      note: "",
      src: "",
      ctaText: "",
      ref: null,
    };
  }

  /* ---------- Small helpers ---------- */

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function fire(event, params) {
    if (typeof track === "function") track(event, params || {});
  }

  function makeRef() {
    var t = Date.now().toString(36).toUpperCase();
    var r = Math.random().toString(36).slice(2, 5).toUpperCase();
    return "SG-" + t.slice(-5) + "-" + r;
  }

  function waHref(message) {
    if (typeof waLink === "function") return waLink(message);
    var num = (typeof SITE !== "undefined" && SITE.whatsapp) || "918123432935";
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(message);
  }

  /* ---------- Catalogue adapter ----------
     Single source of truth is services-data.js. Every page loads it, but
     guard anyway so a missing file degrades the flow instead of breaking
     it: without CATEGORIES the service step is skipped, not crashed. */

  function catFor(spec) {
    if (typeof CATEGORIES === "undefined" || !CATEGORIES) return null;
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].key === spec) return CATEGORIES[i];
    }
    return null;
  }

  function haveCatalogue() {
    return typeof SERVICES !== "undefined" && typeof CATEGORIES !== "undefined";
  }

  function doctorName(spec) {
    var c = catFor(spec);
    return (c && c.doctor) || DOCTOR_FALLBACK[spec] || "";
  }

  function doctorRole(spec) {
    var c = catFor(spec);
    return (c && c.role) || ROLE_FALLBACK[spec] || "";
  }

  function serviceTitle(id) {
    if (typeof SERVICES !== "undefined" && SERVICES[id]) return SERVICES[id].title;
    return id || "";
  }

  /* [{ stage, items:[{id,title}] }] for one specialty */
  function stagesFor(spec) {
    var c = catFor(spec);
    if (!c || !c.stages) return [];
    return c.stages.map(function (st) {
      return {
        stage: st.stage,
        items: st.ids.map(function (id) {
          return { id: id, title: serviceTitle(id) };
        }),
      };
    });
  }

  /* ---------- Step machine ---------- */

  function steps() {
    var s = ["spec", "type"];
    /* Only ask which service when it's a consultation — and only if we
       actually have the catalogue to ask from. */
    if (state.type === "consult" && haveCatalogue()) s.push("service");
    s.push("mode", "details");
    return s;
  }

  function valueOf(step) {
    if (step === "spec") return state.spec;
    if (step === "type") return state.type;
    if (step === "service") return state.service;
    if (step === "mode") return state.mode;
    return null;                       /* details is never pre-satisfied */
  }

  /* First step the user still has to answer. */
  function firstOpenStep() {
    var s = steps();
    for (var i = 0; i < s.length; i++) {
      if (!valueOf(s[i])) return i;
    }
    return s.length - 1;
  }

  function currentStep() {
    return steps()[stepIndex];
  }

  /* Choosing a value clears everything downstream, so switching
     Consultation → Lab Test can't leave a stale service attached. */
  function choose(field, value) {
    if (field === "spec" && state.spec !== value) state.service = null;
    if (field === "type" && state.type !== value) state.service = null;
    state[field] = value;

    fire("booking_step", {
      step: field,
      value: value,
      step_index: stepIndex + 1,
      step_count: steps().length,
      specialty: state.spec || "",
      booking_type: state.type || "",
    });

    var s = steps();
    stepIndex = Math.min(stepIndex + 1, s.length - 1);
    /* If the next step is already answered by prefill, walk past it. */
    while (stepIndex < s.length - 1 && valueOf(s[stepIndex])) stepIndex++;
    render();
  }

  function back() {
    if (stepIndex <= locked) return;
    stepIndex--;
    /* Clear the step we just came back to so the user can re-answer it. */
    var step = steps()[stepIndex];
    if (step !== "details") state[step] = null;
    render();
  }

  /* ---------- Markup ---------- */

  var SHELL =
    '<div class="bk-dialog" role="document">' +
      '<header class="bk-head">' +
        '<div class="bk-prog">' +
          '<span class="bk-dots" aria-hidden="true"></span>' +
          '<span class="bk-count" aria-live="polite"></span>' +
        '</div>' +
        '<button class="bk-close" type="button" aria-label="Close booking">&times;</button>' +
      '</header>' +
      '<div class="bk-body">' +
        '<h2 id="bkTitle" class="bk-title"></h2>' +
        '<p class="bk-sub"></p>' +
        '<div class="bk-step"></div>' +
      '</div>' +
      '<footer class="bk-foot">' +
        '<button class="bk-back" type="button">&larr; Back</button>' +
        '<span class="bk-crumb"></span>' +
      '</footer>' +
    '</div>';

  function card(field, value, title, note, tone) {
    return (
      '<button class="bk-card' + (tone ? " " + tone : "") + '" type="button"' +
      ' data-choose="' + field + '" data-value="' + esc(value) + '">' +
        '<span class="l">' + esc(title) + '</span>' +
        (note ? '<span class="n">' + esc(note) + '</span>' : "") +
      '</button>'
    );
  }

  function stepSpec() {
    return (
      '<div class="bk-grid2">' +
        card("spec", "gyn", "Gynaecologist", doctorName("gyn") + " · Women's health", "gyn") +
        card("spec", "car", "Cardiologist", doctorName("car") + " · Heart care", "car") +
      "</div>"
    );
  }

  function stepType() {
    return (
      '<div class="bk-grid2">' +
        card("type", "consult", "Consultation", "See " + doctorName(state.spec)) +
        card("type", "lab", "Lab Test", "Bloods, scans, ECG or ECHO") +
      "</div>"
    );
  }

  function stepService() {
    var groups = stagesFor(state.spec);
    if (!groups.length) return '<p class="bk-sub">No services listed.</p>';
    return groups.map(function (g) {
      return (
        '<div class="bk-group">' +
          '<span class="bk-stage">' + esc(g.stage) + "</span>" +
          g.items.map(function (it) {
            return (
              '<button class="bk-row" type="button" data-choose="service" data-value="' +
              esc(it.id) + '">' + esc(it.title) + "</button>"
            );
          }).join("") +
        "</div>"
      );
    }).join("");
  }

  function stepMode() {
    var lab = state.type === "lab";
    return (
      '<div class="bk-grid2">' +
        card("mode", "direct", lab ? "At the clinic" : "In clinic",
             lab ? "Come in for your test" : "Visit us in Indiranagar") +
        card("mode", "online", lab ? "Home collection" : "Online consultation",
             lab ? "Sample collected at home" : "Video call with the doctor") +
      "</div>"
    );
  }

  function stepDetails() {
    return (
      '<form class="cform bk-form" novalidate>' +
        '<div class="bk-field">' +
          "<label for=\"bkName\">Your name</label>" +
          '<input type="text" id="bkName" name="name" autocomplete="name"' +
          ' placeholder="Full name" value="' + esc(state.name) + '">' +
          '<p class="bk-err" id="bkNameErr" role="alert" hidden></p>' +
        "</div>" +
        '<div class="bk-field">' +
          "<label for=\"bkPhone\">Phone number</label>" +
          '<input type="tel" id="bkPhone" name="phone" inputmode="numeric"' +
          ' autocomplete="tel" placeholder="10-digit mobile number" value="' +
          esc(state.phoneRaw) + '">' +
          '<p class="bk-err" id="bkPhoneErr" role="alert" hidden></p>' +
        "</div>" +
        /* honeypot — hidden from people, catnip for bots */
        '<input class="bk-hp" type="text" name="company" tabindex="-1"' +
        ' autocomplete="off" aria-hidden="true">' +
        '<div class="bk-alert" role="alert" hidden></div>' +
        '<button type="submit" class="btn ' + primaryBtn() + ' bk-submit">' +
          "Request appointment" +
        "</button>" +
        '<p class="bk-fine">We\'ll call or WhatsApp you to confirm your slot. ' +
        "No payment is taken online.</p>" +
      "</form>"
    );
  }

  function primaryBtn() {
    return state.spec === "car" ? "btn-cardiac" : "btn-primary";
  }

  var TITLES = {
    spec: ["Who would you like to see?", "Pick the specialist you need."],
    type: ["What do you need?", "Choose a consultation or a lab test."],
    service: ["Which service?", "Pick the one closest to your concern."],
    mode: ["How would you like to be seen?", ""],
    details: ["Almost done", "Just your name and number — we'll do the rest."],
  };

  /* ---------- Summary + WhatsApp fallback ---------- */

  function summaryLines() {
    var out = [];
    if (state.spec) out.push("Doctor: " + doctorName(state.spec));
    out.push("Type: " + (state.type === "lab" ? "Lab Test" : "Consultation"));
    if (state.service) out.push("Service: " + serviceTitle(state.service));
    if (state.mode) {
      out.push("Preference: " + modeLabel());
    }
    if (state.name) out.push("Name: " + state.name);
    if (state.phone) out.push("Phone: " + state.phone);
    if (state.note) out.push("Note: " + state.note);
    if (state.ref) out.push("Ref: " + state.ref);
    return out;
  }

  function modeLabel() {
    var lab = state.type === "lab";
    if (state.mode === "direct") return lab ? "At the clinic" : "In clinic";
    if (state.mode === "online") return lab ? "Home collection" : "Online consultation";
    return "";
  }

  function whatsappSummaryHref() {
    return waHref(
      "Hi Sugata Clinic, I'd like to book an appointment.\n\n" + summaryLines().join("\n")
    );
  }

  function crumb() {
    var bits = [];
    if (state.spec) bits.push(doctorName(state.spec).replace(/^Dr\. /, "Dr. "));
    if (state.type) bits.push(state.type === "lab" ? "Lab Test" : "Consultation");
    if (state.service) bits.push(serviceTitle(state.service));
    return bits.join(" · ");
  }

  /* ---------- Render ---------- */

  function render() {
    var s = steps();
    var step = s[stepIndex];
    var body = root.querySelector(".bk-step");
    var title = root.querySelector(".bk-title");
    var sub = root.querySelector(".bk-sub");

    root.classList.remove("gyn", "car");
    if (state.spec) root.classList.add(state.spec);

    title.textContent = TITLES[step][0];
    sub.textContent = TITLES[step][1];
    sub.hidden = !TITLES[step][1];

    if (step === "spec") body.innerHTML = stepSpec();
    else if (step === "type") body.innerHTML = stepType();
    else if (step === "service") body.innerHTML = stepService();
    else if (step === "mode") body.innerHTML = stepMode();
    else body.innerHTML = stepDetails();

    root.querySelector(".bk-count").textContent =
      "Step " + (stepIndex + 1) + " of " + s.length;
    root.querySelector(".bk-dots").innerHTML = s.map(function (_, i) {
      return '<i class="bk-dot' + (i < stepIndex ? " done" : i === stepIndex ? " on" : "") + '"></i>';
    }).join("");

    root.querySelector(".bk-back").hidden = stepIndex <= locked;
    root.querySelector(".bk-crumb").textContent = crumb();
    root.querySelector(".bk-prog").hidden = false;
    root.querySelector(".bk-foot").hidden = false;

    focusFirst();
  }

  /* Terminal screens replace the whole body and hide the step chrome. */
  function renderTerminal(kind) {
    settled = true;
    var body = root.querySelector(".bk-step");
    var title = root.querySelector(".bk-title");
    var sub = root.querySelector(".bk-sub");
    root.querySelector(".bk-prog").hidden = true;
    root.querySelector(".bk-foot").hidden = true;
    sub.hidden = false;

    var wa = whatsappSummaryHref();
    var refLine = state.ref
      ? '<p class="bk-ref">Reference <strong>' + esc(state.ref) + "</strong></p>"
      : "";

    if (kind === "confirmed") {
      title.textContent = "Request received";
      sub.textContent = "We'll call or WhatsApp you to confirm your slot — usually within clinic hours (" + CLINIC_HOURS + ").";
      body.innerHTML =
        '<div class="bk-done"><span class="bk-tick" aria-hidden="true">&#10003;</span>' +
        refLine +
        '<div class="bk-summary">' + summaryHTML() + "</div>" +
        '<a class="btn btn-ghost bk-wa" href="' + esc(wa) + '" target="_blank" rel="noopener">Send on WhatsApp</a>' +
        '<button type="button" class="bk-done-close">Close</button>' +
        "</div>";
    } else if (kind === "unconfirmed") {
      title.textContent = "Request sent";
      sub.textContent = "We couldn't get a confirmation back from our system. Your request was most likely received — if you don't hear from us within clinic hours, send it on WhatsApp too.";
      body.innerHTML =
        '<div class="bk-done"><span class="bk-tick warn" aria-hidden="true">!</span>' +
        refLine +
        '<div class="bk-summary">' + summaryHTML() + "</div>" +
        '<a class="btn ' + primaryBtn() + ' bk-wa" href="' + esc(wa) + '" target="_blank" rel="noopener">Send on WhatsApp</a>' +
        '<button type="button" class="bk-done-close">Close</button>' +
        "</div>";
    }
  }

  function summaryHTML() {
    return summaryLines().map(function (l) {
      var i = l.indexOf(": ");
      return '<div><span class="k">' + esc(l.slice(0, i)) + "</span>" +
             "<span>" + esc(l.slice(i + 2)) + "</span></div>";
    }).join("");
  }

  /* ---------- Validation ---------- */

  /* Indian mobile: 10 digits starting 6-9, with optional +91 / 91 / 0.

     Known limit: an 11-digit number with a leading 0 is ambiguous — a
     Bangalore landline "080 2345 6789" and a mobile "0 8023456789" are the
     same digits. We accept it rather than reject, because turning away a
     real mobile is worse for a clinic than accepting a landline someone
     will simply be called back on. The untouched input is also sent as
     phone_raw and lands in the sheet's "Phone (as typed)" column, so staff
     always see exactly what the patient typed. */
  function normalisePhone(raw) {
    var d = String(raw || "").replace(/\D/g, "");
    if (d.length === 13 && d.slice(0, 3) === "091") d = d.slice(3);
    else if (d.length === 12 && d.slice(0, 2) === "91") d = d.slice(2);
    else if (d.length === 11 && d.charAt(0) === "0") d = d.slice(1);
    return /^[6-9]\d{9}$/.test(d) ? "+91" + d : null;
  }

  function validName(v) {
    var n = String(v || "").trim();
    if (n.length < 2 || n.length > 60) return null;
    if (/[<>{}[\]\\/]/.test(n)) return null;
    return n;
  }

  function showErr(id, message) {
    var el = root.querySelector("#" + id);
    if (!el) return;
    el.textContent = message || "";
    el.hidden = !message;
    var field = el.closest(".bk-field");
    if (field) field.classList.toggle("invalid", !!message);
    var input = field && field.querySelector("input");
    if (input) {
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
  }

  /* ---------- Submit ---------- */

  function payload() {
    return {
      secret: SECRET,
      ref: state.ref,
      specialty: state.spec === "car" ? "Cardiology" : "Gynaecology",
      spec_key: state.spec || "",
      doctor: doctorName(state.spec),
      type: state.type === "lab" ? "Lab Test" : "Consultation",
      service: state.service ? serviceTitle(state.service) : "",
      service_id: state.service || "",
      mode: modeLabel(),
      name: state.name,
      phone: state.phone,
      phone_raw: state.phoneRaw,
      note: state.note || "",
      page: location.pathname + location.search,
      cta: state.src || "",
      company: "",
    };
  }

  function submit(form) {
    if (sending) return;

    var nameEl = root.querySelector("#bkName");
    var phoneEl = root.querySelector("#bkPhone");
    var hp = form.querySelector(".bk-hp");

    var name = validName(nameEl.value);
    var phone = normalisePhone(phoneEl.value);

    showErr("bkNameErr", name ? "" : "Please enter your name.");
    showErr("bkPhoneErr", phone ? "" : "Enter a 10-digit Indian mobile number.");
    if (!name) { nameEl.focus(); return; }
    if (!phone) { phoneEl.focus(); return; }

    state.name = name;
    state.phone = phone;
    state.phoneRaw = phoneEl.value.trim();
    if (!state.ref) state.ref = makeRef();

    /* Bots fill instantly and fill hidden fields. Treat both as success
       so they get no signal, but send nothing. */
    var tooFast = Date.now() - openedAt < MIN_FILL_MS;
    if ((hp && hp.value) || tooFast) { renderTerminal("confirmed"); return; }

    fire("booking_submit", {
      specialty: state.spec || "",
      doctor: doctorName(state.spec),
      booking_type: state.type || "",
      service: state.service ? serviceTitle(state.service) : "",
      visit_mode: modeLabel(),
      booking_ref: state.ref,
      cta_location: state.src || "",
      page_path: location.pathname,
    });

    send(form);
  }

  function setSending(form, on) {
    sending = on;
    var btn = form.querySelector(".bk-submit");
    if (!btn) return;
    btn.disabled = on;
    btn.textContent = on ? "Sending…" : "Request appointment";
  }

  function alertBox(form, message) {
    var box = form.querySelector(".bk-alert");
    if (!box) return;
    if (!message) { box.hidden = true; box.innerHTML = ""; return; }
    box.hidden = false;
    box.innerHTML =
      "<p>" + esc(message) + "</p>" +
      '<div class="bk-alert-acts">' +
        '<button type="button" class="btn btn-ghost btn-sm bk-retry">Try again</button>' +
        '<a class="btn ' + primaryBtn() + ' btn-sm" href="' + esc(whatsappSummaryHref()) +
        '" target="_blank" rel="noopener">Send on WhatsApp</a>' +
        '<a class="btn btn-ghost btn-sm" href="tel:' +
        esc((typeof SITE !== "undefined" && SITE.phone) || "+918123432935") + '">Call the clinic</a>' +
      "</div>";
  }

  function send(form) {
    setSending(form, true);
    alertBox(form, "");

    if (!ENDPOINT) {
      /* Not configured yet — never pretend it saved. */
      setSending(form, false);
      done("unconfirmed", "not_configured");
      return;
    }

    var body = new URLSearchParams(payload());
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, TIMEOUT_MS) : null;

    /* No headers object on purpose. URLSearchParams sends
       application/x-www-form-urlencoded, which is CORS-safelisted, so the
       browser skips the preflight. Apps Script cannot answer a preflight
       OPTIONS request, so setting Content-Type: application/json here
       would fail every single time. redirect:"follow" matters too — /exec
       302s to script.googleusercontent.com and it is that response which
       carries Access-Control-Allow-Origin. */
    fetch(ENDPOINT, {
      method: "POST",
      body: body,
      redirect: "follow",
      signal: ctrl ? ctrl.signal : undefined,
    })
      .then(function (res) { return res.text(); })
      .then(function (text) {
        if (timer) clearTimeout(timer);
        var data = null;
        try { data = JSON.parse(text); } catch (err) { data = null; }
        setSending(form, false);
        if (data && data.ok) done("confirmed", "");
        else if (data && data.error) fail(form, data.error);
        else done("unconfirmed", "unparseable");
      })
      .catch(function (err) {
        if (timer) clearTimeout(timer);
        /* Last resort: no-cors still delivers the request (the row gets
           written, the email goes out) but the response is opaque, so we
           can only ever call this "sent", never "confirmed". */
        fetch(ENDPOINT, { method: "POST", mode: "no-cors", body: body, keepalive: true })
          .then(function () {
            setSending(form, false);
            done("unconfirmed", String((err && err.name) || "network"));
          })
          .catch(function () {
            setSending(form, false);
            fail(form, String((err && err.name) || "network"));
          });
      });
  }

  function done(kind, reason) {
    fire("booking_result", {
      status: kind,
      booking_ref: state.ref || "",
      reason: reason || "",
    });
    renderTerminal(kind);
  }

  /* Both attempts failed — stay on the form, keep every answer, and give
     the patient a route that definitely works. A booking must never be
     lost to a network error. */
  function fail(form, reason) {
    fire("booking_result", { status: "failed", booking_ref: state.ref || "", reason: reason });
    setSending(form, false);
    alertBox(form, "We couldn't reach the clinic just now — your details are safe.");
  }

  /* ---------- Open / close ---------- */

  function ensureMounted() {
    if (root) return root;
    root = document.createElement("div");
    root.className = "bk-modal";
    root.id = "bookingModal";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-labelledby", "bkTitle");
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = SHELL;
    document.body.appendChild(root);
    wire();
    return root;
  }

  function readPrefill(el) {
    var d = el.dataset || {};
    return {
      spec: d.bookSpec || null,
      type: d.bookType || null,
      service: d.bookService || null,
      note: d.bookNote || "",
      src: d.bookSrc || "",
    };
  }

  function open(prefill, trigger) {
    ensureMounted();

    state = blankState();
    state.spec = prefill.spec || null;
    state.type = prefill.type || null;
    state.service = prefill.service || null;
    state.note = prefill.note || "";
    state.src = prefill.src || "";
    state.ctaText = (trigger && (trigger.textContent || "").trim().slice(0, 60)) || "";

    /* A prefilled service implies a consultation. */
    if (state.service && !state.type) state.type = "consult";

    stepIndex = firstOpenStep();
    locked = stepIndex;
    sending = false;
    settled = false;
    openedAt = Date.now();

    lastFocus = trigger || document.activeElement;
    root.classList.add("open");
    root.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    render();

    fire("booking_open", {
      cta_location: state.src || "page",
      cta_text: state.ctaText,
      prefill_spec: state.spec || "",
      prefill_service: state.service || "",
      page_path: location.pathname,
    });
  }

  function close() {
    if (!root || !root.classList.contains("open")) return;
    root.classList.remove("open");
    root.setAttribute("aria-hidden", "true");

    /* index.html and contact.html have their own gallery lightbox using the
       same scroll lock. Don't unlock the page out from under it. */
    if (!document.querySelector(".lightbox.open")) document.body.style.overflow = "";

    if (!settled) {
      fire("booking_abandon", {
        last_step: currentStep(),
        step_index: stepIndex + 1,
        page_path: location.pathname,
      });
    }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function focusFirst() {
    var el = root.querySelector(".bk-card, .bk-row, input, .bk-done-close");
    if (el && el.focus) el.focus({ preventScroll: true });
  }

  function trapTab(e) {
    var items = Array.prototype.filter.call(
      root.querySelectorAll('button, a[href], input, select, textarea'),
      function (el) { return !el.disabled && el.offsetParent !== null; }
    );
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  /* ---------- Wiring ---------- */

  function wire() {
    root.addEventListener("click", function (e) {
      /* Backdrop — exact target only, matching the lightbox convention. */
      if (e.target === root) { close(); return; }

      if (e.target.closest(".bk-close, .bk-done-close")) { close(); return; }
      if (e.target.closest(".bk-back")) { back(); return; }
      if (e.target.closest(".bk-retry")) {
        var form = root.querySelector(".bk-form");
        if (form) send(form);
        return;
      }
      var pick = e.target.closest("[data-choose]");
      if (pick) choose(pick.getAttribute("data-choose"), pick.getAttribute("data-value"));
    });

    root.addEventListener("submit", function (e) {
      var form = e.target.closest(".bk-form");
      if (!form) return;
      e.preventDefault();
      submit(form);
    });

    /* Clear an error as soon as the field is edited. */
    root.addEventListener("input", function (e) {
      if (e.target.id === "bkName") showErr("bkNameErr", "");
      if (e.target.id === "bkPhone") showErr("bkPhoneErr", "");
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "Tab") trapTab(e);
    });
  }

  /* Capture phase, deliberately. site.js loads first, so its bubble-phase
     click listener on document is registered before ours — stopping
     propagation from a bubble listener here would be too late. Capturing on
     document runs before any bubble listener on document, so a Book button
     that still carries a wa.me href doesn't also fire whatsapp_click. */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-book]");
    if (!t) return;
    e.preventDefault();
    e.stopPropagation();
    open(readPrefill(t), t);
  }, true);

  document.addEventListener("keydown", function (e) {
    if (!root || !root.classList.contains("open")) return;
    if (e.key === "Escape") close();
  });
})();
