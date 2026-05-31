import { useModuleContext } from "../../context/Hook/useModuleContext";
import Spinner from "../../ui/Spinner";
import HeaderOfModals from "../../ui/HeaderOfModals";
import BookingForm from "./BookingForm";
import { useGetBooking } from "./BookingHooks/useGetBooking";
import { useUpdateBooking } from "./BookingHooks/useUpdateBooking";
import type { BookingFormValues } from "./BookingValidation";

export default function UpdateBooking() {
  const { openId, modalType, onCloseModuleMenu } = useModuleContext();
  const { bookingDetails, isLoading } = useGetBooking(openId, modalType);
  const { isPending, UpdateBookingAsync } = useUpdateBooking();
  if (modalType !== "update" || openId === 0) return null;
  if (isLoading) return <Spinner />;

  async function handleUpdate(data: BookingFormValues) {
    UpdateBookingAsync(
      {
        bookingId: openId,
        updateBooking: {
          ...data,
        },
      },
      { onSuccess: onCloseModuleMenu },
    );
  }

  return (
    <div
      className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/40 backdrop-blur-sm
    p-2 sm:p-4
  "
      onClick={isPending ? undefined : onCloseModuleMenu}
    >
      <div
        className="
      w-full max-w-4xl
      max-h-[95vh]
      overflow-hidden
      rounded-2xl
      bg-white dark:bg-gray-800
      shadow-2xl
      border border-gray-200 dark:border-gray-700
    "
        onClick={isPending ? undefined : (e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto max-h-[95vh]">
          <div className="p-4 sm:p-6">
            <HeaderOfModals
              description="Update Booking"
              icon="fas fa-calendar-check text-blue-500 text-3xl"
            />
            <BookingForm
              initialData={bookingDetails}
              onSubmit={handleUpdate}
              isPending={isPending}
              onCancel={onCloseModuleMenu}
              bookingId={openId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
