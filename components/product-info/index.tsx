import ProductPicture from '../product-picture';
import ProductForm from '../product-form';
import type { ProductFull } from '../../types/index';
import styles from './item.module.scss';

type Props = {
  product: ProductFull;
};

const toUSD = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const ProductInfo = ({ product }: Props) => {
  const item = product.attributes;

  return (
    <div
      className={`${styles.item} ${
        styles[`item--${item.new ? 'new' : 'reg'}`]
      }`}
    >
      <div className={styles.item__img}>
        <ProductPicture
          images={item.mainImg}
          altText={item.name}
          loading="eager"
        />
      </div>
      <div className={styles.item__copy}>
        {item.new && <span className={styles.item__new}>NEW PRODUCT</span>}
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <span className={styles.item__price}>{`$ ${toUSD.format(
          item.price / 100
        )}`}</span>
        <ProductForm product={product} />
      </div>
    </div>
  );
};

export default ProductInfo;
