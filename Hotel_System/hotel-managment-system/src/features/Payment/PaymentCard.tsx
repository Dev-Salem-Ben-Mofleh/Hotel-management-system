import Field from "../../ui/Field";
import { formatDate2 } from "../../utils/helpers";
import type { Payment } from "../../services/models/Payment";

export default function PaymentCard({
  paymentDetails,
  paymentId,
  fullName,
  roomNumber,
}: {
  paymentDetails: Payment | undefined;
  paymentId: number;
  fullName: string | undefined;
  roomNumber: string | undefined;
}) {
  return (
    <div className="space-y-5">
      <Field
        FieldName="Payment ID"
        icon="fas fa-receipt text-green-500"
        value={paymentId.toString()}
      />

      <Field
        FieldName="Payment Date"
        icon="fas fa-calendar-check text-blue-500"
        value={formatDate2(paymentDetails?.paymentDate)}
      />

      <Field
        FieldName="Payment Amount"
        icon="fas fa-money-bill-wave text-emerald-500"
        value={paymentDetails?.paidAmount?.toFixed(2)}
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
    </div>
  );
}
