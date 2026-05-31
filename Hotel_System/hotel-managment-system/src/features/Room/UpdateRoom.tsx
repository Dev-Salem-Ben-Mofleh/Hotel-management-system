import { useModuleContext } from "../../context/Hook/useModuleContext";
import Spinner from "../../ui/Spinner";
import HeaderOfModals from "../../ui/HeaderOfModals";
import type { RoomFormValues } from "./RoomValidation";
import { ImageServices } from "../../services/ImageServices";
import { useUpdateRoom } from "./RoomHooks/useUpdateRoom";
import { useGetRoom } from "./RoomHooks/useGetRoom";
import RoomForm from "./RoomForm";
import type { UploadedImageUrl } from "../../services/models/Image";

export default function UpdateRoom() {
  const { openId, modalType, onCloseModuleMenu } = useModuleContext();
  const { roomDetails, isLoading } = useGetRoom(openId, modalType);
  const { isPending, UpdateRoomAsync } = useUpdateRoom();
  if (modalType !== "update" || openId === 0) return null;
  if (isLoading) return <Spinner />;

  async function handleUpdate(data: RoomFormValues) {
    const imageService = new ImageServices();
    let uploadedImageUrl: UploadedImageUrl | null = null;

    if (data.roomImageUrl !== data.oldImageUrl) {
      uploadedImageUrl = await imageService.updateImage(
        data.oldImageUrl,
        data.roomImageUrl as File,
      );

      data.roomImageUrl = uploadedImageUrl.url;
    }
    UpdateRoomAsync(
      {
        roomId: openId,
        updateRoom: {
          roomId: openId,
          ...data,
          roomImageUrl: uploadedImageUrl?.url || data.roomImageUrl,
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
              description="Update Room"
              icon="fas fa-bed text-blue-500 text-3xl"
            />
            <RoomForm
              initialData={roomDetails}
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
