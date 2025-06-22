import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../services/UserApi";
import type { sessionData } from "../../utils/AllInterfaces";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const savedData = localStorage.getItem("session");
  const SessionData: sessionData = savedData
    ? JSON.parse(savedData)
    : savedData;

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => Logout(SessionData.refreshToken),
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem("session");
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}
