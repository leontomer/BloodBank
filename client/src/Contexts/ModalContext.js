import React, { useContext, useState } from "react";

const ModalContext = React.createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const openModal = (title, message) => {
    setTitle(title);
    setMessage(message);
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <ModalContext.Provider
      value={{ isOpenModal, openModal, closeModal, title, message }}
    >
      {children}
    </ModalContext.Provider>
  );
}
