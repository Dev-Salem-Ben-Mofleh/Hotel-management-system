import { useQuery } from "@tanstack/react-query";
import { getAllCountreis } from "../services/CountryApi";

export function useCountries() {
  const {
    isLoading,
    data: countries = [],
    error,
  } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: () => getAllCountreis(),
  });
  return { isLoading, error, countries };
}
