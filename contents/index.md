---
title: Balanced - Payments for Marketplaces
template: index.html
body_class: larger

try_out:
  heading: Payments for Marketplaces
  link: TRY THE DASHBOARD

intro:
  - heading: Charge cards
    sub: with [Balanced Processing](#processing)
  - heading: Pay out to bank accounts
    sub: with [Balanced Payouts](#payouts)
  - heading: Escrow Funds
    sub: use all 3 with [Balanced for Marketplaces](#marketplaces)

customers:
  - name: RedditGifts
    url: http://redditgifts.com
  - name: Tradesy
    url: http://tradesy.com
  - name: Crowdtilt
    url: https://www.crowdtilt.com
  - name: Kindrid
    url: https://kindrid.com
  - name: Relayrides
    url: https://relayrides.com
  - name: Artsy
    url: https://artsy.net

# These are the 3 column section that are reasonable generic with their format
Sections:
  - id: processing
    title: Processing
    subTitle: Credit cards (U.S. and int'l) | Bank accounts via ACH (U.S. only)
    desc: |
      ### Accept credit cards and ACH debit payments from your customers.
      [Learn more about ACH Debits](/ach-debits)
    subs:
      - title: No PCI requirements
        text: |
          Balanced is Level 1 PCI certified, so you can pass card data directly to us without worrying about compliance.

          [Learn more about security](https://support.balancedpayments.com/hc/en-us/categories/200005004-Security)
      - title: Soft descriptor control
        text: |
          Specify the credit card or bank statement descriptor on a per-transaction basis.
      - title: Completely white-labeled
        text: |
          Retain your brand and keep customers on your site; buyers do not need to sign up for a Balanced account.

  - id: payouts
    title: Payouts
    subTitle: Bank accounts via same-day ACH (Wells Fargo accounts) &nbsp;|&nbsp; Bank accounts via next-day ACH (U.S. only)
    desc: |
      ### Use with any card processor or as a stand-alone service for same-day bank deposits.
      [Learn more about payouts](/payouts)
    subs:
      - title: Pay out same day
        text: |
          Balanced now offers same-day ACH payouts to Wells
          Fargo bank account holders. Pay all other merchants
          via next-day ACH.
      - title: No fees to add funds
        text: |
          To pay out, simply fund your balance with your bank account.
      - title: Completely white-labeled
        text: |
          Retain your brand and keep customers on your site; merchants do not need to sign up for a Balanced account.

marketplaces:
  title: Balanced for Marketplaces
  desc: |
    ### Combine card processing and bank payouts with escrow.
  tops:
    - id: charge
      text: |
        Charge cards and bank accounts with [Balanced Processing](#processing)
    - id: escrow
      text: |
        Escrow funds
    - id: payouts
      text: |
        Pay out to bank accounts with [Balanced Payouts](/payouts)
    - id: fees
      text: |
        Collect your fees
  bottoms:
    - text: |
        #### Decide when to disburse funds
        Once a card is charged, funds are implicitly placed in
        escrow for as long as you need. You decide when to
        pay your merchants upon fulfillment of an order or
        a service.

        [Learn more about escrow](https://docs.balancedpayments.com/1.1/guides/escrow/)
    - text: |
        #### Define your own fee structure
        Set your own fees by determining how much to collect
        from buyers, merchants, or both.

        [View fee scenarios](https://docs.balancedpayments.com/1.1/guides/collecting-fees/)

integrate:
  title: Integrate in minutes
  desc: |
    ### Balanced provides client libraries and a RESTful API for you to easily integrate.
    [View our docs](https://docs.balancedpayments.com)
  tutorials_title: Tutorials
  tutorials:
    - name: How to charge a card
      url: https://docs.balancedpayments.com/1.1/guides/debits/
    - name: How to pay a bank account
      url: https://docs.balancedpayments.com/1.1/guides/credits/
    - name: How to escrow funds
      url: https://docs.balancedpayments.com/1.1/guides/collecting-fees/
    - name: How to collect your fee
      url: https://docs.balancedpayments.com/1.1/guides/collecting-fees/#inclusive-fees
  sub_tutorials: |
    #### Need help integrating?
    Contact us through one of our many [support channels](https://docs.balancedpayments.com/1.1/overview/#support).
  clients_title: Client libraries
  # class in the case that the name of the language is different from the css class for the image
  clients:
    - name: Python
      url: https://github.com/balanced/balanced-python
    - name: Ruby
      url: https://github.com/balanced/balanced-ruby
    - name: PHP
      url: https://github.com/balanced/balanced-php
    - name: Java
      url: https://github.com/balanced/balanced-java
    - name: iOS
      url: https://github.com/balanced/balanced-ios
      class: ios
    - name: Android
      url: https://github.com/balanced/balanced-android
      class: android


# the amount references a css class that is used to loda the images
pricing:
  title: All inclusive pricing
  desc: |
    ### No monthly fees. No setup fees. No recurring fees.
    [Learn more about pricing](/pricing)
  rates:
    - desc: "Processing: credit card"
      per: per txn
      amount: processing
    - desc: "Processing: bank account"
      per: per txn
      amount: processing ach
    - desc: "Payout: bank account"
      per: per deposit
      amount: payouts

bottom:
  heading: Solve your payments problem today.
  link: TRY THE DASHBOARD

---
