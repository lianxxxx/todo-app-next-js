import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-josefin",
});

export const metadata = {
  title: "Todo App",
  description: "NextJs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.variable}  antialiased `}>{children}</body>
    </html>
  );
}
