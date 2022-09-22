import type { CartItem } from '../../context/cartContext';
import { toUSD } from '../../utils/toUSD';
import styles from './ci.module.scss';

type Props = {
  item: CartItem;
  children?: React.ReactNode;
  imgMin?: boolean;
};

const CartListItem = ({ item, children, imgMin = false }: Props) => (
  <li className={styles.item}>
    <img
      className={`${styles.item__img} ${imgMin ? styles.item__img_min : ''}`}
      src={item.cartImg}
      alt={item.abbrev}
    />
    <div className={styles.item__info}>
      <p>{item.abbrev}</p>
      <p>{toUSD(item.price)}</p>
    </div>
    {children || (
      <span className={styles.item__quantity}>x{item.quantity}</span>
    )}
  </li>
);

export default CartListItem;
