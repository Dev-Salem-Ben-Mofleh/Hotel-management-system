import SearchBy from "../../ui/SearchBy";
import Filter from "../../ui/Filter";
import InputSearch from "../../ui/InputSearch";

export default function UserOperation() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-md">
        <InputSearch nameOfSearch="userSearch" />
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
            filterKey="role"
            options={[
              { value: "all", label: "All" },
              { value: "Admin", label: "Admin" },
              { value: "Employee", label: "Employee" },
              { value: "Guest", label: "Guest" },
            ]}
          />
        </div>
        <div className="w-full sm:w-auto">
          <SearchBy
            options={[
              { value: "", label: "Select any Field" },
              { value: "userId", label: "ID" },
              { value: "email", label: "Email" },
              { value: "role", label: "Role" },
            ]}
            nameOfSearch="userSearch"
          />
        </div>
      </div>
    </div>
  );
}
