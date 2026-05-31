import { useModuleContext } from "../../context/Hook/useModuleContext";
import HeaderOfModals from "../../ui/HeaderOfModals";
import { useAddRoom } from "./RoomHooks/useAddRoom";
import type { Room } from "../../services/models/Room";
import type { RoomFormValues } from "./RoomValidation";
import RoomForm from "./RoomForm";
import { ImageServices } from "../../services/ImageServices";
import type { UploadedImageUrl } from "../../services/models/Image";

export default function AddRoom() {
  const { isOpen, onCloseModule } = useModuleContext();
  const { isPending, AddRoomAsync } = useAddRoom();

  async function handleAdd(data: RoomFormValues) {
    const imageService = new ImageServices();
    const uploadedImageUrl: UploadedImageUrl = await imageService.uploadImage(
      data.roomImageUrl,
    );
    const newRoom: Room = {
      roomId: 0,
      ...data,
      roomImageUrl: uploadedImageUrl.url,
    };
    AddRoomAsync({ newRoom }, { onSuccess: onCloseModule });
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
              description="Add Room"
              icon="fas fa-bed text-blue-500 text-3xl"
            />

            <RoomForm
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
