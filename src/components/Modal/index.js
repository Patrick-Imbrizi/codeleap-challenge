import React, { useRef } from "react";
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);

    const handleClick = (event) => {
        if (modalRef.current === event.target) {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            onClick={handleClick}
            className={`${styles.overlay} ${styles.centeredModal}`}
        >
            <div className={styles.modalContent}>
                {children}
            </div>
        </div>
    );
};

export default Modal;