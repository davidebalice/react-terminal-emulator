import React, { useEffect, useRef, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoSave } from "react-icons/io5";
import "./modal.css";
interface ModalProps {
  title: string;
  isOpen: boolean;
  edit: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  edit,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (edit && content === "" && children) {
      const initialValue = componentRef.current?.innerText;
      setContent(initialValue || "");
    }
  }, [edit, content, children]);

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

  const handleContentChange = (event: any) => {
    setContent(event.target.innerText);
  };

  const saveContent = () => {
    // Esegui la logica per inviare il contenuto al backend
    // Puoi utilizzare fetch o una libreria come axios per effettuare una chiamata HTTP
    fetch("url-del-tuo-backend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => {
        // Gestisci la risposta del backend
        console.log("Contenuto salvato con successo:", response);
      })
      .catch((error) => {
        // Gestisci gli errori
        console.error("Errore durante il salvataggio del contenuto:", error);
      });
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`} style={modalStyles}>
      <div className="modalContainer">
        <div className="modalHeader">
          <span className="modalTitle">{title && title}</span>
          <div className="modalButtonContainer">
            {edit && (
              <div onClick={saveContent} className="modalButton">
                <IoSave />
                <span>Save</span>
              </div>
            )}
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
        <div
          className="modalContent"
          ref={componentRef}
          contentEditable={edit}
          onInput={handleContentChange}
        >
          children
        </div>
      </div>
    </div>
  );
};

export default Modal;
