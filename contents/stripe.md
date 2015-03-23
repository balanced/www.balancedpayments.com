---
title: Balanced - Migrating from Balanced to Stripe
heading: Migrating from<br>Balanced to Stripe
template: text.html
body_class: migration-page
---

<hr class="clean">

<div style="text-align: center; margin: 40px 0 50px;">
  <img src="/images/migration.png">
</div>

<p class="text-em">
To all customers:
</p>
<p class="text-em">
Balanced is shutting down and will stop processing credit and debit card charges and ACH debits on June 11, 2015. We realize this is sudden and we're sorry for any inconvenience this causes. We're working closely with Stripe in helping with the migration to reduce the impact on your business.
</p>

---

## Why is Balanced shutting down?

Despite the many challenges in the industry, we're proud of how much we've been able to help marketplaces thrive over the last four years. Unfortunately, we haven't been able to reach the escape velocity necessary to be a large, innovative, independent player in the payments space and have decided not to continue building Balanced.


---

## What's the timeline?

Our full API and dashboard will be available until June 11, 2015, and support for issuing refunds, querying transactions, and fighting chargebacks will continue until October 9, 2015.


---

## Why is Balanced sending customers to Stripe?

Stripe provides the most comparable solution to Balanced. We reached out to Stripe and have been working with them to create a smooth path forward for you. We respect how Stripe has been able to innovate, grow, and become the best solution for marketplaces. Stripe has agreed to honor our existing pricing agreements and work closely with us to seamlessly migrate card, bank account, and seller identity data.

---

## Steps to migrate

<p class="text text-danger">
Balanced will stop processing credit and debit card charges and ACH debits on June 11, 2015. The steps to migrate to Stripe are as follows:
</p>

<div class="columns">
<div class="col-3">
  <span class="number">1</span>
  <h4>Begin data migration</h4>

  <p>Log in and select the marketplace you would like to migrate and accept the terms to authorize Balanced to begin the process and create a Stripe account on your behalf.</p>
</div>

<div class="col-3">
  <span class="number">2</span>
  <h4>Activate Stripe account</h4>

  <p>Complete Stripe's account activation form. You will be redirected to Stripe to complete the form and will receive an email if you wish to complete the process later.</p>
</div>

<div class="col-3">
  <span class="number">3</span>
  <h4>Integrate Stripe</h4>

  <p>Stripe's [new Connect API](https://stripe.com/docs/connect) allows you to go live with comparable functionality to what you have on Balanced.</p>
</div>
</div>

-------------

<div class="bottom bottom-line1">
  Start the migration process
</div>
<div class="bottom bottom-line2">
  <a class="btn special" href="https://dashboard.balancedpayments.com/#/migrate">Migrate now</a>
</div>
<div class="bottom bottom-line3">
  Have questions?
  <a href="/stripe/faq">Visit the migration FAQ.</a>
</div>
