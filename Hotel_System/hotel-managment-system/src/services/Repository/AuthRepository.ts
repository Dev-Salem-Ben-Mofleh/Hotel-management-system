import { BASE_URL } from "../../utils/constants";
import type { Login, LogOut, RefreshToken, User } from "../models/User";
import fetchData from "./FetchAPI";
import type { sessionData } from "../models/Auth";

export class AuthRepository {
  async signUp(newUser: User): Promise<string> {
    const message: string = await fetchData<string>(`${BASE_URL}/Auth/SignUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    return message;
  }

  async login(loginData: Login): Promise<sessionData> {
    const data: sessionData = await fetchData<sessionData>(
      `${BASE_URL}/Auth/Login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      },
    );

    return data;
  }

  async refreshToken(refreshTokenData: RefreshToken): Promise<sessionData> {
    const data: sessionData = await fetchData<sessionData>(
      `${BASE_URL}/Auth/RefreshToken`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(refreshTokenData),
      },
    );

    return data;
  }

  async logOut(logOutData: LogOut): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${BASE_URL}/Auth/LogOut`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logOutData),
      },
    );

    return result;
  }
}
