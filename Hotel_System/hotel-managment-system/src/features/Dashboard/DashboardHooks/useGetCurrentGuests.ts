import { useQuery } from "@tanstack/react-query";
import { PersonRepository } from "../../../services/Repository/PersonRepository";

export function useGetCurrentGuests() {
  const personRepository = new PersonRepository();

  const {
    isLoading,
    data: countPerson,
    error,
  } = useQuery({
    queryKey: ["countPerson"],
    queryFn: () => personRepository.count("CountPersons", "", "", ""),
  });

  return { isLoading, error, countPerson };
}
