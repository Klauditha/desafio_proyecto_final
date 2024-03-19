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

/* function App() {
  const { users } = useContext(ECommerceContext);
  const isAdmin = users.some((user) => user.admin === true);
  
  return (
    <ECommerceProvider>
      <div className="flex-col space-y-8">
        <Navbar isAdmin={isAdmin} />
        <ECommerceRoutes />
      </div>
    </ECommerceProvider>
  );
} */

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
    </div>
  );
}

export default App;
