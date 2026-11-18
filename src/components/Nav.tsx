import { useOnHomeScreen } from '../hooks/useOnHomeScreen';
import { MoodOrbs } from './MoodOrbs';
import './Nav.css';

const LINKS = [
  { href: '#scenes', label: 'Scenes' },
  { href: '#cat', label: 'Categories' },
  { href: '#contact', label: 'Talk to us' },
];

export function Nav() {
  // The bar belongs to the home screen only; it slides away once you scroll past it.
  const onHome = useOnHomeScreen();
  const className = `nav${onHome ? '' : ' nav--hidden'}`;

  return (
    <nav className={className}>
      <b className="nav-logo">ORBS</b>
      <MoodOrbs />
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
