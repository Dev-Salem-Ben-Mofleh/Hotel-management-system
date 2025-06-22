import type { UseFormRegister } from "react-hook-form";

export interface resultCreateAccount {
  succeseMessage: string;
}

export interface CreateBookingDto {
  personId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
}

export interface RoomDto {
  roomId: number;
  roomTypeId: number;
  roomNumber: string;
  roomFloor: number;
  roomSize: number;
  availabilityStatus: string;
  isSmokingAllowed: boolean;
  isPetFriendl: boolean;
  additionalNotes: string | null;
  roomImageUrl: string;
}

export interface RoomTypeDto {
  roomTypeId: number;
  roomTypeTitle: string;
  roomTypeCapacity: number;
  roomTypePricePerNight: number;
  roomTypeDescription: string;
}
export interface CreatePersonDto {
  personId: number;
  fullName: string;
  gender: string;
  birthDate: string;
  phone: string;
  nationalityCountryId: number;
}

export interface CountryDto {
  countryId: number;
  countryName: string;
}
export interface UserDto {
  userId: number;
  personId: number;
  email: string;
  password: string;
  role: string;
}

export interface CreateUserDto {
  personId: number;
  email: string;
  password: string;
  role: string;
}

export interface sessionData {
  accessToken: string;
  refreshToken: string;
}

export type MyRoomDataType = {
  rooms: RoomDto[];
  countRooms: number;
};

export type FormValues = {
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type RegisterValues = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  gender: string;
  country: string;
  confirmPassword: string;
};

type OptionsGuest = {
  value: string;
  label: string;
};

export type CheckProps = {
  register: UseFormRegister<FormValues>;
  error?: string;
  getValues?: (field: keyof FormValues) => string;
  options?: OptionsGuest[];
  isBookingForm?: boolean;
};

export type RoomID = {
  roomId: number;
};

type AmenitiesData = {
  emoji: string;
  service: string;
  description: string;
};

export type AmenitiesProps = {
  services: AmenitiesData[];
};

type ContactData = {
  emoji: string;
  primaryInfo: string;
  secondaryInfo: string;
};

export type ContactProps = {
  Contacts: ContactData[];
};
