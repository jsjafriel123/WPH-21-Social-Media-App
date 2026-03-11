import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { sfDisplay, sfText } from "@/lib/fonts";
import Providers from "@/components/Providers";
// import FloatingMenu from "@/components/layout/FloatingMenu";
import AuthProvider from "@/components/AuthProvider";
export const metadata: Metadata = {
  title: "Social Media App",
  description: "A social media web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${sfDisplay.variable} ${sfText.variable}`}
    >
      {/* <body className="font-text flex flex-col items-center"> */}
      <body className="font-text">
        <Providers>
          <AuthProvider>{children}</AuthProvider>
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
