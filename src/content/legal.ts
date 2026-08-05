import type { LegalSection } from '@/components/LegalPage'

/**
 * Legal copy for /privacy-policy and /terms-of-service.
 *
 * Generated straight out of the decoded .fig text nodes rather than retyped, so
 * no wording drifted in the copying. Regenerate with scripts/gen-legal.mjs if
 * the frames change; do not hand-edit unless the frames are no longer the source
 * of truth.
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
    heading: "Media",
    body: [
      "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included.",
    ],
  },
  {
    heading: "Contact Forms",
    body: [
      "We collect personal data when you submit a contact form, such as your name, email address, and phone number. This information is used to respond to your inquiries or requests for information.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use cookies to enhance your browsing experience and provide you with personalized content. Cookies also help us to understand how you use our site and to improve our services. By using our site, you consent to the use of cookies.",
    ],
  },
  {
    heading: "Google Analytics",
    body: [
      "We use Google Analytics to analyze user behavior and improve our services. Google Analytics may use cookies and other tracking technologies to collect and analyze information about website usage.",
    ],
  },
  {
    heading: "Facebook",
    body: [
      "We use Facebook to improve our advertising efforts and to reach a wider audience. Facebook may use cookies and other tracking technologies to collect and analyze information about website usage.",
    ],
  },
  {
    heading: "Mailchimp",
    body: [
      "We use Mailchimp to manage our email marketing campaigns. When you sign up for our newsletter, we collect personal data such as your name and email address. This information is used to send you newsletters, updates, and other marketing materials.",
    ],
  },
  {
    heading: "SSL Security",
    body: [
      "We use SSL (Secure Sockets Layer) to encrypt and secure your personal data when you transmit it to our site. SSL is a standard security technology that ensures that all data exchanged between your web browser and our server is encrypted and protected from unauthorized access.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We retain personal data for as long as necessary to provide you with our services and to comply with our legal obligations. If you have an account on our site, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us.",
    ],
  },
  {
    heading: "Who we share your data with",
    body: [
      "We share your data with third-party service providers who help us provide our website and services, such as website hosting, payment processing, and email communication.",
      "Specifically, we share your data with the following third-party service providers:",
      "Facebook: We use Facebook Pixel to track the effectiveness of our Facebook advertising campaigns. You can learn more about Facebook’s data policy here: https://www.facebook.com/about/privacy/update.",
      "Google Analytics: We use Google Analytics to track website usage and behavior. You can learn more about how Google collects and processes data here: https://policies.google.com/privacy.",
      "Mailchimp: We use Mailchimp to manage our email newsletter. You can learn more about Mailchimp’s privacy practices here: https://mailchimp.com/legal/privacy/.",
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
      "You have the right to request access to and receive a copy of the personal data we hold about you. You may also request that we correct, update, or delete any personal data we have about you. To exercise these rights, please contact us at info@recurssive.com. If you have an account on our website or have left comments, you can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.",
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
      "- Submit false, misleading, or fraudulent information through any contact or inquiry form;",
      "- Attempt to gain unauthorized access to our systems, servers, or data;",
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
      "Our Site may contain links to third-party websites or make use of third-party tools and services (such as analytics or advertising platforms). We are not responsible for the content, accuracy, or practices of third-party sites or services. Use of any third-party service is subject to that party's own terms and privacy policies.",
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
