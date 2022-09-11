import type { ProductIncluded } from '../../types';
import styles from './info2.module.scss';

type Props = {
  features: string;
  included: ProductIncluded;
};

const ProductInfoContinued = ({ features, included }: Props) => (
  <div className={styles.info2}>
    <div className={styles.info2__features}>
      <h2>FEATURES</h2>
      {features.split(/\\n\\n/).map((el, i) => (
        <p key={i}>{el}</p>
      ))}
    </div>
    <div className={styles.info2__included}>
      <h2>IN THE BOX</h2>
      <ul className={styles.info2__list}>
        {included.map((el, i) => (
          <li key={i}>
            <span>{`${el.quantity}x`}</span> {el.item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ProductInfoContinued;
