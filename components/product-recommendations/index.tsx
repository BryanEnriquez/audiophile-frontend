import ProductPicture from '../product-picture';
import Button from '../button';
import type { ProductRecommendation } from '../../types';
import styles from './ymal.module.scss';

type Props = {
  ymal: ProductRecommendation[];
};

const ProductRecommendations = ({ ymal }: Props) => (
  <div className={styles.ymal}>
    <h2>YOU MAY ALSO LIKE</h2>
    <ol className={styles.ymal__group}>
      {ymal.map(({ id, attributes: { ymal, abbrev, slug } }) => (
        <li key={id}>
          <div className={styles.ymal__img}>
            <ProductPicture images={ymal} altText={abbrev} />
          </div>
          <div className={styles.ymal__txt}>
            <h3>{abbrev}</h3>
            <Button type="link" href={`/products/${slug}`} min={true} />
          </div>
        </li>
      ))}
    </ol>
  </div>
);

export default ProductRecommendations;
