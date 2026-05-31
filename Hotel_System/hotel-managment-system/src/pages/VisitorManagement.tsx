import VisitorTable from "../features/Visitor/VisitorTable";
import VisitorOperation from "../features/Visitor/VisitorOperation";
import PageHeader from "../ui/PageHeader";
import AddNewButton from "../ui/AddNewButton";
import AddVisitore from "../features/Visitor/AddVisitore";
import { useModuleContext } from "../context/Hook/useModuleContext";
import UpdateVisitor from "../features/Visitor/UpdateVisitor";
import VisitorDetails from "../features/Visitor/VisitorDetails";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useDeleteVisitor } from "../features/Visitor/VisitorHooks/useDeleteVisitor";

export default function VisitorManagement() {
  const { setIsOpen, onCloseModuleMenu, openId, modalType } =
    useModuleContext();
  const { isDeleting, deleteVisitor } = useDeleteVisitor();
  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        <PageHeader
          nameOfPage="Visitor Management"
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
              <VisitorOperation />
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
                name="Visitor"
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
          <VisitorTable />
        </div>
      </div>
      <AddVisitore />
      <UpdateVisitor />
      <VisitorDetails />
      <ConfirmDelete
        onCloseModal={onCloseModuleMenu}
        resourceName="Visitor"
        onConfirm={() => deleteVisitor({ personId: openId })}
        isLoading={isDeleting}
        modalType={modalType}
        openId={openId}
      />
    </>
  );
}
