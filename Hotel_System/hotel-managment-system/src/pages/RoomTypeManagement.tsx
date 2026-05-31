import PageHeader from "../ui/PageHeader";
import AddNewButton from "../ui/AddNewButton";
import { useModuleContext } from "../context/Hook/useModuleContext";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useDeleteRoomType } from "../features/RoomTypes/RoomTypeHooks/useDeleteRoomType";
import RoomTypeOperation from "../features/RoomTypes/RoomTypeOperation";
import RoomTypeTable from "../features/RoomTypes/RoomTypeTable";
import AddRoomType from "../features/RoomTypes/AddRoomType";
import UpdateRoomType from "../features/RoomTypes/UpdateRoomType";
import RoomTypeDetails from "../features/RoomTypes/RoomTypeDetails";

export default function RoomTypeManagement() {
  const { setIsOpen, onCloseModuleMenu, openId, modalType } =
    useModuleContext();
  const { isDeleting, deleteroomType } = useDeleteRoomType();
  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        <PageHeader
          nameOfPage="RoomType Management"
          description="Manage hotel visitors and their information."
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
              <RoomTypeOperation />
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
                name="RoomType"
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
          <RoomTypeTable />
        </div>
      </div>
      <AddRoomType />
      <UpdateRoomType />
      <RoomTypeDetails />
      <ConfirmDelete
        onCloseModal={onCloseModuleMenu}
        resourceName="roomType"
        onConfirm={() => deleteroomType({ roomTypeId: openId })}
        isLoading={isDeleting}
        modalType={modalType}
        openId={openId}
      />
    </>
  );
}
