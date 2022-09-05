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

// Api response structure     ////////////////////////////////////////////////////////

type ApiResponseMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type ApiSingleTypeResponse<T> = {
  data: T;
  meta: {};
};

export type ApiCollectionTypeResponse<T> = {
  data: T[];
  meta: ApiResponseMeta;
};
