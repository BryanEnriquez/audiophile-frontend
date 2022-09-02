import { Props } from '../../types';
import styles from './navbar-wrapper.module.scss';

const NavbarWrapper = ({ children }: Props) => {
  return <div className={styles['navbar-wrapper']}>{children}</div>;
};

export default NavbarWrapper;
