/* ============================================================
   Sugata — patient reviews
   REAL 5-star Google reviews (name + text) selected from the
   clinic's Google listing. Homepage shows the first 3; the
   Reviews page shows all. To add more, copy any block below.
   ============================================================ */

const REVIEWS = [
  {
    name: "Babitha Dhanraj",
    meta: "Gynaecology · Google",
    stars: 5,
    source: "google",
    photo: "",
    text:
      "I visited Sugata Clinic for the first time due to irregular periods. Dr. Roshana made me feel so comfortable discussing my concerns and never made me feel judged for seeing a gynaecologist. In Indian society, that kind of comfort is rare. I've found my gynaecologist for life.",
  },
  {
    name: "Sarath Chandramohan",
    meta: "Cardiology · Local Guide",
    stars: 5,
    source: "google",
    photo: "",
    text:
      "I am deeply grateful to Dr. Mukul for the exceptional care given to my mother during her cardiac arrest. His quick decision-making, expertise and compassionate approach saved her life during such a critical time. Thank you for giving my mother a second chance at life.",
  },
  {
    name: "Mayonka Mukherjee",
    meta: "Heart & Women's care · Local Guide",
    stars: 5,
    source: "google",
    photo: "",
    text:
      "Dr. Mukul and Dr. Roshana together have been our family's doctors for nearly two years now. They are highly experienced, knowledgeable and treat patients with compassion. Consulting them feels like a conversation in a safe space rather than the usual anxiety of a doctor visit.",
  },
  {
    name: "Sridevibhaskar Siri",
    meta: "Gynaecology · Google",
    stars: 5,
    source: "google",
    photo: "",
    text:
      "Dr. Roshana is absolutely wonderful. I usually feel very anxious about gynaecologist visits, but she made me feel completely comfortable and at ease from start to finish. She is kind, patient and has a fantastic bedside manner. The sisters were kind and friendly too. Highly recommend!",
  },
  {
    name: "Dinesh Prajapat",
    meta: "Fertility · Google",
    stars: 5,
    source: "google",
    photo: "",
    text:
      "We came here to plan our pregnancy and for fertility treatment. Dr. Roshana explained everything so simply and her approach is very caring. She is friendly and attends to every query attentively. I highly recommend her as the best gynaecologist near Indiranagar.",
  },
  {
    name: "Santrupti P",
    meta: "Cardiology · Google",
    stars: 5,
    source: "google",
    photo: "",
    text:
      "Dr. Mukul R Fulmali is the best cardiologist we have ever known. We took our mother to him during Covid and he helped recover her heart rate from 25% to 50%. Thank you so much for the excellent care and dedication — a great doctor healing people with his touch!",
  },
  {
    name: "Jomir Hushan",
    meta: "Heart & Women's care · Google",
    stars: 5,
    source: "google",
    photo: "",
    text:
      "If you are looking for a clean, hygienic clinic for gynaec and cardiology consultation with non-judgmental doctors and less waiting time, this clinic is very good to visit. The doctors and staff are very cooperative and care for patients on priority. Highly recommended.",
  },
  {
    name: "Anish Hegde",
    meta: "Gynaecology · Local Guide",
    stars: 5,
    source: "google",
    photo: "",
    text:
      "My wife and I consulted Dr. Roshana. We were not expecting the visit to be this informative. She took our entire history to understand us better and gave thorough information on everything we wanted. I highly recommend her for any woman looking for a caring, reliable gynaecologist.",
  },
  {
    name: "Priyanka Pujar",
    meta: "Gynaecology · Google",
    stars: 5,
    source: "google",
    photo: "",
    text:
      "Roshana ma'am is my go-to doctor anytime. Keep your awkwardness away before you step in, because she's one genuine person who makes you so comfortable with her treatment. You won't even feel you're with a doctor, thanks to her non-judgmental nature. Thank you, ma'am.",
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* small inline Google "G" mark */
const GOOGLE_G =
  '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3 0-5.6-2-6.5-4.8H1.5v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.5 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.5a12 12 0 0 0 0 10.8l4-3.1z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.5 6.6l4 3.1C6.4 6.8 9 4.8 12 4.8z"/></svg>';

function revCard(r) {
  const stars = "★".repeat(r.stars) + "☆".repeat(5 - r.stars);
  const av = r.photo
    ? `<div class="av"><img src="${r.photo}" alt="${r.name}" onerror="this.parentNode.textContent='${initials(
        r.name
      )}'"></div>`
    : `<div class="av">${initials(r.name)}</div>`;
  const gtag =
    r.source === "google"
      ? `<span class="g-tag" title="Posted on Google">${GOOGLE_G}</span>`
      : "";
  return `<div class="rev reveal">
    <div class="rev-top"><div class="stars">${stars}</div>${gtag}</div>
    <p>“${r.text}”</p>
    <div class="who">${av}<div><div class="n">${r.name}</div><div class="m">${r.meta}</div></div></div>
  </div>`;
}
