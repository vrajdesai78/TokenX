import { createContext, useContext, useEffect, useState } from "react";

const SnackbarStateContext = createContext();

export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (open === true) {
        setOpen(false);
      }
    }, 2000);
  }, [open]);

  return (
    <SnackbarStateContext.Provider
      value={{ open, setOpen, message, setMessage }}
    >
      {children}
    </SnackbarStateContext.Provider>
  );
}

export function useSnackbarState() {
  const state = useContext(SnackbarStateContext);

  if (state === undefined) {
    throw new Error("useSnackbarState must be used within a SnackbarProvider");
  }

  return state;
}