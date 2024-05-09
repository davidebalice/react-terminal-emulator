import React, { useState } from "react";
import "./modal.css";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  if (isOpen) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  if (isOpen && !isMounted) {
    setIsMounted(true);
  }
  /*
  const modalStyles: React.CSSProperties = {
    display: isOpen ? "block" : "block",
  };
*/

  const modalStyles: React.CSSProperties = {
    display: isOpen ? "block" : "none",
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`} style={modalStyles}>
      <div className="modalContainer">
        <div className="modalHeader">
          <span className="modalTitle">{title && title}</span>
          <span className="modalClose" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modalContent">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
