import PageHeader from "../ui/PageHeader";
import AddNewButton from "../ui/AddNewButton";
import { useModuleContext } from "../context/Hook/useModuleContext";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useDeleteRoom } from "../features/Room/RoomHooks/useDeleteRoom";
import RoomOperation from "../features/Room/RoomOperation";
import RoomTable from "../features/Room/RoomTable";
import UpdateRoom from "../features/Room/UpdateRoom";
import RoomDetails from "../features/Room/RoomDetails";
import AddRoom from "../features/Room/AddRoom";

export default function RoomManagement() {
  const { setIsOpen, onCloseModuleMenu, openId, modalType } =
    useModuleContext();
  const { isDeleting, deleteRoom } = useDeleteRoom();
  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        <PageHeader
          nameOfPage="Room Management"
          description="Manage hotel rooms and their information."
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
              <RoomOperation />
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
                name="Room"
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
          <RoomTable />
        </div>
      </div>

      <AddRoom />

      <UpdateRoom />

      <RoomDetails />

      <ConfirmDelete
        onCloseModal={onCloseModuleMenu}
        resourceName="room"
        onConfirm={() => deleteRoom({ roomId: openId })}
        isLoading={isDeleting}
        modalType={modalType}
        openId={openId}
      />
    </>
  );
}
