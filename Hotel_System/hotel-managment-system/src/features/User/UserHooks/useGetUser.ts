import { useQuery } from "@tanstack/react-query";
import { UserRepository } from "../../../services/Repository/UserRepository";

export function useGetUser(userId: number, modalType: string | null) {
  const userRepository = new UserRepository();
  const {
    isLoading,
    data: userDetails,
    error,
  } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => userRepository.getById("FindUser", userId),
    enabled:
      !!userId && (modalType === "viewUser" || modalType === "updateUser"),
  });
  return { isLoading, error, userDetails };
}
