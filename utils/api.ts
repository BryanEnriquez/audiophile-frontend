import qs from 'qs';
import type {
  ProductType,
  ApiCollectionTypeResponse,
  ProductPreview,
} from '../types';

type Resource = 'homepage' | 'products';

type Params = {
  fields?: string[];
  sort?: string[];
  filters?: {};
  populate?: string[] | {};
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
