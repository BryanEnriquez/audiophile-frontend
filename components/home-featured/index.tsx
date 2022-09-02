import ProductPicture from '../product-picture';
import Button from '../button';
import type { FeaturedProduct } from '../../pages/index';
import type { ButtonColors } from '../button';
import styles from './featured.module.scss';

type HomeFeaturedProps = {
  featured: FeaturedProduct[];
};

type CopyProps = {
  item: FeaturedProduct;
  color: ButtonColors;
};

const ProductCopy = ({ item, color }: CopyProps) => {
  const { heading, description, product } = item;

  return (
    <>
      <h2>{heading}</h2>
      {description && <p>{description}</p>}
      <Button
        type="link"
        href={`/products/${product.data.attributes.slug}`}
        color={color}
      />
    </>
  );
};

const HomeFeatured = ({ featured }: HomeFeaturedProps) => {
  const [first, second, third] = featured;

  return (
    <div className={styles.featured}>
      <div className={styles.featured__1}>
        <div className={styles.featured__img1}>
          <ProductPicture product={first} />
        </div>
        <div className={styles.featured__copy1}>
          <ProductCopy item={first} color="black" />
        </div>
      </div>
      <div className={styles.featured__2}>
        <ProductPicture product={second} />
        <div className={styles.featured__copy2}>
          <ProductCopy item={second} color="clear" />
        </div>
      </div>
      <div className={styles.featured__3}>
        <div className={styles.featured__img3}>
          <ProductPicture product={third} />
        </div>
        <div className={styles.featured__copy3}>
          <ProductCopy item={third} color="clear" />
        </div>
      </div>
    </div>
  );
};

export default HomeFeatured;
