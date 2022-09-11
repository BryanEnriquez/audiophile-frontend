import ProductPicture from '../product-picture';
import ProductForm from '../product-form';
import type { ProductFullAttributes } from '../../types/index';
import styles from './item.module.scss';

type Props = {
  product: ProductFullAttributes;
};

const toUSD = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const ProductInfo = ({ product }: Props) => (
  <div
    className={`${styles.item} ${
      styles[`item--${product.new ? 'new' : 'reg'}`]
    }`}
  >
    <div className={styles.item__img}>
      <ProductPicture
        images={product.mainImg}
        altText={product.name}
        loading="eager"
      />
    </div>
    <div className={styles.item__copy}>
      {product.new && <span className={styles.item__new}>NEW PRODUCT</span>}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span className={styles.item__price}>{`$ ${toUSD.format(
        product.price / 100
      )}`}</span>
      <ProductForm product={product} />
    </div>
  </div>
);

export default ProductInfo;
