import ReactDOM from 'react-dom';
import { useModalRef } from '../../context/modalContext';
import styles from './modal.module.scss';

type Props = {
  hidden: boolean;
  zIndex?: number;
  onBgClick: () => void;
  children?: React.ReactNode;
};

const Modal = ({ hidden, zIndex = 40, onBgClick, children }: Props) => {
  const modalRef = useModalRef();

  return modalRef
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
        modalRef
      )
    : null;
};

export default Modal;
