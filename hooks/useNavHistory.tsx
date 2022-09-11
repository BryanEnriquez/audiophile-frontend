import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useNavHistory = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    // Credit: https://www.grouparoo.com/blog/getting-previous-path-nextjs
    const storage = window && window.sessionStorage;

    if (!storage) return;

    const prevPath = storage.getItem('currentPath');

    if (prevPath) storage.setItem('prevPath', prevPath);

    storage.setItem('currentPath', window.location.pathname);
  }, [asPath]);
};

export default useNavHistory;
