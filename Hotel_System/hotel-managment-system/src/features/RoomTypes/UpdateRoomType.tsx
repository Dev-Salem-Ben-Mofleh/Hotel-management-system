import { useModuleContext } from "../../context/Hook/useModuleContext";
import Spinner from "../../ui/Spinner";
import HeaderOfModals from "../../ui/HeaderOfModals";
import { useGetRoomType } from "./RoomTypeHooks/useGetRoomType";
import { useUpdateRoomTypes } from "./RoomTypeHooks/useUpdateRoomTypes";
import RoomTypeForm from "./RoomTypeForm";
import type { RoomTypeFormValues } from "./RoomTypeValidation";

export default function UpdateRoomType() {
  const { openId, modalType, onCloseModuleMenu } = useModuleContext();
  const { roomTypeDetails, isLoading } = useGetRoomType(openId, modalType);
  const { isPending, UpdateRoomTypeAsync } = useUpdateRoomTypes();

  if (modalType !== "update" || openId === 0) return null;
  if (isLoading) return <Spinner />;

  function handleUpdate(data: RoomTypeFormValues) {
    UpdateRoomTypeAsync(
      {
        roomTypeId: openId,
        updateRoomType: {
          roomTypeId: openId,
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
            {" "}
            <HeaderOfModals
              icon="fas fa-bed text-blue-500 text-3xl"
              description="Update RoomType"
            />
            <RoomTypeForm
              initialData={roomTypeDetails}
              onSubmit={handleUpdate}
              isPending={isPending}
              onCancel={onCloseModuleMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
