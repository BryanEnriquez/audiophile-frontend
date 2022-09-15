import type { ImageLoading } from '../../types';
import variables from '../../styles/imgMediaExports.module.scss';

type Props = {
  s: string;
  m: string;
  l: string;
  alt: string;
  loading?: ImageLoading;
};

const Picture = ({ s, m, l, alt, loading = 'lazy' }: Props) => (
  <picture>
    <source media={`(max-width: ${variables.mediaM})`} srcSet={s} />
    <source media={`(max-width: ${variables.mediaL})`} srcSet={m} />
    <img src={l} alt={alt} loading={loading} />
  </picture>
);

export default Picture;
