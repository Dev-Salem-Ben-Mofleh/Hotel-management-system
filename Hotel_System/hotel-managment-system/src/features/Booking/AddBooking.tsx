import { useModuleContext } from "../../context/Hook/useModuleContext";
import HeaderOfModals from "../../ui/HeaderOfModals";
import { useAddBooking } from "./BookingHooks/useAddBooking";
import type { Booking } from "../../services/models/Booking";
import BookingForm from "./BookingForm";
import type { BookingFormValues } from "./BookingValidation";
import { formatDate1 } from "../../utils/helpers";

export default function AddBooking() {
  const { isOpen, onCloseModule } = useModuleContext();
  const { isPending, AddBookingAsync } = useAddBooking();

  async function handleAdd(data: BookingFormValues) {
    const newBooking: Booking = {
      ...data,
      checkInDate: formatDate1(data.checkInDate),
      checkOutDate: formatDate1(data.checkOutDate),
    };
    AddBookingAsync({ newBooking }, { onSuccess: onCloseModule });
  }

  if (!isOpen) return null;

  return (
    <div
      className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/40 backdrop-blur-sm
    p-2 sm:p-4
  "
      onClick={isPending ? undefined : onCloseModule}
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
              description="Add Booking"
              icon="fas fa-calendar-check text-blue-500 text-3xl"
            />
            <BookingForm
              onSubmit={handleAdd}
              isPending={isPending}
              onCancel={onCloseModule}
              bookingId={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
