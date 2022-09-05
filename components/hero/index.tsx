import ProductPicture from '../product-picture';
import Button from '../button';
import type { FeaturedProduct } from '../../types';
import styles from './hero.module.scss';

type Props = { product: FeaturedProduct };

const Hero = ({ product }: Props) => {
  const { new: isNew, slug } = product.product.data.attributes;

  return (
    <div className={styles.hero}>
      <div className={styles.hero__imgBox}>
        <ProductPicture
          images={product.images}
          altText={product.heading}
          loading="eager"
        />
      </div>
      <div className={styles.hero__textBox}>
        {isNew && <span>NEW PRODUCT</span>}
        <h1>{product.heading}</h1>
        <p>{product.description}</p>
        <div>
          <Button type="link" href={`/products/${slug}`} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
