import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Navbar, Footer } from "@/components";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import StoreProvider from "./StoreProvider";
import MessageProvider from "./MessageProvider";
import AuthProvider from "./AuthProvider";
import { BookingProvider } from "@/context/BookingContext";
import { ConfigProvider } from "antd";
import en_US from "antd/locale/en_US";
import vi_VN from "antd/locale/vi_VN";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Birthday Party Booking for Kids",
  description:
    "Introducing Tailwind Course Landing Page, a versatile and engaging landing page template designed using Tailwind CSS and Material Tailwind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-site="YOUR_DOMAIN_HERE"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        ></script>
        <link rel="shortcut icon" href="/image/icon.png" type="image/png" />
      </head>
      <ThemeProvider theme={theme}>
        <body className={roboto.className}>
          <ConfigProvider locale={vi_VN}>
            <MessageProvider>
              <StoreProvider>
                <AuthProvider>
                  <BookingProvider>
                    <StyledComponentsRegistry>
                      <Navbar />
                      {children}
                      <Footer />
                    </StyledComponentsRegistry>
                  </BookingProvider>
                </AuthProvider>

                {/* <FixedPlugin /> */}
              </StoreProvider>
            </MessageProvider>
          </ConfigProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
