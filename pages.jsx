/* global React, STRINGS, useT, cx,
   EventCardPreview, VerifiedIndicator, SourceAttribution, HonestGap,
   PlaceholderImage, MapPinIcon, ShareIcon, CheckIcon, ArrowRight,
   EVENTS, groupByMonth, getEvent */
const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP } = React;

/* ============================================================
   HOME PAGE
   ============================================================ */
function HomePage({ lang, navigate, onToast }) {
  const t = useT(lang, STRINGS);
  const example = EVENTS[0]; // Bo Sang
  const upcoming = EVENTS.slice(0, 4);

  return (
    <main id="main" className="main-pad-bottom">
      {/* HERO */}
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="hero-kicker">
            <span className="hero-kicker-dot" aria-hidden="true" />
            <span className="section-kicker" style={{ marginBottom: 0 }}>01 · Cultural field guide for Thailand</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56, alignItems: "start" }}
               className="hero-grid">
            <div>
              <h1 className="hero-h1" lang={lang === "th" ? "th" : undefined} style={{ marginTop: 8 }}>
                {t("home_h1")}
              </h1>
              <p className="dek" style={{ marginTop: 24, maxWidth: 580 }}>
                {t("home_sub")}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
                <button className="btn btn-primary" onClick={() => navigate("events")}>
                  {t("find_events")} <ArrowRight />
                </button>
              </div>

              <div className="cue-row" style={{
                marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--border)",
                color: "var(--muted)", fontSize: 13, lineHeight: 1.7,
              }}>
                <span className="caption" style={{ display: "block", color: "var(--gold-ink)", marginBottom: 8 }}>
                  What's inside
                </span>
                {t("cue_row")}
              </div>
            </div>

            {/* desktop right column: example guide */}
            <div className="hero-side" style={{ display: "none" }}>
              <div className="section-kicker">{t("example_guide")}</div>
              <EventCardPreview event={example} lang={lang}
                                onOpen={() => navigate("event", { slug: example.slug })} />
            </div>
          </div>

          {/* Mobile example guide block */}
          <div className="mobile-example" style={{ marginTop: 64 }}>
            <div className="section-kicker">{t("example_guide")}</div>
            <EventCardPreview event={example} lang={lang}
                              onOpen={() => navigate("event", { slug: example.slug })} />
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end",
                        gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
            <div style={{ maxWidth: 560 }}>
              <div className="section-kicker">02 · Upcoming</div>
              <h2 className="h2">{t("upcoming")}</h2>
              <p className="dek" style={{ marginTop: 12 }}>{t("upcoming_sub")}</p>
            </div>
            <button className="btn btn-secondary" onClick={() => navigate("events")}>
              {t("view_all_events")} <ArrowRight />
            </button>
          </div>

          <div className="event-grid">
            {upcoming.map((e) => (
              <EventCardPreview key={e.slug} event={e} lang={lang}
                                onOpen={() => navigate("event", { slug: e.slug })} />
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET HERE */}
      <section className="section" style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="section-kicker">03 · The premise</div>
          <h2 className="h2" style={{ maxWidth: 720 }}>{t("whatyouget")}</h2>
          <p className="dek" style={{ marginTop: 16, maxWidth: 640 }}>
            {t("whatyouget_body")}
          </p>

          <div className="points-grid" style={{ marginTop: 48 }}>
            <PointCard num="A" title={t("practical")} body={t("practical_body")} />
            <PointCard num="B" title={t("notice_pt")} body={t("notice_pt_body")} />
            <PointCard num="C" title={t("ctx")} body={t("ctx_body")} />
          </div>
        </div>
      </section>
    </main>
  );
}

function PointCard({ num, title, body }) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)", padding: 28,
    }}>
      <div className="kicker" style={{ marginBottom: 18 }}>Point {num}</div>
      <h3 className="h3" style={{ marginBottom: 10 }}>{title}</h3>
      <p style={{ color: "var(--fg-2)", fontSize: 15 }}>{body}</p>
    </div>
  );
}

/* ============================================================
   EVENTS LISTING
   ============================================================ */
function EventsPage({ lang, navigate }) {
  const t = useT(lang, STRINGS);
  const groups = useMemoP(() => groupByMonth(EVENTS), []);

  return (
    <main id="main" className="main-pad-bottom">
      <section style={{ paddingTop: 40, paddingBottom: 8 }}>
        <div className="container">
          <div className="section-kicker">All events</div>
          <h1 className="hero-h1" style={{ fontSize: "clamp(36px, 6vw, 64px)" }}>{t("events_h1")}</h1>
          <p className="dek" style={{ marginTop: 16, maxWidth: 640 }}>{t("events_sub")}</p>

          <div style={{
            marginTop: 28, padding: "12px 16px",
            background: "var(--surface-2)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-card)",
            fontSize: 13, color: "var(--fg-2)",
            display: "flex", gap: 10, alignItems: "flex-start",
            maxWidth: 720,
          }}>
            <span aria-hidden="true" className="kicker" style={{ marginTop: 2 }}>Note</span>
            <span>{t("events_caution")}</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          {groups.length === 0 ? (
            <div style={{ padding: 24, border: "1px solid var(--border)", borderRadius: "var(--radius-card)" }}>
              <p>{t("events_empty")}</p>
              <div style={{ marginTop: 16 }}>
                <button className="btn btn-primary"
                        onClick={() => navigate("contact", { intent: "send_source" })}>
                  {t("send_source")}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 56 }}>
              {groups.map((g) => (
                <div key={g.key}>
                  <div style={{
                    display: "flex", alignItems: "baseline", gap: 16,
                    marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--border)",
                  }}>
                    <h2 className="h2" style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}>
                      {g.label[lang]}
                    </h2>
                    <span className="meta">
                      {g.items.length === 1
                        ? t("events_count_one")
                        : t("events_count_n", { n: g.items.length })}
                    </span>
                  </div>
                  <div className="event-grid">
                    {g.items.map((e) => (
                      <EventCardPreview key={e.slug} event={e} lang={lang}
                                        onOpen={() => navigate("event", { slug: e.slug })} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   EVENT DETAIL
   ============================================================ */
function EventPage({ slug, lang, navigate, onToast }) {
  const t = useT(lang, STRINGS);
  const event = getEvent(slug);
  if (!event) {
    return (
      <main id="main" className="main-pad-bottom container" style={{ padding: "80px 20px" }}>
        <p>Event not found.</p>
        <button className="btn btn-secondary" onClick={() => navigate("events")} style={{ marginTop: 16 }}>
          {t("c_back")}
        </button>
      </main>
    );
  }

  const onShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: event.name[lang], url }); } catch (_) {}
    } else {
      try { await navigator.clipboard.writeText(url); } catch (_) {}
      onToast(STRINGS.toast_link_copied[lang]);
    }
  };

  return (
    <main id="main" className="main-pad-bottom">
      {/* Breadcrumb */}
      <section style={{ paddingTop: 24, paddingBottom: 0 }}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="meta" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => navigate("events")} style={{ color: "var(--muted)" }}>
              {t("nav_events")}
            </button>
            <span aria-hidden="true">›</span>
            <span style={{ color: "var(--fg-2)" }} aria-current="page">{event.name[lang]}</span>
          </nav>
        </div>
      </section>

      {/* HERO */}
      <section style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="container">
          <div className="event-hero" style={{ display: "grid", gap: 32, gridTemplateColumns: "1fr" }}>
            <div>
              <div className="meta" style={{ marginBottom: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span>{event.dateText[lang]}</span>
                <span aria-hidden="true">·</span>
                <span>{event.venue}</span>
              </div>
              <h1 className="hero-h1" style={{ fontSize: "clamp(34px, 5.5vw, 64px)" }}>
                {event.name[lang]}
              </h1>
              {lang !== "th" && (
                <div lang="th" style={{
                  marginTop: 12, fontFamily: "var(--font-display-th)",
                  fontSize: "clamp(22px, 3vw, 30px)", color: "var(--fg-2)",
                  fontWeight: 500,
                }}>
                  {event.thai_name}{" "}
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 13,
                    letterSpacing: "0.04em", color: "var(--muted)", marginLeft: 8,
                  }}>
                    /{event.romanisation}/
                  </span>
                </div>
              )}

              <p className="dek" style={{ marginTop: 24, maxWidth: 640 }}>
                {event.value[lang]}
              </p>

              <div style={{
                marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center",
              }}>
                <button className="btn btn-primary" onClick={onShare}>
                  <ShareIcon /> {t("share")}
                </button>
                {event.plan.mapsUrl && (
                  <a className="btn btn-secondary" href={event.plan.mapsUrl} target="_blank" rel="noopener">
                    <MapPinIcon /> {t("open_in_maps")}
                  </a>
                )}
              </div>

              <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
                {event.verified ? (
                  <VerifiedIndicator institution={event.verified.institution} lang={lang} />
                ) : (
                  <SourceAttribution source={event.source[lang]} date={event.sourceChecked[lang]} lang={lang} />
                )}
              </div>
            </div>

            <PlaceholderImage event={event} />
          </div>
        </div>
      </section>

      {/* TWO-COLUMN BODY */}
      <section className="section" style={{ paddingTop: 32, borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="event-body" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48 }}>
            {/* MAIN */}
            <div style={{ display: "grid", gap: 56 }}>
              {/* What to notice */}
              <div>
                <div className="section-kicker">02 — What to notice</div>
                <h2 className="h2">{t("s_notice")}</h2>
                <p className="dek" style={{ marginTop: 8, marginBottom: 28 }}>{t("s_notice_sub")}</p>
                <div style={{ display: "grid", gap: 16 }}>
                  {event.notice.map((m, i) => (
                    <MomentCard key={i} num={String(i + 1).padStart(2, "0")} moment={m} lang={lang} />
                  ))}
                </div>
              </div>

              {/* Why this matters */}
              <div>
                <div className="section-kicker">03 — Context</div>
                <h2 className="h2">{t("s_why")}</h2>
                <div style={{
                  marginTop: 24, maxWidth: 680, fontSize: 17, lineHeight: 1.65,
                  color: "var(--fg-2)",
                }}>
                  <p>{event.why[lang]}</p>
                </div>
              </div>

              {/* Sources */}
              <SourcesBlock event={event} lang={lang} navigate={navigate} />
            </div>

            {/* SIDEBAR */}
            <aside style={{ display: "grid", gap: 32 }}>
              <PlanYourVisit event={event} lang={lang} t={t} />
              {event.visit && <VisitPreparation event={event} lang={lang} t={t} />}
              <ClaimCTA event={event} lang={lang} t={t} navigate={navigate} />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function MomentCard({ num, moment, lang }) {
  const [open, setOpen] = useStateP(false);
  return (
    <button className="moment" onClick={() => setOpen(!open)} aria-expanded={open}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="num">{num}</span>
        <span className="num" aria-hidden="true">{open ? "−" : "+"}</span>
      </div>
      <h4>{moment.title[lang]}</h4>
      {open && (
        <div className="body">
          <p>{moment.body[lang]}</p>
        </div>
      )}
      {!open && (
        <div className="expand">Tap to read</div>
      )}
    </button>
  );
}

function PlanYourVisit({ event, lang, t }) {
  const p = event.plan;
  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="section-kicker" style={{ marginBottom: 16 }}>{t("s_plan")}</div>
      <h3 className="h3" style={{ marginBottom: 12, fontSize: 20 }}>{t("s_plan")}</h3>

      <div>
        <Row label={t("f_date")} value={event.dateText[lang]} />
        <Row label={t("f_hours")} value={
          p.hours ? p.hours[lang] : <HonestGap>{t("gap_hours")}</HonestGap>
        } />
        <Row label={t("f_location")} value={p.location[lang]} />
        <Row label={t("f_entry")} value={p.entry[lang]} />
        <Row label={t("f_organiser")} value={
          p.organiser ? p.organiser[lang] : <HonestGap>{t("gap_organiser")}</HonestGap>
        } />
      </div>

      {p.mapsUrl && (
        <a href={p.mapsUrl} target="_blank" rel="noopener" className="btn btn-secondary"
           style={{ marginTop: 18, width: "100%" }}>
          <MapPinIcon /> {t("open_in_maps")}
        </a>
      )}
    </div>
  );
}
function Row({ label, value }) {
  return (
    <div className="field-row">
      <span className="lbl">{label}</span>
      <span className="val">{value}</span>
    </div>
  );
}

function VisitPreparation({ event, lang, t }) {
  const v = event.visit;
  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="section-kicker" style={{ marginBottom: 16 }}>{t("s_prep")}</div>
      <h3 className="h3" style={{ marginBottom: 18, fontSize: 20 }}>{t("s_prep")}</h3>

      <div style={{ display: "grid", gap: 18 }}>
        {v.bestTime && <PrepRow label={t("prep_time")} body={v.bestTime[lang]} />}
        {v.bring && <PrepRow label={t("prep_bring")} body={v.bring[lang]} />}
        {v.etiquette && <PrepRow label={t("prep_etiq")} body={v.etiquette[lang]} />}
        {v.phrase && (
          <div>
            <div className="kicker" style={{ marginBottom: 8 }}>{t("prep_phrase")}</div>
            <div style={{
              padding: 16, background: "var(--surface-2)", borderRadius: 16,
              border: "1px solid var(--border)",
            }}>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600,
                letterSpacing: "-0.01em",
              }}>“{v.phrase.en}”</div>
              <div lang="th" style={{
                fontFamily: "var(--font-display-th)", fontSize: 22, fontWeight: 500,
                color: "var(--fg)", marginTop: 4,
              }}>{v.phrase.th}</div>
              <div className="meta" style={{ marginTop: 6 }}>/{v.phrase.rom}/</div>
              {v.phrase.usage && (
                <p style={{ marginTop: 12, color: "var(--fg-2)", fontSize: 14 }}>
                  {v.phrase.usage[lang]}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function PrepRow({ label, body }) {
  return (
    <div>
      <div className="kicker" style={{ marginBottom: 6 }}>{label}</div>
      <p style={{ color: "var(--fg-2)", fontSize: 15 }}>{body}</p>
    </div>
  );
}

function SourcesBlock({ event, lang, navigate }) {
  const t = useT(lang, STRINGS);
  return (
    <div>
      <div className="section-kicker">04 — Provenance</div>
      <h2 className="h2">{t("s_sources")}</h2>
      <p className="dek" style={{ marginTop: 8, marginBottom: 28 }}>{t("s_sources_intro")}</p>

      <div className="sources" style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-card)", padding: 24, maxWidth: 720,
      }}>
        <ul>
          {event.sources.map((s, i) => <li key={i}>{s[lang]}</li>)}
        </ul>
      </div>

      {event.gaps.length > 0 && (
        <div style={{ marginTop: 24, maxWidth: 720 }}>
          <div className="kicker" style={{ marginBottom: 10 }}>{t("gap_sub")}</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
            {event.gaps.map((g, i) => (
              <li key={i} className="gap" style={{ fontSize: 15 }}>{g[lang]}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{
        marginTop: 28, padding: 20, background: "var(--surface-2)",
        border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
        maxWidth: 720,
      }}>
        <p style={{ fontSize: 15, color: "var(--fg-2)" }}>{t("correction_prompt")}</p>
        <button className="btn btn-secondary" style={{ marginTop: 14 }}
                onClick={() => navigate("contact", { intent: "correction", page: event.slug })}>
          {t("submit_correction")}
        </button>
      </div>
    </div>
  );
}

function ClaimCTA({ event, lang, t, navigate }) {
  if (event.verified) {
    return (
      <div className="card" style={{ padding: 24 }}>
        <VerifiedIndicator institution={event.verified.institution} lang={lang} />
        <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: 15, color: "var(--fg-2)" }}>{t("need_update")}</p>
          <button className="btn btn-secondary" style={{ marginTop: 12 }}
                  onClick={() => navigate("contact", { intent: "update", page: event.slug })}>
            {t("request_update")}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="section-kicker" style={{ marginBottom: 14 }}>For organisers</div>
      <h3 className="h3" style={{ marginBottom: 10, fontSize: 22 }}>{t("are_you_organiser")}</h3>
      <p style={{ color: "var(--fg-2)", fontSize: 15 }}>{t("organiser_body")}</p>
      <button className="btn btn-primary" style={{ marginTop: 18, width: "100%" }}
              onClick={() => navigate("contact", { intent: "organiser_event", page: event.slug })}>
        {t("get_in_touch")}
      </button>
    </div>
  );
}

/* ============================================================
   CRAFTS — P0 placeholder (bottom-nav constraint from user)
   ============================================================ */
function CraftsPage({ lang, navigate }) {
  const t = useT(lang, STRINGS);
  return (
    <main id="main" className="main-pad-bottom">
      <section style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="section-kicker">P1 — Coming next</div>
          <h1 className="hero-h1" style={{ fontSize: "clamp(36px, 6vw, 64px)" }}>{t("crafts_h1")}</h1>
          <p className="dek" style={{ marginTop: 16, maxWidth: 640 }}>{t("crafts_sub")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 32, maxWidth: 720 }}>
            <div className="section-kicker" style={{ marginBottom: 12 }}>{t("crafts_meanwhile")}</div>
            <p style={{ fontSize: 16, color: "var(--fg-2)" }}>{t("crafts_browse")}</p>
            <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate("events")}>
              {t("find_events")} <ArrowRight />
            </button>
          </div>

          <div style={{ marginTop: 56 }}>
            <div className="section-kicker">Craft context inside events</div>
            <h2 className="h2" style={{ maxWidth: 640, marginTop: 4 }}>
              {lang === "th"
                ? "ลองดูตัวอย่างหัตถกรรมในงานเหล่านี้"
                : "Try these events for hands-on craft context"}
            </h2>
            <div className="event-grid" style={{ marginTop: 28 }}>
              {EVENTS.slice(0, 3).map((e) => (
                <EventCardPreview key={e.slug} event={e} lang={lang}
                                  onOpen={() => navigate("event", { slug: e.slug })} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function ContactPage({ lang, navigate, params, onToast }) {
  const t = useT(lang, STRINGS);

  const [intent, setIntent] = useStateP(params?.intent || "");
  const [name, setName] = useStateP("");
  const [email, setEmail] = useStateP("");
  const [message, setMessage] = useStateP("");
  const [pageUrl, setPageUrl] = useStateP(params?.page || "");
  const [consent, setConsent] = useStateP(false);
  const [errors, setErrors] = useStateP({});
  const [submitting, setSubmitting] = useStateP(false);
  const [success, setSuccess] = useStateP(false);

  useEffectP(() => {
    if (params?.intent) setIntent(params.intent);
    if (params?.page) setPageUrl(params.page);
  }, [params?.intent, params?.page]);

  const intents = [
    ["organiser_event", t("i_organiser_event")],
    ["update",          t("i_update")],
    ["correction",      t("i_correction")],
    ["partner",         t("i_partner")],
    ["send_source",     t("i_send_source")],
    ["general",         t("i_general")],
  ];

  const validate = () => {
    const e = {};
    if (!intent) e.intent = t("err_intent");
    if (!name.trim()) e.name = t("err_name");
    if (!email.trim()) e.email = t("err_email_empty");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t("err_email_bad");
    if (!message.trim()) e.message = t("err_msg_empty");
    else if (message.trim().length < 12) e.message = t("err_msg_short");
    if (!consent) e.consent = t("err_consent");
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900)); // simulated POST
    setSubmitting(false);
    setSuccess(true);
    const which =
      intent === "correction" ? STRINGS.toast_correction_sent[lang] :
      intent === "send_source" ? STRINGS.toast_source_sent[lang] :
      STRINGS.toast_contact_sent[lang];
    onToast(which);
  };

  if (success) {
    return (
      <main id="main" className="main-pad-bottom">
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
              <div className="card" style={{ padding: 32, textAlign: "left" }}>
                <div className="section-kicker" style={{ marginBottom: 16, color: "var(--state-verified)" }}>
                  <CheckIcon /> Received
                </div>
                <h2 className="h2" style={{ marginBottom: 12 }}>{t("c_success_h")}</h2>
                <p style={{ color: "var(--fg-2)", fontSize: 16 }}>{t("c_success_b")}</p>
                <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button className="btn btn-primary" onClick={() => navigate("events")}>
                    {t("c_back")}
                  </button>
                  <button className="btn btn-secondary" onClick={() => {
                    setSuccess(false); setName(""); setEmail(""); setMessage(""); setConsent(false);
                  }}>
                    {lang === "th" ? "ส่งข้อความอีกครั้ง" : "Send another message"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main" className="main-pad-bottom">
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div className="section-kicker">Contact</div>
            <h1 className="hero-h1" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>{t("contact_h1")}</h1>
            <p className="dek" style={{ marginTop: 16 }}>{t("contact_sub")}</p>

            <form noValidate onSubmit={submit} style={{ marginTop: 36, display: "grid", gap: 20 }}>
              <div className="field">
                <label className="fl" htmlFor="intent">{t("c_about")}</label>
                <select id="intent" className={cx("select", errors.intent && "invalid")}
                        value={intent} onChange={(e) => setIntent(e.target.value)}>
                  <option value="">{t("c_choose")}</option>
                  {intents.map(([v, label]) => (
                    <option key={v} value={v}>{label}</option>
                  ))}
                </select>
                {errors.intent && <span className="err">{errors.intent}</span>}
              </div>

              {(intent === "update" || intent === "correction" || intent === "organiser_event") && (
                <div className="field">
                  <label className="fl" htmlFor="pageUrl">
                    {intent === "organiser_event"
                      ? (lang === "th" ? "งานของคุณมีอยู่บน BaanStory แล้วหรือยัง" : "Is your event already on BaanStory?")
                      : (lang === "th" ? "หน้าใดที่ต้องการแก้ไข / อัปเดต" : "Which page?")}
                  </label>
                  <input id="pageUrl" className="input"
                         placeholder="/events/..." value={pageUrl}
                         onChange={(e) => setPageUrl(e.target.value)} />
                </div>
              )}

              <div className="field">
                <label className="fl" htmlFor="name">{t("c_name")}</label>
                <input id="name" className={cx("input", errors.name && "invalid")}
                       placeholder={t("c_name_ph")} value={name}
                       onChange={(e) => setName(e.target.value)} />
                {errors.name && <span className="err">{errors.name}</span>}
              </div>

              <div className="field">
                <label className="fl" htmlFor="email">{t("c_email")}</label>
                <input id="email" type="email" className={cx("input", errors.email && "invalid")}
                       placeholder="you@example.com" value={email}
                       onChange={(e) => setEmail(e.target.value)} />
                <span className="helper">{t("c_email_help")}</span>
                {errors.email && <span className="err">{errors.email}</span>}
              </div>

              <div className="field">
                <label className="fl" htmlFor="msg">{t("c_msg")}</label>
                <textarea id="msg" className={cx("textarea", errors.message && "invalid")}
                          placeholder={t("c_msg_ph")} value={message}
                          onChange={(e) => setMessage(e.target.value)} />
                <span className="helper">{t("c_msg_help")}</span>
                {errors.message && <span className="err">{errors.message}</span>}
              </div>

              <div className="field">
                <div className="check-row">
                  <input id="consent" type="checkbox" checked={consent}
                         onChange={(e) => setConsent(e.target.checked)} />
                  <label htmlFor="consent" style={{ fontSize: 14, color: "var(--fg-2)" }}>
                    {t("c_consent")}
                  </label>
                </div>
                {errors.consent && <span className="err">{errors.consent}</span>}
                <p className="helper" style={{ marginTop: 4 }}>{t("c_privacy")}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="btn btn-primary" disabled={submitting}
                        style={{ minWidth: 180, opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? t("c_sending") : t("send_message")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { HomePage, EventsPage, EventPage, ContactPage, CraftsPage });
