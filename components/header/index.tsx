import { useState } from 'react';
import Navbar from '../navbar';
import Modal from '../modal';
import styles from './header.module.scss';
import Cart from '../cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsMenuOpen(false);
  };

  const closeAll = () => {
    setIsCartOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
        setIsMenuOpen={setIsMenuOpen}
        closeAll={closeAll}
      />
      {(isMenuOpen || isCartOpen) && (
        <Modal onBgClick={closeAll}>
          {isCartOpen ? <Cart onNav={() => setIsCartOpen(false)} /> : null}
        </Modal>
      )}
    </header>
  );
};

export default Header;
