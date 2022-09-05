import Head from 'next/head';
import type { InferGetStaticPropsType } from 'next';
import { api } from '../utils/api';
import Hero from '../components/hero';
import ContentSidePadding from '../components/content-side-padding';
import HomeFeatured from '../components/home-featured';
import { homepage } from '../dev-data/homepage'; // local testing
import SharedContent from '../components/shared-content';
import HomeWrapper from '../components/home-wrapper';
import type { ApiSingleTypeResponse, Homepage } from '../types';

const imagePopulate = {
  populate: {
    s: { fields: ['url'] },
    m: { fields: ['url'] },
    l: { fields: ['url'] },
  },
};
type ImagePopulateOptions = typeof imagePopulate;

interface ProductPopulateOptions {
  [productToPopulate: string]: {
    populate: {
      product: {
        fields: string[];
      };
      images: ImagePopulateOptions;
    };
  };
}

function populateProducts(...products: string[]) {
  const populateOptions: ProductPopulateOptions = {};

  products.forEach((product) => {
    populateOptions[product] = {
      populate: {
        product: {
          fields: ['slug', 'new'],
        },
        images: imagePopulate,
      },
    };
  });

  return populateOptions;
}

export const getStaticProps = async () => {
  // const { data }: ApiSingleTypeResponse<Homepage> = await api('homepage', {
  //   fields: ['about'],
  //   populate: populateProducts('hero', 'featured1', 'featured2', 'featured3'),
  // });

  // const homepage = data.attributes;

  const homeData = {
    about: homepage.about,
    hero: homepage.hero,
    featured: [homepage.featured1, homepage.featured2, homepage.featured3],
  };

  return {
    props: {
      homeData,
    },
  };
};

const Home = ({ homeData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <HomeWrapper>
      <Head>
        <title>Audiophile - Home</title>
      </Head>
      <Hero product={homeData.hero} />
      <ContentSidePadding>
        <SharedContent type="a" padTop={true}>
          <HomeFeatured featured={homeData.featured} />
        </SharedContent>
      </ContentSidePadding>
    </HomeWrapper>
  );
};

export default Home;
