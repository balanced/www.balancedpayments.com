---
title: Compliance | Balanced
template: compliance.html

pageTitle: Compliance
body_class: compliance

subtitle:
  heading: Balanced employs robust controls to ensure that funds are handled in a secure and compliant manner. Before integrating Balanced, please review our compliance requirements below. You&#8217ll need to implement each requirement to comply with our PCI and bank guidelines.

features:
  - title: PCI compliance
    image:
    text: |
      [balanced.js](https://docs.balancedpayments.com/1.1/guides/balanced-js/) is essential for your business to be PCI compliant. When using balanced.js, sensitive credit card data will never touch your servers. As a result, the burden of PCI compliance shifts to Balanced, who is [PCI-DSS Level 1 Compliant](http://www.visa.com/splisting/searchGrsp.do?companyNameCriteria=Balanced).

  - title: Funds tracking and allocation
    text: |
      An [order](/account-reconciliation) is designed to group related transaction operations for a specific merchant, mapping debits to corresponding credits. Balanced must have a clear understanding of who the intended merchant is for all funds held. To facilitate proper reconciliation, each order maintains a separate balance – you can only draw from this balance to settle funds.

      [View orders documentation](https://docs.balancedpayments.com/1.1/api/orders/)
      
  - title: Holding period for funds
    text: |
      Funds from an [order](/account-reconciliation) should be settled within 30 days of the initial debit. Each completed order should contain one credit going to the merchant for his/her sale and one credit going to your marketplace for your commission.

      [View orders documentation](https://docs.balancedpayments.com/1.1/api/orders/)

  - title: Know your customer
    text: |    
      In order to process transactions on behalf of marketplaces and their customers, Balanced has to comply with specific requirements before releasing funds to merchants/recipients. [Know your customer (KYC)](http://en.wikipedia.org/wiki/Know_your_customer) must be performed on every merchant before settling funds to his/her bank account. To meet this requirement, please collect the following information from merchants:

      [Learn more about merchant underwriting](https://support.balancedpayments.com/hc/en-us/articles/201836340-What-is-Merchant-underwriting-or-KYC-)

      <table class="items non-interactive">
        <thead><tr><th>For individuals</th></tr></thead>
        <tbody>
          <tr><td><span>Legal name</span></td></tr>
          <tr><td><span>Phone number</span></td></tr>
          <tr><td><span>Email (optional)</span></td></tr>
          <tr><td><span>Month/year of birth</span></td></tr>
          <tr><td><span>Permanent street address</span></td></tr>
          <tr><td><span>Postal code</span></td></tr>
          <tr><td><span>Country code</span></td></tr>
          <tr><td><span>SSN last 4 (optional but recommended)</span></td></tr>
        </tbody>
      </table>
      <table class="items non-interactive">
        <thead><tr><th>For businesses</th></tr></thead>
        <tbody>
          <tr><td><span>Legal name</span></td></tr>
          <tr><td><span>Phone number</span></td></tr>
          <tr><td><span>Email (optional)</span></td></tr>
          <tr><td><span>Month/year of birth</span></td></tr>
          <tr><td><span>Permanent street address</span></td></tr>
          <tr><td><span>Postal code</span></td></tr>
          <tr><td><span>Country code</span></td></tr>
          <tr><td><span>SSN last 4 (optional but recommended)</span></td></tr>
          <tr><td><span>Name of business</span></td></tr>
          <tr><td><span>Tax ID</span></td></tr>
        </tbody>
      </table>

  - title: Bank account verification
    text: |
      Bank account verification is a separate step from the merchant KYC verification. Balanced cannot infer bank account ownership from the Employe Identification Number (EIN). To prevent unauthorized access to an individual's bank account, Balanced needs to verify merchant ownership using the follwing microdeposit process:
      - Balanced sends two microdeposits to the merchant’s bank account
      - The merchant verifies the amounts
      - Balanced withdraws the deposit amounts

visitHelpCenter: |
  For additional compliance information, please visit the [Help Center](https://support.balancedpayments.com/).
---
