import { useState } from 'react';
import Navbar from '../navbar';
import Modal from '../modal';
import styles from './header.module.scss';

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

  return (
    <header className={styles.header}>
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
        setIsMenuOpen={setIsMenuOpen}
      />
      <Modal
        hidden={!isMenuOpen && !isCartOpen}
        onBgClick={() => {
          setIsCartOpen(false);
          setIsMenuOpen(false);
        }}
      />
    </header>
  );
};

export default Header;
