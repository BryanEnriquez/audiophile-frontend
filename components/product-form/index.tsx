import { useState, FormEvent } from 'react';
import QuantityInput from '../quantity-input';
import Button from '../button';
import { useCartDispatch } from '../../context/cartContext';
import type { ProductFull } from '../../types/index';
import styles from './form.module.scss';

type Props = {
  product: ProductFull;
};

const ProductForm = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useCartDispatch();

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
        slug: product.attributes.slug,
      },
    });

    setQuantity(1);
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <QuantityInput
        type="select"
        value={quantity}
        onDec={() => quantity > 1 && setQuantity((n) => n - 1)}
        onInc={() => quantity < 10 && setQuantity((n) => n + 1)}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button type="submit" label="Add to cart" min />
    </form>
  );
};

export default ProductForm;
