import type React from 'react';

export type Props = { children?: React.ReactNode };

export type ImageLoading = 'eager' | 'lazy';

export type ImageAttributes = {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
};

export type ImageGroup = {
  id: number;
  s: ImageAttributes;
  m: ImageAttributes;
  l: ImageAttributes;
};

// Homepage types             ////////////////////////////////////////////////////////
export type FeaturedProduct = {
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
  images: ImageGroup;
};

export type HomepageAttributes = {
  about: string;
  hero: FeaturedProduct;
  featured1: FeaturedProduct;
  featured2: FeaturedProduct;
  featured3: FeaturedProduct;
};

export type Homepage = {
  id: number;
  attributes: HomepageAttributes;
};

// Product preview types      ////////////////////////////////////////////////////////

export type ProductType = 'headphones' | 'speakers' | 'earphones';

type ProductPreviewAttributes = {
  new: boolean;
  publishedAt: string;
  name: string;
  description: string;
  slug: string;
  preview: ImageGroup;
};

export type ProductPreview = {
  id: number;
  attributes: ProductPreviewAttributes;
};

// Product slug type          ////////////////////////////////////////////////////////

export type ProductSlugOnly = {
  id: number;
  attributes: {
    slug: string;
  };
};

// Full product data          ////////////////////////////////////////////////////////

export type ProductIncluded = { item: string; quantity: number }[];

type ProductCategory = {
  data: {
    id: number;
    attributes: { type: ProductType };
  };
};

export type ProductFullAttributes = {
  name: string;
  abbrev: string;
  description: string;
  new: boolean;
  price: number;
  features: string;
  included: ProductIncluded;
  category: ProductCategory;
  mainImg: ImageGroup;
  img1: ImageGroup;
  img2: ImageGroup;
  img3: ImageGroup;
  cartImg: ImageAttributes;
};

export type ProductFull = {
  id: number;
  attributes: ProductFullAttributes;
};

// Product Recommendations    ////////////////////////////////////////////////////////

export type ProductRecommendation = {
  id: number;
  attributes: {
    new: boolean;
    publishedAt: string;
    abbrev: string;
    slug: string;
    ymal: ImageGroup;
  };
};

// Api response structure     ////////////////////////////////////////////////////////

// NOTE total = total entries in DB that satisfy filter, not # of results returned

type PaginationByPageData = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type PaginationByOffsetData = {
  start: number;
  limit: number;
  total: number;
};

type ApiResponseMeta = {
  pagination: PaginationByPageData | PaginationByOffsetData;
};

export type ApiSingleTypeResponse<T> = {
  data: T;
  meta: {};
};

export type ApiCollectionTypeResponse<T> = {
  data: T[];
  meta: ApiResponseMeta;
};
