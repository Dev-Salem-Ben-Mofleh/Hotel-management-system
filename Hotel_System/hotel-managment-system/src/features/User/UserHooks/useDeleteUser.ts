import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserRepository } from "../../../services/Repository/UserRepository";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const userRepository = new UserRepository();

  const { isPending: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: async ({ userId }: { userId: number }) => {
      if (!userId) {
        throw new Error("user ID must be provided for deletion.");
      }
      return await userRepository.delete("DeleteUser", userId);
    },
    onSuccess: () => {
      toast.success("User successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      const errorMessage =
        err?.message || "An error occurred while deleting the member.";
      toast.error(`Deletion failed: ${errorMessage}`);
    },
  });

  return { isDeleting, deleteUser };
}
