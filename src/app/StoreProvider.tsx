"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

export interface StoreProviderP {
  children: React.ReactNode;
}
const StoreProvider: React.FC<StoreProviderP> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
