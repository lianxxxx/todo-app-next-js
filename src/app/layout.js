import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Todo App",
  description: "NextJs",
  icons: {
    icon: "/icon-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className}  antialiased  bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
