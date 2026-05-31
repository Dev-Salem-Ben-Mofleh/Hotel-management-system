import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { PaymentView } from "../../services/models/Payment";

interface Data {
  allPayments: PaymentView[];
}
const className: string = "text-gray-900 dark:text-white text-sm mb-1";
export default function PaymentForMobile({ allPayments }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <div className="md:hidden space-y-4">
      {allPayments.map((p) => (
        <div
          key={p.paymentId}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
        >
          <div className={className}>ID: {p.paymentId}</div>
          <div className={className}>
            Payment date:
            {p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "-"}
          </div>
          <div className={className}>Booking Id: {p.bookingId}</div>
          <div className={className}>Paid Amount: {p.paidAmount}</div>
          <div className="flex space-x-2">
            <button
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              onClick={() => {
                setOpenId(p.paymentId);
                setModalType("view");
              }}
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>

            <button
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
              onClick={() => {
                setOpenId(p.paymentId);
                setModalType("delete");
              }}
            >
              <i className="fas fa-trash mr-1"></i>Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
