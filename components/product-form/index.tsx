import { useState } from 'react';
import type { FormEvent } from 'react';
import Button from '../button';
import { useCart } from '../../context/cartContext';
import type { ProductFull } from '../../types/index';
import styles from './form.module.scss';

type Props = {
  product: ProductFull;
};

const selectOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ProductForm = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        abbrev: product.attributes.abbrev,
        price: product.attributes.price,
        quantity,
        cartImg: product.attributes.cartImg.data.attributes.url,
      },
    });

    setQuantity(1);
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <div className={styles.form__inputs}>
        <button
          type="button"
          onClick={() => quantity > 1 && setQuantity((n) => n - 1)}
        >
          -
        </button>
        <div className={styles.form__quantity}>
          <label htmlFor="quantity">Quantity</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            name="quantity"
            id="quantity"
          >
            {selectOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => quantity < 10 && setQuantity((n) => n + 1)}
        >
          +
        </button>
      </div>
      <Button type="submit" label="Add to cart" min={true} />
    </form>
  );
};

export default ProductForm;
