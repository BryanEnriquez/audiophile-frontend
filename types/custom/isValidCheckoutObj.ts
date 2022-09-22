import { CheckoutRequestBody, ExpectedCheckoutRequestBody } from '..';

function isObj(x: any): x is { [x: string]: any } {
  return x && typeof x === 'object' && !Array.isArray(x);
}

function isPositiveInteger(x: any): x is number {
  return Number.isInteger(x) && x > 0;
}

export const requiredFields = [
  'name',
  'email',
  'phone',
  'address',
  'zip',
  'city',
  'country',
] as const;

export const eMoneyFields = [
  ...requiredFields,
  'eMoneyNumber',
  'eMoneyPin',
] as const;

export function isValidCheckoutObj(
  data: ExpectedCheckoutRequestBody
): data is CheckoutRequestBody {
  if (!isObj(data)) return false;

  const { paymentMethod, paymentInfo, cartItems } = data;

  if (!paymentMethod) return false;

  if (!isObj(paymentInfo)) return false;

  if (paymentMethod === 'e-money') {
    if (!eMoneyFields.every((f) => typeof paymentInfo[f] === 'string'))
      return false;
  } else if (paymentMethod === 'cash') {
    if (!requiredFields.every((f) => typeof paymentInfo[f] === 'string'))
      return false;
  } else return false;

  if (!Array.isArray(cartItems) || cartItems.length < 1) return false;

  const isValidCart = cartItems.every((el: any) => {
    return isObj(el) && [el.id, el.quantity].every(isPositiveInteger);
  });

  if (!isValidCart) return false;

  return true;
}
