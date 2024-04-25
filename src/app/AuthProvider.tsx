"use client";
import { loadAuthState } from "@/lib/features/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { FC, useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  console.log("isAuthenticated:", isAuthenticated);
  useEffect(() => {
    const fetchLoadAuthState = async () => {
      await dispatch(loadAuthState());
    };
    fetchLoadAuthState();
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
