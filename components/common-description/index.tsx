import Picture from '../picture';
import imgS from '../../public/images/shared/mobile/best-gear-s.jpg';
import imgM from '../../public/images/shared/tablet/best-gear-m.jpg';
import imgL from '../../public/images/shared/desktop/best-gear-l.jpg';
import styles from './desc.module.scss';

const description =
  'Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.';

const CommonDescription = () => {
  return (
    <div className={styles.desc}>
      <div className={styles.desc__img}>
        <Picture
          s={imgS.src}
          m={imgM.src}
          l={imgL.src}
          alt="person wearing headphones"
        />
      </div>
      <div className={styles.desc__txt}>
        <h2>
          Bringing you the<span>{' best '}</span>audio gear
        </h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CommonDescription;
