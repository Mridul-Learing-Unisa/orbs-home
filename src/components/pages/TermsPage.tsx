import { TERMS, TERMS_UPDATED } from '../../data/site';
import { Overlay } from './Overlay';

export function TermsPage({ open }: { open: boolean }) {
  return (
    <Overlay open={open} label="Terms and conditions">
      <h2>Terms and conditions.</h2>
      <p>Last updated {TERMS_UPDATED}.</p>
      {TERMS.map((t, i) => (
        <section key={t.title}>
          <h3>
            {i + 1}. {t.title}
          </h3>
          <p>{t.body}</p>
        </section>
      ))}
      <h3>{TERMS.length + 1}. Contact</h3>
      <p>
        Questions about these terms? Use{' '}
        <a href="#contact" className="inline-link">
          Talk to us
        </a>
        .
      </p>
    </Overlay>
  );
}
