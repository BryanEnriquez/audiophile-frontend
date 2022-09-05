import Picture from '../picture';
import type { ImageGroup } from '../../types';
import type { ImageLoading } from '../../types';

type Props = {
  images: ImageGroup;
  altText: string;
  loading?: ImageLoading;
};

const ProductPicture = ({ images, altText, loading = 'lazy' }: Props) => {
  const { s, m, l } = images;

  return (
    <Picture
      s={s.data.attributes.url}
      m={m.data.attributes.url}
      l={l.data.attributes.url}
      alt={altText}
      loading={loading}
    />
  );
};

export default ProductPicture;
