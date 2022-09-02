import Picture from '../picture';
import type { FeaturedProduct } from '../../pages';

type Props = {
  product: FeaturedProduct;
  loading?: 'eager' | 'lazy';
};

const ProductPicture = ({ product, loading = 'lazy' }: Props) => {
  const { s, m, l } = product.images;

  return (
    <Picture
      s={s.data.attributes.url}
      m={m.data.attributes.url}
      l={l.data.attributes.url}
      alt={product.heading}
      loading={loading}
    />
  );
};

export default ProductPicture;
