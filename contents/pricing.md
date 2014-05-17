---
title: Balanced - Payments processing, escrow, and payouts in one simple API | Pricing
template: pricing.html

pageTitle: Pricing
body_class: pricing

subtitle:
  heading: Balanced offers a straightforward, all-inclusive pricing structure. <br>No setup costs. No monthly contract. No hidden fees.

features:
  - title: "Processing: card"
    image: card-processing
    percent: 2.9
    cent: 30
    list:
      - name: Foreign currency conversion
        note: 2% fee on top of card processing rate
        price: 2%
      - name: Authorization hold
        price: $0
      - name: Refund
        note: processing fee of 2.9% is returned, but the 30&cent; is non-refundable
        price: $0
      - name: Failure
        price: $0
      - name: Chargeback
        price: $15
  - title: "Processing: ACH debit"
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
  - title: "Payout: ACH credit"
    image: ach-credit
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
  - title: "Payout: push to card"
    image: pushtocard
    dollar: 1

noAdditionalFees:
  title: No additional fees
  list:
    - name: Batch fee
      price: 0
    - name: Setup fee
      price: 0
    - name: Monthly fee
      price: 0

discounts:
  title: Volume discount
  subtitle: At the end of each quarter, Balanced will evaluate your card processing volume from the past three months, take the average, and assign a new tier based on that. The review dates are Jan 1, Apr 1, Jul 1, and Oct 1. The new pricing tier will be in place until the next review date.
  list:
    - name: $0 – 100,000 / month
      price: 2.9% + 30&cent;
    - name: $100,001 – 500,000 / month
      price: 2.7% + 30&cent;
    - name: $500,001 – 1,000,000 / month
      price: 2.4% + 30&cent;
    - name: $1,000,001 – 5,000,000 / month
      price: 2.2% + 30&cent;
    - name: $5,000,001+ / month
      price: 1.9% + 30&cent;

---
