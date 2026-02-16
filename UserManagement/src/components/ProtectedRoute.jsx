import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN IN ProtectedRoute:", localStorage.getItem("token"));
  if (token === null || token === undefined || token === "") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
