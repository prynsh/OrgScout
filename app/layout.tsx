import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";


export const metadata: Metadata = {
  title: "OrgScout",
  description: "Your GSOC Atlas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body style={{ fontFamily: 'Bungee, sans-serif' }}>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
