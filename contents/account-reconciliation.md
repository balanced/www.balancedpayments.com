---
title: Account Reconciliation | Balanced
template: account-reconciliation.html

pageTitle: Account Reconciliation
body_class: account-reconciliation

subtitle:
  heading: Use orders to reconcile incoming funds from buyers with outgoing funds to merchants.
  bodyText: Whether you&#8217re a goods/services marketplace or a crowdfunding/donation platform, Balanced enables you to link related transactions and maintain a separate order balance to help reconcile your accounting.

intro:
  - step: 1
    title: Debit the buyer
    body: Create an order by debiting the buyer and assigning the funds to the appropriate merchant.
  - step: 2
    title: Hold funds
    body: Funds are held in an order balance, separate from all other orders. Funds must be paid to merchants within 30 days of the charge.
  - step: 3
    title: Settle funds to the merchant
    body: Pay the merchant and collect your fee. Only one merchant is allowed per order.

features:
  - title: Reconcile funds
    body: Manually reconciling your accounting is a time-consuming task. Orders allow for a one-to-one mapping of funds so you can easily pinpoint corresponding debits and credits.
    class: account-reconciliation-linking
  - title: Identify outstanding balances
    body: Keep track of funds owed to merchants. Orders enable you to monitor a merchant's aging report to see how long orders for each merchant have been outstanding.
    class: account-reconciliation-balances
    name: aging-report
  - title: Prevent losses
    body: |
      Since each order maintains a separate balance, you cannot use unreferenced funds to issue credits.
      
      Orders also offer additional safeguards for disputes. Once a dispute is filed, the refund function will be disabled to prevent you from unknowingly refunding the buyer as the dispute process is pending.
    class: account-reconciliation-losses
  - title: Combine payouts from multiple orders
    body: Balanced allows you to issue one payout to a merchant with multiple orders waiting to be settled. Each customer has a payable account which can carry a stored balance. Simply credit the funds from the various orders into your merchant’s balance. Then issue a settlement from the balance to your merchant’s bank account.
    class: account-reconciliation-bulk-crediting
    linkUrl: https://docs.balancedpayments.com/1.1/guides/settlements/
    linkText: View docs for settlements
  - title: Track orders from the Balanced Dashboard
    body: The Balanced Dashboard provides a complete view of each order with detailed customer and transaction information.
    class1: account_reconciliation_dashboard_1
    classCaption1: "Dashboard > Payments > Orders tab"
    class2: account_reconciliation_dashboard_2
    classCaption2: "Dashboard > Payments > Orders > Order page"
    name: dashboard
  - title: Implementing orders
    body: "Using orders is simple: just specify the merchant and create an order for this merchant."
    name: api
    linkUrl: https://docs.balancedpayments.com/1.1/guides/orders/
    linkText: View docs for orders

contactUs: |
  If you have any questions, send an email to <a href="mailto:support+orders@balancedpayments.com">support+orders@balancedpayments.com</a>

---
