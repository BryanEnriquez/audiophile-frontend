import ProductPicture from '../product-picture';
import Button from '../button';
import type { FeaturedProduct } from '../../types';
import type { ButtonColors } from '../button';
import styles from './featured.module.scss';

type HomeFeaturedProps = {
  featured: FeaturedProduct[];
};

type FeaturedProps = {
  item: FeaturedProduct;
  color: ButtonColors;
  num: string;
  imgBox?: boolean;
};

const FeaturedItem = ({ item, color, num, imgBox = true }: FeaturedProps) => {
  const { heading, description, product, images } = item;

  const RenderedPicture = <ProductPicture images={images} altText={heading} />;

  return (
    <div className={styles[`featured__${num}`]}>
      {imgBox ? (
        <div className={styles[`featured__img${num}`]}>{RenderedPicture}</div>
      ) : (
        RenderedPicture
      )}
      <div className={styles[`featured__copy${num}`]}>
        <h2>{heading}</h2>
        {description && <p>{description}</p>}
        <Button
          type="link"
          href={`/products/${product.data.attributes.slug}`}
          color={color}
        />
      </div>
    </div>
  );
};

const HomeFeatured = ({ featured }: HomeFeaturedProps) => {
  const [first, second, third] = featured;

  return (
    <div className={styles.featured}>
      <FeaturedItem item={first} color="black" num="1" />
      <FeaturedItem item={second} color="clear" num="2" imgBox={false} />
      <FeaturedItem item={third} color="clear" num="3" />
    </div>
  );
};

export default HomeFeatured;
