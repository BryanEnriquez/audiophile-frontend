import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import { CartProvider } from '../../context/cartContext';
import type { Props } from '../../types';

export const DefaultLayout = ({ children }: Props) => {
  return (
    <CartProvider>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </CartProvider>
  );
};
