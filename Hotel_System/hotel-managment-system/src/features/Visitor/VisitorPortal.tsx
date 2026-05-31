import { createPortal } from "react-dom";
import VisitorModal from "./VisitorModal";
import { useModuleContext } from "../../context/Hook/useModuleContext";
import HeaderOfModals from "../../ui/HeaderOfModals";

export default function VisitorPortal({
  onSelect,
  personName,
}: {
  onSelect: (personId: string) => void;
  personName: string;
}) {
  const { isOpeNestedModal, onCloseNestedModalModule } = useModuleContext();

  if (!isOpeNestedModal) return null;

  return createPortal(
    <div
      className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/40 backdrop-blur-sm
    p-2 sm:p-4
  "
      onClick={onCloseNestedModalModule}
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
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto max-h-[95vh]">
          <div className="p-4 sm:p-6">
            <HeaderOfModals
              icon="fas fa-user-circle text-blue-500 text-3xl"
              description="Add Visitor"
            />

            <VisitorModal onSelect={onSelect} personName={personName} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
