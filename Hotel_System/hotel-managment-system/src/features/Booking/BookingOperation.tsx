import SearchBy from "../../ui/SearchBy";
import InputSearch from "../../ui/InputSearch";
import Filter from "../../ui/Filter";
import FilterByDate from "../../ui/FilterByDate";

export default function BookingOperation() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-md">
        <InputSearch nameOfSearch="bookingSearch" />
      </div>
      <div
        className="
          flex flex-col sm:flex-row
          flex-wrap items-stretch sm:items-center
          gap-3 w-full lg:w-auto
        "
      >
        <div className="w-full sm:w-auto">
          <Filter
            filterKey="status"
            options={[
              { value: "all", label: "All" },
              { value: "Confirmed", label: "Confirmed" },
              { value: "Cancelled", label: "Cancelled" },
            ]}
          />
        </div>

        <div className="w-full sm:w-auto">
          <FilterByDate filterKey="date" />
        </div>
        <div className="w-full sm:w-auto">
          <SearchBy
            options={[
              { value: "", label: "Select any Field" },
              { value: "bookingId", label: "Booking Id" },
              { value: "date", label: "By Date" },
              { value: "status", label: "Status" },
              { value: "fullName", label: "Guest Name" },
              { value: "roomNumber", label: "Room Number" },
            ]}
            nameOfSearch="bookingSearch"
          />
        </div>
      </div>
    </div>
  );
}
