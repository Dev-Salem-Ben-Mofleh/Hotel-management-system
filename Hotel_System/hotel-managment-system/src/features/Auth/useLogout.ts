import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthRepository } from "../../services/Repository/AuthRepository";
import type { sessionData } from "../../services/models/Auth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const _authRepository = new AuthRepository();

  const savedData = localStorage.getItem("session1");
  const SessionData: sessionData = savedData
    ? JSON.parse(savedData)
    : savedData;

  const logoutData = {
    refreshToken: SessionData.refreshToken,
  };

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => _authRepository.logOut(logoutData),
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem("user");
      localStorage.removeItem("session1");
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}
