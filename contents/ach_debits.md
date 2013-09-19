---
title: Balanced - Payments processing, escrow, and payouts in one simple API | ACH Debits
template: ach_debits.html

pageTitle: ACH Debits

subtitle:
  heading: Accept ACH debit payments. Balanced<br />allows your customers to pay with their<br />bank accounts.

howitworks:
  title: How it works
  body: ACH Debits are submitted to the ACH Network, a processing system that handles bank-to-bank payments. Balanced manages the transaction between the marketplace and their customers.
  step1: Buyer authorizes marketplace to debit his account
  step2: Marktplace passes debit request to Balanced
  step3: Balanced submits debit to the ODFI
  step4: ODFI contacts the Federal Reserve
  step5: Federal Reserve notifies the RDFI
  step6: RDFI transfers funds to ODFI

sliderfeature:
  step1header: The buyer provides bank account information on your marketplace website and authorizes you to debit his account.
  step2header: Bank account information is tokenized and the debit request is passed from the marketplace to Balanced’s servers.
  step3header: Balanced submits debit instructions to the ODFI, the Originating Depository Financial Institution, who is making the debit request.
  step4header: The ODFI sends debit instructions to the Federal Reserve.
  step5header: The Federal Reserve notifies the RDFI, the Receiving Depository Financial Institution, of the debit authorization.
  step6header: The RDFI moves funds to the ODFI’s bank account. Funds are now available in escrow. The marketplace may wish to settle funds to the seller using Balanced’s payout service.

paymentSchedule:
  title: Payment schedule
  body: Balanced will batch ACH debits for submission each weekday. The ACH network operates only on banking days, so submission will not occur on bank holidays.

bankHolidays:
  title: BANK HOLIDAYS (2013)
  list:
    - label: New Year's Day
      date: Jan 1
    - label: Martin Luther King, Jr's Birthday
      date: Jan 21
    - label: Washington's Birthday
      date: Feb 18
    - label: Memorial Day
      date: May 27
    - label: Independence Day
      date: Jul 4
    - label: Labor Day
      date: Sep 2
    - label: Columbus Day
      date: Oct 14
    - label: Veterans Day
      date: Nov 11
    - label: Thanksgiving Day
      date: Nov 28
    - label: Christmas Day
      date: Dec 25

bankAccountVerification:
  title: Bank account verification
  body: To debit a bank account, Balanced needs to verify it through a micro-verification process. You can manage the procedure though the Balanced API without directing customers off your website.


paymentStatus:
  title: Payment status
  body: Track the status of the ACH debit throughout its life-cycle.

bankStatementDescriptor:
  title: Bank statement descriptor
  body: Modify the soft descriptor on a pre-transaction basis. Balanced allows you to set the description of the purchase on your customer's bank statement.
  learnLink: Learn more about setting the soft descriptor
  limit: Soft descriptor character length: 22

chargebacksDisputes:
  title: Chargebacks & Disputes
  body: In the event of a chargeback, Balanced will notify you to help gather the documents necessary to fight the chargeback.
  learnLink: Learn more about the chargeback process

achDebitsPricing:
  title: ACH Debits Pricing
  debit: Charging your buyers (ACH debit / Debiting a bank account)
  microDepositVerification: Micro-deposit verification
  chargeback: Chargeback
  refund: Refund
  failure: Failure

lookingForPayouts:
  body: Looking for payouts as well? Learn more about ACH credits.

---
