import type { InferGetStaticPropsType } from 'next';
import type { ProductType } from '../types';
import ProductsCategoryPage from '../components/products-category-page';
import { data } from '../dev-data/speakers';
import { fetchProductsPreview } from '../utils/api';

export const getStaticProps = async () => {
  const category: ProductType = 'speakers';

  // const { data } = await fetchProductsPreview(category);

  return {
    props: { data, category },
  };
};

const SpeakersPage = ({
  data,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ProductsCategoryPage category={category} data={data} />;
};

export default SpeakersPage;
