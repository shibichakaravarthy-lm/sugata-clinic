/* ============================================================
   Sugata — SEO metadata + URL slugs

   Single source of truth for every page's <title>, meta description,
   H1 and canonical URL. Titles/descriptions marked (sheet) come from
   the client's SEO sheet; the rest are written to the same pattern.

   Used by tools/build.js to generate the service pages, the blog and
   sitemap.xml. Editing a value here and re-running `node tools/build.js`
   updates the live page.
   ============================================================ */

var SITE_URL = "https://sugataclinic.com";

/* Static pages. `path` is the canonical URL path. */
var PAGE_SEO = {
  "index.html": {
    path: "/",
    title: "Best Gynecologist & Cardiologist in Indiranagar, Bangalore | Sugata Clinic",
    description: "Looking for the best gynecologist and cardiologist in Indiranagar, Bangalore? Sugata Clinic offers trusted pregnancy care, fertility treatment, women's healthcare and advanced cardiac care. Book your appointment today.",
    h1: "Best Gynecologist & Cardiologist in Indiranagar, Bangalore",
    priority: "1.0",
  },
  "dr-roshana.html": {
    path: "/dr-roshana",
    title: "Best Gynecologist in Indiranagar, Bangalore | Dr. Roshana Fulmali | Sugata Clinic",
    description: "Consult Dr. Roshana Fulmali, one of the best gynecologists in Indiranagar, Bangalore for pregnancy care, PCOS, infertility, menstrual disorders and women's health.",
    h1: "Best Gynecologist in Indiranagar, Bangalore",
    priority: "0.9",
  },
  "dr-mukul.html": {
    path: "/dr-mukul",
    title: "Best Cardiologist in Indiranagar, Bangalore | Dr. Mukul Fulmali | Sugata Clinic",
    description: "Meet Dr. Mukul Fulmali, an experienced cardiologist in Indiranagar, Bangalore for heart disease, angioplasty, hypertension, heart failure and preventive cardiac care.",
    h1: "Best Cardiologist in Indiranagar, Bangalore",
    priority: "0.9",
  },
  "doctors.html": {
    path: "/doctors",
    title: "Best Gynecologist & Cardiologist in Indiranagar | Sugata Clinic",
    description: "Meet our experienced gynecologist and cardiologist providing comprehensive women's health and advanced heart care in Indiranagar, Bangalore.",
    h1: "Meet Our Expert Doctors - Gynecologist & Cardiologist",
    priority: "0.9",
  },
  "diagnostics.html": {
    path: "/diagnostics",
    title: "Best Diagnostic Centre in Indiranagar, Bangalore | ECG, ECHO & Ultrasound | Sugata Clinic",
    description: "Visit our diagnostic centre in Indiranagar, Bangalore for ECG, ECHO, ultrasound, laboratory tests and comprehensive diagnostics.",
    h1: "Best Diagnostic Centre in Indiranagar, Bangalore",
    priority: "0.8",
  },
  "contact.html": {
    path: "/contact",
    title: "Book Appointment with Best Gynecologist & Cardiologist in Indiranagar | Sugata Clinic",
    description: "Contact Sugata Clinic to book appointments with experienced gynecologists and cardiologists in Indiranagar, Bangalore.",
    h1: "Contact Sugata Clinic",
    priority: "0.8",
  },
  /* Not in the SEO sheet — written to the same pattern. */
  "services.html": {
    path: "/services",
    title: "Women's Health & Heart Care Services in Indiranagar, Bangalore | Sugata Clinic",
    description: "Explore our full range of gynaecology, pregnancy, fertility and cardiac services in Indiranagar, Bangalore — from antenatal care and IVF to angioplasty and heart failure treatment.",
    h1: "Our Services in Indiranagar, Bangalore",
    priority: "0.9",
  },
  "journey.html": {
    path: "/journey",
    title: "Your Care Journey at Sugata Clinic | Indiranagar, Bangalore",
    description: "What to expect at Sugata Clinic, Indiranagar — from booking your first appointment through consultation, diagnostics and follow-up care.",
    h1: "Your Journey With Us",
    priority: "0.6",
  },
  "reviews.html": {
    path: "/reviews",
    title: "Patient Reviews & Testimonials | Sugata Clinic, Indiranagar Bangalore",
    description: "Read what our patients say about pregnancy care, gynaecology and cardiac treatment at Sugata Clinic, Indiranagar, Bangalore.",
    h1: "What Our Patients Say",
    priority: "0.6",
  },
};

/* Service pages: id -> slug + SEO. Slug becomes /services/<slug>.
   Entries marked (sheet) are verbatim from the client's SEO sheet. */
var SERVICE_SEO = {
  /* ---- Women's health ---- */
  "pregnancy-antenatal": {
    slug: "pregnancy-antenatal-care",
    title: "Best Pregnancy Care in Indiranagar, Bangalore | Expert Antenatal Care | Sugata Clinic",
    description: "Complete pregnancy care in Indiranagar, Bangalore including antenatal checkups, pregnancy scans, high-risk pregnancy management and delivery planning.",
    h1: "Best Pregnancy Care in Indiranagar, Bangalore",
  },
  "safe-vaginal-delivery": {
    slug: "normal-delivery",
    title: "Best Normal Delivery Doctor in Indiranagar, Bangalore | Sugata Clinic",
    description: "Looking for the best normal delivery doctor in Indiranagar, Bangalore? Get expert pregnancy care, labour support and safe vaginal delivery at Sugata Clinic.",
    h1: "Best Normal Delivery Doctor in Indiranagar, Bangalore",
  },
  "ivf-icsi": {
    slug: "ivf-treatment",
    title: "Best IVF Treatment in Indiranagar, Bangalore | Fertility Specialist | Sugata Clinic",
    description: "Get expert IVF treatment in Indiranagar, Bangalore. Our fertility specialist offers IVF, ICSI and personalized infertility care.",
    h1: "Best IVF Treatment in Indiranagar, Bangalore",
  },
  "pcos": {
    slug: "pcos-treatment",
    title: "Best PCOS Treatment in Indiranagar, Bangalore | Sugata Clinic",
    description: "Get the best PCOS treatment in Indiranagar, Bangalore with personalized care for irregular periods, hormonal imbalance and fertility concerns.",
    h1: "Best PCOS Treatment in Indiranagar, Bangalore",
  },
  "menstrual-health": {
    slug: "irregular-periods-treatment",
    title: "Best Irregular Periods Treatment in Indiranagar | Sugata Clinic",
    description: "Expert treatment for irregular periods, painful periods, heavy bleeding and menstrual disorders by experienced gynecologists.",
    h1: "Best Irregular Periods Treatment in Indiranagar",
  },
  "cancer-screening": {
    slug: "cervical-cancer-screening",
    title: "Best Cervical Cancer Screening in Indiranagar | Sugata Clinic",
    description: "Early cervical cancer screening with Pap smear and HPV testing by experienced gynecologists in Indiranagar, Bangalore.",
    h1: "Best Cervical Cancer Screening in Indiranagar",
  },
  "menopause": {
    slug: "menopause-treatment",
    title: "Best Menopause Treatment in Indiranagar, Bangalore | Sugata Clinic",
    description: "Comprehensive menopause treatment in Indiranagar, Bangalore for hormonal changes, hot flashes and healthy ageing.",
    h1: "Best Menopause Treatment in Indiranagar, Bangalore",
  },
  "adolescent-health": {
    slug: "adolescent-gynaecology",
    title: "Adolescent Gynaecology in Indiranagar, Bangalore | Teen Health | Sugata Clinic",
    description: "Private, judgment-free adolescent gynaecology in Indiranagar, Bangalore — first periods, irregular cycles, PCOS in teens and puberty concerns.",
    h1: "Adolescent Gynaecology in Indiranagar, Bangalore",
  },
  "vbac": {
    slug: "vbac-delivery",
    title: "VBAC Delivery After C-Section in Indiranagar, Bangalore | Sugata Clinic",
    description: "Safe vaginal birth after caesarean (VBAC) in Indiranagar, Bangalore with careful assessment, monitoring and experienced obstetric care.",
    h1: "VBAC — Vaginal Delivery After C-Section in Indiranagar",
  },
  "natural-conception": {
    slug: "natural-conception-treatment",
    title: "Natural Conception Without IVF in Indiranagar, Bangalore | Sugata Clinic",
    description: "Fertility care focused on natural conception in Indiranagar, Bangalore — ovulation tracking, hormonal correction and lifestyle guidance before considering IVF.",
    h1: "Natural Conception Without IVF in Indiranagar",
  },
  "infections-wellness": {
    slug: "intimate-wellness-treatment",
    title: "Vaginal Infection & Intimate Wellness Treatment in Indiranagar | Sugata Clinic",
    description: "Confidential treatment for vaginal infections, discomfort and intimate wellness concerns by experienced gynecologists in Indiranagar, Bangalore.",
    h1: "Infections & Intimate Wellness Care in Indiranagar",
  },

  /* ---- Cardiac ---- */
  "coronary-artery-disease": {
    slug: "coronary-artery-disease-treatment",
    title: "Best Coronary Artery Disease Treatment in Bangalore | Sugata Clinic",
    description: "Expert diagnosis and treatment for coronary artery disease by experienced cardiologists in Bangalore.",
    h1: "Best Coronary Artery Disease Treatment in Bangalore",
  },
  "heart-attack": {
    slug: "heart-attack-treatment",
    title: "Expert Heart Attack Treatment in Bangalore | Experienced Cardiologist | Sugata Clinic",
    description: "Receive expert heart attack treatment with emergency cardiac care, angioplasty and long-term heart health management.",
    h1: "Expert Heart Attack Treatment in Bangalore",
  },
  "angiography-angioplasty": {
    slug: "angiography-angioplasty",
    title: "Best Angiography & Angioplasty in Bangalore | Sugata Clinic",
    description: "Advanced coronary angiography and angioplasty by experienced interventional cardiologists in Bangalore.",
    h1: "Best Angiography & Angioplasty in Bangalore",
  },
  "heart-failure": {
    slug: "heart-failure-treatment",
    title: "Best Heart Failure Treatment in Bangalore | Sugata Clinic",
    description: "Comprehensive heart failure diagnosis, treatment and long-term management by expert cardiologists.",
    h1: "Best Heart Failure Treatment in Bangalore",
  },
  "hypertension": {
    slug: "hypertension-treatment",
    title: "Best Hypertension Treatment in Bangalore | Sugata Clinic",
    description: "Control high blood pressure with experienced cardiologists and personalized hypertension treatment in Bangalore.",
    h1: "Best Hypertension Treatment in Bangalore",
  },
  "arrhythmia": {
    slug: "arrhythmia-treatment",
    title: "Best Arrhythmia Treatment in Bangalore | Sugata Clinic",
    description: "Diagnosis and treatment for irregular heartbeat, palpitations and heart rhythm disorders by expert cardiologists.",
    h1: "Best Arrhythmia Treatment in Bangalore",
  },
  "acute-coronary-syndrome": {
    slug: "acute-coronary-syndrome-treatment",
    title: "Acute Coronary Syndrome Treatment in Bangalore | Sugata Clinic",
    description: "Urgent assessment and treatment of acute coronary syndrome in Bangalore by experienced cardiologists, with rapid diagnosis and intervention.",
    h1: "Acute Coronary Syndrome Treatment in Bangalore",
  },
  "nstemi-unstable-angina": {
    slug: "unstable-angina-treatment",
    title: "NSTEMI & Unstable Angina Treatment in Bangalore | Sugata Clinic",
    description: "Expert care for NSTEMI and unstable angina in Bangalore — prompt evaluation, risk assessment and treatment to prevent a heart attack.",
    h1: "NSTEMI & Unstable Angina Treatment in Bangalore",
  },
  "pacemaker": {
    slug: "pacemaker-implantation",
    title: "Pacemaker Implantation in Bangalore | Heart Rhythm Care | Sugata Clinic",
    description: "Pacemaker implantation and heart rhythm management in Bangalore by experienced cardiologists, with careful follow-up and device checks.",
    h1: "Pacemaker Implantation in Bangalore",
  },
  "structural-device-closure": {
    slug: "structural-heart-device-closure",
    title: "Structural Heart & Device Closure in Bangalore | ASD, VSD, PDA | Sugata Clinic",
    description: "Device closure for structural heart conditions including ASD, VSD and PDA in Bangalore, by experienced interventional cardiologists.",
    h1: "Structural Heart & Device Closure in Bangalore",
  },
  "peripheral-artery": {
    slug: "peripheral-artery-disease-treatment",
    title: "Peripheral Artery Disease Treatment in Bangalore | Sugata Clinic",
    description: "Diagnosis and treatment of peripheral artery disease in Bangalore — leg pain on walking, poor circulation and vascular assessment.",
    h1: "Peripheral Artery Disease Treatment in Bangalore",
  },
};

/* Blog. Add an entry per post; tools/build.js generates /blog/<slug>.
   `body` is an array of paragraphs and/or { h2 } / { list: [] } blocks. */
var BLOG_SEO = {
  path: "/blog",
  title: "Women's Health & Heart Care Blog | Sugata Clinic, Indiranagar Bangalore",
  description: "Practical guidance on pregnancy, fertility, PCOS, menopause and heart health from the doctors at Sugata Clinic, Indiranagar, Bangalore.",
  h1: "Health Notes from Sugata Clinic",
};

var BLOG_POSTS = [
  {
    slug: "when-to-see-a-gynecologist-in-pregnancy",
    title: "When to See a Gynecologist During Pregnancy | Sugata Clinic",
    description: "A simple month-by-month guide to antenatal visits in pregnancy, which scans matter and the warning signs that mean you should be seen sooner.",
    h1: "When to See a Gynecologist During Pregnancy",
    date: "2026-08-20",
    cat: "gyn",
    excerpt: "How often you actually need to be seen, which scans matter, and the symptoms that should never wait for the next appointment.",
    body: [
      "Most pregnancies are straightforward, but regular antenatal checks are what keep them that way. They catch the small things — a rising blood pressure, a dip in iron, a baby measuring behind — while they are still easy to correct.",
      { h2: "A typical visit schedule" },
      "For an uncomplicated pregnancy, visits are usually monthly until 28 weeks, fortnightly from 28 to 36 weeks, and weekly after that. A high-risk pregnancy — diabetes, high blood pressure, twins, or a previous caesarean — will need to be seen more often.",
      { h2: "The scans that matter" },
      { list: [
        "Dating scan (6-9 weeks) — confirms the pregnancy and your due date",
        "NT scan (11-13 weeks) — early screening",
        "Anomaly scan (18-22 weeks) — checks the baby's development in detail",
        "Growth scans (28 weeks onwards) — tracks growth and fluid",
      ] },
      { h2: "When not to wait" },
      "Some symptoms need to be seen the same day rather than at your next appointment: bleeding, severe or persistent abdominal pain, a bad headache with blurred vision, fever, fluid leaking, or a noticeable drop in the baby's movements after 28 weeks.",
      "If you are unsure whether something is worth a call, it is. It is always better to be checked and reassured.",
    ],
  },
  {
    slug: "pcos-symptoms-and-treatment",
    title: "PCOS: Symptoms, Diagnosis and Treatment Explained | Sugata Clinic",
    description: "What PCOS actually is, how it is diagnosed, and the treatment options for irregular periods, weight, skin changes and fertility.",
    h1: "PCOS: Symptoms, Diagnosis and Treatment",
    date: "2026-08-12",
    cat: "gyn",
    excerpt: "PCOS is common, manageable and often misunderstood. Here is what the diagnosis actually means and what can be done about it.",
    body: [
      "Polycystic ovary syndrome affects roughly one in five women in India. It is a hormonal condition, not a disease of the ovaries alone, and it responds well to treatment once it is properly identified.",
      { h2: "Common symptoms" },
      { list: [
        "Irregular, infrequent or absent periods",
        "Acne, oily skin, or unwanted facial and body hair",
        "Weight gain, particularly around the waist, or difficulty losing weight",
        "Difficulty conceiving",
        "Hair thinning on the scalp",
      ] },
      { h2: "How it is diagnosed" },
      "Diagnosis usually needs two of three things: irregular ovulation, signs of raised androgens (either on examination or in blood tests), and polycystic ovaries on ultrasound. Blood tests also rule out thyroid problems and other causes that look similar.",
      { h2: "Treatment" },
      "Treatment depends on what is troubling you most. Weight and insulin management help nearly every symptom. Medication can regulate cycles, control acne and hair growth, or induce ovulation if you are trying to conceive. PCOS is managed rather than cured — but well managed, it need not limit you.",
    ],
  },
  {
    slug: "warning-signs-of-a-heart-attack",
    title: "Warning Signs of a Heart Attack You Should Never Ignore | Sugata Clinic",
    description: "The symptoms of a heart attack, why they differ in women and people with diabetes, and exactly what to do in the first minutes.",
    h1: "Warning Signs of a Heart Attack You Should Never Ignore",
    date: "2026-08-05",
    cat: "car",
    excerpt: "Chest pain is the classic sign, but not the only one — and in women and people with diabetes it is often not the first.",
    body: [
      "In a heart attack, minutes decide how much heart muscle survives. Recognising the signs early is the single most useful thing you can do.",
      { h2: "The common signs" },
      { list: [
        "Chest pain, pressure, heaviness or tightness — often central, lasting more than a few minutes",
        "Pain spreading to the left arm, both arms, jaw, neck or back",
        "Breathlessness, with or without chest discomfort",
        "Cold sweat, nausea or vomiting",
        "Sudden severe fatigue or light-headedness",
      ] },
      { h2: "Why it can look different" },
      "Women, older adults and people with diabetes more often have symptoms without severe chest pain — unusual tiredness, breathlessness, indigestion-like discomfort or jaw pain. Nerve damage from long-standing diabetes can blunt pain altogether, so a heart attack may present as sudden breathlessness or collapse.",
      { h2: "What to do" },
      "Call for emergency help immediately and get to a hospital with cardiac facilities — do not drive yourself. Chew an aspirin if you are not allergic and it is available. Do not wait to see whether it passes; the treatments that save heart muscle work best in the first hour.",
    ],
  },
];

/* Node (tools/build.js) reads these; browsers get them as globals. */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SITE_URL, PAGE_SEO, SERVICE_SEO, BLOG_SEO, BLOG_POSTS };
}
