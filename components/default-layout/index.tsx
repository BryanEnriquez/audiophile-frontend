import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import useNavHistory from '../../hooks/useNavHistory';
import { CartProvider } from '../../context/cartContext';
import { CartHasLoadedProvider } from '../../context/cartHasLoadedContext';
import { CartPersistProvider } from '../../context/cartPersistContext';
import { ModalRefProvider } from '../../context/modalContext';
import type { Props } from '../../types';

export const DefaultLayout = ({ children }: Props) => {
  useNavHistory();

  return (
    <ModalRefProvider>
      <CartProvider>
        <CartHasLoadedProvider>
          <CartPersistProvider>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </CartPersistProvider>
        </CartHasLoadedProvider>
      </CartProvider>
    </ModalRefProvider>
  );
};
