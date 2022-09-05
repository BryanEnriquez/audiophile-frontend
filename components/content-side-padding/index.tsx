import type { Props } from '../../types';
import styles from './pad.module.scss';

const ContentSidePadding = ({ children }: Props) => (
  <div className={styles.pad}>{children}</div>
);

export default ContentSidePadding;
