import NavbarWrapper from '../navbar-wrapper';
import NavLinks from '../nav-links';
import Logo from '../logo';
import CategoryImgLinks from '../category-img-links';

import menuIcon from '../../public/images/shared/tablet/icon-hamburger.svg';
import cartIcon from '../../public/images/shared/desktop/icon-cart.svg';
import styles from './navbar.module.scss';
import Wrapper from '../wrapper';

type NavbarProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  setIsMenuOpen: (prevStateVal: boolean) => void;
};

const Navbar = ({
  isMenuOpen,
  toggleMenu,
  isCartOpen,
  toggleCart,
  setIsMenuOpen,
}: NavbarProps) => {
  return (
    <NavbarWrapper>
      <nav className={styles.navbar}>
        <button
          type="button"
          onClick={toggleMenu}
          className={styles['menu-btn']}
        >
          <span>{`${isMenuOpen ? 'Close' : 'Open'} menu`}</span>
          <img src={menuIcon.src} alt="menu icon" aria-hidden={true} />
        </button>
        <Logo header={true} onClick={() => setIsMenuOpen(false)} />
        <NavLinks />
        <button
          type="button"
          onClick={toggleCart}
          className={styles['cart-btn']}
        >
          <span>{`${isCartOpen ? 'Close' : 'Open'} shopping cart`}</span>
          <img src={cartIcon.src} alt="cart icon" aria-hidden={true} />
        </button>
      </nav>
      <nav
        className={`${styles.navImgLinks}${
          isMenuOpen ? ' ' + styles['navImgLinks--open'] : ''
        }`}
      >
        <div>
          <Wrapper>
            <CategoryImgLinks />
          </Wrapper>
        </div>
      </nav>
    </NavbarWrapper>
  );
};

export default Navbar;
