import { useRouter } from 'next/router';
import styles from './btn.module.scss';

const BackButton = () => {
  const router = useRouter();

  const onClick = () => {
    const storage = window && window.sessionStorage;

    if (!storage) return router.push('/');

    const prevPath = storage.getItem('prevPath');

    if (!prevPath) return router.push('/');

    const currentPath = storage.getItem('currentPath');

    router.push(prevPath === currentPath ? '/' : prevPath);
  };

  return (
    <div className={styles.btnBox}>
      <button type="button" onClick={onClick}>
        Go Back
      </button>
    </div>
  );
};

export default BackButton;
