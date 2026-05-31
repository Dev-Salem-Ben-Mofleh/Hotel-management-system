import { BASE_URL } from "../../utils/constants";
import { GenericRepository } from "./GenericRepository";
import type { Country } from "../models/Country";

export class CountryRepository extends GenericRepository<Country> {
  constructor(apiUrl: string = `${BASE_URL}/Countries`) {
    super(apiUrl);
  }
}
