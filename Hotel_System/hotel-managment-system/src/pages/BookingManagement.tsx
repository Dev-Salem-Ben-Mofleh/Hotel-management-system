import { useModuleContext } from "../context/Hook/useModuleContext";
import AddBooking from "../features/Booking/AddBooking";
import BookingDetails from "../features/Booking/BookingDetails";
import { useDeleteBooking } from "../features/Booking/BookingHooks/useDeleteBooking";
import BookingOperation from "../features/Booking/BookingOperation";
import BookingTable from "../features/Booking/BookingTable";
import UpdateBooking from "../features/Booking/UpdateBooking";
import AddNewButton from "../ui/AddNewButton";
import ConfirmDelete from "../ui/ConfirmDelete";
import PageHeader from "../ui/PageHeader";

export default function BookingManagement() {
  const { setIsOpen, onCloseModuleMenu, openId, modalType } =
    useModuleContext();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        <PageHeader
          nameOfPage="Booking Management"
          description="Manage hotel Booking and their information."
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
              <BookingOperation />
            </div>
            <div
              className="
                w-full
                sm:w-auto
                flex justify-end
              "
            >
              <AddNewButton
                onClick={() => setIsOpen((prev) => !prev)}
                name="Booking"
              />
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
          <BookingTable />
        </div>
      </div>

      <AddBooking />
      <UpdateBooking />
      <BookingDetails />
      <ConfirmDelete
        onCloseModal={onCloseModuleMenu}
        resourceName="Booking"
        onConfirm={() => deleteBooking({ bookingId: openId })}
        isLoading={isDeleting}
        modalType={modalType}
        openId={openId}
      />
    </>
  );
}
