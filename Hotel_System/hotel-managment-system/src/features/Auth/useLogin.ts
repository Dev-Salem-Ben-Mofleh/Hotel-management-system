import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthRepository } from "../../services/Repository/AuthRepository";
import { UserRepository } from "../../services/Repository/UserRepository";
import type { User } from "../../services/models/User";
import type { Login } from "../../services/models/Auth";

function useLogin() {
  const navigate = useNavigate();

  const _authRepository = new AuthRepository();
  const _userRepository = new UserRepository();

  const { mutate: Login, isPending } = useMutation({
    mutationFn: async ({ email, password }: Login) => {
      const user: User = await _userRepository.getUserByEmail(email);

      const allowedRoles = ["Admin", "Employee"];

      if (!allowedRoles.includes(user.role)) {
        throw new Error("ACCESS_DENIED");
      }

      const session = await _authRepository.login({
        email,
        password,
      });

      return {
        session,
        user,
      };
    },

    onSuccess: ({ session, user }) => {
      localStorage.setItem("user", JSON.stringify(user));

      localStorage.setItem("session1", JSON.stringify(session));

      toast.success("Login successful");

      navigate("/", {
        replace: true,
      });
    },

    onError: (err) => {
      console.log("ERROR", err);

      if (err instanceof Error && err.message === "ACCESS_DENIED") {
        toast.error("You are not allowed to access this system");

        return;
      }

      toast.error("Provided email or password are incorrect");
    },
  });

  return {
    isPending,
    Login,
  };
}

export default useLogin;
