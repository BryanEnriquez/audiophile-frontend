import Link from 'next/link';
import logo from '../../public/images/shared/desktop/logo.svg';
import styles from './logo.module.scss';

type Props = {
  onClick?: () => void;
  header?: boolean;
};

const Logo = ({ onClick, header = false }: Props) => {
  return (
    <Link href="/">
      <a
        className={`${styles['logo-link']}${
          header ? ' ' + styles['logo-link--header'] : ''
        }`}
        {...(onClick && { onClick })}
      >
        <img src={logo.src} alt="audiophile logo" className={styles.logo} />
        <span>Homepage</span>
      </a>
    </Link>
  );
};

export default Logo;
