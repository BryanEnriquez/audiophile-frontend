import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import ContentWrapper from '../../components/content-wrapper';
import ContentSidePadding from '../../components/content-side-padding';
import Product from '../../components/product';
import ProductRecommendations from '../../components/product-recommendations';
import SharedContent from '../../components/shared-content';
import MaxWidthWrapper from '../../components/max-width-wrapper';
import BackButton from '../../components/back-button';
import { api, fetchProductRecommendations } from '../../utils/api';
import { populateComponentMedia } from '../../utils/populateComponentMedia';
// import { recommended } from '../../dev-data/recommended'; // DEV only
import type {
  ApiCollectionTypeResponse,
  ProductSlugOnly,
  ProductFull,
  ProductFullAttributes,
  ProductRecommendation,
  ProductType,
} from '../../types';

type Props = {
  data: ProductFullAttributes;
  recommended: ProductRecommendation[];
};

const ProductPage: NextPage<Props> = ({ data, recommended }) => (
  <ContentWrapper>
    <ContentSidePadding>
      <MaxWidthWrapper>
        <BackButton />
        <Product product={data} />
        <ProductRecommendations ymal={recommended} />
      </MaxWidthWrapper>
      <SharedContent type="b" />
    </ContentSidePadding>
  </ContentWrapper>
);

export default ProductPage;

// -----------------------------------------------------------------------

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data }: ApiCollectionTypeResponse<ProductFull> = await api(
    'products',
    {
      fields: [
        'name',
        'abbrev',
        'description',
        'new',
        'price',
        'features',
        'included',
      ],
      filters: {
        slug: {
          $eq: params?.slug,
        },
      },
      populate: {
        category: {
          fields: ['type'],
        },
        ...populateComponentMedia('mainImg', 'img1', 'img2', 'img3'),
        cartImg: { fields: ['url'] },
      },
    }
  );

  // Fetch recommended products
  const algo: {
    [category: string]: {
      ownSort?: string[];
      others: { category: ProductType; sort?: string[] }[];
    };
  } = {
    headphones: {
      others: [{ category: 'speakers' }, { category: 'earphones' }],
    },
    speakers: {
      others: [
        { category: 'headphones', sort: ['new:asc', 'publishedAt:desc'] },
        { category: 'earphones' },
      ],
    },
    earphones: {
      others: [
        { category: 'headphones', sort: ['new:asc', 'publishedAt:desc'] },
        { category: 'speakers' },
      ],
    },
  };

  const category = data[0].attributes.category.data.attributes.type;

  const { category: otherCategory, sort } = algo[category].others[0];

  const [res1, res2] = await Promise.all([
    fetchProductRecommendations(
      category,
      2,
      data[0].id,
      algo[category].ownSort
    ),
    fetchProductRecommendations(otherCategory, 2, null, sort),
  ]);

  const recommended = [...res1.data, ...res2.data];

  const total = recommended.length;

  if (total < 3) {
    const { category: thirdCategory, sort } = algo[category].others[1];

    const extra = await fetchProductRecommendations(
      thirdCategory,
      3 - total,
      null,
      sort
    );

    recommended.push(...extra.data);
  }

  return {
    props: {
      data: data[0].attributes,
      recommended: recommended.slice(0, 3),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: ApiCollectionTypeResponse<ProductSlugOnly> = await api(
    'products',
    { fields: ['slug'] }
  );

  const paths = data.map((product) => ({
    params: { slug: product.attributes.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
