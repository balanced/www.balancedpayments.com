---
title: Balanced - Payments processing, escrow, and payouts in one simple API
template: index.html
body_class:

try_out:
  heading: Payment processing, escrow, and payouts in one simple API
  link: TRY IT OUT

intro:
  - heading: Charge cards
    sub: with [Balanced Processing](#processing)
  - heading: Pay out to bank accounts
    sub: with [Balanced Payouts](#payouts)
  - heading: Escrow Funds
    sub: use all 3 with [Balanced for Marketplaces](#marketplaces)

customers:
  - name: RedditGifts
    url: http://www.redditgifts.com
  - name: TheFancy
    url: http://www.thefancy.com
  - name: Groupme
    url: http://www.groupme.com
  - name: Vungle
    url: http://www.vungle.com
  - name: Visual.ly
    url: http://www.visual.ly
    class: visually

# These are the 3 column section that are reasonable generic with their format
Sections:
  - id: processing
    title: Balanced Processing
    subTitle: Credit cards (U.S. and international)
    desc: |
      ### Accept credit cards for your business.
    subs:
      - title: No PCI requirements
        text: |
          Balanced is Level 1 PCI certified, so you can pass card data directly to us without worrying about compliance.

          [More about security](/docs/overview?language=bash#tokenizing-sensitive-information)
      - title: Soft descriptor control
        text: |
          Specify the credit card statement descriptor on a per-transaction basis.
      - title: Completely white-labeled
        text: |
          Retain your brand and keep customers on your site; buyers do not need to sign up for a Balanced account.

  - id: payouts
    title: Balanced Payouts
    subTitle: Bank accounts via same-day ACH (Wells Fargo accounts) &nbsp;|&nbsp; Bank accounts via next-day ACH (U.S. only)
    desc: |
      ### Use with any card processor or as a stand-alone service for same-day bank deposits.
    subs:
      - title: Pay out same day
        text: |
          Balanced now offers same-day ACH payouts to Wells
          Fargo bank account holders. Pay all other merchants
          via next-day ACH.

          [See payout schedule](/docs/overview?language=bash#submission-delivery-times)
      - title: No fees to add funds
        text: |
          To pay out, simply fund your balance with your bank account.

          [More about pre-funding your account](/docs/overview?language=bash#pre-funding-your-account)
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
        Pay out to bank accounts with [Balanced Payouts](#payouts)
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

        [More about escrow](/docs/overview?language=bash#escrow)
    - text: |
        #### Define your own fee structure
        Set your own fees by determining how much to collect
        from buyers, merchants, or both.

        [View fee scenarios](/docs/overview?language=bash#collecting-your-fees)

integrate:
  title: Integrate in minutes
  desc: |
    ### Balanced provides client libraries and a RESTful API for you to easily integrate.
    [View our docs](/docs/overview)
  tutorials_title: Tutorials
  tutorials:
    - name: How to charge a card
      url: /docs/overview?language=bash#balanced-processing
    - name: How to pay a bank account
      url: /docs/overview?language=bash#balanced-payouts
    - name: How to escrow funds
      url: /docs/overview?language=bash#funds-flow
    - name: How to collect your fee
      url: /docs/overview?language=bash#collecting-your-fees
  sub_tutorials: |
    #### Need help integrating?
    Contact us through one of our many [support channels](/help).
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
    - name: Perl
      url: https://github.com/Crowdtilt/Business-BalancedPayments
    - name: Node.js
      url: https://github.com/balanced/balanced-node
      class: nodejs
    - name: C#
      url: https://github.com/balanced/balanced-csharp
      class: csharp



# the amount references a css class that is used to loda the images
pricing:
  title: All inclusive pricing
  desc: |
    ### No monthly fees. No setup fees. No recurring fees.
    [More about pricing](/docs/overview?language=bash#pricing-and-fees)
  rates:
    - desc: "Processing: credit card"
      per: per txn
      amount: processing
#    - desc: "Processing: bank account"
#      per: per txn
#      amount: processing ach
    - desc: "Payout: bank account"
      per: per deposit
      amount: payouts

bottom:
  heading: Solve your payments problem today.
  link: TRY IT OUT

---