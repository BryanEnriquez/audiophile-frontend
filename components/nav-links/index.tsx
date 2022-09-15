import Link from 'next/link';
import { navLinks } from '../../data/navLinks';
import styles from './nav-links.module.scss';

type Props = {
  type?: 'header' | 'footer';
  onNav?: () => void;
};

const NavLinks = ({ type = 'header', onNav }: Props) => {
  const props: { onClick?: () => void } = {};

  if (onNav) props.onClick = onNav;

  return (
    <ul className={`${styles['nav-links']} ${styles[`nav-links--${type}`]}`}>
      {navLinks.map(({ label, href }) => (
        <li key={label}>
          <Link href={href}>
            <a {...props}>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
