import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddingButton from "../../ui/AddingButton";
import CancelButton from "../../ui/CancelButton";
import { roomTypeSchema, type RoomTypeFormValues } from "./RoomTypeValidation";
import { useEffect } from "react";
import type { RoomType } from "../../services/models/RoomType";
import RoomTypeFields from "./RoomTypeFields";

type RoomTypeFormProps = {
  initialData?: RoomType;
  onSubmit: (data: RoomTypeFormValues) => void;
  isPending: boolean;
  onCancel: () => void;
};

function RoomTypeForm({
  initialData,
  onSubmit,
  isPending,
  onCancel,
}: RoomTypeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RoomTypeFormValues>({
    resolver: yupResolver(roomTypeSchema),
  });

  useEffect(() => {
    if (initialData) {
      setValue("roomTypeTitle", initialData.roomTypeTitle);
      setValue("roomTypeCapacity", initialData.roomTypeCapacity);
      setValue("roomTypePricePerNight", initialData.roomTypePricePerNight);
      setValue("roomTypeDescription", initialData.roomTypeDescription);
    }
  }, [initialData, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RoomTypeFields
          register={register}
          errors={errors}
          isPending={isPending}
        />
      </div>
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
        <CancelButton isPending={isPending} onCloseModule={onCancel} />
        <AddingButton
          isPending={isPending}
          nameOfItme={initialData ? "Update RoomType" : "Add RoomType"}
        />
      </div>
    </Form>
  );
}

export default RoomTypeForm;
