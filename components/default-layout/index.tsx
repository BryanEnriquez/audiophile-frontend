import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import useNavHistory from '../../hooks/useNavHistory';
import { CartProvider } from '../../context/cartContext';
import type { Props } from '../../types';

export const DefaultLayout = ({ children }: Props) => {
  useNavHistory();

  return (
    <CartProvider>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </CartProvider>
  );
};
