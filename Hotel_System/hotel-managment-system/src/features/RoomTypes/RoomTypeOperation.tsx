import SearchBy from "../../ui/SearchBy";
import InputSearch from "../../ui/InputSearch";

export default function RoomTypeOperation() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-md">
        <InputSearch nameOfSearch="roomTypeSearch" />
      </div>
      <div className="w-full sm:w-auto">
        <SearchBy
          options={[
            { value: "", label: "Select any Field" },
            { value: "roomTypeTitle", label: "Title" },
            { value: "roomTypeId", label: "ID" },
            { value: "roomTypeCapacity", label: "Capacity" },
          ]}
          nameOfSearch="roomTypeSearch"
        />
      </div>
    </div>
  );
}
