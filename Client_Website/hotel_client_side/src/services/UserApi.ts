import type {
  CreatePersonDto,
  CreateUserDto,
  resultCreateAccount,
  sessionData,
  UserDto,
} from "../utils/AllInterfaces";
import { BASE_URL } from "../utils/constants";
import fetchData from "./Fetch";
import { createPerson } from "./PersonApi";

export async function getUserByEmail(email: string) {
  const User = await fetchData<UserDto>(
    `${BASE_URL}User/FindUserByEmail/${email}`
  );
  return User;
}
export async function registerNewUser(
  newUser: CreateUserDto,
  newPerson: CreatePersonDto
) {
  const PersonID: number = await createPerson(newPerson);
  newUser.personId = PersonID;
  const message: resultCreateAccount = await fetchData<resultCreateAccount>(
    `${BASE_URL}Auth/SignUp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }
  );
  return message.succeseMessage;
}

export async function login(email: string, password: string) {
  const data = await fetchData<sessionData>(`${BASE_URL}Auth/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return data;
}

export async function RefreshToken(oldRefreshToken: string) {
  const data = (await fetchData)<sessionData>(`${BASE_URL}Auth/RefreshToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldRefreshToken }),
  });

  return data;
}

export async function Logout(refreshToken: string) {
  const data = await fetchData<boolean>(`${BASE_URL}Auth/LogOut`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  return data;
}
