/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle,
   Header, BottomNav, Footer, Toast,
   HomePage, EventsPage, EventPage, ContactPage, CraftsPage */
const { useState, useEffect, useMemo, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "en",
  "accent": "#7a2031",
  "showCueRow": true,
  "moodKicker": "01 · Cultural field guide"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply accent live (preserve --accent-ink as a darker step)
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  // Simple hash-based routing: #/, #/events, #/event/<slug>, #/contact, #/crafts
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [route.page, route.params?.slug]);

  const navigate = useCallback((page, params = {}) => {
    let hash = "#/";
    if (page === "home") hash = "#/";
    else if (page === "event" && params.slug) hash = `#/event/${params.slug}`;
    else if (page === "events") hash = "#/events";
    else if (page === "contact") {
      const qs = new URLSearchParams();
      if (params.intent) qs.set("intent", params.intent);
      if (params.page) qs.set("page", params.page);
      hash = "#/contact" + (qs.toString() ? `?${qs}` : "");
    }
    else if (page === "crafts") hash = "#/crafts";
    if (window.location.hash !== hash) window.location.hash = hash;
    else setRoute(parseHash(hash));
  }, []);

  const setLang = useCallback((next) => setTweak("lang", next), [setTweak]);

  // Toast state
  const [toast, setToast] = useState("");

  // Set lang on root for screen readers
  useEffect(() => {
    document.documentElement.lang = t.lang;
  }, [t.lang]);

  let pageEl = null;
  if (route.page === "home")
    pageEl = <HomePage lang={t.lang} navigate={navigate} onToast={setToast} />;
  else if (route.page === "events")
    pageEl = <EventsPage lang={t.lang} navigate={navigate} />;
  else if (route.page === "event")
    pageEl = <EventPage slug={route.params.slug} lang={t.lang} navigate={navigate} onToast={setToast} />;
  else if (route.page === "contact")
    pageEl = <ContactPage lang={t.lang} navigate={navigate} params={route.params} onToast={setToast} />;
  else if (route.page === "crafts")
    pageEl = <CraftsPage lang={t.lang} navigate={navigate} />;
  else pageEl = <HomePage lang={t.lang} navigate={navigate} onToast={setToast} />;

  return (
    <div data-page={route.page}>
      <Header
        page={route.page}
        navigate={(p, params) => navigate(p, params)}
        lang={t.lang}
        setLang={setLang}
        onToast={setToast}
      />
      {pageEl}
      <Footer lang={t.lang} navigate={(p, params) => navigate(p, params)} />
      <BottomNav page={route.page} navigate={navigate} lang={t.lang} />
      <Toast message={toast} onDone={() => setToast("")} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Language">
          <TweakRadio tweakKey="lang" value={t.lang} setTweak={setTweak}
                      options={[{ value: "en", label: "EN" }, { value: "th", label: "TH" }]} />
        </TweakSection>
        <TweakSection title="Accent">
          <TweakColor tweakKey="accent" value={t.accent} setTweak={setTweak}
                      options={["#7a2031", "#1f4e3f", "#3a4a6a", "#806820", "#1d1a16"]} />
        </TweakSection>
        <TweakSection title="Home hero">
          <TweakToggle tweakKey="showCueRow" value={t.showCueRow} setTweak={setTweak} label="Show cue row" />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function parseHash(hash) {
  // strip leading #
  let h = (hash || "").replace(/^#/, "");
  if (h === "" || h === "/") return { page: "home", params: {} };
  const [path, qs] = h.split("?");
  const segs = path.replace(/^\//, "").split("/").filter(Boolean);
  const params = {};
  if (qs) {
    const sp = new URLSearchParams(qs);
    for (const [k, v] of sp.entries()) params[k] = v;
  }
  if (segs[0] === "events") return { page: "events", params };
  if (segs[0] === "event" && segs[1]) return { page: "event", params: { slug: segs[1], ...params } };
  if (segs[0] === "contact") return { page: "contact", params };
  if (segs[0] === "crafts") return { page: "crafts", params };
  return { page: "home", params };
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
