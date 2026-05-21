/* Sample event corpus for P0 — real Thai craft events, source-backed framing.
   Each entry uses strings from copy-deck-p0.md where applicable. */

window.EVENTS = [
  {
    slug: "bo-sang-umbrella-festival",
    name: { en: "Bo Sang Umbrella Festival", th: "เทศกาลร่มบ่อสร้าง" },
    thai_name: "เทศกาลร่มบ่อสร้าง",
    romanisation: "têet-sà-gaan rôm bɔ̀ɔ sâang",
    region: "North",
    province: "Chiang Mai",
    venue: "Bo Sang Village, San Kamphaeng District",
    dateText: { en: "16–18 January 2026", th: "16–18 มกราคม 2569" },
    monthKey: "2026-01",
    monthLabel: { en: "January 2026", th: "มกราคม 2569" },
    value: {
      en: "Open workshops, painted paper umbrellas and a village parade near Chiang Mai.",
      th: "เวิร์กช็อปเปิดให้เข้าชม ร่มกระดาษสาวาดมือ และขบวนแห่ในหมู่บ้านใกล้เชียงใหม่",
    },
    image: {
      src: "assets/bo-sang-umbrella-festival.webp",
      alt: {
        en: "Women riding bicycles with yellow paper umbrellas in the Bo Sang parade.",
        th: "หญิงขี่จักรยานถือร่มกระดาษสีเหลืองในขบวนแห่บ่อสร้าง",
      },
    },
    cues: ["saa-paper umbrellas", "village parade", "open workshops"],
    glyph: "ร่ม",
    verified: { institution: "Bo Sang Umbrella Festival Committee", date: "December 2025" },
    motif: "umbrella",
    plan: {
      hours: { en: "09:00 — 21:00 daily", th: "09:00 — 21:00 ทุกวัน" },
      location: { en: "Bo Sang Village, San Kamphaeng, Chiang Mai", th: "หมู่บ้านบ่อสร้าง อำเภอสันกำแพง จังหวัดเชียงใหม่" },
      entry: { en: "Free to enter, paid workshops", th: "เข้างานฟรี แต่บางกิจกรรมมีค่าใช้จ่าย" },
      organiser: { en: "Bo Sang Umbrella Festival Committee", th: "คณะกรรมการเทศกาลร่มบ่อสร้าง" },
      mapsUrl: "https://maps.google.com/?q=Bo+Sang+Village",
    },
    notice: [
      { title: { en: "Count the ribs", th: "นับซี่ร่ม" },
        body: { en: "A saa-paper umbrella with fewer than twelve ribs was usually scaled for tourists. Ask to see one with sixteen — it will feel heavier and the canopy curls differently when you spin it.", th: "ร่มกระดาษสาที่มีน้อยกว่า 12 ซี่ส่วนใหญ่ทำขายให้นักท่องเที่ยว ลองขอดูร่มแบบ 16 ซี่ จะหนักกว่าและพลิ้วต่างกันเมื่อหมุน" } },
      { title: { en: "Watch the painters lift the brush", th: "ดูช่างวาดยกพู่กัน" },
        body: { en: "Painters work freehand and finish one umbrella in three to five minutes. The pattern is decided as they go — not copied from a stencil.", th: "ช่างวาดมือเปล่า และวาดเสร็จในเวลา 3–5 นาทีต่อหนึ่งใบ ลวดลายจะเกิดขึ้นในขณะวาด ไม่ได้ลอกจากแบบ" } },
      { title: { en: "The bamboo frame is the older craft", th: "โครงไม้ไผ่คือทักษะดั้งเดิม" },
        body: { en: "Before paper and paint, the umbrella was a frame. A maker may spend ten years before they make frames that hold under monsoon weight.", th: "ก่อนกระดาษและสี ร่มคือโครงไม้ไผ่ ช่างฝีมือใช้เวลาอาจถึงสิบปีกว่าจะทำโครงที่ทนน้ำหนักฝนได้" } },
      { title: { en: "Ask before you photograph a maker", th: "ขออนุญาตก่อนถ่ายรูปช่าง" },
        body: { en: "Most will say yes, or wave you in. The polite phrase is below.", th: "ส่วนใหญ่อนุญาต หรือโบกมือให้เข้ามา ลองพูดประโยคสุภาพข้างล่าง" } },
    ],
    why: {
      en: "Bo Sang has been a centre of saa-paper umbrella making for at least four generations. The festival is the village's annual moment of opening its workshops to outsiders — visitors walk past frames, paint stations, and drying racks that are working the rest of the year too. The umbrellas you see at hotel entrances across Thailand were often made or finished here.",
      th: "บ่อสร้างเป็นศูนย์กลางการทำร่มกระดาษสามาอย่างน้อยสี่รุ่น เทศกาลคือช่วงเวลาประจำปีที่หมู่บ้านเปิดเวิร์กช็อปให้คนนอกเข้าชม คุณจะเดินผ่านโครงร่ม จุดลงสี และที่ตากร่ม ซึ่งทำงานอยู่ตลอดทั้งปี ร่มที่คุณเห็นตามหน้าโรงแรมทั่วประเทศไทยส่วนใหญ่ผลิตหรือเก็บงานสุดท้ายที่นี่",
    },
    visit: {
      bestTime: { en: "Morning, before 11:00 — painters work in better light and crowds are lighter.", th: "ช่วงเช้าก่อน 11:00 ช่างวาดทำงานในแสงที่ดีกว่า และคนน้อยกว่า" },
      bring: { en: "Cash for workshop fees (200–400 THB), water, modest clothing if you plan to enter the temple at the end of the parade.", th: "เงินสดสำหรับค่ากิจกรรม (200–400 บาท) น้ำดื่ม และเสื้อผ้าสุภาพหากตั้งใจเข้าวัดในช่วงท้ายของขบวน" },
      etiquette: { en: "Ask before photographing makers, especially older ones. Do not touch drying umbrellas — wet saa-paper marks easily.", th: "ขออนุญาตก่อนถ่ายรูปช่าง โดยเฉพาะผู้สูงอายุ และไม่ควรแตะร่มที่กำลังตาก เพราะกระดาษสาเปียกเป็นรอยง่าย" },
      phrase: {
        en: "May I look?", th: "ขอดูได้ไหม", rom: "khǎaw duu dâai mǎi",
        usage: { en: "Polite when a maker is at work. They may say yes, or wave you in, or invite you to try.", th: "เป็นคำถามสุภาพเมื่อช่างกำลังทำงาน เขาอาจตอบรับ โบกมือให้เข้าไป หรือชวนให้ลองเอง" },
      },
    },
    sources: [
      { en: "Bo Sang Umbrella Festival Committee, official poster, checked December 2025.", th: "คณะกรรมการเทศกาลร่มบ่อสร้าง โปสเตอร์ทางการ ตรวจสอบเมื่อ ธันวาคม 2568" },
      { en: "Tourism Authority of Thailand event listing, checked December 2025.", th: "หน้ารายการของการท่องเที่ยวแห่งประเทศไทย ตรวจสอบเมื่อ ธันวาคม 2568" },
      { en: "Recorded conversation with Lung Somsak, frame maker, Bo Sang, 2024.", th: "บันทึกสนทนากับลุงสมศักดิ์ ช่างทำโครงร่ม บ่อสร้าง ปี 2567" },
    ],
    gaps: [
      { en: "Exact parade route changes year to year — confirmed only one week before the festival.", th: "เส้นทางขบวนเปลี่ยนทุกปี และจะยืนยันก่อนงานเริ่มประมาณหนึ่งสัปดาห์" },
    ],
  },

  {
    slug: "yi-peng-lantern-festival",
    name: { en: "Yi Peng Lantern Festival", th: "เทศกาลยี่เป็ง" },
    thai_name: "เทศกาลยี่เป็ง",
    romanisation: "yîi-peng",
    region: "North",
    province: "Chiang Mai",
    venue: "Old city moat, Tha Phae Gate, Mae Jo",
    dateText: { en: "14–16 November 2026", th: "14–16 พฤศจิกายน 2569" },
    monthKey: "2026-11",
    monthLabel: { en: "November 2026", th: "พฤศจิกายน 2569" },
    value: {
      en: "Sky lanterns released over the old city, paper-craft processions and almsgiving at dawn.",
      th: "ปล่อยโคมลอยเหนือเมืองเก่า ขบวนแห่โคมไฟ และตักบาตรเช้า",
    },
    cues: ["sky lanterns", "krathong floats", "paper craft"],
    glyph: "โคม",
    verified: null, // free entry
    source: { en: "M-Culture event API", th: "ฐานข้อมูลกิจกรรมกระทรวงวัฒนธรรม" },
    sourceChecked: { en: "April 2026", th: "เมษายน 2569" },
    plan: {
      hours: null,
      location: { en: "Old city moat, Chiang Mai", th: "คูเมืองเก่า เชียงใหม่" },
      entry: { en: "Free to enter, paid workshops", th: "เข้างานฟรี แต่บางกิจกรรมมีค่าใช้จ่าย" },
      organiser: null,
      mapsUrl: "https://maps.google.com/?q=Tha+Phae+Gate+Chiang+Mai",
    },
    notice: [
      { title: { en: "There are two kinds of lantern", th: "โคมไฟมีสองแบบ" },
        body: { en: "Khom loi rise into the sky; khom thuean stay tied to bamboo poles along the street. The first is what photographs sell. The second is what the city actually decorates with.", th: "โคมลอยลอยขึ้นไปบนฟ้า ส่วนโคมถือถูกผูกไว้กับเสาไม้ไผ่ตามถนน รูปที่ขายมักเป็นแบบแรก แต่แบบที่สองคือสิ่งที่ประดับเมืองจริง" } },
      { title: { en: "Look at how the paper is folded", th: "สังเกตรอยพับของกระดาษ" },
        body: { en: "Hand-pleated khom thuean show small irregular folds. Machine-cut versions are too even. The unevenness is the proof of hand work.", th: "โคมถือที่พับมือจะเห็นรอยพับเล็ก ๆ ไม่สม่ำเสมอ ส่วนแบบเครื่องตัดจะเรียบเกินไป ความไม่สม่ำเสมอคือร่องรอยของงานมือ" } },
      { title: { en: "Dawn almsgiving is the quiet part", th: "ตักบาตรเช้าคือช่วงสงบ" },
        body: { en: "Before the lanterns, monks walk the moat at sunrise. Most visitors miss this; locals show up.", th: "ก่อนช่วงปล่อยโคม พระเดินบิณฑบาตรอบคูเมืองตอนพระอาทิตย์ขึ้น นักท่องเที่ยวมักพลาดช่วงนี้ คนท้องถิ่นมากันแต่เช้า" } },
    ],
    why: {
      en: "Yi Peng marks the end of the rains in the Lanna calendar. The sky lanterns carry away misfortune; the river krathong carry away the year's debts to water and land. The festival is older than mass tourism by several centuries, and the paper-craft skills sustain a small year-round workshop economy.",
      th: "ยี่เป็งเป็นช่วงสิ้นสุดฤดูฝนตามปฏิทินล้านนา โคมลอยถือเป็นการปล่อยเคราะห์ ส่วนกระทงเป็นการขอขมาน้ำและดิน เทศกาลนี้มีมาก่อนการท่องเที่ยวสมัยใหม่หลายร้อยปี และทักษะงานกระดาษช่วยหล่อเลี้ยงเศรษฐกิจของเวิร์กช็อปขนาดเล็กตลอดทั้งปี",
    },
    visit: {
      bestTime: { en: "First night for the parade; second night for sky lanterns at Mae Jo.", th: "คืนแรกชมขบวน คืนที่สองปล่อยโคมที่แม่โจ้" },
      bring: { en: "Cash for krathong (50–150 THB) and lanterns (100–300 THB), long sleeves for night cold.", th: "เงินสดสำหรับกระทง (50–150 บาท) และโคม (100–300 บาท) เสื้อแขนยาวกันหนาวกลางคืน" },
      etiquette: { en: "Sky lanterns are banned outside official zones. Releasing one elsewhere can be fined and dangerous to aircraft.", th: "ห้ามปล่อยโคมลอยนอกพื้นที่ทางการ การปล่อยที่อื่นมีโทษและเป็นอันตรายต่อเครื่องบิน" },
      phrase: {
        en: "Where is it allowed to release?", th: "ปล่อยที่ไหนได้บ้าง", rom: "plɔ̀i thîi nǎi dâai bâang",
        usage: { en: "Ask any uniformed volunteer at the moat. They have the current safe-zone map.", th: "ถามอาสาสมัครในเครื่องแบบที่คูเมือง ทุกคนมีแผนที่พื้นที่ปลอดภัยของวันนั้น" },
      },
    },
    sources: [
      { en: "M-Culture event API, checked April 2026.", th: "API ของกระทรวงวัฒนธรรม ตรวจสอบเมื่อ เมษายน 2569" },
      { en: "Chiang Mai Provincial Office event listing, checked April 2026.", th: "หน้าประชาสัมพันธ์ของจังหวัดเชียงใหม่ ตรวจสอบเมื่อ เมษายน 2569" },
    ],
    gaps: [
      { en: "Opening hours for the Mae Jo release night are not yet confirmed for 2026.", th: "เวลาเริ่มของการปล่อยโคมที่แม่โจ้ปี 2569 ยังไม่ยืนยัน" },
      { en: "No verified photo of the 2026 edition supplied yet.", th: "ยังไม่มีรูปภาพที่ยืนยันแล้วสำหรับงานปี 2569" },
    ],
  },

  {
    slug: "phi-ta-khon",
    name: { en: "Phi Ta Khon Mask Festival", th: "เทศกาลผีตาโขน" },
    thai_name: "เทศกาลผีตาโขน",
    romanisation: "phǐi-taa-khǒn",
    region: "Northeast",
    province: "Loei",
    venue: "Dan Sai District, Phon Chai Temple",
    dateText: { en: "27–29 June 2026", th: "27–29 มิถุนายน 2569" },
    monthKey: "2026-06",
    monthLabel: { en: "June 2026", th: "มิถุนายน 2569" },
    value: {
      en: "Painted spirit masks carved from steamed coconut husks and palm fronds, worn through a three-day Buddhist procession.",
      th: "หน้ากากผีลงสีจากกาบมะพร้าวและทางมะพร้าวนึ่ง สวมในขบวนพุทธสามวัน",
    },
    cues: ["coconut husk masks", "village procession", "Buddhist rites"],
    glyph: "ผี",
    verified: { institution: "Dan Sai District Cultural Council", date: "March 2026" },
    motif: "block",
    plan: {
      hours: { en: "Day 1 procession from 07:30. Day 2 main parade from 09:00.", th: "วันที่หนึ่ง ขบวนเริ่ม 07:30 น. วันที่สอง ขบวนใหญ่ 09:00 น." },
      location: { en: "Phon Chai Temple, Dan Sai, Loei", th: "วัดโพนชัย อำเภอด่านซ้าย จังหวัดเลย" },
      entry: { en: "Free", th: "ฟรี" },
      organiser: { en: "Dan Sai District Cultural Council", th: "สภาวัฒนธรรมอำเภอด่านซ้าย" },
      mapsUrl: "https://maps.google.com/?q=Dan+Sai+Loei",
    },
    notice: [
      { title: { en: "Every mask is made for this year only", th: "หน้ากากแต่ละใบทำเพื่อปีนี้ปีเดียว" },
        body: { en: "After the festival, traditional makers will burn or release theirs into the river. A maker selling one to keep is usually selling a separate replica.", th: "หลังเทศกาล ช่างดั้งเดิมจะเผาหรือปล่อยหน้ากากของตนลงน้ำ ใบที่ขายให้เก็บไว้มักเป็นแบบจำลองคนละใบ" } },
      { title: { en: "The brown husk shows under the paint", th: "เห็นเนื้อกาบมะพร้าวใต้สี" },
        body: { en: "Authentic masks are pulped coconut, not carved wood. You can see the brown fibres at the edges of the eye holes.", th: "หน้ากากของจริงทำจากเยื่อมะพร้าว ไม่ใช่ไม้แกะ ดูได้จากเส้นใยน้ำตาลที่ขอบช่องตา" } },
      { title: { en: "There are two phi: tall and small", th: "ผีมีสองขนาด: ใหญ่กับเล็ก" },
        body: { en: "Phi Ta Khon Yai (a male and a female pair) appear only in the main procession on Day 2. The small phi run everywhere through all three days.", th: "ผีตาโขนใหญ่ (คู่ชาย-หญิง) ปรากฏเฉพาะในขบวนใหญ่วันที่สอง ส่วนผีตาโขนเล็กออกมาทั้งสามวัน" } },
    ],
    why: {
      en: "Phi Ta Khon is a Bun Luang merit-making festival overlaid with much older Lao-Thai spirit beliefs. The masks turn the village briefly into a place where the dead can join the living for the Buddhist procession — then they are returned. The carving skill survives because the festival keeps demand for new masks every June.",
      th: "ผีตาโขนคือเทศกาลทำบุญหลวงที่ซ้อนทับด้วยความเชื่อเรื่องผีของชาวลาว-ไทยที่เก่าแก่กว่ามาก หน้ากากเปลี่ยนหมู่บ้านให้เป็นสถานที่ที่คนตายกลับมาร่วมขบวนพุทธชั่วคราว แล้วจึงถูกส่งคืน ทักษะการทำหน้ากากยังคงอยู่เพราะเทศกาลทำให้มีความต้องการหน้ากากใหม่ทุกเดือนมิถุนายน",
    },
    visit: {
      bestTime: { en: "Day 1 (rocket procession) for atmosphere; Day 2 for the main mask parade.", th: "วันที่หนึ่ง (ขบวนบั้งไฟ) เพื่อบรรยากาศ วันที่สอง สำหรับขบวนหน้ากากใหญ่" },
      bring: { en: "Sunscreen, water, cash for masks (300–2000 THB depending on size).", th: "ครีมกันแดด น้ำดื่ม เงินสดสำหรับซื้อหน้ากาก (300–2000 บาท ตามขนาด)" },
      etiquette: { en: "Do not touch a mask being worn. The wearer is in role; the mask is not a costume in the souvenir sense.", th: "ไม่ควรแตะหน้ากากที่สวมอยู่ ผู้สวมยังอยู่ในบทบาท หน้ากากในขณะนั้นไม่ใช่ของที่ระลึก" },
      phrase: null,
    },
    sources: [
      { en: "Dan Sai District Cultural Council, festival programme, checked March 2026.", th: "สภาวัฒนธรรมอำเภอด่านซ้าย กำหนดการงานเทศกาล ตรวจสอบเมื่อ มีนาคม 2569" },
      { en: "Phon Chai Temple, on-site interview, 2024.", th: "วัดโพนชัย สัมภาษณ์ภาคสนาม ปี 2567" },
    ],
    gaps: [],
  },

  {
    slug: "candle-procession-ubon",
    name: { en: "Ubon Candle Procession", th: "ประเพณีแห่เทียนพรรษาอุบลฯ" },
    thai_name: "ประเพณีแห่เทียนพรรษาอุบลราชธานี",
    romanisation: "prà-pheenii hɛ̀ɛ thian phansǎa",
    region: "Northeast",
    province: "Ubon Ratchathani",
    venue: "Thung Si Mueang Park",
    dateText: { en: "20–22 July 2026", th: "20–22 กรกฎาคม 2569" },
    monthKey: "2026-07",
    monthLabel: { en: "July 2026", th: "กรกฎาคม 2569" },
    value: {
      en: "Beeswax candle floats carved by temple teams over three months, paraded for the start of Buddhist Lent.",
      th: "เทียนพรรษาแกะสลักจากไขผึ้งโดยทีมของแต่ละวัดใช้เวลาสามเดือน แห่ในวันเริ่มเข้าพรรษา",
    },
    cues: ["beeswax carving", "temple competition", "Buddhist Lent"],
    glyph: "เทียน",
    verified: { institution: "Ubon Ratchathani Provincial Office", date: "May 2026" },
    motif: "block",
    plan: {
      hours: { en: "Main parade from 08:00 on 22 July. Carving previews open at temples from mid-June.", th: "ขบวนใหญ่เริ่ม 08:00 น. วันที่ 22 ก.ค. ส่วนการแกะสลักเปิดให้ดูตามวัดตั้งแต่กลางมิถุนายน" },
      location: { en: "Thung Si Mueang Park, Ubon Ratchathani", th: "ทุ่งศรีเมือง จังหวัดอุบลราชธานี" },
      entry: { en: "Free", th: "ฟรี" },
      organiser: { en: "Ubon Ratchathani Provincial Office", th: "ศาลากลางจังหวัดอุบลราชธานี" },
      mapsUrl: "https://maps.google.com/?q=Thung+Si+Mueang+Ubon",
    },
    notice: [
      { title: { en: "There are two carving techniques", th: "มีสองเทคนิคการแกะ" },
        body: { en: "Tim — pressing wax through cut moulds — is older. Lae — direct relief carving — produces the figures you photograph. Each major temple specialises in one.", th: "ติม — การกดเทียนผ่านแม่พิมพ์ — เป็นเทคนิคดั้งเดิม ส่วน แล่ — การแกะสลักนูนโดยตรง — คือแบบที่นักท่องเที่ยวมักถ่ายภาพ วัดใหญ่แต่ละแห่งเชี่ยวชาญคนละแบบ" } },
      { title: { en: "Visit a temple before the parade", th: "แวะวัดก่อนวันแห่" },
        body: { en: "From late June, you can watch the carving in progress. Wat Sri Pradu and Wat Phra That Nong Bua are the usual welcoming hosts.", th: "ตั้งแต่ปลายมิถุนายน คุณสามารถดูช่างกำลังแกะที่วัดได้ วัดศรีประดู่และวัดพระธาตุหนองบัวมักเป็นวัดที่เปิดต้อนรับ" } },
      { title: { en: "The smell tells you the wax is real", th: "กลิ่นบอกได้ว่าใช้ไขผึ้งจริง" },
        body: { en: "Pure beeswax has a faint honey smell; paraffin imitations smell of nothing. The traditional candles are still bees.", th: "ไขผึ้งแท้จะมีกลิ่นน้ำผึ้งจาง ๆ ส่วนพาราฟินไม่มีกลิ่น เทียนแบบดั้งเดิมยังใช้ไขผึ้งจริง" } },
    ],
    why: {
      en: "Candle Procession marks the start of Vassa, the Buddhist Lent when monks remain at one temple for three months. The candles were originally a practical donation — light for the monastery during the rains. Over generations the offerings grew into the carved floats you now see paraded.",
      th: "ประเพณีแห่เทียนเริ่มต้นเข้าพรรษา ช่วงที่พระต้องอยู่ประจำวัดเดียวเป็นเวลาสามเดือน เดิมทีเทียนคือการถวายให้ใช้จริง — เพื่อแสงสว่างในช่วงฝน ผ่านหลายชั่วอายุคน การถวายค่อย ๆ เติบใหญ่จนกลายเป็นต้นเทียนแกะสลักที่แห่ในปัจจุบัน",
    },
    visit: {
      bestTime: { en: "Early morning on 22 July; arrive before 08:00 for shade near the park.", th: "เช้าวันที่ 22 ก.ค. ควรไปถึงก่อน 08:00 น. เพื่อหาที่นั่งในร่มใกล้สวน" },
      bring: { en: "Hat, water, modest clothing for entering temples to see the carving in progress.", th: "หมวก น้ำดื่ม และเสื้อผ้าสุภาพสำหรับเข้าวัดเพื่อชมช่างแกะ" },
      etiquette: { en: "Remove shoes before stepping onto temple platforms. Do not place yourself between a praying visitor and the candle.", th: "ถอดรองเท้าก่อนขึ้นศาลาวัด อย่ายืนขวางระหว่างผู้ที่กำลังกราบกับต้นเทียน" },
      phrase: null,
    },
    sources: [
      { en: "Ubon Ratchathani Provincial Office, official programme, checked May 2026.", th: "ศาลากลางจังหวัดอุบลราชธานี กำหนดการทางการ ตรวจสอบเมื่อ พฤษภาคม 2569" },
    ],
    gaps: [
      { en: "Sources list different start times for the warm-up procession on 20 July.", th: "แหล่งข้อมูลระบุเวลาเริ่มของขบวนวอร์มอัปวันที่ 20 ก.ค. ไม่ตรงกัน" },
    ],
  },

  {
    slug: "rocket-festival-yasothon",
    name: { en: "Bun Bang Fai Rocket Festival", th: "ประเพณีบุญบั้งไฟ" },
    thai_name: "ประเพณีบุญบั้งไฟ",
    romanisation: "bun bâng fai",
    region: "Northeast",
    province: "Yasothon",
    venue: "Yasothon town park",
    dateText: { en: "9–10 May 2026", th: "9–10 พฤษภาคม 2569" },
    monthKey: "2026-05",
    monthLabel: { en: "May 2026", th: "พฤษภาคม 2569" },
    value: {
      en: "Hand-built bamboo rockets fired into the sky to ask the rain spirit for monsoon water.",
      th: "บั้งไฟที่ทำมือจากไม้ไผ่ถูกจุดขึ้นฟ้าเพื่อขอน้ำฝนจากเทพฝน",
    },
    cues: ["bamboo rockets", "village teams", "monsoon ritual"],
    glyph: "บั้ง",
    verified: null,
    source: { en: "M-Culture event API", th: "ฐานข้อมูลกิจกรรมกระทรวงวัฒนธรรม" },
    sourceChecked: { en: "March 2026", th: "มีนาคม 2569" },
    plan: {
      hours: null,
      location: { en: "Yasothon town park, Yasothon", th: "สวนสาธารณะกลางเมืองยโสธร จังหวัดยโสธร" },
      entry: { en: "Free", th: "ฟรี" },
      organiser: null,
      mapsUrl: "https://maps.google.com/?q=Yasothon",
    },
    notice: [
      { title: { en: "Each rocket has a team", th: "บั้งไฟแต่ละลำมีทีมประจำ" },
        body: { en: "Villages build their rockets together for weeks. The team carries it, decorates it, and is publicly responsible for whether it flies.", th: "หมู่บ้านสร้างบั้งไฟร่วมกันหลายสัปดาห์ ทีมจะแห่ ตกแต่ง และรับผิดชอบต่อหน้าทุกคนว่าจุดแล้วจะลอยหรือไม่" } },
      { title: { en: "If the rocket fails, the team gets muddy", th: "ถ้าบั้งไฟไม่ขึ้น ทีมถูกโยนลงโคลน" },
        body: { en: "Traditionally, a team whose rocket fails is thrown into a mud pit. This is part of the ritual, not a punishment — the mud connects the failure back to the earth that is asking for rain.", th: "ตามประเพณี ทีมที่บั้งไฟล้มเหลวจะถูกโยนลงบ่อโคลน นี่เป็นส่วนหนึ่งของพิธี ไม่ใช่บทลงโทษ — โคลนคือสิ่งที่เชื่อมความล้มเหลวกลับสู่ผืนดินที่กำลังขอฝน" } },
      { title: { en: "The decoration is its own art", th: "การตกแต่งบั้งไฟเป็นงานศิลปะของตัวเอง" },
        body: { en: "Before launch, rockets are paraded with intricate cut-paper, painted nagas and bamboo lacework. Photograph the parade — most of the decoration burns up in the launch.", th: "ก่อนจุด บั้งไฟจะถูกแห่พร้อมกระดาษตัดลวดลาย รูปพญานาคลงสี และโครงไม้ไผ่ลาย ควรถ่ายช่วงขบวน — ของตกแต่งส่วนใหญ่จะไหม้ไปกับการจุด" } },
    ],
    why: {
      en: "Bun Bang Fai is a pre-Buddhist rain ceremony that survived inside the Buddhist calendar. It is held just before the rice-planting rains. The skill set — bamboo joinery, gunpowder-by-hand, the cut-paper decoration — is taught by older men in each village to younger ones every May.",
      th: "บุญบั้งไฟเป็นพิธีขอฝนยุคก่อนพุทธที่ยังคงอยู่ในปฏิทินพุทธ จัดในช่วงก่อนฝนตกเพื่อเริ่มฤดูทำนา ทักษะที่ใช้ — งานไม้ไผ่ การทำดินดำ การตัดกระดาษ — ถ่ายทอดจากผู้สูงอายุชายในหมู่บ้านสู่คนรุ่นใหม่ทุกพฤษภาคม",
    },
    visit: {
      bestTime: { en: "Day 1 is the parade; Day 2 is the launch. The parade is where craft is on show.", th: "วันที่หนึ่งคือขบวน วันที่สองคือการจุด งานฝีมือดูได้ดีกว่าในวันขบวน" },
      bring: { en: "Sun protection, water, earplugs (the launches are loud).", th: "ที่กันแดด น้ำดื่ม และที่อุดหู (เสียงจุดบั้งไฟดังมาก)" },
      etiquette: { en: "Keep behind the marshalled launch perimeter. The traditional muddy aftermath is for team members only; do not join.", th: "อยู่หลังแนวกั้นที่เจ้าหน้าที่กำหนด ส่วนการลงบ่อโคลนเป็นของสมาชิกทีมเท่านั้น ไม่ควรร่วม" },
      phrase: null,
    },
    sources: [
      { en: "M-Culture event API, checked March 2026.", th: "API ของกระทรวงวัฒนธรรม ตรวจสอบเมื่อ มีนาคม 2569" },
    ],
    gaps: [
      { en: "Hours not confirmed. Check the organiser source before going.", th: "ยังไม่ยืนยันเวลาเปิดงาน กรุณาตรวจสอบแหล่งข้อมูลของผู้จัดงานก่อนเดินทาง" },
      { en: "No public organiser contact yet. We've listed the source we used instead.", th: "ตอนนี้ยังไม่มีข้อมูลติดต่อผู้จัดงานในที่สาธารณะ เราจึงแสดงแหล่งข้อมูลที่เราใช้แทน" },
    ],
  },

  {
    slug: "songkran-chiang-mai",
    name: { en: "Songkran in Chiang Mai", th: "สงกรานต์เชียงใหม่" },
    thai_name: "สงกรานต์เชียงใหม่",
    romanisation: "sǒng-graan",
    region: "North",
    province: "Chiang Mai",
    venue: "Tha Phae Gate and old city",
    dateText: { en: "13–15 April 2026", th: "13–15 เมษายน 2569" },
    monthKey: "2026-04",
    monthLabel: { en: "April 2026", th: "เมษายน 2569" },
    value: {
      en: "Old-city water-pouring rites at home, followed by the city-wide street water festival.",
      th: "พิธีรดน้ำในครอบครัวที่บ้าน ตามด้วยเทศกาลสาดน้ำทั่วเมือง",
    },
    cues: ["temple alms", "water-pouring rite", "street procession"],
    glyph: "น้ำ",
    verified: { institution: "Chiang Mai Municipality", date: "March 2026" },
    motif: "block",
    plan: {
      hours: { en: "Temple rituals from sunrise. Street water-throwing 10:00–19:00.", th: "พิธีในวัดเริ่มตั้งแต่พระอาทิตย์ขึ้น สาดน้ำตามถนน 10:00–19:00 น." },
      location: { en: "Tha Phae Gate area, Chiang Mai", th: "บริเวณประตูท่าแพ จังหวัดเชียงใหม่" },
      entry: { en: "Free", th: "ฟรี" },
      organiser: { en: "Chiang Mai Municipality", th: "เทศบาลนครเชียงใหม่" },
      mapsUrl: "https://maps.google.com/?q=Tha+Phae+Gate",
    },
    notice: [
      { title: { en: "The water has a meaning", th: "น้ำมีความหมาย" },
        body: { en: "Pouring scented water over an elder's hands is a request for blessing, not a game. Most families do this at home before noon on Day 1, before the streets get loud.", th: "การรดน้ำหอมบนมือผู้ใหญ่คือการขอพร ไม่ใช่การเล่น ส่วนใหญ่ครอบครัวทำที่บ้านก่อนเที่ยงของวันแรก ก่อนถนนจะคึกคัก" } },
      { title: { en: "Bring an old shirt", th: "เสื้อตัวเก่าใส่มา" },
        body: { en: "Phone and camera in a sealed bag. The flour mixed with water is part of the play; it stains light fabric.", th: "ใส่โทรศัพท์และกล้องในถุงกันน้ำ แป้งผสมน้ำเป็นส่วนหนึ่งของการเล่น และอาจติดเสื้อสีอ่อน" } },
      { title: { en: "Do not splash monks or elders", th: "ห้ามสาดน้ำใส่พระและผู้สูงอายุ" },
        body: { en: "Both wear traditional dress on Songkran. They are visible because they are not playing.", th: "ทั้งพระและผู้สูงอายุใส่ชุดดั้งเดิมในวันสงกรานต์ ที่เห็นชัดเพราะไม่ได้กำลังเล่น" } },
    ],
    why: {
      en: "Songkran is the Thai New Year, set by the solar calendar. The water rite is a cleansing — Buddha images are bathed in temples, elders' hands are washed at home, and the rest is the public memory of those private acts.",
      th: "สงกรานต์คือปีใหม่ไทยตามปฏิทินสุริยคติ การรดน้ำเป็นพิธีชำระล้าง — สรงน้ำพระพุทธรูปในวัด ล้างมือผู้ใหญ่ที่บ้าน ส่วนการเล่นน้ำตามถนนคือความทรงจำสาธารณะของพิธีส่วนตัวเหล่านั้น",
    },
    visit: {
      bestTime: { en: "Day 1 dawn for temple rituals; afternoon for the streets. Day 3 is calmer if you want photographs without a soaking.", th: "เช้าวันแรกสำหรับพิธีในวัด บ่ายสำหรับถนน วันที่สามสงบกว่าถ้าอยากถ่ายรูปโดยไม่เปียก" },
      bring: { en: "Sealed phone bag, sandals, change of clothes, modest top for entering temples in the morning.", th: "ถุงกันน้ำสำหรับโทรศัพท์ รองเท้าแตะ เสื้อสำรอง และเสื้อสุภาพสำหรับเข้าวัดตอนเช้า" },
      etiquette: { en: "Ask before pouring water onto someone. Most will smile and accept; some are in transit and prefer not.", th: "ขออนุญาตก่อนสาดน้ำใส่ใคร ส่วนใหญ่ยินดี แต่บางคนกำลังเดินทางและอาจไม่สะดวก" },
      phrase: {
        en: "Happy new year (Songkran greeting)", th: "สวัสดีปีใหม่", rom: "sà-wàt-dii pii mài",
        usage: { en: "The standard Thai greeting, used everywhere on these three days.", th: "คำทักทายมาตรฐานที่ใช้ทั่วประเทศในสามวันนี้" },
      },
    },
    sources: [
      { en: "Chiang Mai Municipality, festival programme, checked March 2026.", th: "เทศบาลนครเชียงใหม่ กำหนดการ ตรวจสอบเมื่อ มีนาคม 2569" },
      { en: "Tourism Authority of Thailand, regional listing, checked March 2026.", th: "การท่องเที่ยวแห่งประเทศไทย รายการระดับภูมิภาค ตรวจสอบเมื่อ มีนาคม 2569" },
    ],
    gaps: [],
  },
];

// Helper: group events by monthKey, preserving order
window.groupByMonth = function (events) {
  const groups = {};
  for (const ev of events) {
    if (!groups[ev.monthKey]) groups[ev.monthKey] = { key: ev.monthKey, label: ev.monthLabel, items: [] };
    groups[ev.monthKey].items.push(ev);
  }
  return Object.values(groups).sort((a, b) => a.key.localeCompare(b.key));
};

window.getEvent = function (slug) {
  return window.EVENTS.find((e) => e.slug === slug);
};
