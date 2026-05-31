import { type VisitorFormValues } from "./VisitorValidation";
import { useModuleContext } from "../../context/Hook/useModuleContext";
import { useGetVisistor } from "./VisitorHooks/useGetVisistor";
import Spinner from "../../ui/Spinner";
import { formatDate1 } from "../../utils/helpers";
import { useUpdateVisitor } from "./VisitorHooks/useUpdateVisitor";
import VisitorForm from "./VisitorForm";
import HeaderOfModals from "../../ui/HeaderOfModals";

export default function UpdateVisitor() {
  const { openId, modalType, onCloseModuleMenu, countries } =
    useModuleContext();
  const { visitorDetails, isLoading } = useGetVisistor(openId, modalType);
  const { isPending, UpdateVisitorAsync } = useUpdateVisitor();

  if (modalType !== "update" || openId === 0) return null;
  if (isLoading) return <Spinner />;

  function handleUpdate(data: VisitorFormValues) {
    UpdateVisitorAsync(
      {
        personId: openId,
        updateVisitor: {
          personId: openId,
          ...data,
          nationalityCountryId: +data.nationalityCountryId,
          birthDate: formatDate1(data.birthDate),
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
              icon="fas fa-user-circle text-blue-500 text-3xl"
              description="Update Visitor"
            />
            <VisitorForm
              initialData={visitorDetails}
              onSubmit={handleUpdate}
              isPending={isPending}
              onCancel={onCloseModuleMenu}
              countries={countries}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
