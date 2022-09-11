import { useState } from 'react';
import Button from '../button';
import type { FormEvent } from 'react';
import type { ProductFullAttributes } from '../../types/index';
import styles from './form.module.scss';

type Props = {
  product: ProductFullAttributes;
};

const selectOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ProductForm = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);

  // TODO Add cart functionality
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setQuantity(1);

    // Cart logic...
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
