import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import type { FormFields } from '../../types';

type Validators = {
  [key in FormFields]: (input: string) => string | undefined;
};

const checkLength = (str: string, min: number, max: number) => {
  const { length } = str;

  if (length < min) return `Min. length: ${min} characters`;
  if (length > max) return `Max length: ${max} characters`;
};

export const validators: Validators = {
  name(input) {
    const err = checkLength(input, 2, 30);

    if (err) return err;

    if (!/^[a-z]{1}[a-z ]*[a-z]{1}$/i.test(input)) return 'Invalid name';
  },
  email: (input) => {
    if (!isEmail(input)) return 'Not a valid email';
  },
  phone: (input) => {
    if (!isMobilePhone(input, 'en-US', { strictMode: true }))
      return 'Wrong format';
  },
  address: (input) => {
    const err = checkLength(input, 5, 50);

    if (err) return err;
  },
  zip: (input) => {
    if (!/^\d{5}(-\d{4})?$/.test(input)) return 'Invalid ZIP code';
  },
  city: (input) => {
    const err = checkLength(input, 2, 30);

    if (err) return err;
  },
  country: (input) => {
    const err = checkLength(input, 4, 60);

    if (err) return err;
  },
  eMoneyNumber: (input) => {
    if (!/^\d{9}$/.test(input)) return 'Wrong format';
  },
  eMoneyPin: (input) => {
    if (!/^\d{4}$/.test(input)) return 'Wrong format';
  },
};

export const validate = (
  field: FormFields,
  input: string
): string | undefined =>
  !input ? "Field can't be empty" : validators[field](input);
