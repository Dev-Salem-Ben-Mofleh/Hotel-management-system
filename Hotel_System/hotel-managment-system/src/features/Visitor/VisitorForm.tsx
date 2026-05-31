import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddingButton from "../../ui/AddingButton";
import CancelButton from "../../ui/CancelButton";
import { visitorSchema, type VisitorFormValues } from "./VisitorValidation";
import { formatDate2 } from "../../utils/helpers";
import type { Country } from "../../services/models/Country";
import type { Person } from "../../services/models/Persons";
import { useEffect } from "react";
import VisitorFields from "./VisitorFields";

type VisitorFormProps = {
  initialData?: Person;
  onSubmit: (data: VisitorFormValues) => void;
  isPending: boolean;
  onCancel: () => void;
  countries: Country[];
};

function VisitorForm({
  initialData,
  onSubmit,
  isPending,
  onCancel,
  countries,
}: VisitorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VisitorFormValues>({
    resolver: yupResolver(visitorSchema),
  });

  useEffect(() => {
    if (initialData) {
      setValue("fullName", initialData.fullName);
      setValue("phone", initialData.phone);
      setValue("gender", initialData.gender === "0" ? "0" : "1");
      setValue("birthDate", formatDate2(initialData.birthDate));
      setValue(
        "nationalityCountryId",
        initialData.nationalityCountryId.toString(),
      );
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
      </div>
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
        <CancelButton isPending={isPending} onCloseModule={onCancel} />
        <AddingButton
          isPending={isPending}
          nameOfItme={initialData ? "Update Visitor" : "Add Visitor"}
        />
      </div>
    </Form>
  );
}

export default VisitorForm;
