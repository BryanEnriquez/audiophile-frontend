import Link from 'next/link';
import { navLinks } from '../../data/navLinks';
import styles from './nav-links.module.scss';

type Props = {
  type?: 'header' | 'footer';
};

const NavLinks = ({ type = 'header' }: Props) => {
  return (
    <ul className={`${styles['nav-links']} ${styles[`nav-links--${type}`]}`}>
      {navLinks.map(({ label, href }) => (
        <li key={label}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
