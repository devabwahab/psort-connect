import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingSocialSidebar from "./FloatingSocialSidebar";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <FloatingSocialSidebar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
