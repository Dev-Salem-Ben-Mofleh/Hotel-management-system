import { useModuleContext } from "../../context/Hook/useModuleContext";
import Spinner from "../../ui/Spinner";
import { formatDate1 } from "../../utils/helpers";
import HeaderOfModals from "../../ui/HeaderOfModals";
import { useUpdateUser } from "./UserHooks/useUpdateUser";
import type { CombinedFormValues } from "./UserValidation";
import UserForm from "./UserForm";
import { useGetUser } from "./UserHooks/useGetUser";

export default function UpdateUser() {
  const { openId, modalType, onCloseModuleMenu, countries } =
    useModuleContext();
  const { userDetails, isLoading } = useGetUser(openId, modalType);

  const { isPending, UpdateUserAsync } = useUpdateUser();

  if (modalType !== "updateUser" || openId === 0) return null;
  if (isLoading) return <Spinner />;

  function handleUpdate(data: CombinedFormValues) {
    UpdateUserAsync(
      {
        userId: openId,
        updateUser: {
          userId: openId,
          personId: userDetails?.personId,
          email: data.email,
          password: data.password,
          role: data.role,
          personDto: {
            personId: userDetails?.personId,
            ...data,
            nationalityCountryId: +data.nationalityCountryId,
            birthDate: formatDate1(data.birthDate),
          },
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
            <UserForm
              initialData={userDetails}
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
