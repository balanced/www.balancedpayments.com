---
title: Push to Card | Balanced
template: push-to-card.html

pageTitle: Push to Card
body_class: push-to-card

subtitle:
  heading: Send money to a customer&#8217s checking account using their debit card number.

launch:
  title: Private beta
  month: May
  day: 29

what:
  bodyText: We&#8217re launching in private beta after receiving overwhelming
    support for this feature on our
    <a href="https://balanced.crowdhoster.com/let-s-push-to-debit-cards">crowdfunding campaign</a>.
    Companies who backed the campaign receive early access. If you are
    interested in this feature, please submit your email to request an invite.

introTextLeft:
  title: Reduce friction
  body: Asking for a card number instead of sensitive bank account information
    makes it easier for a customer to sell on your marketplace.

introTextRight:
  title: Pay anyone easily
  body: Paying your sellers should be as simple as charging a card. Customers will
    no longer have to fish for their checkbooks and look for bank account
    information.

benefit:
  title: Validate in real time
  body: Real-time debit card validation ensures timely delivery of money. Forget
    about delayed payouts due to incorrect bank account and routing numbers.
  cardNumber: 4342 5611 1111 1118

api:
  title: Sample API call
  body: Paying out to a debit card is super simple.
  linkText: View documentation
  linkUrl: "https://docs.balancedpayments.com/1.1/api/cards/#credit-a-card"

pricing:
  title: Pricing
  body: Each push to card transaction will incur a $1 fee.
  linkText: View complete pricing
  linkUrl: "https://www.balancedpayments.com/pricing"
  image: pushtocard
  cent: 25

github:
  title: Monitor our progress on Github
  body: We&#8217ll outline each task in our <a href="https://github.com/balanced" target="_blank">public repos</a> and indicate the status
    of each issue. Once a task is complete, the corresponding issue will be
    closed.

feedback:
  title: Got a question?
  body: "Send your comments to:"
  email: pushtocard@balancedpayments.com
  subscribe: "Request an invite for access"

faqs:
  title: Frequently asked questions
  list:
    - q: How long do payouts take?
      a: Payouts are instant for 50% of bank accounts and take 1 &ndash; 2
          business for others. We're actively working on increasing the coverage
          for instant transfers.
    - q: Can I use previously tokenized debit cards?
      a: Yes, you can issue payouts to debit cards that were previously
          tokenized on your platform. Note that the cardholder's name is
          required for push to card.
    - q: Will you support international debit cards?
      a: Unfortunately not. This feature is only available for U.S. debit cards.
    - q: Is there soft descriptor control?
      a: Yes. Just like ACH payouts and charging a card, you can control the
          soft descriptor per transaction.
    - q: Is there a volume discount?
      a: Not right now, but the goal is to reduce the transaction fee for
          for everyone.
    - q: What are the transaction limits?
      a: The current limit is $2,500 per transaction.
---
