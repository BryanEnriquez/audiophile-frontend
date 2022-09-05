import styles from './category.module.scss';

type Props = {
  heading: 'headphones' | 'speakers' | 'earphones';
};

const CategoryBlock = ({ heading }: Props) => (
  <div className={styles.category}>
    <h1>{heading}</h1>
  </div>
);

export default CategoryBlock;
