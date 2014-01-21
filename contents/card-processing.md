---
title: Balanced - Payments processing, escrow, and payouts in one simple API | Card Processing
template: card-processing.html

pageTitle: Card Processing
body_class: card-processing

subtitle:
  heading: Accept credit and debit card payments.<br />Process any U.S. or international card without a separate merchant account and gateway.

howItWorks:
  title: How it works
  body: Balanced supports all major card brands from Visa and MasterCard to Discover and American Express. Funds are captured in U.S. currency and available for immediate access in your escrow balance.

howItWorksDiagram:
  header: "Once a card is charged, funds are placed in your <em>escrow account</em> (held by Balanced). You may then pay out to your own bank account or use Balanced’s <em>Payouts solution</em> to pay your U.S. sellers."
  step1: "Charge your customer’s debit or credit card"
  step2: "Funds are available immediately in your escrow balance"
  step31: "Collect your funds by paying out to your bank account"
  step32: "Pay your sellers using Balanced’s <em>Payouts solution</em>"

collectingCardInfo:
  title: Collecting card info
  body: Charge a card by collecting the card number and expiration date. Information is securely passed through <em>balanced.js</em>, bypassing your servers and removing your need to become <em>PCI compliant</em>.
  learnLink: View card processing best practices

recurringBilling:
  title: Recurring billing
  body: Balanced’s open-source,<br />recurring payments system,<br /><em>Billy</em>, allows you to schedule<br />charges at specific times.
  learnLink: "Learn more about Billy"

cardAuthorizations:
  title: Card authorizations
  body: Reserve funds on a credit card for up to seven days by issuing a card authorization.
  learnLink: Learn more about authorization<br />use cases such as crowdfunding.

cardStatementDescriptor:
  title: Card statement descriptor
  body: Modify the card statement soft<br />descriptor on a per-transaction<br />basis. Each descriptor begins with BAL* followed by your<br />18-character-long description.
  learnLink: "Learn more about setting<br />the soft descriptor"
  limit: "Card statement soft descriptor max. character length: 18"

chargebacksDisputes:
  title: Chargebacks & Disputes
  body: In the event of a chargeback,<br />Balanced will notify you to<br />help gather the documents necessary to fight the<br />chargeback.
  learnLink: "Learn more about the<br />chargeback process"



cardProcessingPricing:
  title: Pricing
  debit: Charging your buyers (successful credit card charge)
  authorizationHold: Authorization Hold
  chargeback: Chargeback
  refund: Refund
  failure: Failure

tryTheDashboard:
  body: Ready to get started?
  button: TRY THE DASHBOARD

---