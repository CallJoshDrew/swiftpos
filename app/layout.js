import { Roboto } from "next/font/google";
import "./globals.css";
import SideNav from "./components/sideNav";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "SwiftPro",
  description: "POS System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="bg-white min-h-screen flex">
          <Toaster position="top-center" reverseOrder={false} />
          <SideNav />
          {children}
          {/* <div className="row-span-1 col-span-7 bg-pink-300">Footer</div>    */}
        </div>
      </body>
    </html>
  );
}
