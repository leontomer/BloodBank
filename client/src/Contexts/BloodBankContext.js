import React from "react";
import { ModalProvider } from "./ModalContext";
import { LoaderProvider } from "./LoaderContext";
const BloodBankContext = React.createContext();

export function BloodBankProvider({ children }) {
  return (
    <BloodBankContext.Provider>
      <ModalProvider>
        <LoaderProvider>{children}</LoaderProvider>
      </ModalProvider>
    </BloodBankContext.Provider>
  );
}
