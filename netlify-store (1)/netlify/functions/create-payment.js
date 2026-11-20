// Starts an online payment. Prices live HERE, never trusted from the browser.
const PRICES = { c1: 25000, c3: 65000, c6: 115000, v24: 50000, v45: 75000, v125: 160000 };
const NAMES = { c1: "1 month of Crew", c3: "3 months of Crew", c6: "6 months of Crew",
  v24: "2,400 V-Bucks", v45: "4,500 V-Bucks", v125: "12,500 V-Bucks" };
const reply = (code, body) => ({ statusCode: code, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "Use POST" });
  let b; try { b = JSON.parse(event.body || "{}"); } catch { return reply(400, { error: "Bad request" }); }
  let total = 0; const lines = [];
  for (const [id, q] of Object.entries(b.items || {})) {
    const qty = Number(q);
    if (!(id in PRICES) || !Number.isInteger(qty) || qty < 1 || qty > 20) return reply(400, { error: "Invalid item" });
    total += PRICES[id] * qty; lines.push(`${qty} x ${NAMES[id]}`);
  }
  if (!total) return reply(400, { error: "Your cart is empty" });
  const name = String(b.name || "").trim().slice(0, 80), epic = String(b.epic || "").trim().slice(0, 60), email = String(b.email || "").trim().slice(0, 120);
  if (!name || !epic) return reply(400, { error: "Name and Epic display name are required" });
  const provider = process.env.PAYMENT_PROVIDER;
  if (!provider) return reply(501, { error: "Online payment is not set up yet" });
  const ref = "WEB-" + Date.now().toString(36).toUpperCase();
  try {
    const checkoutUrl = await createCheckout({ provider, ref, total, name, epic, email, method: b.method, lines });
    return reply(200, { checkoutUrl, ref });
  } catch (e) { console.error(e); return reply(502, { error: "Could not start the payment" }); }
};

// TODO: replace with your provider's API call (Selcom, AzamPay, ClickPesa, Pesapal...).
// Read secrets from process.env (set them in the Netlify dashboard), e.g. process.env.PROVIDER_API_KEY.
// Send { amount: total, currency: "TZS", reference: ref, callback: SITE_URL + "/api/payment-webhook" }
// and return the hosted checkout URL the provider gives back.
async function createCheckout(o) {
  throw new Error("createCheckout is not implemented for provider: " + o.provider);
}
