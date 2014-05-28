---
title: Balanced - Payments processing, escrow, and payouts in one simple API | Payouts
template: payouts.html

pageTitle: Payouts
body_class: payouts

subtitle:
  heading: Pay your sellers with ACH direct deposit. Funds are deposited the next business day for U.S. bank accounts and the same business day for Wells Fargo accounts.

howItWorks:
  title: How it works
  body: Integrate Balanced's full marketplace solution to manage your processing and payout needs. You may also use payouts as a stand-alone product.

withProcessing:
  title: The full marketplace solution
  body: With Balanced's card processing and ACH debits, money from your buyers is placed into an order-specific escrow on behalf of the seller until you're ready to pay out.
  process1: Debit the buyer's credit card or bank account
  process2: Funds are grouped into order-specific escrows, linking the buyer and seller together
  process3: Pay out your seller(s) and collect your marketplace fee

payoutsOnly:
  title: Payouts only
  body: Simply fund your escrow (held by Balanced) with your marketplace's bank account to pay your sellers.
  process1: Preload your escrow balance by debiting the marketplace's bank account
  process2: Funds are deposited in the general escrow balance in 4 business days
  process3: Pay out your sellers from your general escrow balance

viewAPaymentsScenario:
  button: View a payments scenario

paymentSchedule:
  title: Payment schedule
  body: Balanced will batch payouts for submission each weekday. The ACH network operates only on banking days, so submission will not occur on bank holidays.

submissionTimes:
  title: ACH Payouts submission times
  time: "3:00"
  timezone: PM PACIFIC

bankHolidays:
  title: Bank holidays (2014)
  list:
    - label: row0
      row:
        - label: New Year's Day
          date: Jan 1
        - label: Labor Day
          date: Sep 1
    - label: row1
      row:
        - label: Martin Luther King, Jr's Birthday
          date: Jan 20
        - label: Columbus Day
          date: Oct 13
    - label: row2
      row:
        - label: Washington's Birthday
          date: Feb 17
        - label: Veterans Day
          date: Nov 11
    - label: row3
      row:
        - label: Memorial Day
          date: May 26
        - label: Thanksgiving Day
          date: Nov 27
    - label: row4
      row:
        - label: Independence Day
          date: Jul 4
        - label: Christmas Day
          date: Dec 25

collectingBankInfo:
  title: Collecting bank account info
  body: To issue a payout, collect the bank account holder's name, routing number, account number, and account type.
  learnLink: View payouts best practices

payoutStatus:
  title: Payout status
  body: The status of a payout is updated<br />throughout its lifecycle. Follow our best<br />practices guide minimize payout failures.

reversingAPayout:
  title: Reversing a payout
  body: You may reverse a payout in<br />order to retrieve funds back<br />from the seller.

bankStatementDescriptor:
  title: Bank statement descriptor
  body: Modify the bank statement<br />soft descriptor on a<br />per-transaction basis.
  learnLink: "Learn more about setting<br />the soft descriptor"
  limit: "Bank statement soft descriptor max. character length: 14"

payoutsPricing:
  title: Pricing
  cent: 25
  list:
    - name: Paying to your bank account
      price: 0%
    - name: Reversal
      price: $0
    - name: Failure
      price: $1
    - name: Preloading your escrow
      note: via ACH debit
      price: $0

tryTheDashboard:
  body: Get started today.
  button: Try the dashboard

bankAcctInfo:
  title: Test Bank Account Form
  subtitle: Balanced validates routing numbers in real time.<br/>Enter in a routing number below to test this out.
  bottom: Funds will appear in the bank account in 1 business day.
  list:
    - title: Account Holder's Name
      description: Please make sure this matches exactly to the name on your bank account. Otherwise, payouts may experience delays.
      classes: large name
      placeholder: Henry Cavendish
      attr: readonly="readonly"
    - title: Routing Number
      description: Enter your 9-digit routing number.
      classes: routing-number success
      placeholder: 121042882
      attr: maxlength="9"
      bank: "Bank: WELLS FARGO BANK NA"
    - title: Account Number
      description: Enter your account number.
      classes: account-number
      placeholder: 5124780660
      attr: readonly="readonly"
    - title: Confirm Account Number
      description: Re-enter your account number.
      classes: confirm-account-number last
      placeholder: 5124780660
      attr: readonly="readonly"

---
