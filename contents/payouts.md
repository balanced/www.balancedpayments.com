---
title: Balanced - Payments processing, escrow, and payouts in one simple API | Payouts
template: payouts.html

pageTitle: Payouts
body_class: payouts

subtitle:
  heading: Pay your sellers with next business day ACH direct deposit.
  description: Funds are deposited the next business day for U.S. bank accounts and same business day for Wells Fargo accounts.

withProcessing:
  title: The full marketplace solution
  body: With Balanced's card processing and ACH debits, money from your buyers is placed into an order-specific escrow on behalf of the seller until you're ready to pay out.
  linkText: View payments scenario
  linkUrl: https://docs.balancedpayments.com/1.1/guides/collecting-fees/

payoutsOnly:
  title: Payouts only
  body: Simply fund your escrow (held by Balanced) with your marketplace's bank account to pay your sellers.
  linkText: View payments scenario
  linkUrl: https://docs.balancedpayments.com/1.1/guides/collecting-fees/

paymentSchedule:
  title: Payment schedule
  body: Balanced will batch payouts for submission each weekday, except for bank holidays.
  linkText: View bank holidays
  linkUrl: https://support.balancedpayments.com/hc/en-us/articles/200135930

submissionTimes:
  days: Monday to Friday
  time: "3:30"
  timezone: PM Pacific

collectingBankInfo:
  title: Collecting bank account info
  body: To issue a payout, collect the bank account holder's name, routing number, account number, and account type.
  learnLink: View payouts best practices
  learnLinkUrl: http://jsfiddle.net/balanced/ZwhrA/

payoutStatus:
  title: Payout status
  body: The status of a payout is updated throughout its lifecycle. Follow our best practices guide to minimize payout failures.
  legend:
    - key: Pending
      value: Payout is submitted to Balanced.
    - key: Succeeded
      value: A “succeeded” status is displayed as the expected state of the deposit one day after payout submission; however, there is no immediate confirmation regarding the success of the payout.
    - key: Failed
      value: If a payout fails due to incorrect account information, Balanced will be notified in 1–4 business days. The status will update from “pending” to “failed” or “succeeded” to “failed” depending on when the failed notice is received.

reversingAPayout:
  title: Reversing a payout
  body: You may reverse a payout in order to retrieve funds back from the seller.
  legend:
    - key: Pending
      value: Payout reversal is submitted to Balanced.
    - key: Succeeded
      value: A “succeeded” status is displayed as the expected state of the reversal 3–4 business days after reversal submission; however, there is no immediate confirmation regarding the success of the reversal.
    - key: Failed
      value: If the reversal fails, Balanced will be notified in 3–7 business days. The status will update from “Pending” to “Failed” or “Succeeded” to “Failed” depending on when the failed notice is received.

bankStatementDescriptor:
  title: Bank statement descriptor
  body: Modify the bank statement soft descriptor on a per-transaction basis.
  learnLink: "Learn more about setting the soft descriptor"
  learnLinkUrl: https://docs.balancedpayments.com/current/overview#soft-descriptors
  limit: "Max character length of bank statement soft descriptor: 14"

payoutsPricing:
  title: Pricing
  image: ach-credit
  cent: 25
  list:
    - name: Paying to your bank account
      price: $0
    - name: Reversal
      price: $0
    - name: Failure
      price: $1
    - name: Preloading your escrow
      note: via ACH debit
      price: $0

tryTheDashboard:
  body: Solve your payments problem today.
  button: Get started

bankAcctInfo:
  title: Test bank account form
  subtitle: Balanced validates routing numbers in real time
  note: Please make sure this matches exactly to the name on your bank account. Otherwise, payouts may experience delays.
  list:
    - title: Name on account
      classes: large name
      placeholder: Henry Cavendish
      attr: disabled="disabled"
    - title: Routing number
      classes: routing-number success
      placeholder: 121042882
      attr: maxlength="9"
      bank: "Bank: WELLS FARGO BANK NA"
    - title: Account number
      classes: account-number
      placeholder: 5124780660
      attr: disabled="disabled"
    - title: Confirm account number
      classes: confirm-account-number last
      placeholder: 5124780660
      attr: disabled="disabled"

---
