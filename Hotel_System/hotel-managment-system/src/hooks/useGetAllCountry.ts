import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CountryRepository } from "../services/Repository/CountryRepository";

export function useCountries() {
  const _countryRepository = useMemo(() => new CountryRepository(), []);

  const {
    isLoading,
    data: countries = [],
    error,
  } = useQuery({
    queryKey: ["Countries"],
    queryFn: () => _countryRepository.getAll("AllCountries"),
  });
  return { isLoading, error, countries };
}
