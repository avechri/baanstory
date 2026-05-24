const RECIPIENT = "ask@baanstory.com";
const DEFAULT_INGEST_URL = "https://mail-ingest.baanstory.com/inbound";
const MAX_JSON_BYTES = 32 * 1024;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function text(value) {
  return String(value || "").trim();
}

function headerText(value) {
  return text(value).replace(/[\r\n]+/g, " ").slice(0, 180);
}

function emailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hex(bytes) {
  return [...new Uint8Array(bytes)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256(data) {
  return hex(await crypto.subtle.digest("SHA-256", data));
}

async function hmacHex(secret, payload) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return hex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)));
}

function validate(input) {
  const errors = {};
  const intent = text(input.intent);
  const name = text(input.name);
  const email = text(input.email).toLowerCase();
  const message = text(input.message);

  if (!intent) errors.intent = "required";
  if (!name) errors.name = "required";
  if (!email) errors.email = "required";
  else if (!emailValid(email)) errors.email = "invalid";
  if (!message) errors.message = "required";
  else if (message.length < 12) errors.message = "too_short";
  if (input.consent !== true) errors.consent = "required";

  return { errors, values: { intent, name, email, message } };
}

function buildEmail(values, input, request) {
  const now = new Date();
  const subject = `[BaanStory contact] ${headerText(values.intent)} - ${headerText(values.name)}`;
  const pageUrl = text(input.pageUrl);
  const sourcePath = text(input.sourcePath);
  const lang = text(input.lang);
  const userAgent = headerText(request.headers.get("user-agent"));

  const body = [
    "BaanStory contact form submission",
    "",
    `Intent: ${values.intent}`,
    `Name: ${values.name}`,
    `Reply email: ${values.email}`,
    `Language: ${lang || "(not provided)"}`,
    `Page URL: ${pageUrl || "(not provided)"}`,
    `Source path: ${sourcePath || "(not provided)"}`,
    `Submitted at: ${now.toISOString()}`,
    `User agent: ${userAgent || "(not provided)"}`,
    "",
    "Message:",
    values.message,
    "",
  ].join("\r\n");

  return [
    `From: BaanStory Contact Form <${RECIPIENT}>`,
    `To: BaanStory <${RECIPIENT}>`,
    `Reply-To: ${headerText(values.name)} <${values.email}>`,
    `Subject: ${subject}`,
    `Date: ${now.toUTCString()}`,
    `Message-ID: <contact-${crypto.randomUUID()}@baanstory.com>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
  ].join("\r\n");
}

export async function onRequestOptions() {
  return new Response(null, { status: 204 });
}

export async function onRequestPost({ request, env }) {
  if (!env.CONTACT_INGEST_SECRET) {
    return json({ ok: false, error: "server_not_configured" }, 500);
  }

  const length = Number(request.headers.get("content-length") || "0");
  if (length > MAX_JSON_BYTES) {
    return json({ ok: false, error: "payload_too_large" }, 413);
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }
  input = input && typeof input === "object" ? input : {};

  if (text(input.company)) {
    return json({ ok: true });
  }

  const { errors, values } = validate(input);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: "validation_failed", errors }, 400);
  }

  const rawEmail = buildEmail(values, input, request);
  const raw = new TextEncoder().encode(rawEmail);
  const digest = await sha256(raw);
  const timestamp = new Date().toISOString();
  const id = `contact-${timestamp.replace(/[-:.]/g, "")}-${crypto.randomUUID()}`;
  const sender = "contact-form@baanstory.com";
  const signaturePayload = `${timestamp}.${id}.${sender}.${RECIPIENT}.${digest}`;
  const signature = await hmacHex(env.CONTACT_INGEST_SECRET, signaturePayload);

  const response = await fetch(env.CONTACT_INGEST_URL || DEFAULT_INGEST_URL, {
    method: "POST",
    headers: {
      "content-type": "message/rfc822",
      "x-baanstory-mail-id": id,
      "x-baanstory-mail-from": sender,
      "x-baanstory-mail-to": RECIPIENT,
      "x-baanstory-mail-timestamp": timestamp,
      "x-baanstory-mail-sha256": digest,
      "x-baanstory-mail-signature": signature,
    },
    body: raw,
  });

  if (!response.ok) {
    return json({ ok: false, error: "ingest_failed" }, 502);
  }

  return json({ ok: true });
}
