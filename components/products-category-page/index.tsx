import ContentWrapper from '../content-wrapper';
import CategoryBlock from '../category-block';
import ContentSidePadding from '../content-side-padding';
import MaxWidthWrapper from '../max-width-wrapper';
import ProductsList from '../products-list';
import SharedContent from '../shared-content';
import type { ProductType, ProductPreview } from '../../types';

type Props = {
  category: ProductType;
  data: ProductPreview[];
};

const ProductsCategoryPage = ({ category, data }: Props) => (
  <ContentWrapper>
    <CategoryBlock heading={category} />
    <ContentSidePadding>
      <MaxWidthWrapper>
        <ProductsList products={data} />
      </MaxWidthWrapper>
      <SharedContent type="b" />
    </ContentSidePadding>
  </ContentWrapper>
);

export default ProductsCategoryPage;
