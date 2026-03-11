import localFont from "next/font/local";

export const sfDisplay = localFont({
  src: [
    {
      path: "../fonts/SF-Pro-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SF-Pro-Display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SF-Pro-Display-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/SF-Pro-Display-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/SF-Pro-Display-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const sfText = localFont({
  src: [
    {
      path: "../fonts/SF-Pro-Text-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SF-Pro-Text-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SF-Pro-Text-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    { path: "../fonts/SF-Pro-Text-Bold.woff2", weight: "700", style: "normal" },
    {
      path: "../fonts/SF-Pro-Text-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-text",
  display: "swap",
});
