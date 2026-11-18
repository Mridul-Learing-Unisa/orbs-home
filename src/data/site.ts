export const CONTACT_EMAIL = 'hello@orbs.example';

export const PROJECT_TYPES = ['New build', 'Renovation', 'Existing home', 'Not sure yet'] as const;

export const TERMS_UPDATED = 'November 2026';

export interface TermsSection {
  title: string;
  body: string;
}

/** The final "Contact" section is rendered separately because it contains a link. */
export const TERMS: readonly TermsSection[] = [
  {
    title: 'About these terms',
    body: 'These terms apply to your use of this website and to any advice, design or installation services supplied by ORBS (“we”, “us”). By using the site or engaging us, you agree to them.',
  },
  {
    title: 'Our services',
    body: 'We design, specify, supply, install and configure home automation systems, including lighting, shading, climate, access, security, energy, audio and entertainment. The scenes and control panel on this website are illustrations of what is possible, not a guarantee of any specific outcome.',
  },
  {
    title: 'Quotes and proposals',
    body: 'Quotes are valid for 30 days unless stated otherwise. A project begins when you accept a written proposal and pay any deposit. Changes to scope may change price and timing, and we will confirm them in writing first.',
  },
  {
    title: 'Payment',
    body: 'Payment terms are set out in each proposal. Equipment remains our property until paid for in full, unless the proposal says otherwise.',
  },
  {
    title: 'Third-party products and brands',
    body: 'The product categories shown are illustrative and carry no brand endorsement. We select equipment to suit your project, and manufacturers’ own warranties and terms apply to the products they make.',
  },
  {
    title: 'Electrical and safety work',
    body: 'Mains electrical work is carried out by appropriately licensed electricians and follows applicable Australian standards. Automation is a convenience and does not replace smoke alarms, safety switches or other required safety equipment.',
  },
  {
    title: 'Privacy and data',
    body: 'We favour local-first systems that keep your data in your home. We collect only the information you give us, such as your contact details, and use it to respond to you and deliver our services. We do not sell personal information.',
  },
  {
    title: 'Warranty and consumer rights',
    body: 'Our services come with guarantees that cannot be excluded under the Australian Consumer Law. Nothing in these terms limits those rights. Subject to that, we will correct defective workmanship notified to us within the warranty period stated in your proposal.',
  },
  {
    title: 'Limitation of liability',
    body: 'To the extent the law allows, we are not liable for indirect or consequential loss, or for faults caused by internet outages, third-party services, changes made by others to your system, or products discontinued by their manufacturers.',
  },
  {
    title: 'Intellectual property',
    body: 'The content, artwork and design of this website belong to ORBS and may not be copied without our permission. Music on this site is generated live in your browser and is not recorded or sampled from any existing work.',
  },
  {
    title: 'Changes to these terms',
    body: 'We may update these terms from time to time. The version published on this page applies when you use the site or accept a proposal.',
  },
  {
    title: 'Governing law',
    body: 'These terms are governed by the laws of the Australian state or territory in which ORBS is registered, and the courts of that place have jurisdiction.',
  },
];
