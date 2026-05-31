import { useModuleContext } from "../../context/Hook/useModuleContext";
import { formatDate1 } from "../../utils/helpers";
import HeaderOfModals from "../../ui/HeaderOfModals";
import type { CombinedFormValues } from "./UserValidation";
import UserForm from "./UserForm";
import useAddUser from "./UserHooks/useAddUser";
import type { User } from "../../services/models/User";

export default function AddUser() {
  const { isOpen, onCloseModule, countries } = useModuleContext();
  const { isPending, AddUserAsync } = useAddUser();

  function handleAdd(data: CombinedFormValues) {
    const newUser: User = {
      userId: 0,
      personId: 0,
      email: data.email,
      password: data.password,
      role: data.role,
      personDto: {
        personId: 0,
        ...data,
        nationalityCountryId: +data.nationalityCountryId,
        birthDate: formatDate1(data.birthDate),
      },
    };

    AddUserAsync({ newUser }, { onSuccess: onCloseModule });
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
              description="Add User"
            />

            <UserForm
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
