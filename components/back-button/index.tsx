import { useRouter } from 'next/router';
import styles from './btn.module.scss';

type Props = {
  min?: boolean;
};

const BackButton = ({ min = false }: Props) => {
  const router = useRouter();

  const onClick = () => {
    const storage = window && window.sessionStorage;

    if (!storage) return router.push('/');

    const prevPath = storage.getItem('prevPath');

    if (!prevPath) return router.push('/');

    const currentPath = storage.getItem('currentPath');

    router.push(prevPath === currentPath ? '/' : prevPath);
  };

  let cn = styles.btnBox;
  if (min) cn += ` ${styles.btnBox_min}`;

  return (
    <div className={cn}>
      <button type="button" onClick={onClick}>
        Go Back
      </button>
    </div>
  );
};

export default BackButton;
