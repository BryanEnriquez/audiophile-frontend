import { Props } from '../../types';
import styles from './mwr.module.scss';

const MaxWidthWrapper = ({ children }: Props) => (
  <div className={styles.wrapper}>{children}</div>
);

export default MaxWidthWrapper;
