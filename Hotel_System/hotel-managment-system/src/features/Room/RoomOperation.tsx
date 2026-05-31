import SearchBy from "../../ui/SearchBy";
import InputSearch from "../../ui/InputSearch";
import Filter from "../../ui/Filter";
import { useAllRoomTypeTitles } from "../RoomTypes/RoomTypeHooks/useAllRoomTypeTitles";

export default function RoomOperation() {
  const { RoomTitles } = useAllRoomTypeTitles();

  const roomTypeOptions = [
    { value: "", label: "All" },
    ...(RoomTitles?.map((roomType) => ({
      value: roomType.roomTypeId.toString(),
      label: roomType.roomTypeTitle,
    })) || []),
  ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-md">
        <InputSearch nameOfSearch="roomSearch" />
      </div>

      <div
        className="
          flex flex-col sm:flex-row
          flex-wrap items-stretch sm:items-center
          gap-3 w-full lg:w-auto
        "
      >
        <div className="w-full sm:w-auto">
          <Filter filterKey="roomTypeId" options={roomTypeOptions} />
        </div>

        <div className="w-full sm:w-auto">
          <Filter
            filterKey="availabilityStatus"
            options={[
              { value: "all", label: "All" },
              { value: "0", label: "Available" },
              { value: "1", label: "Not Available" },
            ]}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Filter
            filterKey="isPetFriendly"
            options={[
              { value: "all", label: "All" },
              { value: "true", label: "Allowed" },
              { value: "false", label: "Not Allowed" },
            ]}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Filter
            filterKey="isSmokingAllowed"
            options={[
              { value: "all", label: "All" },
              { value: "true", label: "Allowed" },
              { value: "false", label: "Not Allowed" },
            ]}
          />
        </div>

        <div className="w-full sm:w-auto">
          <SearchBy
            options={[
              { value: "", label: "Select any Field" },
              { value: "roomTypeId", label: "Type Title" },
              { value: "roomNumber", label: "Room Number" },
              { value: "roomId", label: "ID" },
              { value: "roomFloor", label: "Room Floor" },
              { value: "availabilityStatus", label: "Availability Status" },
              { value: "isSmokingAllowed", label: "Is Smoking Allowed" },
              { value: "isPetFriendly", label: "Is Pet Friendly" },
            ]}
            nameOfSearch="roomSearch"
          />
        </div>
      </div>
    </div>
  );
}
