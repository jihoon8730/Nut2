import type { AppProps } from "next/app";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globals";
import theme from "@/styles/theme";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
