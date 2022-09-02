import Head from 'next/head';
import type { InferGetStaticPropsType } from 'next';
// import qs from 'qs';
import Hero from '../components/hero';
import PadContent from '../components/pad-content';
import HomeFeatured from '../components/home-featured';
import { homepage } from '../dev-data/homepage'; // local testing
import SharedContent from '../components/shared-content';
import HomeWrapper from '../components/home-wrapper';

// API Response Structure //////////////////////////////////////////
interface ImageAttributes {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

export interface FeaturedProduct {
  id: number;
  heading: string;
  description: string | null;
  product: {
    data: {
      id: number;
      attributes: {
        slug: string;
        new: boolean;
      };
    };
  };
  images: {
    id: number;
    s: ImageAttributes;
    m: ImageAttributes;
    l: ImageAttributes;
  };
}

export interface HomepageAttributes {
  about: string;
  hero: FeaturedProduct;
  featured1: FeaturedProduct;
  featured2: FeaturedProduct;
  featured3: FeaturedProduct;
}

export interface Homepage {
  id: number;
  attributes: HomepageAttributes;
}

interface ApiResponse {
  data: Homepage;
  meta: {};
}

// Query generator returning ApiResponse type defined above ////////////////
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
  // const query = qs.stringify(
  //   {
  //     fields: ['about'],
  //     populate: populateProducts('hero', 'featured1', 'featured2', 'featured3'),
  //   },
  //   {
  //     encodeValuesOnly: true,
  //   }
  // );

  // const res = await fetch(`${process.env.API_URL}/homepage?${query}`, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  //   },
  // });

  // const { data }: ApiResponse = await res.json();

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
      <PadContent>
        <SharedContent type="a" padTop={true}>
          <HomeFeatured featured={homeData.featured} />
        </SharedContent>
      </PadContent>
    </HomeWrapper>
  );
};

export default Home;
