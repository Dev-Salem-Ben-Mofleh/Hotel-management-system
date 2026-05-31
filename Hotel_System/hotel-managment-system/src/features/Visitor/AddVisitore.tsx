import { type VisitorFormValues } from "./VisitorValidation";
import type { Person } from "../../services/models/Persons";
import { useAddVisistor } from "./VisitorHooks/useAddVisistor";
import { useModuleContext } from "../../context/Hook/useModuleContext";
import { formatDate1 } from "../../utils/helpers";
import VisitorForm from "./VisitorForm";
import HeaderOfModals from "../../ui/HeaderOfModals";

export default function AddVisitor() {
  const { isOpen, onCloseModule, countries } = useModuleContext();
  const { isPending, AddVisitorAsync } = useAddVisistor();

  function handleAdd(data: VisitorFormValues) {
    const newVisitor: Person = {
      personId: 0,
      ...data,
      nationalityCountryId: +data.nationalityCountryId,
      birthDate: formatDate1(data.birthDate),
    };
    AddVisitorAsync({ newVisitor }, { onSuccess: onCloseModule });
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
              icon="fas fa-user-circle text-blue-500 text-3xl"
              description="Add Visitor"
            />

            <VisitorForm
              onSubmit={handleAdd}
              isPending={isPending}
              onCancel={onCloseModule}
              countries={countries}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
