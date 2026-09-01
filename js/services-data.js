/* ============================================================
   Sugata — service catalogue
   Services are split per DOCTOR and use the client's EXACT
   service names. Gynae is also grouped by life stage.
   Each entry -> its own inner page at service.html?id=<id>.
   Replace image paths under assets/services/ with real photos.
   ============================================================ */

/* Two clearly separated blocks — one per doctor */
const CATEGORIES = [
  {
    key: "gyn",
    doctor: "Dr. Roshana Fulmali",
    role: "Obstetrician, Gynaecologist & Fertility Specialist",
    link: "dr-roshana.html",
    heading: "Women's Health Services",
    stages: [
      { stage: "Adolescence & Teens",    ids: ["adolescent-health", "menstrual-health"] },
      { stage: "Pregnancy & Childbirth", ids: ["pregnancy-antenatal", "safe-vaginal-delivery", "vbac"] },
      { stage: "Fertility & Conception", ids: ["natural-conception", "ivf-icsi"] },
      { stage: "Hormonal Health",        ids: ["pcos"] },
      { stage: "Well-Woman & Prevention",ids: ["cancer-screening", "infections-wellness"] },
      { stage: "Midlife & Menopause",    ids: ["menopause"] },
    ],
  },
  {
    key: "car",
    doctor: "Dr. Mukul R Fulmali",
    role: "Consultant Cardiologist",
    link: "dr-mukul.html",
    heading: "Heart & Cardiac Services",
    stages: [
      { stage: "Coronary Artery Disease",     ids: ["coronary-artery-disease", "acute-coronary-syndrome", "heart-attack", "nstemi-unstable-angina"] },
      { stage: "Angiography & Intervention",  ids: ["angiography-angioplasty"] },
      { stage: "Heart Failure & Blood Pressure", ids: ["heart-failure", "hypertension"] },
      { stage: "Rhythm & Pacing",             ids: ["arrhythmia", "pacemaker"] },
      { stage: "Structural & Vascular",       ids: ["structural-device-closure", "peripheral-artery"] },
    ],
  },
];

/* Shared service-card markup: clean image on top, title below,
   description + "Learn more" revealed on hover over the image. */
function svcCardHTML(id) {
  const s = SERVICES[id];
  if (!s) return "";
  const grad = s.cat === "gyn"
    ? "linear-gradient(135deg,#f04e9a,#e6197e)"
    : "linear-gradient(135deg,#7a4aa8,#4a3d8f)";
  /* Clean SEO URL from js/seo-data.js; falls back to the legacy query
     string if that file has not loaded. */
  const href = (typeof SERVICE_SEO !== "undefined" && SERVICE_SEO[id])
    ? "/services/" + SERVICE_SEO[id].slug
    : "service.html?id=" + id;
  return `<a class="svc-card ${s.cat}" href="${href}">
    <div class="media">
      <div class="bgimg" style="background-image:url('${s.image}'),${grad}"></div>
      <div class="hoverpanel">
        <p>${s.short}</p>
        <span class="more">Learn more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </div>
    </div>
    <div class="txt">
      <span class="stage">${s.stage}</span>
      <h4>${s.title}</h4>
    </div>
  </a>`;
}

const SERVICES = {
  /* ==================== DR. ROSHANA — WOMEN'S HEALTH ==================== */
  "adolescent-health": {
    cat: "gyn", doctor: "roshana", stage: "Adolescence & Teens",
    title: "Adolescent Gynaecology",
    short: "Gentle, private care as a young girl grows into womanhood.",
    image: "assets/services/adolescent.jpg",
    about:
      "The teenage years bring many changes and questions that deserve calm, judgment-free answers. Dr. Roshana offers private, respectful consultations for adolescents and their parents — covering the first period, irregular or painful cycles, PCOS in teens, acne and unwanted hair, delayed puberty, and healthy-body guidance. The aim is to reassure, educate and treat early, so small concerns never grow into big worries. Every visit is confidential, hygienic and completely non-judgmental, in a space designed to make young patients feel safe and understood.",
    points: ["First-period & cycle guidance", "Painful or irregular periods", "Teenage PCOS", "Confidential counselling"],
  },
  "menstrual-health": {
    cat: "gyn", doctor: "roshana", stage: "Adolescence & Teens",
    title: "Menstrual Health",
    short: "For irregular, heavy or painful periods at any age.",
    image: "assets/services/menstrual.jpg",
    about:
      "Periods should not disrupt your life. We evaluate and treat irregular cycles, heavy bleeding, painful periods, spotting between cycles, and hormonal imbalance. Using a careful history, examination and targeted tests, Dr. Roshana identifies the underlying cause — whether hormonal, structural (like fibroids or polyps) or related to conditions such as PCOS or thyroid dysfunction — and builds a treatment plan that fits your body and stage of life. Options range from lifestyle and medical management to minimally invasive procedures, always explained clearly so you can decide with confidence.",
    points: ["Irregular cycles", "Heavy / prolonged bleeding", "Period pain", "Hormonal evaluation"],
  },
  "pregnancy-antenatal": {
    cat: "gyn", doctor: "roshana", stage: "Pregnancy & Childbirth",
    title: "Pregnancy & Antenatal Care",
    short: "Complete, reassuring care from the first test to delivery.",
    image: "assets/services/pregnancy.jpg",
    about:
      "From your positive test to the moment you hold your baby, you are in experienced, caring hands. Our antenatal programme includes early pregnancy confirmation, scheduled scans, nutrition and weight guidance, screening for gestational diabetes and blood pressure, and close monitoring of both mother and baby. High-risk pregnancies are managed with extra vigilance and coordination. Dr. Roshana believes in a calm, informed pregnancy — every question answered, every milestone explained — so you feel supported and confident right through to a safe delivery.",
    points: ["Early pregnancy & scans", "Nutrition & weight guidance", "High-risk pregnancy care", "Birth planning"],
  },
  "safe-vaginal-delivery": {
    cat: "gyn", doctor: "roshana", stage: "Pregnancy & Childbirth",
    title: "Safe Vaginal Delivery",
    short: "Championing a safe, positive natural birth wherever possible.",
    image: "assets/services/delivery.jpg",
    about:
      "Dr. Roshana is known for prioritising safe vaginal delivery. Each birth plan is individualised — weighing your health, the baby's wellbeing and your own wishes — with a caesarean performed only when it is genuinely the safer choice. Throughout labour you are closely monitored and supported, with clear guidance at every step, so the experience feels safe and empowering rather than frightening. Deliveries are conducted at partner hospitals with full medical backup, giving you both a natural-birth advocate and complete safety for you and your baby.",
    points: ["Safe, monitored natural birth", "Individualised birth plans", "Full hospital backup", "Caesarean only when needed"],
  },
  "vbac": {
    cat: "gyn", doctor: "roshana", stage: "Pregnancy & Childbirth",
    title: "Vaginal Delivery After C-Section (VBAC)",
    short: "A normal birth is often possible even after a previous caesarean.",
    image: "assets/services/vbac.jpg",
    about:
      "Many women who have had a caesarean can safely have a normal birth next time — this is called VBAC (vaginal birth after caesarean). Dr. Roshana carefully assesses whether VBAC is safe for you, considering your previous surgery, current pregnancy and overall health, and then supports and monitors you closely through labour. The goal is a safe, positive vaginal delivery with the reassurance of full medical backup should it be needed. You will always understand the options and the reasoning, so your birth plan is a shared, informed decision.",
    points: ["Careful VBAC assessment", "Close labour monitoring", "Full safety backup", "Shared, informed decision"],
  },
  "natural-conception": {
    cat: "gyn", doctor: "roshana", stage: "Fertility & Conception",
    title: "Natural Conception Without IVF",
    short: "Exploring natural fertility first — many couples conceive without IVF.",
    image: "assets/services/fertility.jpg",
    about:
      "Every couple's fertility journey is different, and IVF is not always the answer. As a fertility specialist, Dr. Roshana begins by exploring natural conception — correcting hormonal imbalances, tracking ovulation, and treating conditions such as PCOS or thyroid issues that quietly stand in the way. With the right evaluation and guidance, many couples conceive naturally. You will always understand what is being checked, why a step is recommended, and what the realistic chances are — honest, transparent and deeply compassionate care, with assisted options considered only if and when they are truly needed.",
    points: ["Ovulation tracking", "Hormonal correction", "Male & female evaluation", "Honest, no-pressure guidance"],
  },
  "ivf-icsi": {
    cat: "gyn", doctor: "roshana", stage: "Fertility & Conception",
    title: "IVF & ICSI Assisted Fertility Treatment",
    short: "Advanced assisted reproduction, when it's the right step for you.",
    image: "assets/services/ivf.jpg",
    about:
      "When natural conception isn't possible, assisted reproduction can help make parenthood a reality. Dr. Roshana offers IVF (in-vitro fertilisation) and ICSI (intracytoplasmic sperm injection) with clear, honest counselling about what each involves, the likelihood of success, and what to expect at every stage. Treatment is personalised to your diagnosis and history, and you are supported emotionally as well as medically throughout. The focus is on giving you the best possible chance while ensuring you always feel informed, cared for and in control of your journey.",
    points: ["IVF treatment", "ICSI treatment", "Personalised protocols", "Honest success counselling"],
  },
  "pcos": {
    cat: "gyn", doctor: "roshana", stage: "Hormonal Health",
    title: "PCOS to Normal Menses",
    short: "Guiding women with PCOS/PCOD back to regular, natural cycles.",
    image: "assets/services/pcos.jpg",
    about:
      "Polycystic ovary syndrome affects cycles, skin, weight and fertility — but it is very manageable. Dr. Roshana has a special interest in guiding women with PCOS/PCOD from irregular cycles back to regular, natural menses. Care combines nutrition and lifestyle changes, targeted medical treatment, and monitoring for related risks like insulin resistance. Whether your goal is regular periods, clearer skin, weight balance or conceiving naturally, the plan is tailored to you and reviewed regularly. The emphasis is on long-term hormonal health, not just short-term fixes.",
    points: ["Irregular cycles to regular", "Weight & lifestyle plan", "Skin & hair concerns", "Fertility with PCOS"],
  },
  "cancer-screening": {
    cat: "gyn", doctor: "roshana", stage: "Well-Woman & Prevention",
    title: "Cancer Screening & Prevention",
    short: "Pap smear, HPV and breast checks — catching concerns early.",
    image: "assets/services/screening.jpg",
    about:
      "Prevention is the kindest care. Our well-woman screening includes cervical cancer screening (Pap smear and HPV testing), clinical breast examination and guidance on mammography, HPV vaccination counselling, and evaluation of any abnormal bleeding or symptoms. Screening is quick, private and reassuring — and it saves lives by catching changes long before they become serious. Dr. Roshana explains what each test is for and what your results mean, so routine check-ups feel empowering rather than anxious.",
    points: ["Pap smear & HPV testing", "Breast examination", "HPV vaccination advice", "Early symptom evaluation"],
  },
  "infections-wellness": {
    cat: "gyn", doctor: "roshana", stage: "Well-Woman & Prevention",
    title: "Infections & Intimate Wellness",
    short: "Discreet, non-judgmental care for everyday concerns.",
    image: "assets/services/wellness.jpg",
    about:
      "Vaginal infections, urinary symptoms, itching, discharge and intimate-health worries are common — and nothing to feel embarrassed about. Sugata offers discreet, hygienic and completely non-judgmental evaluation and treatment, including for sexual and reproductive health questions and contraception advice. We also warmly welcome and support women from all backgrounds and the LGBTQ+ community, with respectful, inclusive care. You will be examined and treated in a safe, private setting, with clear advice on prevention so problems don't keep returning.",
    points: ["Infections & discharge", "Urinary & intimate health", "Contraception advice", "Inclusive, private care"],
  },
  "menopause": {
    cat: "gyn", doctor: "roshana", stage: "Midlife & Menopause",
    title: "Menopause & Midlife Health",
    short: "Steady, informed support through the change and beyond.",
    image: "assets/services/menopause.jpg",
    about:
      "Menopause is a natural transition, but its symptoms — hot flushes, sleep and mood changes, irregular then absent periods, and bone or heart-health concerns — deserve real support. Dr. Roshana offers individualised midlife care, including symptom relief, hormone-therapy counselling where appropriate, bone-health and cardiovascular risk guidance, and continued cancer screening. The goal is to help you move through this stage feeling strong, informed and well, with a plan that protects your long-term health.",
    points: ["Symptom management", "Hormone therapy counselling", "Bone & heart health", "Continued screening"],
  },

  /* ==================== DR. MUKUL — HEART & CARDIAC ==================== */
  "coronary-artery-disease": {
    cat: "car", doctor: "mukul", stage: "Coronary Artery Disease",
    title: "Coronary Artery Disease",
    short: "Diagnosis and management of blocked or narrowed heart arteries.",
    image: "assets/services/cad.jpg",
    about:
      "Coronary artery disease develops when the arteries supplying the heart narrow due to plaque, reducing blood flow and causing chest pain (angina) or breathlessness. Dr. Mukul evaluates risk and severity using ECG, echocardiography, stress testing and, when needed, coronary angiography. Treatment is tailored — from medication and structured lifestyle change to angioplasty and stenting for significant blockages. Early, accurate diagnosis prevents heart attacks and keeps you active. The approach is calm and thorough, with every finding and option explained clearly so you understand your heart and your plan.",
    points: ["Angina evaluation", "Risk assessment", "Medical management", "Angioplasty when needed"],
  },
  "acute-coronary-syndrome": {
    cat: "car", doctor: "mukul", stage: "Coronary Artery Disease",
    title: "Acute Coronary Syndrome",
    short: "Urgent, expert care when blood flow to the heart drops suddenly.",
    image: "assets/services/acs.jpg",
    about:
      "Acute coronary syndrome (ACS) is an umbrella term for emergencies caused by a sudden reduction in blood flow to the heart — including heart attack, NSTEMI and unstable angina. It is a medical emergency where timing matters greatly. Dr. Mukul manages the full spectrum of ACS, from rapid assessment and stabilisation to clot-dissolving therapy or emergency angioplasty, followed by careful recovery planning. Warning signs include chest pain or pressure, breathlessness, sweating, or pain spreading to the arm or jaw — if these occur, seek care urgently. Structured follow-up then guards against a repeat event.",
    points: ["Rapid assessment", "Emergency stabilisation", "Timely intervention", "Recovery & prevention"],
  },
  "heart-attack": {
    cat: "car", doctor: "mukul", stage: "Coronary Artery Disease",
    title: "Myocardial Infarction (Heart Attack)",
    short: "Expert, timely treatment for a heart attack — and recovery after.",
    image: "assets/services/heart-attack.jpg",
    about:
      "A heart attack (myocardial infarction) happens when blood flow to part of the heart is blocked, damaging the heart muscle. Rapid, expert care saves muscle and lives. Dr. Mukul manages heart attacks from immediate stabilisation and emergency angioplasty to careful recovery planning and secondary prevention that lowers the risk of it happening again. If you or a loved one has warning signs — chest pain or pressure, breathlessness, sweating, or pain spreading to the arm or jaw — seek care urgently. Ongoing follow-up, medication and lifestyle guidance then protect your heart for the long term.",
    points: ["Emergency heart-attack care", "Angioplasty & stenting", "Cardiac recovery", "Secondary prevention"],
  },
  "nstemi-unstable-angina": {
    cat: "car", doctor: "mukul", stage: "Coronary Artery Disease",
    title: "NSTEMI & Unstable Angina",
    short: "Careful management of these serious, time-sensitive conditions.",
    image: "assets/services/angina.jpg",
    about:
      "NSTEMI (a type of heart attack) and unstable angina are serious forms of acute coronary syndrome where the heart's blood supply is critically reduced, even if an artery is not completely blocked. They are warning signs that need prompt, expert care to prevent a major heart attack. Dr. Mukul assesses risk carefully using ECG, blood tests and imaging, then treats with the right combination of medication and, when needed, angiography and angioplasty. Close monitoring and a clear prevention plan afterwards keep your heart stable and reduce the chance of a future event.",
    points: ["Prompt risk assessment", "Medical stabilisation", "Angiography when indicated", "Prevention planning"],
  },
  "angiography-angioplasty": {
    cat: "car", doctor: "mukul", stage: "Angiography & Intervention",
    title: "Coronary Angiography, Angioplasty & Stenting",
    short: "Precise imaging and treatment of arterial blockages.",
    image: "assets/services/angioplasty.jpg",
    about:
      "Coronary angiography is a precise imaging test that maps blockages in the heart's arteries. When a significant narrowing is found, angioplasty and stenting can open the artery and restore blood flow — often through a small wrist puncture, with quick recovery. Dr. Mukul (FSCAI) performs these interventional procedures and, importantly, advises them only when they are truly needed. Before any procedure you will understand why it is recommended, what it involves, and what to expect afterwards — combining technical expertise with honest, patient-first guidance.",
    points: ["Coronary angiography", "Angioplasty & stenting", "Radial (wrist) approach", "Advised only when needed"],
  },
  "heart-failure": {
    cat: "car", doctor: "mukul", stage: "Heart Failure & Blood Pressure",
    title: "Heart Failure Treatment",
    short: "Helping a weakened heart work better, day to day.",
    image: "assets/services/heart-failure.jpg",
    about:
      "Heart failure means the heart isn't pumping as efficiently as it should, leading to breathlessness, fatigue and swelling. It is a manageable condition with the right, consistent care. Dr. Mukul evaluates the cause with echocardiography and other tests, then builds a treatment plan using modern medications, fluid and salt guidance, and monitoring to keep symptoms controlled and hospital visits down. Where appropriate, device therapy is considered. The focus is on restoring energy and quality of life, with regular reviews to fine-tune treatment as you improve.",
    points: ["Cause evaluation", "Modern medical therapy", "Symptom & fluid control", "Regular monitoring"],
  },
  "hypertension": {
    cat: "car", doctor: "mukul", stage: "Heart Failure & Blood Pressure",
    title: "Hypertension Treatment",
    short: "Getting high blood pressure safely under control.",
    image: "assets/services/hypertension.jpg",
    about:
      "High blood pressure is often silent, yet it quietly raises the risk of heart attack, stroke and kidney damage. Dr. Mukul provides accurate diagnosis (including for resistant or secondary hypertension), identifies contributing factors, and tailors treatment that fits your life — combining the right medications with practical diet, activity and stress guidance. The aim is steady, well-controlled numbers without troublesome side effects, protecting your heart and vessels for the long term. Regular follow-up ensures your treatment stays right for you as things change.",
    points: ["Accurate diagnosis", "Resistant hypertension", "Tailored medication", "Lifestyle guidance"],
  },
  "arrhythmia": {
    cat: "car", doctor: "mukul", stage: "Rhythm & Pacing",
    title: "Atrial Fibrillation & Heart Arrhythmias",
    short: "For palpitations, AF and other irregular heart rhythms.",
    image: "assets/services/arrhythmia.jpg",
    about:
      "When the heart beats too fast, too slow or irregularly, it can cause palpitations, dizziness or fainting — and some rhythms, like atrial fibrillation, also raise the risk of stroke. Dr. Mukul diagnoses and treats atrial fibrillation and other arrhythmias, investigating each to find its cause and stroke risk. Treatment ranges from medication and rhythm or rate control to stroke-prevention strategies, chosen to keep you safe and symptom-free. Clear explanations help you understand your rhythm and your options, so you feel reassured rather than anxious about your heartbeat.",
    points: ["Atrial fibrillation", "Palpitations & fainting", "Stroke-risk management", "Rhythm & rate control"],
  },
  "pacemaker": {
    cat: "car", doctor: "mukul", stage: "Rhythm & Pacing",
    title: "Complete Heart Block & Pacemaker Implantation",
    short: "Temporary and permanent pacing when the heart beats too slowly.",
    image: "assets/services/pacemaker.jpg",
    about:
      "Complete heart block and other conduction problems can make the heart beat dangerously slowly, causing fatigue, dizziness or blackouts. Dr. Mukul diagnoses these conditions and, when the heart's natural pacing needs support, performs temporary and permanent pacemaker implantation to restore a safe, steady rhythm. Each case is assessed carefully to choose the right device and approach, and you are guided clearly through the procedure and recovery. The result is renewed energy and safety, with regular device checks to keep everything working as it should.",
    points: ["Complete heart block", "Temporary pacing", "Permanent pacemaker", "Device follow-up"],
  },
  "structural-device-closure": {
    cat: "car", doctor: "mukul", stage: "Structural & Vascular",
    title: "ASD, VSD & PDA Device Closure",
    short: "Non-surgical closure of common structural heart defects.",
    image: "assets/services/structural.jpg",
    about:
      "Some people are born with small holes or connections in the heart — atrial septal defect (ASD), ventricular septal defect (VSD) or patent ductus arteriosus (PDA). Many suitable defects can now be closed without open surgery, using a catheter-delivered device through a small puncture, with a short recovery. Dr. Mukul assesses whether a defect needs treatment and whether device closure is appropriate, guiding you through the decision with clarity. When indicated, this minimally invasive approach restores normal circulation and protects long-term heart and lung health.",
    points: ["ASD device closure", "VSD device closure", "PDA closure", "Minimally invasive"],
  },
  "peripheral-artery": {
    cat: "car", doctor: "mukul", stage: "Structural & Vascular",
    title: "Peripheral Artery Disease",
    short: "Peripheral angiography, angioplasty and stenting for narrowed vessels.",
    image: "assets/services/peripheral.jpg",
    about:
      "Peripheral artery disease occurs when arteries outside the heart — often in the legs — narrow and reduce blood flow, causing pain on walking, slow-healing wounds or cramping. Dr. Mukul evaluates these vessels with peripheral angiography and, when needed, treats blockages with peripheral angioplasty and stenting to restore circulation. Because peripheral disease often signals wider vascular risk, care also includes managing the underlying causes to protect your heart and limbs together. Early treatment relieves symptoms and helps you stay mobile and active.",
    points: ["Leg pain on walking", "Peripheral angiography", "Angioplasty & stenting", "Whole-body vascular care"],
  },
};
