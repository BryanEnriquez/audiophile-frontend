import { useState, FormEvent, useRef, useEffect } from 'react';
import { useCartState } from '../../context/cartContext';
import { useCartLoadState } from '../../context/cartHasLoadedContext';
import { client } from '../../utils/client';
import Modal from '../modal';
import CheckoutSuccessScreen from '../checkout-success-screen';
import CartListItem from '../cart-item';
import Button from '../button';
import { validate } from '../../utils/forms/checkout';
import { toUSD } from '../../utils/toUSD';
import type {
  FormFields,
  PaymentMethod,
  FormErrors,
  CheckoutRequestBody,
  CheckoutResponseData,
} from '../../types';
import cashIcon from '../../public/images/checkout/icon-cash-on-delivery.svg';
import styles from './f.module.scss';

type TextInput = { id: FormFields; label: string; placeholder: string };

const billingFields: TextInput[] = [
  { id: 'name', label: 'Name', placeholder: 'Alexei Ward' },
  { id: 'email', label: 'Email Address', placeholder: 'alexei@mail.com' },
  { id: 'phone', label: 'Phone Number', placeholder: '+1 202-555-0136' },
];

const shippingFields: TextInput[] = [
  { id: 'address', label: 'Your Address', placeholder: '1137 Williams Avenue' },
  { id: 'zip', label: 'ZIP Code', placeholder: '10001' },
  { id: 'city', label: 'City', placeholder: 'New York' },
  { id: 'country', label: 'Country', placeholder: 'United States' },
];

const paymentFields: TextInput[] = [
  { id: 'eMoneyNumber', label: 'e-Money Number', placeholder: '238521993' },
  { id: 'eMoneyPin', label: 'e-Money PIN', placeholder: '6891' },
];

const summaryLabels = ['Total', 'Shipping', 'VAT (Included)', 'Grand Total'];

const paymentOptions: { id: PaymentMethod; label: string }[] = [
  { id: 'e-money', label: 'e-Money' },
  { id: 'cash', label: 'Cash On Delivery' },
];

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('e-money');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [checkoutResData, setCheckoutResponse] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const reqErrEl = useRef<HTMLParagraphElement>(null);
  const formEl = useRef<HTMLFormElement>(null);
  const cart = useCartState();
  const items = Object.values(cart);
  const cartHasLoaded = useCartLoadState();

  useEffect(() => {
    if (paymentMethod === 'cash') {
      setFormErrors(
        (errors): FormErrors => ({
          ...errors,
          eMoneyNumber: '',
          eMoneyPin: '',
        })
      );
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (requestError) window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [requestError]);

  if (!cartHasLoaded) {
    return null;
  }

  if (!items.length) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.block}>
          <h1>CHECKOUT</h1>
          <p className={styles.block__msg}>
            Cart is currently empty. Add some items to see your order summary.
          </p>
        </div>
      </div>
    );
  }

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formEl.current) return;
    if (isFormDisabled) return;
    setRequestError(null);
    setIsFormDisabled(true);

    const formData = new FormData(formEl.current);

    const inputs: { [field: string]: string } = {};

    [...formData.entries()].forEach(([field, value]) => {
      inputs[field] =
        value instanceof File ? '' : value.trim().replaceAll(/\s+/g, ' ');
    });

    const errorsObj: { [key in FormFields]?: string } = {};
    let validationError = false;

    const validateFields = (fields: TextInput[]) =>
      fields.forEach((el) => {
        const field = el.id;

        const err = validate(field, inputs[field]);

        if (err) {
          errorsObj[field] = err;
          validationError = true;
        }
      });

    validateFields([...billingFields, ...shippingFields]);

    if (paymentMethod === 'e-money') {
      validateFields(paymentFields);
    }

    if (validationError) {
      setIsFormDisabled(false);
      setFormErrors(errorsObj);
      return;
    } else {
      setFormErrors({});
    }

    const paymentInfo = {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      address: inputs.address,
      zip: inputs.zip,
      city: inputs.city,
      country: inputs.country,
    };

    const reqBody: CheckoutRequestBody = {
      ...(paymentMethod === 'cash'
        ? {
            paymentMethod: 'cash',
            paymentInfo,
          }
        : {
            paymentMethod: 'e-money',
            paymentInfo: {
              ...paymentInfo,
              eMoneyNumber: inputs.eMoneyNumber,
              eMoneyPin: inputs.eMoneyPin,
            },
          }),
      cartItems: [...items.map(({ id, quantity }) => ({ id, quantity }))],
    };

    try {
      const res = (await client('checkout', {
        method: 'POST',
        body: reqBody,
      })) as CheckoutResponseData;

      if (formEl.current) {
        formEl.current.reset();
        setCheckoutResponse(res.grandTotal);
      }
    } catch (err) {
      if (formEl.current && err instanceof Error) {
        setRequestError(err.message);
      }
    } finally {
      formEl.current && setIsFormDisabled(false);
    }
  };

  let total = 0;
  const shipping = 5000;
  let vat = 0;
  let grandTotal = 0;

  items.forEach((el) => {
    total += el.price * el.quantity;
  });

  vat = total * 0.2;
  grandTotal = total + vat + shipping;

  const renderTextFields = (fields: TextInput[]) =>
    fields.map((el) => {
      const err = formErrors[el.id];

      return (
        <div
          className={`${styles.form__inputText} ${
            err ? styles.form__inputText_err : ''
          }`}
          key={el.id}
        >
          <label htmlFor={el.id}>{el.label}</label>
          <input
            type="text"
            placeholder={el.placeholder}
            id={el.id}
            name={el.id}
            autoComplete="true"
          />
          <span className={styles.form__errMsg}>{err}</span>
        </div>
      );
    });

  return (
    <form ref={formEl} className={styles.form} onSubmit={onFormSubmit}>
      <div className={`${styles.form__info} ${styles.block}`}>
        <h1>CHECKOUT</h1>

        {requestError && (
          <p ref={reqErrEl} className={styles.form__reqErr}>
            Error: {requestError}
          </p>
        )}

        <fieldset>
          <legend>Billing Details</legend>
          <div className={styles.form__grid}>
            {renderTextFields(billingFields)}
          </div>
        </fieldset>

        <fieldset>
          <legend>Shipping Info</legend>
          <div className={`${styles.form__grid} ${styles.form__grid_shipping}`}>
            {renderTextFields(shippingFields)}
          </div>
        </fieldset>

        <fieldset>
          <legend>Payment Details</legend>
          <fieldset
            className={`${styles.form__radioFieldset} ${
              paymentMethod === 'cash' ? styles.form__radioFieldset_cash : ''
            }`}
          >
            <legend>Payment Method</legend>
            <div className={styles.form__paymentOpBox}>
              <div>
                {paymentOptions.map((el, i) => {
                  const checked = el.id === paymentMethod;

                  return (
                    <div
                      key={`${el.id}-${i}`}
                      className={`${styles.form__inputRadio}${
                        checked ? ` ${styles.form__inputRadio_checked}` : ''
                      }`}
                      onClick={() => setPaymentMethod(el.id)}
                    >
                      <input
                        type="radio"
                        id={el.id}
                        name="payment"
                        checked={checked}
                        value={el.id}
                        onChange={() => {}}
                      />
                      <label htmlFor={el.id}>{el.label}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </fieldset>
          {paymentMethod === 'e-money' ? (
            <div className={styles.form__grid}>
              {renderTextFields(paymentFields)}
            </div>
          ) : (
            <div className={styles.form__cashNotice}>
              <img src={cashIcon.src} alt="" />
              <p>
                The &lsquo;Cash on Delivery&rsquo; option enables you to pay in
                cash when our delivery courier arrives at your residence. Just
                make sure your address is correct so that your order will not be
                cancelled.
              </p>
            </div>
          )}
        </fieldset>
      </div>

      <div className={styles.form__summary}>
        <h2>SUMMARY</h2>
        <div className={styles.form__items}>
          {items.map((el) => (
            <CartListItem key={el.id} item={el} />
          ))}
        </div>
        <div className={styles.form__total}>
          {[toUSD(total), toUSD(shipping), toUSD(vat), toUSD(grandTotal)].map(
            (val, i) => (
              <p key={i}>
                {summaryLabels[i]} <span>{val}</span>
              </p>
            )
          )}
        </div>
        <Button
          type="submit"
          label="Continue & Pay"
          disabled={isFormDisabled}
        />
      </div>
      {checkoutResData && (
        <Modal zIndex={100} onBgClick={() => {}}>
          <CheckoutSuccessScreen cartItems={items} total={checkoutResData} />
        </Modal>
      )}
    </form>
  );
};

export default CheckoutForm;
