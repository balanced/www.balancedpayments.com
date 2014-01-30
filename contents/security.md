---
title: Balanced - Payments processing, escrow, and payouts in one simple API | Security
template: security.html

pageTitle: Security
body_class: security

subtitle:
  heading: Balanced's development team is strongly committed to responsible reporting and disclosure of security-related issues.<br />As such, we've developed a policy for handling security issues.

ReportingSecurityIssues:
  title: Reporting security issues
  body: <p>We generally accept bug reports via GitHub, but due to the sensitive nature of security issues, we ask that they not be publicly reported in this fashion.</p><p>Instead, if you believe you’ve found something in any of Balanced's products which has security implications, please send a description of the issue via email to <a href="mailto:security@balancedpayments.com">security@balancedpayments.com</a>. Mail sent to that address reaches a subset of the development team, limiting the exposure of the issue.</p><p>Once you’ve submitted an issue via email, you should receive an acknowledgment from a member of the Balanced development team within 48 hours, and depending on the action to be taken, you may receive further followup emails.</p><p>This process can take some time, especially when coordination is required with maintainers of other projects. Every effort will be made to handle the bug in as timely a manner as possible, however it’s important that we follow the release process above to ensure that the disclosure is handled in a consistent manner.</p>
  boxTitle: Report security issues
  boxBody: Send email to <a href="mailto:security@balancedpayments.com">security@balancedpayments.com</a><br/><br/>To send an encrypted email, use this public key ID<br/><span class="code">F4A4 847A 5DBA 8258 C913<br/>BCFE AE14 B43B 026A 673F</span>

Disclosure:
  title: Disclosure to Balanced customers
  body: <p>Our process for taking a security issue from private discussion to public disclosure involves multiple steps, and depends on which product has the issue.</p><p>If the API has an issue that does not affect client software, we will apply the relevant patches to the API, and deploy it.</p><p>If client libraries are affected, we will apply patches and release a new version to the relevant package managers (PyPI, Rubygems, etc).</p><p>Once the software is patched, we will post a public entry on the Balanced blog, describing the issue and its resolution in detail, pointing to the relevant patches and new releases, and crediting the reporter of the issue (if the reporter wishes to be publicly identified).</p><p>Additionally, if we have reason to believe that an issue reported to us affects other frameworks or tools in the various ecosystems we use, we may privately contact and discuss those issues with the appropriate maintainers, and coordinate our own disclosure and resolution with theirs.</p>
---
