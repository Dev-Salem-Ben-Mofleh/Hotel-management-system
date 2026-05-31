import { BASE_URL } from "../../utils/constants";
import type { User, UserView } from "../models/User";
import fetchData from "./FetchAPI";
import { GenericRepository } from "./GenericRepository";

export class UserRepository extends GenericRepository<User> {
  constructor(apiUrl: string = `${BASE_URL}/User`) {
    super(apiUrl);
  }

  async getUsersUsingPageNumber(
    pageNumber: number,
    pageSize: number,
    column: string,
    value: string,
    Operations: string
  ): Promise<UserView[]> {
    const allUsers: UserView[] = await fetchData<UserView[]>(
      column !== "" && value !== "" && Operations !== ""
        ? `${this.apiUrl}/UsersUsingPageNumber/${pageNumber}/${pageSize}/${column}/${value}/${Operations}`
        : `${
            this.apiUrl
          }/UsersUsingPageNumber/${pageNumber}/${pageSize}/${null}/${null}/${null}`
    );

    return allUsers;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user: User = await fetchData<User>(
      `${this.apiUrl}/FindUserByEmail/${email}`
    );
    return user;
  }

  async existsUser(id: number): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/ExistsUser/${id}`
    );
    return result;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/ExistsUserByEmail/${email}`
    );
    return result;
  }
}
