---
title: Balanced - Payments processing, escrow, and payouts in one simple API | ACH Debits
template: ach-debits.html

pageTitle: ACH Debits
body_class: ach-debits

subtitle:
  heading: Accept ACH debit payments today.<br />Balanced allows your customers to <br />pay with their bank accounts.

howItWorks:
  title: How it works
  body: ACH Debits are submitted to the ACH Network, a processing system that handles bank-to-bank payments. Balanced manages the transaction between the marketplace and their customers.
  step1: Buyer authorizes marketplace to debit his account
  step2: Marktplace passes debit request to Balanced
  step3: Balanced submits debit to the ODFI
  step4: ODFI contacts the Federal Reserve
  step5: Federal Reserve notifies the RDFI
  step6: RDFI transfers funds to ODFI

sliderfeature:
  step1header: "The buyer provides bank account information on your marketplace<br />website and authorizes you to debit his account."
  step2header: "Bank account information is tokenized and the debit request <br />is passed from the marketplace to Balanced’s servers."
  step3header: "Balanced submits debit instructions to the ODFI, the Originating<br />Depository Financial Institution, who is making the debit request."
  step4header: "The ODFI sends debit instructions<br />to the Federal Reserve."
  step5header: "The Federal Reserve notifies the RDFI, the Receiving<br />Depository Financial Institution, of the debit authorization."
  step6header: "The RDFI moves funds to the ODFI’s bank account. Funds are now available in escrow.<br />The marketplace may wish to settle funds to the seller using [Balanced’s payout service](https://docs.balancedpayments.com/current/overview#credits)."

paymentSchedule:
  title: Payment schedule
  body: Balanced will batch ACH debits for submission each weekday. The ACH network operates only on banking days, so submission will not occur on bank holidays.

submissionTimes:
  title: ACH DEBIT SUBMISSION TIMES
  time: "3:30"
  timezone: PM PACIFIC

bankHolidays:
  title: BANK HOLIDAYS (2013)
  list:
    - label: row0
      row:
        - label: New Year's Day
          date: Jan 1
        - label: Labor Day
          date: Sep 2
    - label: row1
      row:
        - label: Martin Luther King, Jr's Birthday
          date: Jan 21
        - label: Columbus Day
          date: Oct 14
    - label: row2
      row:
        - label: Washington's Birthday
          date: Feb 18
        - label: Veterans Day
          date: Nov 11
    - label: row3
      row:
        - label: Memorial Day
          date: May 27
        - label: Thanksgiving Day
          date: Nov 28
    - label: row4
      row:
        - label: Independence Day
          date: Jul 4
        - label: Christmas Day
          date: Dec 25

bankAccountVerification:
  title: Bank account verification
  body: To debit a bank account, Balanced needs to verify it through a micro-verification process. You can manage the procedure though the Balanced API without directing customers off your website. To minimize ACH debit failures, follow our best practices guide and  example forms for collecting payment information.
  learnLink: View best practices for ACH Debits

paymentStatus:
  title: Payment status
  body: Track the status of the ACH debit throughout its life cycle.

bankStatementDescriptor:
  title: Bank statement descriptor
  body: Modify the bank statement soft descriptor on a per-transaction basis.
  learnLink: "Learn more about setting<br />the soft descriptor"
  limit: "Bank statement soft descriptor max. character length: 14"

chargebacksDisputes:
  title: Chargebacks & Disputes
  body: In the event of a chargeback, Balanced will notify you to help gather the documents necessary to fight the chargeback.
  learnLink: "Learn more about the<br />chargeback process"

achDebitsPricing:
  title: ACH Debits Pricing
  debit: Charging your buyers (ACH debit / Debiting a bank account)
  microDepositVerification: Micro-deposit verification
  chargeback: Chargeback
  refund: Refund
  failure: Failure

tryTheDashboard:
  body: Start accepting ACH debit payments today.
  button: TRY THE DASHBOARD

---