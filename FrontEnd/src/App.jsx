/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ECommerceContext } from "@/Context/ECommerceContext";
import { ECommerceProvider } from "@/Context/ECommerceProvider";
import ECommerceRoutes from "./components/Routes/ECommerceRoutes";
import Login from "@/components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Productdetail from "./components/Productdetail";
import Loginpage from "./components/pages/Loginpage";
import Topnavbar from "./components/Topnavbar";
import Footer from "./components/Footer";

function App() {
  return (
    <ECommerceProvider>
      <AppContent />
    </ECommerceProvider>
  );
}

function AppContent() {
  const { users, authenticatedUser } = useContext(ECommerceContext);
  const isAdmin = authenticatedUser && authenticatedUser.admin;

  return (
    <div className="flex-col space-y-8">
      <Navbar isAdmin={isAdmin} />
      <ECommerceRoutes />
      <Footer />
    </div>
  );
}

export default App;
