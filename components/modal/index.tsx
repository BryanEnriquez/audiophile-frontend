import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

type Props = {
  hidden: boolean;
  zIndex?: number;
  onBgClick: () => void;
  children?: React.ReactNode;
};

type ModalFC = (props: Props) => JSX.Element | null;

// const Modal = ({ hidden, zIndex = 40, onBgClick, children }: Props) => {
const Modal: ModalFC = ({ hidden, zIndex = 40, onBgClick, children }) => {
  const [modalEl, setModalEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById('modal');
    if (el) setModalEl(el);
  }, []);

  return modalEl
    ? ReactDOM.createPortal(
        <div
          className={`${styles.modal}${
            hidden ? ' ' + styles['modal--hidden'] : ''
          }`}
          onClick={onBgClick}
          style={{ zIndex }}
        >
          {children}
        </div>,
        modalEl
      )
    : null;
};

export default Modal;
