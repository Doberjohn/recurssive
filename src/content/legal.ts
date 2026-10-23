import type { LegalSection } from '@/components/LegalPage'

/**
 * Legal copy for /privacy-policy and /terms-of-service.
 *
 * Started as a transcription of the decoded .fig text nodes, so no wording
 * drifted in the copying. It is NO LONGER a pure transcription: the drawn policy
 * described a different website, and the following were amended on the owner's
 * instruction to match what this site actually does.
 *
 *   dropped    Media (no upload feature), Facebook (no pixel, no advertising),
 *              Mailchimp (no newsletter, no marketing email)
 *   rewritten  Cookies (this site sets none), Google Analytics -> Analytics
 *              (Vercel Web Analytics, cookieless), Contact Forms (the fields the
 *              form actually collects), Data Retention and What rights (both
 *              referenced user accounts and comments that do not exist), Who we
 *              share your data with (Vercel and Resend, not Facebook/Google/
 *              Mailchimp)
 *   Terms      third-party services no longer claims advertising platforms
 *
 * The cookie line matters most: the case for having no consent banner is that
 * nothing is stored on the device, and a policy saying otherwise would undermine
 * it in our own words.
 *
 * Owner is taking both documents to a lawyer regardless. Treat this as accurate
 * rather than final.
 *
 * FACEBOOK AND A PIXEL ARE PLANNED, roughly a month out. They are deliberately
 * NOT pre-declared here, for two reasons.
 *
 * A privacy policy states what happens now. Declaring processing that does not
 * exist yet is inaccurate in the present, and it is inaccurate in the direction
 * that costs something: a policy claiming cookies and cross-site tracking is a
 * policy that needs a consent banner TODAY, months before the pixel exists.
 *
 * More usefully, adding the pixel is not a copy change. A Meta pixel writes
 * cookies and tracks across sites, so under ePrivacy Art. 5(3) it may not load
 * until the visitor has consented. That deploy has to carry, together:
 *
 *   1. a consent gate that blocks the pixel until it is accepted, and records
 *      the refusal as well as the acceptance
 *   2. conditional loading, so the script is absent rather than merely inert
 *      before consent
 *   3. these sections restored, and the Cookies section rewritten again, since
 *      "we do not use cookies" stops being true the moment it ships
 *
 * The wording that was dropped is recoverable from git: it is in the parent of
 * the commit that amended this file, not lost.
 *
 * The plan already flagged the banner as an open decision. This is the thing
 * that decides it.
 *
 * Headings lose the trailing colon the frames set on some of them: a colon on a
 * standalone heading reads as a typo once it is an <h2> rather than a line of
 * type in a layout.
 */

export const privacySections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "Our website address is: recurssive.com. We are committed to protecting your privacy and providing you with a safe online experience. In this section, you will find details on what personal data we collect and why we collect it.",
    ],
  },
  {
    heading: "Contact Forms",
    body: [
      "We collect personal data when you submit the contact form: your name, email address, phone number, what you are interested in, your budget range, and whatever you write in the description. We also record when you accepted these terms. We use this only to answer your enquiry. We do not sell it and we do not use it for marketing.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We do not use cookies. This site sets none, and stores nothing in your browser local or session storage. Because nothing is placed on your device, there is no cookie banner to accept or decline.",
    ],
  },
  {
    heading: "Analytics",
    body: [
      "We use Vercel Web Analytics to count page views and see which pages are read. It is cookieless and records no cross-site identifier, so a visit cannot be linked to you or followed onto other websites. You can read Vercel privacy policy here: https://vercel.com/legal/privacy-policy.",
    ],
  },
  {
    heading: "SSL Security",
    body: [
      "We use SSL (Secure Sockets Layer) to encrypt and secure your personal data when you transmit it to our site. SSL is a standard security technology that ensures that all data exchanged between your web browser and our server is encrypted and protected from unauthorised access.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We keep enquiries for as long as we need them to answer you and to keep a record of work we have discussed, and for as long as the law requires. This site has no user accounts, so there is nothing held about you beyond the messages you choose to send.",
    ],
  },
  {
    heading: "Who we share your data with",
    body: [
      "We share your data only with the providers we need to run this site and to reply to you. We do not sell it, and we do not share it for advertising.",
      "Specifically, we share your data with the following third-party service providers:",
      "Vercel, who host the site and provide its cookieless analytics. You can read their privacy policy here: https://vercel.com/legal/privacy-policy.",
      "Resend, who deliver the email that your contact form generates. You can read their privacy policy here: https://resend.com/legal/privacy-policy.",
    ],
  },
  {
    heading: "How long we retain your data",
    body: [
      "We retain your personal data only for as long as necessary to provide you with our services and as described in this policy. We may also retain this information to comply with legal obligations, resolve disputes, and enforce our agreements.",
    ],
  },
  {
    heading: "What rights you have over your data",
    body: [
      "You have the right to request access to and receive a copy of the personal data we hold about you. You may also request that we correct, update, or delete any personal data we have about you. To exercise these rights, please contact us at info@recurssive.com. This does not include any data we are obliged to keep for administrative, legal, or security purposes.",
    ],
  },
  {
    heading: "Contact information",
    body: [
      "If you have any concerns about this privacy policy or our use of your personal data, please reach us at:",
      "Email: info@recurssive.com",
    ],
  },
]

export const termsSections: LegalSection[] = [
  {
    heading: "Website",
    body: [
      "Welcome to recurssive.com, operated by Recurssive. These Terms of Service govern your access to and use of our Site and the services we provide. By accessing or using our Site, you agree to be bound by these Terms. If you do not agree, please do not use our Site or Services.",
    ],
  },
  {
    heading: "Acceptance of Terms",
    body: [
      "By visiting our Site, submitting a form, engaging our Services, or otherwise interacting with us, you confirm that you have read, understood, and agree to these Terms, as well as our Privacy Policy.",
    ],
  },
  {
    heading: "Description of Services",
    body: [
      "Recurssive provides creative, design, development, consulting and production services. The specific scope, deliverables, timeline, and cost of any engagement will be outlined separately in a proposal, quote, contract, or statement of work agreed upon between you and Recurssive. We reserve the right to modify, suspend, or discontinue any part of our Services at any time, with or without notice.",
    ],
  },
  {
    heading: "Intellectual Property Rights",
    body: [
      "Unless otherwise stated, all content on this Site including text, graphics, logos, images, and design is the property of Recurssive or its licensors and is protected by applicable intellectual property laws. Ownership and usage rights for work produced as part of a client engagement will be governed by the terms of the applicable project agreement or contract, not by this general Terms page. You may not reproduce, distribute, modify, or create derivative works from any content on this Site without our prior written consent.",
    ],
  },
  {
    heading: "User Obligations",
    body: [
      "When using our Site or Services, you agree not to:",
      "- Use the Site for any unlawful purpose or in violation of these Terms;",
      "- Submit false, misleading, or fraudulent information through any contact or enquiry form;",
      "- Attempt to gain unauthorised access to our systems, servers, or data;",
      "- Interfere with or disrupt the operation of the Site;",
      "- Use automated tools to access or extract content from the Site without permission.",
    ],
  },
  {
    heading: "Client Engagements and Payment",
    body: [
      "Any specific engagement for Services will be subject to a separate agreement, quote, or contract, which will outline scope, fees, payment terms, timelines, and deliverables. In the event of a conflict between these Terms and a signed project agreement, the project agreement will govern.",
    ],
  },
  {
    heading: "Third-Party Links and Services",
    body: [
      "Our Site may contain links to third-party websites or make use of third-party tools and services (such as analytics). We are not responsible for the content, accuracy, or practices of third-party sites or services. Use of any third-party service is subject to that party's own terms and privacy policies.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "The Site and Services are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that the website will be uninterrupted, secure, or error-free.",
    ],
  },
  {
    heading: "Termination",
    body: [
      "We reserve the right to suspend or terminate your access to the website or services at our discretion, without notice, for conduct that we believe violates these Terms or is otherwise harmful to our business, other users, or third parties.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These Terms shall be governed by and construed in accordance with the laws of Greece, without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Greece.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may update these Terms from time to time. Any changes will be posted on this page. Your continued use of the Site after changes are posted constitutes acceptance of the revised Terms.",
    ],
  },
  {
    heading: "Contact information",
    body: [
      "If you have any questions about these Terms, please contact us at: info@recurssive.com",
    ],
  },
]
