import type { Person } from "./Persons";

export interface UserView {
  userId: number;
  personDto: Person;
  personId: number;
  email: string;
  password: string;
  role: string;
}

export interface User {
  userId: number;
  personId: number | undefined;
  personDto: Person;
  email: string;
  password: string;
  role: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface LogOut {
  refreshToken: string;
}

export interface RefreshToken {
  oldRefreshToken: string;
}
