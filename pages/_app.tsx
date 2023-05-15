import type { AppProps } from "next/app";
import Navbar from "@/components/navbar";
import GlobalStyle from "../styles/globals";
import theme from "@/styles/theme";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
