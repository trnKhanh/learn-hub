"use client";

import { checkAuth } from "@/actions/auth";
import { MenuNavbar } from "@/components/menu-navbar";
import NavbarItem from "@/components/navbar-item";
import { Button } from "@/components/ui/button";
import UserNavbar from "@/components/user-navbar";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    checkAuth().then((res)=>{
      if (res && res.status != 401)
        setAuth(true);
    })
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
