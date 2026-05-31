import { useNavigate } from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import type { sessionData } from "../services/models/Auth";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const curruentSessoinjson = localStorage.getItem("session1") || "";
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
    console.log("Rendering null because no current session is available.");
    return null;
  }

  return children;
}

export default ProtectedRoute;
