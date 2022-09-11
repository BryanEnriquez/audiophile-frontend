import qs from 'qs';
import { populateComponentMedia } from './populateComponentMedia';
import type {
  ProductType,
  ApiCollectionTypeResponse,
  ProductPreview,
  ProductRecommendation,
} from '../types';

type Resource = 'homepage' | 'products';

type Params = {
  fields?: string[];
  sort?: string[];
  filters?: {};
  populate?: string[] | {};
  pagination?:
    | { page?: number; pageSize?: number; withCount?: boolean }
    | { start?: number; limit?: number; withCount?: boolean };
};

export const api = async (resource: Resource, params: Params) => {
  const query = qs.stringify(params, { encodeValuesOnly: true });

  const res = await fetch(`${process.env.API_URL}/${resource}?${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });

  return await res.json();
};

export const fetchProductsPreview = async (
  productType: ProductType
): Promise<ApiCollectionTypeResponse<ProductPreview>> => {
  return await api('products', {
    fields: ['new', 'name', 'description', 'slug'],
    sort: ['new:desc', 'publishedAt:desc'],
    filters: {
      category: {
        type: {
          $eq: productType,
        },
      },
    },
    populate: {
      preview: {
        populate: {
          s: { fields: 'url' },
          m: { fields: 'url' },
          l: { fields: 'url' },
        },
      },
    },
  });
};

export const fetchProductRecommendations = async (
  category: ProductType,
  limit: number,
  idToNotMatch?: number | null,
  customSort?: string[]
): Promise<ApiCollectionTypeResponse<ProductRecommendation>> => {
  return await api('products', {
    fields: ['abbrev', 'slug'],
    sort: customSort || ['new:desc', 'publishedAt:desc'],
    filters: {
      ...(idToNotMatch && {
        id: {
          $ne: idToNotMatch,
        },
      }),
      category: {
        type: {
          $eq: category,
        },
      },
    },
    populate: { ...populateComponentMedia('ymal') },
    pagination: { limit },
  });
};
