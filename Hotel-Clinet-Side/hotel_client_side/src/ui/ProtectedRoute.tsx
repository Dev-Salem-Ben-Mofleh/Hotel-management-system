import { useNavigate } from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import type { sessionData } from "../utils/AllInterfaces";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const curruentSessoinjson = localStorage.getItem("session") || "";
  let curruentSessoin: sessionData | undefined;
  if (curruentSessoinjson) {
    curruentSessoin = JSON.parse(curruentSessoinjson);
  }

  useEffect(() => {
    if (!curruentSessoin) {
      navigate("/login");
    }
  }, [curruentSessoin, navigate]);

  if (!curruentSessoin) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
