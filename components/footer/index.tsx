import MaxWidthWrapper from '../max-width-wrapper';
import Logo from '../logo';
import NavLinks from '../nav-links';
import Socials from '../socials';
import styles from './footer.module.scss';

const footerCopy = {
  about:
    "Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we're open 7 days a week.",
  copyright: 'Copyright 2021. All Rights Reserved',
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <MaxWidthWrapper>
        <div className={styles.footer__highlight} />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className={styles.footer__links}>
          <Logo />
          <NavLinks type="footer" />
        </div>
        <div className={styles.footer__copy}>
          <p className={styles.footer__about}>{footerCopy.about}</p>
          <p className={styles.footer__copyright}>{footerCopy.copyright}</p>
          <div className={styles['footer__socials-wrapper']}>
            <Socials />
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
