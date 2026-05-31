import { useQuery } from "@tanstack/react-query";
import { UserRepository } from "../../services/Repository/UserRepository";

interface Session {
  userId: number;
}

function useCurrentUser() {
  const currentSessionJson = localStorage.getItem("user");

  const currentSession: Session | null = currentSessionJson
    ? JSON.parse(currentSessionJson)
    : null;

  const userRepository = new UserRepository();

  const {
    isLoading,
    error,
    data: currentUser,
  } = useQuery({
    queryKey: ["currentUser", currentSession?.userId],
    queryFn: () => userRepository.getById("FindUser", currentSession!.userId),
    enabled: !!currentSession?.userId,
  });

  return { isLoading, error, currentUser };
}

export default useCurrentUser;
