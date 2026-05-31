import Field from "../../ui/Field";
import type { Booking } from "../../services/models/Booking";
import { formatDate2 } from "../../utils/helpers";

export default function BookingCard({
  bookingDetails,
  bookingId,
  fullName,
  roomNumber,
  roomTypeName,
  totalPrice,
}: {
  bookingDetails: Booking | undefined;
  bookingId: number | undefined;
  fullName: string | undefined;
  roomNumber: string | undefined;
  roomTypeName: string | undefined;
  totalPrice: number | undefined;
}) {
  return (
    <div className="space-y-5">
      <Field
        FieldName="Booking ID"
        icon="fas fa-receipt text-green-500"
        value={bookingId?.toString()}
      />

      <Field
        FieldName="Check In Date"
        icon="fas fa-calendar-check text-blue-500"
        value={formatDate2(bookingDetails?.checkInDate)}
      />

      <Field
        FieldName="Check Out Date"
        icon="fas fa-calendar-times text-red-500"
        value={formatDate2(bookingDetails?.checkOutDate)}
      />

      <Field
        FieldName="Status"
        icon={
          bookingDetails?.status === "Cancelled"
            ? "fas fa-circle-xmark text-red-500"
            : "fas fa-circle-check text-indigo-500"
        }
        value={bookingDetails?.status}
      />

      <Field
        FieldName="Guest Name"
        icon="fas fa-user text-gray-500"
        value={fullName}
      />

      <Field
        FieldName="Room Number"
        icon="fas fa-door-open text-yellow-500"
        value={roomNumber?.toString()}
      />

      <Field
        FieldName="Room Type"
        icon="fas fa-bed text-cyan-500"
        value={roomTypeName}
      />

      <Field
        FieldName="Total Price"
        icon="fas fa-money-bill-wave text-emerald-500"
        value={totalPrice?.toFixed(2)}
      />
    </div>
  );
}
