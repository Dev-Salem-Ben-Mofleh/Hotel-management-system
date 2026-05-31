import SearchBy from "../../ui/SearchBy";
import InputSearch from "../../ui/InputSearch";

export default function PaymentsOperation() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-md">
        <InputSearch nameOfSearch="paymentSearch" />
      </div>

      <div className="w-full sm:w-auto">
        <SearchBy
          options={[
            { value: "", label: "Select any Field" },
            { value: "paymentId", label: "Payment Id" },
            { value: "bookingId", label: "Booking Id" },
          ]}
          nameOfSearch="paymentSearch"
        />
      </div>
    </div>
  );
}
