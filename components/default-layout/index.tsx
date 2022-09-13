import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import useNavHistory from '../../hooks/useNavHistory';
import { CartProvider } from '../../context/cartContext';
import { ModalRefProvider } from '../../context/modalContext';
import type { Props } from '../../types';

export const DefaultLayout = ({ children }: Props) => {
  useNavHistory();

  return (
    <ModalRefProvider>
      <CartProvider>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </CartProvider>
    </ModalRefProvider>
  );
};
