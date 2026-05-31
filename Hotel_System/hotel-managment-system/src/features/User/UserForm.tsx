import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddingButton from "../../ui/AddingButton";
import CancelButton from "../../ui/CancelButton";
import { combinedSchema, type CombinedFormValues } from "./UserValidation";
import { formatDate2 } from "../../utils/helpers";
import type { Country } from "../../services/models/Country";
import { useEffect } from "react";
import type { User } from "../../services/models/User";
import UserFields from "./UserFields";
import VisitorFields from "../Visitor/VisitorFields";

type UserFormProps = {
  initialData?: User;
  onSubmit: (data: CombinedFormValues) => void;
  isPending: boolean;
  onCancel: () => void;
  countries: Country[];
};

function UserForm({
  initialData,
  onSubmit,
  isPending,
  onCancel,
  countries,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CombinedFormValues>({
    resolver: yupResolver(combinedSchema),
  });

  useEffect(() => {
    if (initialData) {
      setValue("fullName", initialData.personDto.fullName);
      setValue("phone", initialData.personDto.phone);
      setValue("gender", initialData.personDto.gender === "Male" ? "0" : "1");
      setValue("birthDate", formatDate2(initialData.personDto.birthDate));
      setValue(
        "nationalityCountryId",
        initialData.personDto.nationalityCountryId.toString(),
      );
      setValue("role", initialData.role as "Admin" | "Employee" | "Guest");
      setValue("email", initialData.email);
      setValue("password", initialData.password);
      setValue("confirmPassword", initialData.password);
    }
  }, [initialData, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <VisitorFields
          countries={countries}
          register={register}
          errors={errors}
          isPending={isPending}
        />
        <UserFields register={register} errors={errors} isPending={isPending} />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
        <CancelButton isPending={isPending} onCloseModule={onCancel} />
        <AddingButton
          isPending={isPending}
          nameOfItme={initialData ? "Update User" : "Add User"}
        />
      </div>
    </Form>
  );
}

export default UserForm;
