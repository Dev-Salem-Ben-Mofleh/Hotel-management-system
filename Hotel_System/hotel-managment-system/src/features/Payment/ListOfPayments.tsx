import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { PaymentView } from "../../services/models/Payment";

interface Data {
  allPayments: PaymentView[];
}
const className =
  "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white";
export default function ListOfPayments({ allPayments }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <>
      {allPayments.map((p) => (
        <tr
          key={p.paymentId}
          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <td className={className}>{p.paymentId}</td>
          <td className={className}>{p.bookingId}</td>
          <td className={className}>
            {p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "-"}
          </td>
          <td className={className}>{p.paidAmount.toFixed(2)}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button
              onClick={() => {
                setOpenId(p.paymentId);
                setModalType("view");
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>
            <button
              onClick={() => {
                setOpenId(p.paymentId);
                setModalType("delete");
              }}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              <i className="fas fa-trash mr-1"></i>Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
