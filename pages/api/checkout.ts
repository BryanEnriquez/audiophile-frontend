import type { NextApiRequest, NextApiResponse } from 'next';
import {
  isValidCheckoutObj,
  requiredFields,
  eMoneyFields,
} from '../../types/custom/isValidCheckoutObj';
import { api } from '../../utils/api';
import { toUSD } from '../../utils/toUSD';
import { validators } from '../../utils/forms/checkout';
import type {
  ApiCollectionTypeResponse,
  CheckoutRequestBody,
  APIResponse,
  CheckoutResponseData,
  ProductCheckoutItem,
} from '../../types';

type CheckoutData = APIResponse<CheckoutResponseData>;

const handleCheckout = async (
  req: NextApiRequest,
  res: NextApiResponse<CheckoutData>,
  data: CheckoutRequestBody
) => {
  try {
    const apiRes: ApiCollectionTypeResponse<ProductCheckoutItem> = await api(
      'products',
      {
        fields: ['price'],
        filters: {
          id: {
            $in: data.cartItems.map((el) => el.id),
          },
        },
      }
    );

    if (apiRes.data?.length !== data.cartItems.length) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Unable to find 1 or more products' });
    }

    const itemPrices = apiRes.data.reduce(
      (obj: { [id: string]: number }, item) => {
        obj[item.id] = item.attributes.price;
        return obj;
      },
      {}
    );

    const total = data.cartItems.reduce((sum, el) => {
      return sum + itemPrices[el.id] * el.quantity;
    }, 0);

    const shipping = 5000;
    const vat = total * 0.2;
    const grandTotal = toUSD(total + shipping + vat);

    res.status(200).json({
      status: 'success',
      data: { grandTotal },
    });
  } catch (err) {
    if (err instanceof Error) console.log(`Internal error: ${err}`);

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutData>
) {
  const { method, body: data } = req;

  switch (method) {
    case 'POST':
      if (isValidCheckoutObj(data)) {
        const formErrors: string[] = [];

        if (data.paymentMethod === 'cash') {
          requiredFields.forEach((field) => {
            const input = data.paymentInfo[field].trim();

            const err = validators[field](input);

            if (err) formErrors.push(`${field}: ${err}`);
          });
        } else {
          eMoneyFields.forEach((field) => {
            const input = data.paymentInfo[field].trim();

            const err = validators[field](input);

            if (err) formErrors.push(`${field}: ${err}`);
          });
        }

        if (formErrors.length) {
          return res.status(404).json({
            status: 'fail',
            message: `Form validation failed. ${formErrors.join(', ')}`,
          });
        }

        return await handleCheckout(req, res, data);
      }

      return res.status(404).json({
        status: 'fail',
        message: 'Form data is not in the expected format',
      });
    default:
      res.status(405).json({
        status: 'fail',
        message: `Invalid method: ${req.method}`,
      });
  }
}
