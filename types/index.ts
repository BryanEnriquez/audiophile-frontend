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
  slug: string;
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

type PaginationByPageData = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

// NOTE total = total entries in DB that satisfy filter, not # of results returned
export type PaginationByOffsetData = {
  start: number;
  limit: number;
  total: number;
};

type ApiResponseMeta = {
  pagination: PaginationByPageData | PaginationByOffsetData;
};

type ApiError = {
  status: string;
  name: string;
  message: string;
  details: any;
};

export type ApiSingleTypeResponse<T> = {
  data: T;
  meta: {};
  error?: ApiError;
};

export type ApiCollectionTypeResponse<T> = {
  data: T[];
  meta: ApiResponseMeta;
  error?: ApiError;
};

// Checkout       ////////////////////////////////////////////////////////

type EMoneyOption = 'e-money';
type CashOption = 'cash';

export type PaymentMethod = EMoneyOption | CashOption;

type BillingFields = 'name' | 'email' | 'phone';
type ShippingFields = 'address' | 'zip' | 'city' | 'country';
type PaymentFields = 'eMoneyNumber' | 'eMoneyPin';

export type FormFields = BillingFields | ShippingFields | PaymentFields;

export interface CashForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
}

export interface EMoneyForm extends CashForm {
  eMoneyNumber: string;
  eMoneyPin: string;
}

export type FormErrors = Partial<EMoneyForm>;

export type CheckoutCartItem = { id: number; quantity: number };

interface CheckoutForm {
  cartItems: CheckoutCartItem[];
}

interface CheckoutRequestBodyCash extends CheckoutForm {
  paymentMethod: CashOption;
  paymentInfo: CashForm;
}

interface CheckoutRequestBodyEMoney extends CheckoutForm {
  paymentMethod: EMoneyOption;
  paymentInfo: EMoneyForm;
}

export type CheckoutRequestBody =
  | CheckoutRequestBodyCash
  | CheckoutRequestBodyEMoney;

export type ExpectedCheckoutRequestBody =
  | {
      paymentMethod?: CashOption;
      paymentInfo?: Partial<CashForm>;
      cartItems?: Partial<CheckoutCartItem>[];
    }
  | {
      paymentMethod?: EMoneyOption;
      paymentInfo?: Partial<EMoneyForm>;
      cartItems?: Partial<CheckoutCartItem>[];
    };

export type ProductCheckoutItem = {
  id: number;
  attributes: {
    price: number;
  };
};

export type CheckoutResponseData = {
  grandTotal: string;
};

export type APIResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'fail' | 'error'; message: string };
