import Link from 'next/link';
import styles from './btn.module.scss';

export type ButtonColors = 'orange' | 'black' | 'clear';

type BaseButton = {
  label?: string;
  color?: ButtonColors;
  min?: boolean;
};

type LinkType = BaseButton & {
  type: 'link';
  href: string;
};

type ButtonType = BaseButton & {
  type: 'button';
  href?: undefined;
};

type SubmitType = BaseButton & {
  type: 'submit';
  href?: undefined;
};

type Props = LinkType | ButtonType | SubmitType;

const addMin = (s: string) => `${s} ${styles['btn--min']}`;

const Button = ({
  type,
  href,
  min = false,
  label = 'See product',
  color = 'orange',
}: Props) => {
  let classes = `${styles.btn} ${styles[`btn--${color}`]}`;

  if (type === 'link') {
    return (
      <Link href={href}>
        <a className={addMin(classes)}>{label}</a>
      </Link>
    );
  }

  return (
    <button type={type} className={min ? addMin(classes) : classes}>
      {label}
    </button>
  );
};

export default Button;
