import { Props } from '../../types';
import styles from './wrapper.module.scss';

const Wrapper = ({ children }: Props) => (
  <div className={styles.wrapper}>{children}</div>
);

export default Wrapper;
