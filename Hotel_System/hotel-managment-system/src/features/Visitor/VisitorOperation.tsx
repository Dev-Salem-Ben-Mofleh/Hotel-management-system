import SearchBy from "../../ui/SearchBy";
import Filter from "../../ui/Filter";
import InputSearch from "../../ui/InputSearch";

export default function VisitorOperation() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-md">
        <InputSearch nameOfSearch="visitorSearch" />
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
            filterKey="gender"
            options={[
              { value: "all", label: "All" },
              { value: "0", label: "Male" },
              { value: "1", label: "Female" },
            ]}
          />
        </div>
        <div className="w-full sm:w-auto">
          <SearchBy
            options={[
              { value: "", label: "Select any Field" },
              { value: "fullName", label: "Full Name" },
              { value: "personId", label: "ID" },
              { value: "phone", label: "Phone" },
              { value: "gender", label: "Gender" },
            ]}
            nameOfSearch="visitorSearch"
          />
        </div>
      </div>
    </div>
  );
}
