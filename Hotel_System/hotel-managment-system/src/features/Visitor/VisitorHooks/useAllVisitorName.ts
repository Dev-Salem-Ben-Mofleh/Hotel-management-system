import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { PersonRepository } from "../../../services/Repository/PersonRepository";

export function useAllVisitorName() {
  const personRepository = useMemo(() => new PersonRepository(), []);
  const {
    isLoading,
    data: PersonNames = [],
    error,
  } = useQuery({
    queryKey: ["persons"],
    queryFn: () => personRepository.getAll("AllPeople"),
  });
  return { isLoading, error, PersonNames };
}
