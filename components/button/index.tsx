import Link from 'next/link';
import styles from './btn.module.scss';

export type ButtonColors = 'orange' | 'black' | 'clear';

type BaseButton = {
  label?: string;
  color?: ButtonColors;
};

type LinkType = BaseButton & {
  type: 'link';
  href: string;
};

type ButtonType = BaseButton & {
  type: 'btn';
  href: undefined;
};

type Props = LinkType | ButtonType;

const Button = ({
  type,
  href,
  label = 'See product',
  color = 'orange',
}: Props) => {
  let classes = `${styles.btn} ${styles[`btn--${color}`]}`;

  if (type === 'link') {
    classes += ` ${styles['btn--min']}`;

    return (
      <Link href={href}>
        <a className={classes}>{label}</a>
      </Link>
    );
  }

  return (
    <button type="button" className={classes}>
      {label}
    </button>
  );
};

export default Button;
