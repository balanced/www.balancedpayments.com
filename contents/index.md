---
title: Balanced - Payments for Marketplaces
template: index.html
body_class: larger

try_out:
  heading: Payments for marketplaces
  link: Try the dashboard

intro:
  heading: Fast, easy marketplace payouts
  sub: Pay sellers, campaign organizers and service providers with one simple integration.
  introText:
    - title: Fast payouts
      body: Pay sellers within one business day via [ACH](/payouts) or pay out to their debit cards via [push to card](/push-to-card) (coming soon).
    - title: Controlled experience
      body: Retain your brand with our white-label API. Get full card and bank statement descriptor control per transaction.
    - title: Flexible funds flow
      body: Get immediate access to funds after charging customers with Balanced’s [card processing](/card-processing).  Release funds on your time frame.

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
  - id: payouts
    title: Payout options
    subTitle: Bank accounts via same-day ACH (Wells Fargo accounts) &nbsp;|&nbsp; Bank accounts via next-day ACH (U.S. only)
    desc: |
      ### For stand-alone payouts, crowdfunding platforms, or online businesses connecting buyers and sellers
    subs:
      - title: ACH payouts
        text: Pay out with same-day ACH for Wells Fargo accounts and next business day for other U.S. bank accounts.
        link: payouts
        inDevelopment: false
      - title: Push to card
        text: Issue payouts using only debit card numbers.
        link: push-to-card
        inDevelopment: true
      - title: International payments
        text: International payouts are on the roadmap. We’ll start with foreign currency exchange.
        link: international-payments
        inDevelopment: true

marketplaces:
  title: End-to-end payments
  desc: |
    ### Combine payouts with processing and escrow for a complete payment solution
  tops:
    - id: charge
      text: |
        Charge cards and bank accounts
    - id: escrow
      text: |
        Escrow funds
    - id: payouts
      text: |
        Pay out to bank accounts
    - id: fees
      text: |
        Collect your fees
  bottoms:
    - text: |
        #### Charge customers
        With Balanced’s card processing, funds are available immediately for access. You can also debit your customers’ bank accounts with ACH debits.

        [Learn more about card processing](/card-processing)
        [Learn more about ACH debits](/ach-debits)
    - text: |
        #### Escrow funds
        Once a card is charged, funds are implicitly placed in escrow for as long as you like. You decide when to pay your merchants upon fulfillment of an order or a service.

        [Learn more about escrow](https://docs.balancedpayments.com/1.1/guides/escrow/)

integrate:
  title: Integrate in minutes
  desc: |
    ### Client libraries and a RESTful API for you to easily integrate
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
  link: Try the dashboard

---
