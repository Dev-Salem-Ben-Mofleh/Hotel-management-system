import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserRepository } from "../../../services/Repository/UserRepository";
import type { User } from "../../../services/models/User";
import { PersonRepository } from "../../../services/Repository/PersonRepository";

function useAddUser() {
  const queryClient = useQueryClient();

  const userRepository = new UserRepository();
  const personRepository = new PersonRepository();

  const { mutateAsync: AddUserAsync, isPending } = useMutation({
    mutationFn: async ({ newUser }: { newUser: User }) => {
      const person = await personRepository.create(
        "AddPerson",
        newUser.personDto
      );
      const userToCreate: User = {
        ...newUser,
        personId: person.personId,
      };
      return await userRepository.create("AddUser", userToCreate);
    },
    onSuccess: (result: User) => {
      toast.success(`User added successfully with id ${result.userId}`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("we have an account with this email");
    },
  });
  return { isPending, AddUserAsync };
}
export default useAddUser;
