import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Person } from "../../../services/models/Persons";
import { PersonRepository } from "../../../services/Repository/PersonRepository";

export function useAddVisistor() {
  const queryClient = useQueryClient();

  const _personRepository = new PersonRepository();
  const { mutateAsync: AddVisitorAsync, isPending } = useMutation({
    mutationFn: async ({ newVisitor }: { newVisitor: Person }) => {
      return await _personRepository.create("AddPerson", newVisitor);
    },
    onSuccess: (result) => {
      toast.success(`Visitor added successfully with id ${result.personId}`);
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
    onError: (err) => {
      const errorMessage = err?.message || "An error occurred";
      toast.error(`created failed: ${errorMessage}`);
    },
  });

  return { isPending, AddVisitorAsync };
}
