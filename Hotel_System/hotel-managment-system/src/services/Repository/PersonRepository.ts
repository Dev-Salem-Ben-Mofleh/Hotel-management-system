import { BASE_URL } from "../../utils/constants";
import type { Person, PersonView } from "../models/Persons";
import fetchData from "./FetchAPI";
import { GenericRepository } from "./GenericRepository";

export class PersonRepository extends GenericRepository<Person> {
  constructor(apiUrl: string = `${BASE_URL}/People`) {
    super(apiUrl);
  }

  async getPersonsUsingPageNumber(
    pageNumber: number,
    pageSize: number,
    column: string,
    value: string,
    Operations: string
  ): Promise<PersonView[]> {
    const allPersons: PersonView[] = await fetchData<PersonView[]>(
      column !== "" && value !== "" && Operations !== ""
        ? `${this.apiUrl}/PersonsUsingPageNumber/${pageNumber}/${pageSize}/${column}/${value}/${Operations}`
        : `${
            this.apiUrl
          }/PersonsUsingPageNumber/${pageNumber}/${pageSize}/${null}/${null}/${null}`
    );
    return allPersons;
  }

  async findByName(Name: string): Promise<Person> {
    const person: Person = await fetchData<Person>(
      `${this.apiUrl}/FindPersonByName/${Name}`
    );
    return person;
  }

  async existsPerson(id: number): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/ExistsPerson/${id}`
    );
    return result;
  }
}
