import type { Props } from '../../types';
import styles from './pad.module.scss';

const PadContent = ({ children }: Props) => (
  <div className={styles.pad}>{children}</div>
);

export default PadContent;
