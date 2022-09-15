import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { useModalRef } from '../../context/modalContext';
import styles from './modal.module.scss';

type Props = {
  zIndex?: number;
  onBgClick: () => void;
  children?: React.ReactNode;
};

const Modal = ({ zIndex = 40, onBgClick, children }: Props) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRef = useModalRef();

  useEffect(() => {
    const el = document.body;
    if (el) {
      el.classList.add('no-scroll');
      return () => el.classList.remove('no-scroll');
    }
  }, []);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === bgRef.current || e.target === contentRef.current) {
      onBgClick();
    }
  };

  return modalRef
    ? ReactDOM.createPortal(
        <div
          ref={bgRef}
          className={`${styles.modal} pad`}
          onClick={onClick}
          style={{ zIndex }}
        >
          <div ref={contentRef} className={styles.modal__content}>
            {children}
          </div>
        </div>,
        modalRef
      )
    : null;
};

export default Modal;
