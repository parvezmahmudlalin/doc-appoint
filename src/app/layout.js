import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

 const inter = Inter({
  subsets: ["latin"]
 })

export const metadata = {
  title: "DocAppoint",
  description: "Book Doctors, Save Time",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" data-theme = "light"
      className={`${inter.className}  h-full antialiased`}
    >
      <body className={` min-h-full flex flex-col`}>
        <Navbar/>
        <main>
          {children}
        </main>
        <Footer/>
         <Toaster position="top-center" />
      </body>
    </html>
  );
}

