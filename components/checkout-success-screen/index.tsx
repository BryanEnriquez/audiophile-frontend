import { useState, useCallback } from 'react';
import { CartItem, useCartDispatch } from '../../context/cartContext';
import { useCartPersistDispatch } from '../../context/cartPersistContext';
import CartListItem from '../cart-item';
import Button from '../button';
import icon from '../../public/images/checkout/icon-order-confirmation.svg';
import styles from './s.module.scss';

type Props = {
  cartItems: CartItem[];
  total: string;
};

const CheckoutSuccessScreen = ({ cartItems, total }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useCartDispatch();
  const setCanPersistCart = useCartPersistDispatch();

  const ref = useCallback(
    (el: HTMLDivElement | null) => {
      setCanPersistCart(false);
      window.localStorage.removeItem('cart');

      if (el === null) {
        setCanPersistCart(true);
        dispatch({ type: 'REMOVE_ALL' });
      }
    },
    [dispatch, setCanPersistCart]
  );

  const [item, ...others] = cartItems;

  return (
    <div className={styles.centerContent}>
      <div ref={ref} className={styles.success}>
        <img src={icon.src} alt="success checkmark" />
        <h2>
          Thank you <span>for your order</span>
        </h2>
        <p>You will receive an email confirmation shortly.</p>
        <div className={styles.success__summary}>
          <div className={styles.success__itemsBox}>
            <ul className={styles.success__itemList}>
              <CartListItem item={item} imgMin />
              {showAll &&
                others.map((el) => (
                  <CartListItem key={el.id} item={el} imgMin />
                ))}
            </ul>
            {others.length > 0 && (
              <div className={styles.success__btnWrapper}>
                <button
                  type="button"
                  className={styles.success__btnShow}
                  onClick={() => setShowAll((x) => !x)}
                >
                  {showAll ? 'View less' : `and ${others.length} other item(s)`}
                </button>
              </div>
            )}
          </div>
          <div className={styles.success__total}>
            <span>GRAND TOTAL</span>
            <span>{total}</span>
          </div>
        </div>
        <Button type="link" href="/" label="Back to home" />
      </div>
    </div>
  );
};

export default CheckoutSuccessScreen;
