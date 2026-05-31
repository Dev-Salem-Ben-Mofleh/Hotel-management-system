import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import RowTable from "../Shared/RowTable";
import EmptyData from "../../ui/EmptyData";
import { useAllPayment } from "./PaymentHooks/useAllPayment";
import { useSearchPayment } from "./PaymentHooks/useSearchPayment";
import ListOfPayments from "./ListOfPayments";
import PaymentForMobile from "./PaymentForMobile";

export default function PaymentTable() {
  const { isLoading, isFetching, payments, countPayments } = useAllPayment();
  const {
    isLoading: isLoading2,
    searchPayments,
    countSearchPayments,
  } = useSearchPayment();
  const [searchParams] = useSearchParams();

  const value: string = searchParams.get("paymentSearch") || "";

  if (isLoading || isLoading2 || isFetching) {
    return <Spinner />;
  }

  if (value !== "" && countSearchPayments === 0) {
    return <EmptyData message="No Payments with this search" />;
  } else if (!payments.length)
    return <EmptyData message="No Payments in database" />;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-4">
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <RowTable
                Rows={[
                  { value: "Payment Id" },
                  { value: "Booking Id" },
                  { value: "Payment Date" },
                  { value: "Payment Amount" },
                  { value: "Actions" },
                ]}
              />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <ListOfPayments
              allPayments={searchPayments.length ? searchPayments : payments}
            />
          </tbody>
        </table>
      </div>
      <PaymentForMobile
        allPayments={searchPayments.length ? searchPayments : payments}
      />
      <Pagination
        count={countSearchPayments === 0 ? countPayments : countSearchPayments}
      />
    </div>
  );
}
