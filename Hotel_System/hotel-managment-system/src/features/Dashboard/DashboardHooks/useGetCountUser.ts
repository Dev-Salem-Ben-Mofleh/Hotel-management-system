import { useQuery } from "@tanstack/react-query";
import { UserRepository } from "../../../services/Repository/UserRepository";

export function useGetCountUser() {
  const userRepository = new UserRepository();

  const {
    isLoading,
    data: countUser,
    error,
  } = useQuery({
    queryKey: ["countUser"],
    queryFn: () => userRepository.count("CountUsers", "", "", ""),
  });

  return { isLoading, error, countUser };
}
