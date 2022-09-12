import ProductInfo from '../product-info';
import ProductInfoContinued from '../product-info-continued';
import ProductGallery from '../product-gallery';
import type { ProductFull } from '../../types';
import styles from './product.module.scss';

type Props = {
  product: ProductFull;
};

const Product = ({ product }: Props) => {
  const item = product.attributes;

  return (
    <div className={styles.product}>
      <ProductInfo product={product} />
      <ProductInfoContinued features={item.features} included={item.included} />
      <ProductGallery
        img1={item.img1}
        img2={item.img2}
        img3={item.img3}
        label={item.name}
      />
    </div>
  );
};

export default Product;
