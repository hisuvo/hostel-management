import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex-grow mt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
