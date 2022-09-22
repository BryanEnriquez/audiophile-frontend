import Link from 'next/link';
import styles from './btn.module.scss';

export type ButtonColors = 'orange' | 'black' | 'clear';

type BaseButton = {
  label?: string;
  color?: ButtonColors;
  min?: boolean;
  onClick?: () => void;
};

type LinkType = BaseButton & {
  type: 'link';
  href: string;
  disabled?: undefined;
};

type ButtonType = BaseButton & {
  type: 'button';
  href?: undefined;
  disabled?: boolean;
};

type SubmitType = BaseButton & {
  type: 'submit';
  href?: undefined;
  disabled?: boolean;
};

type Props = LinkType | ButtonType | SubmitType;

const Button = ({
  type,
  href,
  min = false,
  label = 'See product',
  color = 'orange',
  onClick,
  disabled = false,
}: Props) => {
  const attributes: { className: string; onClick?: () => void } = {
    className: `${styles.btn} ${styles[`btn--${color}`]}${
      min ? ' ' + styles['btn--min'] : ''
    }`,
  };

  if (onClick) attributes.onClick = onClick;

  return type === 'link' ? (
    <Link href={href}>
      <a {...attributes}>{label}</a>
    </Link>
  ) : (
    <button {...attributes} type={type} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
