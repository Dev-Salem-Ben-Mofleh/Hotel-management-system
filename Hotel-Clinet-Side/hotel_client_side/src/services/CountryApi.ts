import type { CountryDto } from "../utils/AllInterfaces";
import { BASE_URL } from "../utils/constants";
import fetchData from "./Fetch";

export async function getAllCountreis() {
  const data = await fetchData<CountryDto[]>(
    `${BASE_URL}countries/AllCountries`
  );
  return data;
}
