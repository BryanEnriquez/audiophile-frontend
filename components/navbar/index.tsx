import { useEffect } from 'react';
import NavbarWrapper from '../navbar-wrapper';
import MaxWidthWrapper from '../max-width-wrapper';
import NavLinks from '../nav-links';
import CategoryImgLinks from '../category-img-links';
import Logo from '../logo';
import {
  CartState,
  useCartDispatch,
  useCartState,
} from '../../context/cartContext';
import { useCartLoadDispatch } from '../../context/cartHasLoadedContext';
import { useCartPersist } from '../../context/cartPersistContext';
import menuIcon from '../../public/images/shared/tablet/icon-hamburger.svg';
import cartIcon from '../../public/images/shared/desktop/icon-cart.svg';
import styles from './nav.module.scss';

type NavbarProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  setIsMenuOpen: (prevStateVal: boolean) => void;
  closeAll: () => void;
};

type ButtonProps = {
  text: string;
  cb: () => void;
  mod: string;
  img: any;
  imgAlt: string;
  children?: React.ReactNode;
};

const NavButton = ({ text, cb, mod, img, imgAlt, children }: ButtonProps) => (
  <button
    type="button"
    onClick={cb}
    className={`${styles.nav__btn} ${styles[`nav__btn--${mod}`]}`}
  >
    <span className={styles.nav__btnTxt}>{text}</span>
    {children}
    <img src={img.src} alt={imgAlt} aria-hidden={true} />
  </button>
);

function persistCart(cart: CartState) {
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

const Navbar = ({
  isMenuOpen,
  toggleMenu,
  isCartOpen,
  toggleCart,
  setIsMenuOpen,
  closeAll,
}: NavbarProps) => {
  const cart = useCartState();
  const cartStateDispatch = useCartDispatch();
  const cartLoadDispatch = useCartLoadDispatch();
  const canPersistCart = useCartPersist();

  const totalItems = Object.values(cart).reduce(
    (count, current) => count + current.quantity,
    0
  );

  useEffect(() => {
    // Cart persist
    const storage = window && window.localStorage;

    if (!storage) return;

    if (typeof document.hidden !== undefined) {
      const visibilityHandler = () => {
        if (canPersistCart && document.visibilityState === 'hidden')
          persistCart(cart);
      };

      document.addEventListener('visibilitychange', visibilityHandler);

      return () =>
        document.removeEventListener('visibilitychange', visibilityHandler);
    } else {
      const pagehideHandler = (e: PageTransitionEvent) => {
        if (canPersistCart && !e.persisted) persistCart(cart);
      };

      window.addEventListener('pagehide', pagehideHandler);

      return () => window.removeEventListener('pagehide', pagehideHandler);
    }
  }, [cart, canPersistCart]);

  useEffect(() => {
    // Cart loading
    const storage = window && window.localStorage;

    if (storage) {
      const prevCart = storage.getItem('cart');

      cartLoadDispatch(true);

      if (prevCart) {
        const payload: CartState = JSON.parse(prevCart);

        if (Object.keys(payload).length) {
          cartStateDispatch({ type: 'RESTORE', payload });
        }
      }
    }
  }, [cartStateDispatch, cartLoadDispatch]);

  return (
    <NavbarWrapper>
      <nav className={styles.nav}>
        <NavButton
          text={`${isMenuOpen ? 'Close' : 'Open'} menu`}
          mod="menu"
          cb={toggleMenu}
          img={menuIcon}
          imgAlt="menu icon"
        />
        <Logo header={true} onClick={closeAll} />
        <NavLinks onNav={closeAll} />
        <div className={styles.nav__btnBox}>
          <NavButton
            text={`${isCartOpen ? 'Close' : 'Open'} shopping cart`}
            mod="cart"
            cb={toggleCart}
            img={cartIcon}
            imgAlt="cart icon"
          />
          <span className={styles.nav__cartCount}>{totalItems}</span>
        </div>
      </nav>
      <nav
        className={`${styles.navImgLinks}${
          isMenuOpen ? ' ' + styles['navImgLinks--open'] : ''
        }`}
      >
        <div>
          <MaxWidthWrapper>
            <CategoryImgLinks onClick={() => setIsMenuOpen(false)} />
          </MaxWidthWrapper>
        </div>
      </nav>
    </NavbarWrapper>
  );
};

export default Navbar;
