import Button from '../button';
import QuantityInput from '../quantity-input';
import { useCartState, useCartDispatch } from '../../context/cartContext';
import { toUSD } from '../../utils/toUSD';
import styles from './cart.module.scss';

type Props = {
  onNav: () => void;
};

const Cart = ({ onNav }: Props) => {
  const cart = useCartState();
  const dispatch = useCartDispatch();
  const items = Object.values(cart);

  let total = 0;
  let itemCount = 0;

  const renderedListItems = items.map((el) => {
    itemCount += el.quantity;
    total += el.price * el.quantity;

    return (
      <li key={el.id}>
        <img src={el.cartImg} alt={el.abbrev} />
        <div className={styles.cart__itemInfo}>
          <p>{el.abbrev}</p>
          <p>{toUSD(el.price)}</p>
        </div>
        <QuantityInput
          type="reg"
          value={el.quantity}
          onDec={() => dispatch({ type: 'DECREMENT', payload: el.id })}
          onInc={() => dispatch({ type: 'INCREMENT', payload: el.id })}
        />
      </li>
    );
  });

  return (
    <div className={styles.cart}>
      <span className={styles.cart__count}>{`CART (${itemCount})`}</span>
      <button
        type="button"
        className={styles.cart__removeBtn}
        onClick={() => dispatch({ type: 'REMOVE_ALL' })}
      >
        Remove all
      </button>
      <ul className={styles.cart__items}>{renderedListItems}</ul>
      <p className={styles.cart__total}>
        TOTAL
        <span>{toUSD(total)}</span>
      </p>
      <Button type="link" href="/checkout" onClick={onNav} label="Checkout" />
    </div>
  );
};

export default Cart;
