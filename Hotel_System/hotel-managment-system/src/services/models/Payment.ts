export interface PaymentView {
  paymentId: number;
  bookingId: number;
  paymentDate: Date;
  paidAmount: number;
}
export interface Payment {
  bookingId: number;
  paymentDate: string;
  paidAmount: number;
}
