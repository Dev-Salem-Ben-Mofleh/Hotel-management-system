import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PersonRepository } from "../../../services/Repository/PersonRepository";

export function useDeleteVisitor() {
  const queryClient = useQueryClient();
  const personRepository = new PersonRepository();

  const { isPending: isDeleting, mutate: deleteVisitor } = useMutation({
    mutationFn: async ({ personId }: { personId: number }) => {
      return await personRepository.delete("DeletePerson", personId);
    },
    onSuccess: () => {
      toast.success("Visitor successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["persons"],
      });
    },
    onError: (err) => {
      const errorMessage =
        err?.message || "An error occurred while deleting the member.";
      toast.error(`Deletion failed: ${errorMessage}`);
    },
  });

  return { isDeleting, deleteVisitor };
}
