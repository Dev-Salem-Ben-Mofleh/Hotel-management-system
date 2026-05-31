import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthRepository } from "../../services/Repository/AuthRepository";
import type { CreateOrUpdateUser } from "../../services/models/User";

function useRegister() {
  const _authRepository = new AuthRepository();

  const { mutate: singUp, isPending } = useMutation({
    mutationFn: (newUser: CreateOrUpdateUser) =>
      _authRepository.signUp(newUser),
    onSuccess: (result: string) => {
      toast.success(result);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("we have an account with this email");
    },
  });

  return { isPending, singUp };
}
export default useRegister;
