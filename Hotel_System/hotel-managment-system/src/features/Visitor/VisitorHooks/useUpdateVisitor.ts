import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Person } from "../../../services/models/Persons";
import { PersonRepository } from "../../../services/Repository/PersonRepository";

export function useUpdateVisitor() {
  const queryClient = useQueryClient();

  const personRepository = new PersonRepository();
  const { mutateAsync: UpdateVisitorAsync, isPending } = useMutation({
    mutationFn: async ({
      personId,
      updateVisitor,
    }: {
      personId: number;
      updateVisitor: Person;
    }) => {
      return await personRepository.update(
        "UpdatePerson",
        personId,
        updateVisitor
      );
    },
    onSuccess: (result) => {
      toast.success(`Visitor updated successfully with id ${result.personId}`);
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
    onError: (err) => {
      const errorMessage = err?.message || "An error occurred";
      toast.error(`update failed: ${errorMessage}`);
    },
  });

  return { isPending, UpdateVisitorAsync };
}
