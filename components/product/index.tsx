import ProductInfo from '../product-info';
import ProductInfoContinued from '../product-info-continued';
import ProductGallery from '../product-gallery';
import type { ProductFullAttributes } from '../../types';
import styles from './product.module.scss';

type Props = {
  product: ProductFullAttributes;
};

const Product = ({ product }: Props) => (
  <div className={styles.product}>
    <ProductInfo product={product} />
    <ProductInfoContinued
      features={product.features}
      included={product.included}
    />
    <ProductGallery
      img1={product.img1}
      img2={product.img2}
      img3={product.img3}
      label={product.name}
    />
  </div>
);

export default Product;
