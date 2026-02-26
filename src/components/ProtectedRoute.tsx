import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  // ✅ Get username or token from localStorage
  const user = localStorage.getItem("username");

  if (!user) {
    // Redirect to login page if not logged in
    return <Navigate to="/" replace />;
  }

  // User is logged in → allow access
  return <>{children}</>;
};

export default ProtectedRoute;