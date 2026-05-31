import type { Country } from "./Country";
export interface PersonView {
  personId: number;
  countryDto: Country;
  fullName: string;
  gender: string;
  birthDate: Date;
  phone: string;
  nationalityCountryId: number;
}

export interface Person {
  personId: number | undefined;
  fullName: string;
  gender: string;
  birthDate: string;
  phone: string;
  nationalityCountryId: number;
}
