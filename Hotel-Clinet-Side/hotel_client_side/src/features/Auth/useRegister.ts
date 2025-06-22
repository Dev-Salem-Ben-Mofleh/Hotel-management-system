import { useMutation } from "@tanstack/react-query";
import { registerNewUser } from "../../services/UserApi";
import type { CreatePersonDto, CreateUserDto } from "../../utils/AllInterfaces";
import toast from "react-hot-toast";

type userObjects = {
  newUser: CreateUserDto;
  newPerson: CreatePersonDto;
};

function usRegister() {
  const { mutate: singUp, isPending } = useMutation({
    mutationFn: ({ newUser, newPerson }: userObjects) =>
      registerNewUser(newUser, newPerson),
    onSuccess: (result) => {
      toast.success(result);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("we have an account with this email");
    },
  });

  return { isPending, singUp };
}
export default usRegister;
