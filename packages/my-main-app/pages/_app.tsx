import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Script from "next/script";
import { ZafProvider } from "../hooks/useZaf";
import { useState } from "react";

type ZafWindowClient = typeof window.ZAFClient;
type ZafClient = ReturnType<ZafWindowClient["init"]>;

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [zafClient, setZafClient] = useState<ZafClient | null>(null);

  const handleClientLoaded = () => {
    if (typeof window !== "undefined") {
      const zaf = window.ZAFClient.init();
      setZafClient(zaf);
    }
  };

  return (
    <>
      <Head>
        <title>Page title</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Script
        src="https://static.zdassets.com/zendesk_app_framework_sdk/2.0/zaf_sdk.min.js"
        onLoad={handleClientLoaded}
        onError={(e) => console.error(e)}
      />

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <ZafProvider zafClient={zafClient}>
          <Component {...pageProps} />
        </ZafProvider>
      </MantineProvider>
    </>
  );
}
