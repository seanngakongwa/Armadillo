# Armadillo Crew Deals store (Netlify)

Files: index.html (the store), netlify.toml, netlify/functions/ (payment backend).

## Deploy (functions need Git or the CLI; plain drag-and-drop skips them)
1. Create a free GitHub account and a new repository. Upload this whole folder.
2. In Netlify: Add new site, Import from Git, pick the repository. Publish directory ".", no build command.
3. Site settings, Environment variables: add PAYMENT_PROVIDER and your provider's keys. Redeploy after changing them.

## Turn on online payments
1. Finish createCheckout() in create-payment.js and the checks in payment-webhook.js using your provider's docs.
2. In index.html change `const ONLINE=false;` to `true`.
3. Test in the provider's sandbox, then with a small real payment.

Until ONLINE is true, orders go to WhatsApp exactly as before. Never put secret keys in index.html.
