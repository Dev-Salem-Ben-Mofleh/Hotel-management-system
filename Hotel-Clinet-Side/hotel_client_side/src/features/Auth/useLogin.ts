import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, login } from "../../services/UserApi";
import type { LoginValues } from "../../utils/AllInterfaces";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: Login, isPending } = useMutation({
    mutationFn: async ({ email, password }: LoginValues) => {
      const user = await getUserByEmail(email);
      localStorage.setItem("user", JSON.stringify(user));
      return login(email, password);
    },
    onSuccess: (result) => {
      if (result) {
        localStorage.setItem("session", JSON.stringify(result));
        navigate("/", { replace: true });
      }
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { isPending, Login };
}

export default useLogin;
