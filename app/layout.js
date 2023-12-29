import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "React Query Course",
  description: "Implementing what I'm learning about RQ ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
