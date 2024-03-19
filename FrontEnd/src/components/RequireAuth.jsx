import React, { useContext, useEffect } from "react";
import { ECommerceContext } from "@/Context/ECommerceContext";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { authenticatedUser } = useContext(ECommerceContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (!authenticatedUser) {
      // Redirect to the login page
      navigate("/login");
    }
  }, [authenticatedUser, navigate]);

  // If the user is authenticated, render the children
  return authenticatedUser ? children : null;
};

export default RequireAuth;
