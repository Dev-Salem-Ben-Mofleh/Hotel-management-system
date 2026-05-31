import { useModuleContext } from "../../context/Hook/useModuleContext";
import Spinner from "../../ui/Spinner";
import { useGetBooking } from "../Booking/BookingHooks/useGetBooking";
import { useGetRoom } from "../Room/RoomHooks/useGetRoom";
import { useGetVisistor } from "../Visitor/VisitorHooks/useGetVisistor";
import PaymentCard from "./PaymentCard";
import { useGetPayment } from "./PaymentHooks/useGetPayment";

export default function PaymentDetails() {
  const { onCloseModuleMenu, modalType, openId } = useModuleContext();
  const { isLoading, paymentDetails } = useGetPayment(openId, modalType);
  const { isLoading: isLoading2, bookingDetails } = useGetBooking(
    paymentDetails?.bookingId,
    modalType,
  );
  const { isLoading: isLoading3, visitorDetails } = useGetVisistor(
    bookingDetails?.personId,
    modalType,
  );
  const { isLoading: isLoading4, roomDetails } = useGetRoom(
    bookingDetails?.roomId,
    modalType,
  );

  if (openId === 0 || modalType !== "view") return null;
  return isLoading || isLoading2 || isLoading3 || isLoading4 ? (
    <div
      onClick={onCloseModuleMenu}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Spinner />;
    </div>
  ) : (
    <div
      onClick={onCloseModuleMenu}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
      >
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <i className="fas fa-file-invoice-dollar text-2xl"></i> Payment
            Details
          </h3>

          <button
            onClick={onCloseModuleMenu}
            className="text-white hover:scale-110 transition"
          >
            <i className="fas fa-xmark text-3xl"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
              <i className="fas fa-wallet text-white text-3xl"></i>
            </div>

            <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
              #{openId || "???"}
            </h4>
          </div>

          <PaymentCard
            paymentId={openId}
            paymentDetails={paymentDetails}
            fullName={visitorDetails?.fullName}
            roomNumber={roomDetails?.roomNumber}
          />
        </div>
      </div>
    </div>
  );
}
