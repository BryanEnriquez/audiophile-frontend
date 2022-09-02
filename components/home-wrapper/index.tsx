import type { Props } from '../../types';
import styles from './home.module.scss';

const HomeWrapper = ({ children }: Props) => (
  <div className={styles.home}>{children}</div>
);

export default HomeWrapper;
