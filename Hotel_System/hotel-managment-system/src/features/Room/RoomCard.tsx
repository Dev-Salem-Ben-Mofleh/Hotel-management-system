import Field from "../../ui/Field";
import type { Room } from "../../services/models/Room";

export default function RoomCard({
  roomDetails,
}: {
  roomDetails: Room | undefined;
}) {
  const formatBoolean = (value: boolean | undefined) =>
    value ? (
      <span className="text-green-600 font-semibold">Yes</span>
    ) : (
      <span className="text-red-500 font-semibold">No</span>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field
        FieldName="Room ID"
        icon="fas fa-hashtag text-green-500"
        value={roomDetails?.roomId?.toString()}
      />

      <Field
        FieldName="Room Number"
        icon="fas fa-door-open text-blue-500"
        value={roomDetails?.roomNumber}
      />

      <Field
        FieldName="Floor"
        icon="fas fa-layer-group text-purple-500"
        value={roomDetails?.roomFloor?.toString()}
      />

      <Field
        FieldName="Status"
        icon="fas fa-bed text-indigo-500"
        value={
          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
            {roomDetails?.availabilityStatus}
          </span>
        }
      />

      <Field
        FieldName="Smoking Allowed"
        icon="fas fa-smoking text-gray-500"
        value={formatBoolean(roomDetails?.isSmokingAllowed)}
      />

      <Field
        FieldName="Pet Friendly"
        icon="fas fa-paw text-yellow-500"
        value={formatBoolean(roomDetails?.isPetFriendly)}
      />

      <Field
        FieldName="Notes"
        icon="fas fa-align-left text-indigo-500"
        value={roomDetails?.additionalNotes || "No notes"}
      />

      {roomDetails?.roomImageUrl && (
        <div className="col-span-1 sm:col-span-2 mt-4">
          <div
            className="
        overflow-hidden
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-gray-100 dark:bg-gray-800
        shadow-sm
      "
          >
            <img
              src={roomDetails.roomImageUrl}
              alt="Room"
              loading="lazy"
              className="
          w-full
          max-h-80
          object-cover
          transition-transform duration-300
          hover:scale-[1.02]
        "
            />
          </div>
        </div>
      )}
    </div>
  );
}
