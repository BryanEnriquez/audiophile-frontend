import NavbarWrapper from '../navbar-wrapper';
import MaxWidthWrapper from '../max-width-wrapper';
import NavLinks from '../nav-links';
import CategoryImgLinks from '../category-img-links';
import Logo from '../logo';
import { useCartState } from '../../context/cartContext';
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

const Navbar = ({
  isMenuOpen,
  toggleMenu,
  isCartOpen,
  toggleCart,
  setIsMenuOpen,
  closeAll,
}: NavbarProps) => {
  const cart = useCartState();
  const totalItems = Object.values(cart).reduce(
    (count, current) => count + current.quantity,
    0
  );

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
