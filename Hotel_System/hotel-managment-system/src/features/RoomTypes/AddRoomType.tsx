import { type RoomTypeFormValues } from "./RoomTypeValidation";
import { useModuleContext } from "../../context/Hook/useModuleContext";
import HeaderOfModals from "../../ui/HeaderOfModals";
import type { RoomType } from "../../services/models/RoomType";
import { useAddRoomType } from "./RoomTypeHooks/useAddRoomType";
import RoomTypeForm from "./RoomTypeForm";

export default function AddRoomType() {
  const { isOpen, onCloseModule } = useModuleContext();
  const { isPending, AddRoomTypeAsync } = useAddRoomType();

  function handleAdd(data: RoomTypeFormValues) {
    const newRoomType: RoomType = {
      roomTypeId: 0,
      ...data,
    };
    AddRoomTypeAsync({ newRoomType }, { onSuccess: onCloseModule });
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
              icon="fas fa-bed text-blue-500 text-3xl"
              description="Add RoomType"
            />

            <RoomTypeForm
              onSubmit={handleAdd}
              isPending={isPending}
              onCancel={onCloseModule}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
