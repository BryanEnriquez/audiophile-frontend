import FbIcon from '../icons/FbIcon';
import TwitterIcon from '../icons/TwitterIcon';
import InstagramIcon from '../icons/InstagramIcon';
import styles from './socials.module.scss';

const socialLinks = [
  { href: '#', label: 'Facebook', Component: FbIcon },
  { href: '#', label: 'Twitter', Component: TwitterIcon },
  { href: '#', label: 'Instagram', Component: InstagramIcon },
];

const Socials = () => (
  <ul className={styles.socials}>
    {socialLinks.map(({ href, label, Component }) => (
      <li key={label}>
        <a href={href}>
          <Component />
          <span>{label}</span>
        </a>
      </li>
    ))}
  </ul>
);

export default Socials;
