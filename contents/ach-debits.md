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
  step6header: "The RDFI moves funds to the ODFI’s bank account. Funds are now available in escrow.<br />The marketplace may wish to settle funds to the seller using [Balanced’s payout service](https://docs.balancedpayments.com/1.1/guides/credits/)."

paymentSchedule:
  title: Payment schedule
  body: Balanced will batch ACH debits for submission each weekday. The ACH network operates only on banking days, so submission will not occur on bank holidays.

submissionTimes:
  title: ACH Debit Submission Times
  time: "3:30"
  timezone: pm Pacific

bankHolidays:
  title: Bank Holidays (2014)
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

bankAccountVerification:
  title: Bank account verification
  body: To debit a bank account, Balanced needs to verify it through a micro-verification process. You can manage the procedure though the Balanced API without directing customers off your website. To minimize ACH debit failures, follow our best practices guide and example forms for collecting payment information.
  learnLink: View best practices for ACH Debits

paymentStatus:
  title: Payment status
  body: Track the status of the ACH debit throughout its lifecycle.
  legend:
    - key: Pending
      value: ACH debit is submitted to Balanced.
    - key: Succeeded
      value: A “succeeded” status is displayed as the expected state of the debit 3–4 business days after debit submission; however, there is no immediate confirmation regarding the success of the debit.
    - key: Failed
      value: If the debit fails, Balanced will be notified in 3–7 business days. The status will update from “Pending” to “Failed” or “Succeeded” to “Failed” depending on when the failed notice is received.

refundingAPayment:
  title: ACH debit refund status
  body: The status of an ACH debit refund is updated throughout its lifecycle.
  legend:
    - key: Pending
      value: ACH debit refund is submitted to Balanced.
    - key: Succeeded
      value: A “succeeded” status is displayed as the expected state of the refund one day after refund submission; however, there is no immediate confirmation regarding the success of the refund.
    - key: Failed
      value: If the refund fails, Balanced will be notified in 1–4 business days. The status will update from “pending” to “failed” or “succeeded” to “failed” depending on when the failed notice is received.

bankStatementDescriptor:
  title: Bank statement descriptor
  body: Modify the bank statement<br />soft descriptor on a<br />per-transaction basis.
  learnLink: "Learn more about setting<br />the soft descriptor"
  limit: "Bank statement soft descriptor max. character length: 14"

chargebacksDisputes:
  title: Chargebacks & Disputes
  body: In the event of a chargeback, Balanced will notify you to help gather the documents necessary to fight the chargeback.
  learnLink: "Learn more about the<br />chargeback process"

achDebitsPricing:
  title: Pricing
  image: ach-debit
  percent: 1
  cent: 30
  list:
    - name: Micro-deposit verification
      price: $0
    - name: Refund
      note: processing fee of 1% is returned, but the 30&cent; is non-refundable
      price: $0
    - name: Failure
      price: $0
    - name: Chargeback
      price: $15

---
