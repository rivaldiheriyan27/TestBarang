import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const auth = localStorage.getItem("accesToken");

  if (!auth) return <Navigate to={"/"} />;

  return <Outlet />;
};
