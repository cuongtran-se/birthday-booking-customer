"use client";
import { APP_CONSTANTS } from "@/enums/app";
import { setPathName } from "@/lib/features/slice/app.slice";
import { loadAuthState } from "@/lib/features/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { FC, ReactNode, useEffect } from "react";

interface AuthGuardProps {
  children: ReactNode;
}
const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    console.log("vô loadAuthState AuthGuard");
    const fetchLoadAuthState = async () => {
      await dispatch(loadAuthState());
    };
    fetchLoadAuthState();
  }, []);
  console.log("vô AuthGuard");
  useEffect(() => {
    const fetchPathName = async () => {
      await dispatch(setPathName(pathName));
    };
    fetchPathName();
  }, [isAuthenticated]);

  // if (!isAuthenticated) {
  //   router.push("/authen");
  // } 
  
  return <>{children}</>;
};

export default AuthGuard;
