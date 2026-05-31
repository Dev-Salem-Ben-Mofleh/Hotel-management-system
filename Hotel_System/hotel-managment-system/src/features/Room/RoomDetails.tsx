import { useModuleContext } from "../../context/Hook/useModuleContext";
import Spinner from "../../ui/Spinner";
import RoomCard from "./RoomCard";
import { useGetRoom } from "./RoomHooks/useGetRoom";

export default function RoomDetails() {
  const { onCloseModuleMenu, modalType, openId } = useModuleContext();
  const { isLoading, roomDetails } = useGetRoom(openId, modalType);
  if (openId === 0 || modalType !== "view") return null;
  return isLoading ? (
    <div
      onClick={isLoading ? undefined : onCloseModuleMenu}
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
            <i className="fas fa-bed text-2xl"></i>
            Room Details
          </h3>

          <button
            onClick={onCloseModuleMenu}
            className="text-white hover:scale-110 transition"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
              <i className="fas fa-hotel text-white text-3xl"></i>
            </div>

            <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
              {roomDetails?.roomNumber || "???"}
            </h4>
          </div>

          <RoomCard roomDetails={roomDetails} />
        </div>
      </div>
    </div>
  );
}
