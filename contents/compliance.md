---
title: Compliance | Balanced
template: compliance.html

pageTitle: Compliance
body_class: compliance

subtitle:
  heading: Balanced employs robust controls to ensure that funds are handled in a secure and compliant manner. Bfore integrating Balancd, please review our compliance requirements below. You&#8217ll need to implement each requirement to comply with our PCI and bank guidelines.

features:
  - title: Send data using balanced.js
    image:
    text: |
      balanced.js is essential for your business to be PCI compliant. When using balanced.js, sensitive credit card data will never touch your servers. As a result, the burden of PCI compliance shifts to Balanced, who is [PCI-DSS Level 1 Compliant](http://www.visa.com/splisting/searchGrsp.do?companyNameCriteria=Balanced).

  - title: Link your transactions using orders
    text: |
      An order is designed to group related transaction operations for a specific merchant, mapping debits to corresponding credits. Balanced must have a clear understanding of who the intended merchant is for all funds held. To facilitate proper reconciliation, each order maintains a separate balance – you can only draw from this balance to settle funds.

      [View orders documentation](https://docs.balancedpayments.com/1.1/api/orders/)

  - title: Settle funds within 30 days
    text: |
      Funds in an order can be held up to 30 days. For each order, you may only credit one merchant and the marketplace.

  - title: Submit merchant identity information
    text: |
      In order to process transactions on behalf of marketplaces and their customers, Balanced has to comply with specific requirements before releasing funds to merchants/recipients. [Know your customer (KYC)](http://en.wikipedia.org/wiki/Know_your_customer) must be performed on every merchant before settling funds to his/her bank account. To meet this requirement, please collect the following information from merchants:

      [Learn more about merchant underwriting](https://support.balancedpayments.com/hc/en-us/articles/201836340-What-is-Merchant-underwriting-or-KYC-)

  - title: Verify bank accounts with microdeposits
    text: |
      Bank account verification is a separate step from the merchant KYC verification. Balanced cannot infer bank account ownership from the Employe Identification Number (EIN). To prevent unauthorized access to an individual's bank account, Balanced will need to verify merchant ownership using a microdeposit process.
      - Balanced sends two microdeposits to the merchant’s bank account
      - The merchant verifies the amounts
      - Balanced withdraws the deposit amounts


---
