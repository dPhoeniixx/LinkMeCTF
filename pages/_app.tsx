import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";

import "@/styles/globals.css";
import { useEffect, useState } from "react";

function useUserInfo() {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = localStorage.getItem("userInfo");

    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  return [userInfo, setUserInfo];
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
