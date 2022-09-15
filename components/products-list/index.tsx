import ProductPicture from '../product-picture';
import Button from '../button';
import type { ProductPreview } from '../../types';
import type { ImageLoading } from '../../types';
import styles from './products.module.scss';

type Props = {
  products: ProductPreview[];
};

type ItemPreviewProps = {
  product: ProductPreview;
  loading?: ImageLoading;
};

const ItemPreview = ({ product, loading = 'lazy' }: ItemPreviewProps) => {
  const { preview, name, description, new: isNew, slug } = product.attributes;

  return (
    <li>
      <div className={styles.products__grid}>
        <div className={styles.products__img}>
          <ProductPicture images={preview} altText={name} loading={loading} />
        </div>
        <div className={styles.products__copy}>
          {isNew && <span>NEW PRODUCT</span>}
          <h2>{name}</h2>
          <p>{description}</p>
          <Button type="link" href={`/products/${slug}`} min />
        </div>
      </div>
    </li>
  );
};

const ProductsList = ({ products }: Props) => {
  const [priority, ...others] = products;

  return (
    <ol className={styles.products}>
      <ItemPreview product={priority} loading="eager" />
      {others.map((el) => (
        <ItemPreview key={el.id} product={el} />
      ))}
    </ol>
  );
};

export default ProductsList;
