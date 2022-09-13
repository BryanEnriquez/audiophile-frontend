import Link from 'next/link';
import { navLinks } from '../../data/navLinks';
import styles from './category-links.module.scss';

type Props = {
  padTop?: boolean;
  onClick?: () => void;
};

const CategoryImgLinks = ({ padTop = false, onClick }: Props) => {
  return (
    <ul
      className={`${styles.categoryLinks}${
        padTop ? ' ' + styles['categoryLinks--pad'] : ''
      }`}
    >
      {navLinks.slice(1).map((el) => (
        <li key={el.label}>
          <Link href={el.href}>
            <a {...(onClick && { onClick })}>
              <img
                src={el.thumbnail}
                loading="lazy"
                alt={`${el.label} category page`}
                style={{
                  top: el.top,
                }}
              />
              <div className={styles.categoryLinks__txt}>
                <p>{el.label}</p>
                <p>
                  <span>SHOP</span>
                </p>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryImgLinks;
