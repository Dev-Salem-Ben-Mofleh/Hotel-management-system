export interface Login {
  email: string;
  password: string;
}
export interface RefreshTokenDto {
  OldRefreshToken: string;
}

export interface LogOutDto {
  RefreshToken: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface sessionData {
  accessToken: string;
  refreshToken: string;
}
