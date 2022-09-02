import { Props } from '../../types';
import styles from './main.module.scss';

const Main = ({ children }: Props) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
