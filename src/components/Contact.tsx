import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CONTACT_EMAIL, PROJECT_TYPES } from '../data/site';
import { useMagnetic } from '../hooks/useMagnetic';
import './Contact.css';

interface Enquiry {
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
}

const EMPTY: Enquiry = { name: '', email: '', phone: '', project: PROJECT_TYPES[0], message: '' };

function mailtoFor(e: Enquiry): string {
  const subject = `ORBS enquiry from ${e.name}`;
  const body = `Name: ${e.name}\nEmail: ${e.email}\nPhone: ${e.phone}\nProject: ${e.project}\n\n${e.message}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** The closing statement and the enquiry form, as one section at the end of the page. */
export function Contact() {
  const [form, setForm] = useState<Enquiry>(EMPTY);
  const send = useRef<HTMLButtonElement>(null);
  useMagnetic(send);

  const field =
    (key: keyof Enquiry) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = mailtoFor(form);
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="mi">Talk to us</div>
      <h2 id="contact-title">Tell us how you want your home to live.</h2>
      <p className="mi contact-kicker">We’ll work out what technology belongs in it</p>

      <form className="contact-form" onSubmit={submit}>
        <label>
          Name
          <input value={form.name} onChange={field('name')} autoComplete="name" />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={field('email')} autoComplete="email" />
        </label>
        <label>
          Phone (optional)
          <input type="tel" value={form.phone} onChange={field('phone')} autoComplete="tel" />
        </label>
        <label>
          Your project
          <select value={form.project} onChange={field('project')}>
            {PROJECT_TYPES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <label>
          How do you want your home to live?
          <textarea rows={5} value={form.message} onChange={field('message')} />
        </label>
        <button type="submit" className="send" ref={send}>
          Send
        </button>
        <p className="contact-note">This opens your email app with your message ready to send.</p>
      </form>
    </section>
  );
}
