import type { RoomType } from "./RoomType";

export interface RoomView {
  roomId: number;
  roomTypeDto: RoomType;
  roomNumber: string;
  roomFloor: number;
  availabilityStatus: string;
  isSmokingAllowed: boolean;
  isPetFriendly: boolean;
}

export interface Room {
  roomId: number;
  roomTypeId: number;
  roomNumber: string;
  roomFloor: number;
  availabilityStatus: string;
  roomImageUrl: File | string;
  isSmokingAllowed: boolean;
  isPetFriendly: boolean;
  additionalNotes: string | null;
}
