import React, { useRef, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import "./modal.css";
interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  if (isOpen) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  if (isOpen && !isMounted) {
    setIsMounted(true);
  }

  const modalStyles: React.CSSProperties = {
    display: isOpen ? "block" : "none",
  };

  const handleCopy = async () => {
    if (componentRef.current) {
      const range = document.createRange();
      range.selectNode(componentRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand("copy");
      selection?.removeAllRanges();
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`} style={modalStyles}>
      <div className="modalContainer">
        <div className="modalHeader">
          <span className="modalTitle">{title && title}</span>
          <div className="modalButtonContainer">
            <div onClick={handleCopy} className="modalButton">
              <IoCopyOutline />
              <span>Copy</span>
            </div>
            <div onClick={onClose} className="modalButton">
              <span className="modalClose" onClick={onClose}>
                &times;
              </span>
              <span>Close</span>
            </div>
          </div>
        </div>
        <div className="modalContent" ref={componentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
