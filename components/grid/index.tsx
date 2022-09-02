import styles from './grid.module.scss';

type Props = {
  children?: React.ReactNode;
  type: 'a' | 'b';
};

/**
 * @param type `a`: 120px > 96px > 160px, `b`: 120px > 120px > 160px
 */
const Grid = ({ children, type }: Props) => (
  <div className={`${styles.grid} ${styles[`grid--${type}`]}`}>{children}</div>
);

export default Grid;
