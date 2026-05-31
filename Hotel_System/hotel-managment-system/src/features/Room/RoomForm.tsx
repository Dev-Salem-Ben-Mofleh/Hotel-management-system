import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddingButton from "../../ui/AddingButton";
import CancelButton from "../../ui/CancelButton";
import { roomSchema, type RoomFormValues } from "./RoomValidation";
import { useEffect, useRef, useState } from "react";
import type { Room } from "../../services/models/Room";
import RoomFields from "./RoomFields";

type RoomFormProps = {
  initialData?: Room;
  onSubmit: (data: RoomFormValues) => void;
  isPending: boolean;
  onCancel: () => void;
};

function RoomForm({
  initialData,
  onSubmit,
  isPending,
  onCancel,
}: RoomFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RoomFormValues>({
    resolver: yupResolver(roomSchema),
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialData) {
      setValue("roomId", initialData.roomId);
      setValue("roomTypeId", initialData.roomTypeId);
      setValue("roomNumber", initialData.roomNumber);
      setValue("roomFloor", initialData.roomFloor);
      setValue(
        "availabilityStatus",
        initialData.availabilityStatus === "Available"
          ? "Available"
          : "Unavailable",
      );
      setValue("oldImageUrl", initialData.roomImageUrl);
      setValue("roomImageUrl", initialData.roomImageUrl);
      setPreviewUrl(initialData.roomImageUrl);
      setValue(
        "isSmokingAllowed",
        initialData.isSmokingAllowed === true ? "1" : "0",
      );
      setValue("isPetFriendly", initialData.isPetFriendly === true ? "1" : "0");
      setValue(
        "additionalNotes",
        initialData.additionalNotes === ""
          ? "No notes"
          : initialData.additionalNotes,
      );
    }
  }, [initialData, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RoomFields
          register={register}
          errors={errors}
          isPending={isPending}
          setValue={setValue}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          fileInputRef={fileInputRef}
        />
      </div>
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
        <CancelButton isPending={isPending} onCloseModule={onCancel} />
        <AddingButton
          isPending={isPending}
          nameOfItme={initialData ? "Update Room" : "Add Room"}
        />
      </div>
    </Form>
  );
}

export default RoomForm;
