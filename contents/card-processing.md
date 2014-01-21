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
  header: Once a card is charged, funds are placed in your <a href='https://docs.balancedpayments.com/current/overview#funds-flow'>escrow account</a> (held by Balanced). You may then pay out to your own bank account or use Balanced’s <a href='/payouts'>Payouts solution</a> to pay your U.S. sellers.
  step1: Charge your customer’s debit or credit card
  step2: Funds are available immediately in your escrow balance
  step31: Collect your funds by paying out to your bank account
  step32: Pay your sellers using Balanced’s <a href='/payouts'>Payouts solution</a>

collectingCardInfo:
  title: Collecting card info
  body: Charge a card by collecting the card number and expiration date. Information is securely passed through <a href='https://docs.balancedpayments.com/current/#balanced-js'>balanced.js</a>, bypassing your servers and removing your need to become <a href='https://balancedpayments.zendesk.com/hc/en-us/articles/200173030-Do-I-need-to-be-PCI-compliant-'>PCI compliant</a>.
  learnLink: View card processing best practices
  learnLinkHref: https://balancedpayments.zendesk.com/entries/22779335-Verifications-Authorizations-and-Captures-Best-practices

recurringBilling:
  title: Recurring billing
  body: Balanced’s open-source, recurring payments system, <a href='https://docs.balancedpayments.com/current/#implementation-patterns'>Billy</a>, allows you to schedule charges at specific times.
  learnLink: Learn more about Billy
  learnLinkHref: https://docs.balancedpayments.com/current/#implementation-patterns

cardAuthorizations:
  title: Card authorizations
  body: Reserve funds on a credit card for up to seven days by issuing a card authorization.
  learnLink: Learn more about authorization use cases such as crowdfunding
  learnLinkHref: https://docs.balancedpayments.com/current/#holds

cardStatementDescriptor:
  title: Card statement descriptor
  body: Modify the card statement soft descriptor on a per-transaction basis. Each descriptor begins with BAL* followed by your 18-character-long description.
  learnLink: Learn more about setting the soft descriptor
  learnLinkHref: https://docs.balancedpayments.com/current/#soft-descriptors
  limit: "Card statement soft descriptor max. character length: 18"

chargebacksDisputes:
  title: Chargebacks & Disputes
  body: In the event of a chargeback, Balanced will notify you to help gather the documents necessary to fight the chargeback.
  learnLink: Learn more about the chargeback process
  learnLinkHref: https://support.balancedpayments.com/hc/en-us/articles/200135910-How-are-credit-card-chargebacks-and-disputes-handled-



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