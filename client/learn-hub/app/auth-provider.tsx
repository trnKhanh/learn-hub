"use client";

import { checkAuth } from "@/actions/auth";
import { createContext, useEffect, useState } from "react";

interface AppContextProps {
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  newCart: boolean;
  setNewCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({
  isAuth: false,
  setAuth: () => {},
  newCart: false,
  setNewCart: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuth, setAuth] = useState(false);
  const [newCart, setNewCart] = useState(false);
  useEffect(() => {
    checkAuth().then((res) => {
      if (res && res.status != 401) setAuth(true);
    });
  }, []);

  return (
    <AppContext.Provider value={{ isAuth, setAuth, newCart, setNewCart }}>
      {children}
    </AppContext.Provider>
  );
};
