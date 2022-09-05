import type { Props } from '../../types';
import styles from './content.module.scss';

const ContentWrapper = ({ children }: Props) => (
  <div className={styles.content}>{children}</div>
);

export default ContentWrapper;
