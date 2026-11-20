// The provider calls this when a payment succeeds or fails.
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Use POST" };
  // TODO 1: verify the provider's signature/secret from its docs. Reject anything unsigned.
  // TODO 2: look up the order by reference and check the paid amount matches what you expected.
  // TODO 3: only then mark it paid and notify yourself (email or WhatsApp) to deliver the order.
  console.log("Webhook received (unverified, do not act on it yet):", event.body);
  return { statusCode: 200, body: "ok" };
};
