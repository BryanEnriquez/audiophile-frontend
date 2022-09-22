import { NextPage } from 'next';
import ContentSidePadding from '../components/content-side-padding';
import MaxWidthWrapper from '../components/max-width-wrapper';
import BackButton from '../components/back-button';
import CheckoutForm from '../components/checkout-form';
import styles from '../styles/pages/checkout/c.module.scss';
import Head from 'next/head';

const CheckoutPage: NextPage = () => {
  return (
    <ContentSidePadding>
      <MaxWidthWrapper>
        <Head>
          <title>Audiophile - Checkout</title>
        </Head>
        <BackButton min />
        <div className={styles.checkout}>
          <CheckoutForm />
        </div>
      </MaxWidthWrapper>
    </ContentSidePadding>
  );
};

export default CheckoutPage;
