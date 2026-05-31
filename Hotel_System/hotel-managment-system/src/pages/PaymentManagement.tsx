import { useModuleContext } from "../context/Hook/useModuleContext";
import PaymentDetails from "../features/Payment/PaymentDetails";
import { useDeletePayment } from "../features/Payment/PaymentHooks/useDeletePayment";
import PaymentsOperation from "../features/Payment/PaymentsOperation";
import PaymentTable from "../features/Payment/PaymentTable";
import ConfirmDelete from "../ui/ConfirmDelete";
import PageHeader from "../ui/PageHeader";

export default function PaymentManagement() {
  const { onCloseModuleMenu, openId, modalType } = useModuleContext();
  const { isDeleting, deletePayment } = useDeletePayment();
  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        <PageHeader
          nameOfPage="Payment Management"
          description="Manage hotel payments and their information."
        />
        <div
          className="
            rounded-2xl
            bg-white dark:bg-gray-800
            p-4 sm:p-5 lg:p-6
            shadow-sm
            border border-gray-100 dark:border-gray-700
          "
        >
          <div
            className="
              flex flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="w-full min-w-0 flex-1">
              <PaymentsOperation />
            </div>
          </div>
        </div>
        <div
          className="
            overflow-hidden
            rounded-2xl
            bg-white dark:bg-gray-800
            shadow-sm
            border border-gray-100 dark:border-gray-700
          "
        >
          <PaymentTable />
        </div>
      </div>
      <PaymentDetails />
      <ConfirmDelete
        onCloseModal={onCloseModuleMenu}
        resourceName="Payment"
        onConfirm={() => deletePayment({ paymentId: openId })}
        isLoading={isDeleting}
        modalType={modalType}
        openId={openId}
      />
    </>
  );
}
