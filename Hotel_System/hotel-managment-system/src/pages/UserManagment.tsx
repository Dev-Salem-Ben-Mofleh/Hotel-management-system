import PageHeader from "../ui/PageHeader";
import AddNewButton from "../ui/AddNewButton";
import { useModuleContext } from "../context/Hook/useModuleContext";
import UserOperation from "../features/User/UserOperation";
import UserTable from "../features/User/UserTable";
import { useDeleteUser } from "../features/User/UserHooks/useDeleteUser";
import AddUser from "../features/User/AddUser";
import UpdateUser from "../features/User/UpdateUser";
import UserrDetails from "../features/User/UserrDetails";
import ConfirmDelete from "../ui/ConfirmDelete";

export default function UserManagment() {
  const { setIsOpen, onCloseModuleMenu, openId, modalType } =
    useModuleContext();
  const { isDeleting, deleteUser } = useDeleteUser();
  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        <PageHeader
          nameOfPage="User Management"
          description="Manage hotel users and their information."
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
              <UserOperation />
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
                name="User"
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
          <UserTable />
        </div>
      </div>
      <AddUser />
      <UpdateUser />
      <UserrDetails />
      <ConfirmDelete
        onCloseModal={onCloseModuleMenu}
        resourceName="User"
        onConfirm={() => deleteUser({ userId: openId })}
        isLoading={isDeleting}
        modalType={modalType}
        openId={openId}
      />
    </>
  );
}
