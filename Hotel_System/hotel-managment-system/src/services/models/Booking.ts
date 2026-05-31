export interface Booking {
  personId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
}

export interface BookingView {
  bookingId: number;
  checkInDate: Date;
  checkOutDate: Date;
  status: string;
  fullName: string;
  countryName: string;
  paidAmount: number;
  roomNumber: string;
  roomFloor: number;
}
