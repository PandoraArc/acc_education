import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Inteligrade",
  description: "Inteligrade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
