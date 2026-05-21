/* global React */
const { useState, useEffect, useRef, useMemo, Fragment } = React;

/* ============================================================
   Tiny utilities
   ============================================================ */
const cx = (...xs) => xs.filter(Boolean).join(" ");

const useT = (lang, dict) => (key, vars) => {
  let s = (dict[key] && dict[key][lang]) || (dict[key] && dict[key].en) || key;
  if (vars) for (const k of Object.keys(vars)) s = s.replaceAll(`{${k}}`, vars[k]);
  return s;
};

/* Global string dictionary — all strings from copy-deck-p0.md */
const STRINGS = {
  // Header
  brand: { en: "BaanStory", th: "BaanStory" },
  nav_events: { en: "Events", th: "งานอีเวนต์" },
  nav_contact: { en: "Contact", th: "ติดต่อเรา" },
  nav_crafts: { en: "Crafts", th: "งานหัตถกรรม" },
  nav_home: { en: "Home", th: "หน้าแรก" },
  skip: { en: "Skip to content", th: "ข้ามไปยังเนื้อหา" },
  open_menu: { en: "Open menu", th: "เปิดเมนู" },
  close_menu: { en: "Close menu", th: "ปิดเมนู" },
  contact_us: { en: "Contact us", th: "ติดต่อเรา" },
  change_lang: { en: "Change language", th: "เปลี่ยนภาษา" },

  // Footer
  footer_brand: {
    en: "Understand Thai events and traditions — what they are, why they matter, and what to notice.",
    th: "เข้าใจงานอีเวนต์และประเพณีไทย ว่าคืออะไร สำคัญอย่างไร และควรสังเกตอะไรเมื่อไปถึง",
  },
  footer_browse: { en: "Browse", th: "เลือกดู" },
  footer_organisers: { en: "For organisers", th: "สำหรับผู้จัดงาน" },
  add_or_claim: { en: "Add or claim your event", th: "ส่งงานอีเวนต์ของคุณหรือขอรับหน้าของงาน" },
  update_verified: { en: "Update a verified page", th: "อัปเดตหน้าที่ได้รับการยืนยันแล้ว" },
  send_source: { en: "Send us a source", th: "ส่งแหล่งข้อมูลให้เรา" },
  become_partner: { en: "Become a partner", th: "ร่วมงานกับเรา" },
  copyright: { en: "© 2026 BaanStory", th: "© 2026 BaanStory" },

  // CTAs
  find_events: { en: "Find events", th: "ดูงานอีเวนต์" },
  view_all_events: { en: "View all events", th: "ดูงานอีเวนต์ทั้งหมด" },
  open_event: { en: "Open event", th: "เปิดหน้างานอีเวนต์" },
  open_in_maps: { en: "Open in Maps", th: "เปิดในแผนที่" },
  share: { en: "Share", th: "แชร์" },
  check_source: { en: "Check source", th: "ดูแหล่งข้อมูล" },
  submit_correction: { en: "Submit correction", th: "ส่งข้อมูลแก้ไข" },
  get_in_touch: { en: "Get in touch", th: "ติดต่อเรา" },
  send_message: { en: "Send message", th: "ส่งข้อความ" },
  try_again: { en: "Try again", th: "ลองอีกครั้ง" },

  // Toasts
  toast_link_copied: { en: "Link copied.", th: "คัดลอกลิงก์แล้ว" },
  toast_lang_changed: { en: "Language changed.", th: "เปลี่ยนภาษาแล้ว" },
  toast_contact_sent: { en: "Thanks — we'll reply within 2 business days.", th: "ขอบคุณ เราจะตอบกลับภายใน 2 วันทำการ" },
  toast_correction_sent: { en: "Thanks — we'll review this and update the page if needed.", th: "ขอบคุณ เราจะตรวจสอบและอัปเดตหน้านี้หากจำเป็น" },
  toast_source_sent: { en: "Thanks — we'll check this source.", th: "ขอบคุณ เราจะตรวจสอบแหล่งข้อมูลนี้" },

  // Trust language
  verified_by: { en: "Verified by {institution}", th: "ยืนยันข้อมูลโดย {institution}" },
  source_line: { en: "From {source}, checked {date}.", th: "อ้างอิงจาก {source} ตรวจสอบเมื่อ {date}" },

  // Honest gaps
  gap_hours: { en: "Hours not confirmed. Check the organiser source before going.", th: "ยังไม่ยืนยันเวลาเปิดงาน กรุณาตรวจสอบแหล่งข้อมูลของผู้จัดงานก่อนเดินทาง" },
  gap_organiser: { en: "No public organiser contact yet. We've listed the source we used instead.", th: "ตอนนี้ยังไม่มีข้อมูลติดต่อผู้จัดงานในที่สาธารณะ เราจึงแสดงแหล่งข้อมูลที่เราใช้แทน" },

  // Sections
  s_plan: { en: "Plan your visit", th: "วางแผนก่อนเดินทาง" },
  s_notice: { en: "What to notice", th: "สิ่งที่ควรสังเกต" },
  s_notice_sub: { en: "A few things to look for when you arrive.", th: "สิ่งเล็ก ๆ ที่ควรลองสังเกตเมื่อไปถึง" },
  s_why: { en: "Why this matters", th: "ทำไมงานนี้จึงสำคัญ" },
  s_prep: { en: "Visit preparation", th: "เตรียมตัวก่อนไป" },
  prep_time: { en: "Best time", th: "ช่วงเวลาที่เหมาะ" },
  prep_bring: { en: "What to bring", th: "ควรเตรียมอะไรไป" },
  prep_etiq: { en: "Etiquette", th: "มารยาทที่ควรรู้" },
  prep_phrase: { en: "Useful phrase", th: "ประโยคที่ใช้ได้" },
  s_sources: { en: "Sources & checks", th: "แหล่งข้อมูลและสิ่งที่ตรวจสอบแล้ว" },
  s_sources_intro: { en: "The sources we checked, and what we couldn't confirm.", th: "นี่คือแหล่งข้อมูลที่เราตรวจสอบ และสิ่งที่เรายังยืนยันไม่ได้" },
  gap_sub: { en: "What we couldn't confirm", th: "สิ่งที่เรายังยืนยันไม่ได้" },
  correction_prompt: { en: "See something wrong? Send us the source and we'll re-check it.", th: "ถ้าคุณเห็นข้อมูลที่อาจไม่ถูกต้อง ส่งแหล่งข้อมูลมาให้เรา แล้วเราจะตรวจสอบอีกครั้ง" },

  // Contact-attribution block
  are_you_organiser: { en: "Are you the organiser?", th: "คุณเป็นผู้จัดงานใช่ไหม" },
  organiser_body: { en: "If this is your event, you can verify the details, add photos, and turn this page into an official guide.", th: "หากนี่คืองานของคุณ คุณสามารถช่วยยืนยันรายละเอียด เพิ่มรูปภาพ และทำให้หน้านี้เป็นไกด์ทางการได้" },
  need_update: { en: "Need to update this page?", th: "ต้องการอัปเดตหน้านี้หรือไม่" },
  request_update: { en: "Request an update", th: "ขออัปเดตข้อมูล" },

  // Plan field labels
  f_date: { en: "Date", th: "วันที่" },
  f_hours: { en: "Hours", th: "เวลา" },
  f_location: { en: "Location", th: "สถานที่" },
  f_entry: { en: "Entry", th: "ค่าเข้า" },
  f_organiser: { en: "Organiser", th: "ผู้จัดงาน" },
  f_source: { en: "Source", th: "แหล่งข้อมูล" },
  f_checked: { en: "Checked", th: "ตรวจสอบล่าสุด" },

  // Home
  home_h1: { en: "Understand what you are seeing in Thailand.", th: "เข้าใจสิ่งที่คุณกำลังเห็นในประเทศไทย" },
  home_sub: { en: "Events, food markets, temple fairs and local traditions explained in plain language — what they are, why they matter, and what to notice when you go.", th: "อธิบายงานอีเวนต์ ตลาดอาหาร งานวัด และประเพณีท้องถิ่นด้วยภาษาที่เข้าใจง่าย ว่าคืออะไร สำคัญอย่างไร และควรสังเกตอะไรเมื่อไปถึง" },
  cue_row: { en: "lantern parades · temple fairs · food markets · candle processions · boat races", th: "ขบวนโคมไฟ · งานวัด · ตลาดอาหาร · ขบวนแห่เทียน · แข่งเรือ" },
  example_guide: { en: "Example guide", th: "ตัวอย่างไกด์" },
  upcoming: { en: "Upcoming events", th: "งานอีเวนต์ที่กำลังจะมาถึง" },
  upcoming_sub: { en: "Festivals, temple fairs, food markets and regional events you can plan around.", th: "เทศกาล งานวัด ตลาดอาหาร และงานท้องถิ่นที่คุณวางแผนไปได้" },
  whatyouget: { en: "What you get here", th: "คุณจะได้อะไรจากที่นี่" },
  whatyouget_body: { en: "Most listings tell you where and when. BaanStory tells you what to notice when you arrive.", th: "หลายเว็บไซต์บอกแค่ว่าอยู่ที่ไหนและจัดเมื่อไร แต่ BaanStory บอกด้วยว่าควรสังเกตอะไรเมื่อไปถึง" },
  practical: { en: "Practical details", th: "ข้อมูลที่ใช้ได้จริง" },
  practical_body: { en: "Dates, places, maps and source links you can act on.", th: "วันที่ สถานที่ แผนที่ และลิงก์แหล่งข้อมูลที่นำไปใช้ต่อได้" },
  notice_pt: { en: "What to notice", th: "สิ่งที่ควรสังเกต" },
  notice_pt_body: { en: "Concrete things to look for, ask about, or compare when you arrive.", th: "สิ่งที่จับต้องได้ซึ่งควรสังเกต ถามต่อ หรือเปรียบเทียบเมื่อไปถึง" },
  ctx: { en: "Cultural context", th: "บริบททางวัฒนธรรม" },
  ctx_body: { en: "Plain-language explanation of why the event matters.", th: "คำอธิบายง่าย ๆ ว่าทำไมงานนี้จึงสำคัญ" },

  // Events listing
  events_h1: { en: "Events", th: "งานอีเวนต์" },
  events_sub: { en: "Festivals, temple fairs, food markets and regional events across Thailand.", th: "เทศกาล งานวัด ตลาดอาหาร และงานท้องถิ่นจากทั่วประเทศไทย" },
  events_caution: { en: "Some dates shift with lunar calendars. Check the source before planning travel.", th: "บางวันจัดงานอาจเปลี่ยนตามปฏิทินจันทรคติ ควรตรวจสอบแหล่งข้อมูลก่อนวางแผนเดินทาง" },
  events_count_one: { en: "1 event", th: "1 งาน" },
  events_count_n: { en: "{n} events", th: "{n} งาน" },
  events_empty: { en: "No upcoming events indexed yet. Check back later or send us a source.", th: "ตอนนี้ยังไม่มีงานอีเวนต์ที่กำลังจะมาถึงในระบบ ลองกลับมาดูอีกครั้งหรือส่งแหล่งข้อมูลให้เรา" },

  // Crafts (P0 placeholder per user constraint — bottom-nav includes Crafts)
  crafts_h1: { en: "Crafts", th: "งานหัตถกรรม" },
  crafts_sub: { en: "Object-first discovery is the next chapter. For now, craft context lives inside each event.", th: "การค้นพบผ่านวัตถุงานช่างจะเปิดให้ใช้ในรอบถัดไป ตอนนี้บริบทของงานช่างจะปรากฏอยู่ในหน้าของแต่ละงานอีเวนต์" },
  crafts_meanwhile: { en: "In the meantime", th: "ในระหว่างนี้" },
  crafts_browse: { en: "Browse events — most events here include the regional craft they revolve around in the “What to notice” section.", th: "ลองดูงานอีเวนต์ — งานส่วนใหญ่จะมีงานหัตถกรรมประจำภูมิภาคที่เกี่ยวข้องอยู่ในส่วน “สิ่งที่ควรสังเกต”" },

  // Contact
  contact_h1: { en: "How can we help?", th: "เราช่วยอะไรคุณได้บ้าง" },
  contact_sub: { en: "Tell us what you need. Pick an option below and we'll route your message to the right person.", th: "บอกเราว่าคุณต้องการอะไร แล้วเลือกหัวข้อด้านล่าง เราจะส่งข้อความของคุณไปยังคนที่เกี่ยวข้อง" },
  c_about: { en: "What's this about?", th: "เรื่องที่ต้องการติดต่อคืออะไร" },
  c_choose: { en: "Choose one", th: "เลือกหนึ่งข้อ" },
  c_name: { en: "Your name", th: "ชื่อของคุณ" },
  c_name_ph: { en: "First name, last name", th: "ชื่อ นามสกุล" },
  c_email: { en: "Your email", th: "อีเมลของคุณ" },
  c_email_help: { en: "We'll reply to this address.", th: "เราจะตอบกลับทางอีเมลนี้" },
  c_msg: { en: "Message", th: "ข้อความ" },
  c_msg_ph: { en: "Tell us what you need. The more concrete, the better.", th: "บอกเราว่าคุณต้องการอะไร ยิ่งชัดเจนยิ่งช่วยได้มาก" },
  c_msg_help: { en: "If you have a source link, paste it in the message.", th: "หากมีลิงก์แหล่งข้อมูล สามารถวางไว้ในข้อความได้" },
  c_consent: { en: "I agree to BaanStory processing my contact details to respond to this message.", th: "ฉันยินยอมให้ BaanStory ใช้ข้อมูลติดต่อของฉันเพื่อตอบกลับข้อความนี้" },
  c_privacy: { en: "We use your name, email, and message only to reply to you and follow up if needed. We do not send marketing emails.", th: "เราใช้ชื่อ อีเมล และข้อความของคุณเพื่อตอบกลับและติดตามเรื่องเท่าที่จำเป็นเท่านั้น เราจะไม่ส่งอีเมลการตลาด" },
  c_sending: { en: "Sending...", th: "กำลังส่ง..." },
  c_success_h: { en: "Thanks — we've got your message.", th: "ขอบคุณ เราได้รับข้อความของคุณแล้ว" },
  c_success_b: { en: "We read every submission. You'll hear back within 2 business days, sometimes sooner.", th: "เราตรวจอ่านทุกข้อความ และจะตอบกลับภายใน 2 วันทำการ บางครั้งอาจเร็วกว่า" },
  c_back: { en: "Back to events", th: "กลับไปที่งานอีเวนต์" },

  // Errors
  err_name: { en: "Please enter your name.", th: "กรุณากรอกชื่อของคุณ" },
  err_email_empty: { en: "Please enter your email.", th: "กรุณากรอกอีเมลของคุณ" },
  err_email_bad: { en: "That doesn't look like an email address.", th: "รูปแบบอีเมลนี้ดูไม่ถูกต้อง" },
  err_intent: { en: "Please choose an option.", th: "กรุณาเลือกหัวข้อที่ต้องการติดต่อ" },
  err_msg_empty: { en: "Please write a message.", th: "กรุณาเขียนข้อความ" },
  err_msg_short: { en: "Message is a little short — give us a few more words.", th: "ข้อความยังสั้นเกินไป กรุณาให้รายละเอียดเพิ่มอีกเล็กน้อย" },
  err_consent: { en: "Please tick the consent box.", th: "กรุณาติ๊กช่องยินยอม" },

  // Intent labels
  i_organiser_event: { en: "I run or represent an event", th: "ฉันเป็นผู้จัดงานหรือเป็นตัวแทนของงานอีเวนต์" },
  i_update: { en: "I need to update a page my institution has already verified", th: "ฉันต้องการอัปเดตหน้าที่หน่วยงานของฉันยืนยันข้อมูลไว้แล้ว" },
  i_correction: { en: "I want to report a correction on a page", th: "ฉันต้องการแจ้งข้อมูลแก้ไขในหน้าใดหน้าหนึ่ง" },
  i_partner: { en: "I represent a hotel, tour operator, or tourism body", th: "ฉันเป็นตัวแทนโรงแรม บริษัททัวร์ หรือหน่วยงานท่องเที่ยว" },
  i_send_source: { en: "I want to send a source or photo", th: "ฉันต้องการส่งแหล่งข้อมูลหรือรูปภาพ" },
  i_general: { en: "Something else", th: "เรื่องอื่น ๆ" },
};

window.STRINGS = STRINGS;
window.cx = cx;
window.useT = useT;

/* ============================================================
   Toast
   ============================================================ */
function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onDone, 3500);
    return () => clearTimeout(id);
  }, [message, onDone]);
  if (!message) return null;
  return (
    <div role="status" aria-live="polite" style={{
      position: "fixed", bottom: 96, left: "50%", transform: "translateX(-50%)",
      zIndex: 100, background: "var(--fg)", color: "var(--bg)",
      padding: "10px 16px", borderRadius: 999, fontSize: 14, letterSpacing: "-0.005em",
      maxWidth: "calc(100vw - 32px)",
    }}>
      {message}
    </div>
  );
}

/* ============================================================
   Header (sticky on desktop), drawer on mobile
   ============================================================ */
function Header({ page, navigate, lang, setLang, onToast }) {
  const t = useT(lang, STRINGS);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const toggleLang = () => {
    const next = lang === "en" ? "th" : "en";
    setLang(next);
    onToast(STRINGS.toast_lang_changed[next]);
  };

  const navItem = (label, key) => (
    <button
      onClick={() => { navigate(key); setDrawerOpen(false); }}
      className="nav-item"
      aria-current={page === key ? "page" : undefined}
      style={{
        padding: "10px 0", color: "var(--fg)",
        borderBottom: page === key ? "2px solid var(--accent)" : "2px solid transparent",
        fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em",
        textTransform: "uppercase", fontWeight: 500,
        minHeight: 44, display: "inline-flex", alignItems: "center",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ display: "contents" }}>
      <a href="#main" className="skip-link" style={{
        position: "absolute", left: -9999, top: 0,
      }} onFocus={(e) => Object.assign(e.target.style, { left: 12, top: 12, background: "var(--fg)", color: "var(--bg)", padding: "8px 12px", borderRadius: 6, zIndex: 1000 })}
         onBlur={(e) => Object.assign(e.target.style, { left: -9999 })}>
        {t("skip")}
      </a>

      <header className="sticky-header">
        <div className="container" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          minHeight: 64,
        }}>
          <button
            onClick={() => navigate("home")}
            aria-label="BaanStory"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20,
              letterSpacing: "-0.025em", color: "var(--fg)",
            }}
          >
            <span aria-hidden="true" style={{
              display: "inline-grid", placeItems: "center",
              width: 26, height: 26, position: "relative",
            }}>
              <svg viewBox="0 0 26 26" width="26" height="26">
                <circle cx="13" cy="13" r="12" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
                <path d="M5 16 L13 6 L21 16 Z" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinejoin="round" />
                <circle cx="13" cy="14.5" r="1.5" fill="var(--accent)" />
              </svg>
            </span>
            <span style={{ position: "relative", top: -1 }}>{t("brand")}</span>
          </button>

          {/* Desktop nav */}
          <nav aria-label="Primary" style={{
            display: "none", alignItems: "center", gap: 28,
          }} className="desktop-nav">
            {navItem(t("nav_events"), "events")}
            {navItem(t("nav_contact"), "contact")}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={toggleLang}
              aria-label={t("change_lang")}
              className="btn-ghost btn"
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                letterSpacing: "0.14em", textTransform: "uppercase",
                border: "1px solid var(--border)", borderRadius: 999,
                padding: "6px 12px", minHeight: 36, color: "var(--fg-2)",
              }}
            >
              <span style={{ color: lang === "en" ? "var(--fg)" : "var(--muted-2)" }}>EN</span>
              <span style={{ margin: "0 6px", color: "var(--muted-2)" }}>/</span>
              <span style={{ color: lang === "th" ? "var(--fg)" : "var(--muted-2)" }}>TH</span>
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label={t("open_menu")}
              className="hamburger"
              style={{
                width: 44, height: 44, display: "inline-grid", placeItems: "center",
              }}
            >
              <span aria-hidden="true" style={{ display: "grid", gap: 4 }}>
                <span style={{ display: "block", width: 18, height: 1.5, background: "var(--fg)" }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "var(--fg)" }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "var(--fg)" }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer */}
      {drawerOpen && (
        <div role="dialog" aria-modal="true" aria-label={t("nav_events")}
             style={{ position: "fixed", inset: 0, zIndex: 80 }}>
          <div onClick={() => setDrawerOpen(false)}
               style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: "min(320px, 86vw)", background: "var(--surface)",
            borderLeft: "1px solid var(--border)", display: "flex",
            flexDirection: "column", padding: "16px 20px",
          }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setDrawerOpen(false)} aria-label={t("close_menu")}
                style={{ width: 44, height: 44, display: "grid", placeItems: "center" }}>
                <span aria-hidden="true" style={{ fontSize: 24, lineHeight: 1, color: "var(--fg)" }}>×</span>
              </button>
            </div>
            <nav aria-label="Mobile primary" style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
              <DrawerLink label={t("nav_home")} active={page === "home"} onClick={() => { navigate("home"); setDrawerOpen(false); }} />
              <DrawerLink label={t("nav_events")} active={page === "events"} onClick={() => { navigate("events"); setDrawerOpen(false); }} />
              <DrawerLink label={t("nav_crafts")} active={page === "crafts"} onClick={() => { navigate("crafts"); setDrawerOpen(false); }} />
              <DrawerLink label={t("nav_contact")} active={page === "contact"} onClick={() => { navigate("contact"); setDrawerOpen(false); }} />
            </nav>
            <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid var(--border)" }}>
              <button className="btn btn-primary" style={{ width: "100%" }}
                      onClick={() => { navigate("contact"); setDrawerOpen(false); }}>
                {t("contact_us")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DrawerLink({ label, active, onClick }) {
  return (
    <button onClick={onClick} aria-current={active ? "page" : undefined}
            style={{
              textAlign: "left", padding: "14px 12px", borderRadius: 12,
              background: active ? "var(--surface-2)" : "transparent",
              fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 18,
              color: "var(--fg)", letterSpacing: "-0.01em",
            }}>
      {label}
    </button>
  );
}

/* Bottom nav — user hard constraint: Home / Events / Crafts on mobile <768 */
function BottomNav({ page, navigate, lang }) {
  const t = useT(lang, STRINGS);
  const items = [
    { key: "home", label: t("nav_home"), icon: HomeIcon },
    { key: "events", label: t("nav_events"), icon: CalendarIcon },
    { key: "crafts", label: t("nav_crafts"), icon: CraftIcon },
  ];
  const isActive = (k) => page === k || (k === "events" && page === "event");
  return (
    <nav className="bottom-nav" aria-label="Bottom">
      {items.map((it) => {
        const Icon = it.icon;
        const active = isActive(it.key);
        return (
          <button key={it.key} className={active ? "active" : ""} onClick={() => navigate(it.key)}
                  aria-current={active ? "page" : undefined}>
            <span className="bn-glyph"><Icon /></span>
            <span>{it.label}</span>
            <span className="bn-dot" />
          </button>
        );
      })}
    </nav>
  );
}

/* Footer (events-only browse per copy-deck-p0) */
function Footer({ lang, navigate }) {
  const t = useT(lang, STRINGS);
  return (
    <footer style={{
      borderTop: "1px solid var(--border)", marginTop: 80,
      background: "var(--bg)", padding: "56px 0 40px",
    }}>
      <div className="container" style={{ display: "grid", gap: 40 }}>
        <div style={{ maxWidth: 520 }}>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22,
            letterSpacing: "-0.015em", marginBottom: 10,
          }}>
            {t("brand")}
          </div>
          <p style={{ color: "var(--fg-2)", fontSize: 15 }}>{t("footer_brand")}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
          <FooterCol heading={t("footer_browse")}>
            <FooterLink onClick={() => navigate("events")}>{t("nav_events")}</FooterLink>
          </FooterCol>
          <FooterCol heading={t("footer_organisers")}>
            <FooterLink onClick={() => navigate("contact", { intent: "organiser_event" })}>{t("add_or_claim")}</FooterLink>
          </FooterCol>
        </div>

        <div style={{
          paddingTop: 24, borderTop: "1px solid var(--border)",
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--muted)",
        }}>
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ heading, children }) {
  return (
    <div>
      <h3 style={{
        fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
        textTransform: "uppercase", fontWeight: 500, color: "var(--gold-ink)",
        marginBottom: 12,
      }}>{heading}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
        {React.Children.map(children, (c) => <li>{c}</li>)}
      </ul>
    </div>
  );
}
function FooterLink({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      color: "var(--fg-2)", textAlign: "left", fontSize: 15,
      textDecoration: "underline", textDecorationColor: "var(--border-2)",
      textUnderlineOffset: 3,
    }}>
      {children}
    </button>
  );
}

/* ============================================================
   Icons (hairline, minimal)
   ============================================================ */
function HomeIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5 10 3.5l7 6V17a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1V9.5Z" /></svg>;
}
function CalendarIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="14" height="12" rx="1.5" /><path d="M3 9h14M7 3v4M13 3v4" /></svg>;
}
function CraftIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17h14M5 17V8.5a5 5 0 0 1 10 0V17M2.5 8.5h15M10 3.5v5"/></svg>;
}
function CheckIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 6.5 5 9l4.5-6"/></svg>;
}
function MapPinIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 12.5C7 12.5 2.5 8.5 2.5 6a4.5 4.5 0 0 1 9 0c0 2.5-4.5 6.5-4.5 6.5Z"/><circle cx="7" cy="6" r="1.5"/></svg>;
}
function ShareIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="3" r="1.6"/><circle cx="3" cy="7" r="1.6"/><circle cx="11" cy="11" r="1.6"/><path d="M4.5 6.2l5-2.3M4.5 7.8l5 2.3"/></svg>;
}
function ArrowRight() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 7h8M7 3l4 4-4 4"/></svg>;
}

/* ============================================================
   Verified / Source / HonestGap
   ============================================================ */
function VerifiedIndicator({ institution, lang }) {
  return (
    <div className="verified">
      <span className="label">
        <span className="check"><CheckIcon /></span>
        Verified
      </span>
      <div className="institution">
        {STRINGS.verified_by[lang].replace("{institution}", institution)}
      </div>
    </div>
  );
}
function SourceAttribution({ source, date, lang }) {
  const t = useT(lang, STRINGS);
  return (
    <div className="source-line">
      {t("source_line", { source, date })}
    </div>
  );
}
function HonestGap({ children }) { return <span className="gap">{children}</span>; }

/* ============================================================
   Editorial placeholder image — drawing motifs in CSS
   ============================================================ */
function PlaceholderImage({ event, label }) {
  if (event.image?.src) {
    return (
      <img
        src={event.image.src}
        alt={event.image.alt?.en || ""}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          aspectRatio: "16 / 11",
          objectFit: "cover",
          borderRadius: "var(--radius-card)",
          display: "block",
        }}
      />
    );
  }

  // Always render the Thai-script glyph on a tinted/striped block.
  // The diagonal hairline pattern is the consistent "editorial placeholder" texture.
  return (
    <div className="placeholder" style={{ aspectRatio: "16 / 11" }}>
      <span className="glyph" lang="th">{event.glyph}</span>
      <span className="label">EDITORIAL · BAANSTORY</span>
    </div>
  );
}

/* ============================================================
   Event card preview
   ============================================================ */
function EventCardPreview({ event, lang, onOpen, compact = false }) {
  const t = useT(lang, STRINGS);
  const isVerified = !!event.verified;
  return (
    <article
      className="card event-card"
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen())}
      tabIndex={0}
      role="link"
      aria-label={event.name[lang]}
      style={{ cursor: "pointer", padding: compact ? 18 : 20 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ position: "relative" }}>
          <PlaceholderImage event={event} />
          {isVerified && (
            <span className="card-stamp" aria-hidden="true">
              <CheckIcon /> Verified
            </span>
          )}
        </div>

        <div>
          <div className="meta" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
            <span>{event.dateText[lang]}</span>
            <span aria-hidden="true" style={{ color: "var(--muted-2)" }}>·</span>
            <span>{event.province}</span>
          </div>

          <h3 className="h3" style={{ marginBottom: 4, fontSize: 22, letterSpacing: "-0.018em" }}>
            {event.name[lang]}
          </h3>
          {lang !== "th" && (
            <div lang="th" style={{
              fontFamily: "var(--font-display-th)", fontSize: 16, color: "var(--muted)",
              marginBottom: 12, lineHeight: 1.35, fontWeight: 400,
            }}>
              {event.thai_name}
            </div>
          )}

          <p style={{
            color: "var(--fg-2)", marginTop: lang === "th" ? 10 : 0, fontSize: 15,
            lineHeight: 1.55,
          }}>
            {event.value[lang]}
          </p>
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 14, borderTop: "1px solid var(--border)", gap: 12,
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            {isVerified ? (
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "var(--gold-ink)",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {event.verified.institution}
              </div>
            ) : (
              <div className="source-line" style={{
                fontSize: 12,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {STRINGS.source_line[lang].replace("{source}", event.source[lang]).replace("{date}", event.sourceChecked[lang])}
              </div>
            )}
          </div>
          <span className="card-go" aria-hidden="true">
            <ArrowRight />
          </span>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, {
  Toast, Header, BottomNav, Footer,
  VerifiedIndicator, SourceAttribution, HonestGap,
  PlaceholderImage, EventCardPreview,
  CheckIcon, MapPinIcon, ShareIcon, ArrowRight,
});
