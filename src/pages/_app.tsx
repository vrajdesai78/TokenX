import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "animate.css/animate.min.css";
import { config, ethereumClient } from "@/utils/wagmi";
import { WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";
import { SnackbarProvider } from "@/context/snackbar";
import UnstyledSnackbarIntroduction from "@/components/snackbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <WagmiConfig config={config}>
      <SnackbarProvider>
        <Component {...pageProps} />
        <UnstyledSnackbarIntroduction />
        </SnackbarProvider>
      </WagmiConfig>
      <Web3Modal
        projectId={"33e28c5d43009b3668cccf62984e6dbe"}
        ethereumClient={ethereumClient}
      />
    </ThemeProvider>
  );
}
