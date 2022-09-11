import { ImageGroup } from '../../types';
import ProductPicture from '../product-picture';
import styles from './g.module.scss';

type Props = {
  img1: ImageGroup;
  img2: ImageGroup;
  img3: ImageGroup;
  label: string;
};

const addImgClass = (s: string) => `${styles.gallery__img} ${s}`;

const ProductGallery = ({ img1, img2, img3, label }: Props) => (
  <div className={styles.gallery}>
    <div className={styles.gallery__grid}>
      {[img1, img2, img3].map((img, i) => (
        <div
          key={img.id}
          className={addImgClass(styles[`gallery__img--${i + 1}`])}
        >
          <ProductPicture
            images={img}
            altText={`Product picture ${i + 1} for ${label}`}
          />
        </div>
      ))}
    </div>
  </div>
);

export default ProductGallery;
