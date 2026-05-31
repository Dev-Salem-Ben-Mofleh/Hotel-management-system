import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserRepository } from "../../../services/Repository/UserRepository";
import type { User } from "../../../services/models/User";
import { PersonRepository } from "../../../services/Repository/PersonRepository";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const userRepository = new UserRepository();
  const personRepository = new PersonRepository();
  const { mutateAsync: UpdateUserAsync, isPending } = useMutation({
    mutationFn: async ({
      userId,
      updateUser,
    }: {
      userId: number;
      updateUser: User;
    }) => {
      await personRepository.update(
        "UpdatePerson",
        updateUser.personId,
        updateUser.personDto
      );
      return await userRepository.update("UpdateUser", userId, updateUser);
    },
    onSuccess: (result) => {
      toast.success(`User updated successfully with id ${result.userId}`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      const errorMessage = err?.message || "An error occurred";
      toast.error(`update failed: ${errorMessage}`);
    },
  });

  return { isPending, UpdateUserAsync };
}
