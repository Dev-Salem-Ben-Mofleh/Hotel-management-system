import { useQuery } from "@tanstack/react-query";
import { PersonRepository } from "../../../services/Repository/PersonRepository";

export function useGetVisistor(
  personId: number | undefined,
  modalType: string | null,
) {
  const personRepository = new PersonRepository();
  const {
    isLoading,
    data: visitorDetails,
    error,
  } = useQuery({
    queryKey: ["persons", personId],
    queryFn: () => personRepository.getById("FindPerson", personId),
    enabled: !!personId && (modalType === "view" || modalType === "update"),
  });
  return { isLoading, error, visitorDetails };
}
