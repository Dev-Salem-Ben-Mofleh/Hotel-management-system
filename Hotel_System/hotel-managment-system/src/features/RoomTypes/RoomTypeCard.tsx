import Field from "../../ui/Field";
import type { RoomType } from "../../services/models/RoomType";

export default function RoomTypeCard({
  roomTypeDetails,
}: {
  roomTypeDetails: RoomType | undefined;
}) {
  return (
    <div className="space-y-5">
      <Field
        FieldName="RoomType ID"
        icon="fas fa-hashtag text-green-500"
        value={roomTypeDetails?.roomTypeId.toString()}
      />

      <Field
        FieldName="Title"
        icon="fas fa-bed text-blue-500"
        value={roomTypeDetails?.roomTypeTitle}
      />

      <Field
        FieldName="Capacity"
        icon="fas fa-users text-purple-500"
        value={roomTypeDetails?.roomTypeCapacity.toString()}
      />

      <Field
        FieldName="Price Per Night"
        icon="fas fa-money-bill-wave text-emerald-500"
        value={roomTypeDetails?.roomTypePricePerNight.toString()}
      />

      <Field
        FieldName="Description"
        icon="fas fa-align-left text-indigo-500"
        value={roomTypeDetails?.roomTypeDescription}
      />
    </div>
  );
}
