---
title: Balanced - Stripe migration FAQ
heading: Migration FAQ
template: text.html
body_class: migration-page
---


<hr class="clean">

## General

### Why is Balanced shutting down?

Despite the many challenges in the industry, we're proud of how much we've been able to help marketplaces thrive over the last four years. Unfortunately, we haven't been able to reach the escape velocity necessary to be a large, innovative, independent player in the payments space and have decided not to continue building Balanced.


### What's the timeline?

Our full API and dashboard will be available until June 11, 2015, and support for issuing refunds, querying transactions, and fighting chargebacks will continue until October 9, 2015.


### Why is Balanced sending customers to Stripe?

Stripe provides the most comparable solution to Balanced. We reached out to Stripe and have been working with them to create a smooth path forward for you. We respect how Stripe has been able to innovate, grow, and become the best solution for marketplaces. Stripe has agreed to honor our existing pricing agreements and work closely with us to seamlessly migrate card, bank account, and seller identity data.


--------------------

## Support

### What's going to happen to the Balanced team?

The full Balanced team will stay on until June 11, 2015, and a portion of the team will continue beyond then to make sure we're able to provide you with the level of support you need.


### What steps do we have to take to migrate?

1. Go to the [migration page](/stripe) and click "Migrate Now". This will allow you to authorize Balanced to create a Stripe account for you migrate your data. All new cards, bank accounts, and seller information created on Balanced will also be tokenized on Stripe to keep your data synchronized.
2. Active your Stripe account to start processing transactions.
3. Integrate Stripe's marketplace API. Contact [sales@stripe.com](mailto:sales@stripe.com) to learn more.
4. Go live!

### What if I already have a Stripe account?

You will have the option during the migration process to specify an existing Stripe account.

### How can I get in touch with Balanced after June 11, 2015?

A portion of the Balanced team will continue on until October 9, 2015. You can contact us at [support@balancedpayments.com](mailto:support@balancedpayments.com).


### How do I contact Stripe if I have questions?

Stripe also has an [FAQ page](https://support.stripe.com/questions/migrating-from-balance-to-stripe) and can be contacted directly through [their support page](https://support.stripe.com/email).

-----------------------------

## Data & Security

### Can I take my transaction history with me?

Yes, you can use your existing dashboard to export your transaction history.

### Can I take my card and bank account tokens with me?

Yes. All existing cards and bank accounts will be migrated to Stripe. All new cards and bank accounts created on Balanced will also be tokenized on Stripe. It's also possible to migrate your data to another processor by contacting us directly at [support@balancedpayments.com](mailto:support@balancedpayments.com).


### Can I take my customer's information with me?

Yes. Information for verified customers will be migrated to Stripe to make sure you don't have to collect their name, address, DOB, and SSN again.

### What happens to all of the sensitive data Balanced has?

For security purposes, we will erase all sensitive data (card numbers, bank account numbers, and social security numbers) on June 12, 2015, and will not accept any new sensitive information.


-------------------

## Refunds and Chargebacks

### Can I refund debits that were already created on Balanced?

Yes. We will support refunds until October 9, 2015.


### What do I need to do to refund a debit that was created on Balanced?

Refunds will continue to work the same way. You can initiate the refund through the API or dashboard, and the money will be pulled from your escrow balance, which means you have to make sure there is enough money in your escrow balance to cover refunds.


### What about chargebacks for transactions on Balanced?

Chargebacks can be filed on credit and debit cards up to 6 months after the charge. You will continue to receive email notifications for chargebacks and use our dashboard to provide evidence when disputing a chargeback.


-----------------------

## Payments

### Does Stripe support ACH debits?

Yes, they do. The product is available in private beta only at the moment, but Stripe is making it available to all Balanced customers right away.


### Does Stripe require micro-deposit verifications?

All bank accounts that were already saved in Balanced will be automatically migrated over and won't require micro-deposit verification. By default, any new bank account created once you've migrated to Stripe will require micro-deposit verification.


### Does Stripe allow me to push funds into their system from my bank account to top up my account balance or subsidize transactions?

Stripe doesn't allow you to top up your account balance. If you have any further questions about this, feel free to reach out to Stripe at [sales@stripe.com](mailto:sales@stripe.com).


### Does Stripe allow me to pay sellers using a debit card number?

Not at the moment, but we'll export your debit card data so that when it is supported you'll be able to use the existing cards.

----------------------

## Fees & Reserves

### How will Invoicing change?

Balanced and Stripe invoice for fees differently. While Balanced invoices you for fees directly from your bank account at the end of each business day, Stripe deducts the fee from each transaction. If your pricing is 2.9% + 30¢ and you perform a $100 charge, Balanced would add $100 to your escrow and invoice you for the $3.20 fee. Stripe instead will add $96.80 ($100 - $3.20) to your Stripe balance, and not issue a separate invoice.

### Will our pricing change?

Stripe will honor your existing pricing.

### What about volume discount pricing for card processing?

Stripe offers volume discounts for businesses processing $80,000 / month or more. Please contact [sales@stripe.com](mailto:sales@stripe.com) for more information.

### What about pricing for ACH debits

Since ACH debits are still in beta on Stripe, please head over to [https://support.stripe.com/email](https://support.stripe.com/email) for questions on pricing.


### What happens to the money Balanced is holding in reserve for me?

Chargebacks can be submitted by consumers 6 months after charge for debit and credit cards and 60 days after a ACH debit. Depending on your volume and chargeback rate, Balanced may continue to hold a reserve to cover future chargebacks and will return the reserve once the chargeback window on all of your transactions has cleared.

---------------------

## Merchant underwriting

### How will merchant underwriting change?

Stripe requires name and DOB for all customers before a payout is issued. Stripe may also ask for a physical address and the last 4 digits of the customer's social security number as the seller's volume increases. The verification works similarly to how it did with Balanced—except Stripe supports uploading a photo ID when the seller's information cannot be automatically verified, which will allow you to onboard more sellers more quickly.

### Do currently underwritten/verified customers need to be verified again?

No. A customer's identity information will be migrated to Stripe (along with the card and bank account information), so no extra work is needed.



-------------------

## Compliance

### Who will issue 1099s for the 2015 tax year, since a portion of the processing is on Balanced?

Balanced will issue 1099s to your sellers based on what you processed on Balanced. Stripe will issue 1099K's for transactions you processed on Stripe.

### What if Stripe can't support my use case?

Stripe follows the same bank and card network compliance rules as Balanced. In rare instances, Stripe may not be able to support your business due to risk or other compliance reasons. If that happens, Balanced will work with other processors to migrate your card numbers prior to June 11, 2015. However, we won't be able to provide as streamlined of a process for every processor, unfortunately.


-----------------------

## Benefits of Stripe

### Why should I switch to Stripe instead of another processor?

1. Stripe offers the most comprehensive product for marketplaces. Their APIs are very comparable to Balanced, with several additional features and options.
2. Stripe will honor the pricing you have with Balanced.
3. Stripe and Balanced have worked closely to streamline the migration process for you, minimizing disruption for your business.


### What additional benefits does Stripe provide me that Balanced didn't?

Stripe will allow you to simplify your recurring/subscription billing system, accept payments on behalf of international sellers, and accept other popular payment instruments like Bitcoin, Alipay and Apple Pay.

-----------------------

<div class="bottom bottom-line1">
  Start the migration process
</div>
<div class="bottom bottom-line2">
  <a class="btn special" href="https://dashboard.balancedpayments.com/#/migrate">Migrate now</a>
</div>
<div class="bottom bottom-line3">
  Want to get in touch?
  <a href="mailto:support@balancedpayments.com">support@balancedpayments.com</a>
</div>
