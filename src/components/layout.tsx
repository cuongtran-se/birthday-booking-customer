"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme";

export function Layout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Layout;
