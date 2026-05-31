import type { FieldErrors, UseFormRegister } from "react-hook-form";
import Error from "../../ui/Error";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import type { RoomTypeFormValues } from "./RoomTypeValidation";

interface RoomTypeFieldsProps {
  register: UseFormRegister<RoomTypeFormValues>;
  errors: FieldErrors<RoomTypeFormValues>;
  isPending: boolean;
}
export default function RoomTypeFields({
  register,
  errors,
  isPending,
}: RoomTypeFieldsProps) {
  return (
    <>
      <div>
        <Label name="Room Type Title" />
        <Input
          type="text"
          nameRegister="roomTypeTitle"
          register={register}
          placeholder="Enter Title"
          disabled={isPending}
        />
        {errors.roomTypeTitle && (
          <Error message={errors.roomTypeTitle?.message} />
        )}
      </div>

      <div>
        <Label name="Room Type Capacity" />
        <Input
          type="number"
          nameRegister="roomTypeCapacity"
          register={register}
          disabled={isPending}
        />
        {errors.roomTypeCapacity && (
          <Error message={errors.roomTypeCapacity?.message} />
        )}
      </div>

      <div>
        <Label name="Room Type Price Per Night" />
        <Input
          type="number"
          nameRegister="roomTypePricePerNight"
          register={register}
          disabled={isPending}
        />
        {errors.roomTypePricePerNight && (
          <Error message={errors.roomTypePricePerNight?.message} />
        )}
      </div>
      <div>
        <Label name="Room Type Description" />
        <Input
          type="text"
          nameRegister="roomTypeDescription"
          register={register}
          placeholder="Enter Description"
          disabled={isPending}
        />
        {errors.roomTypeDescription && (
          <Error message={errors.roomTypeDescription?.message} />
        )}
      </div>
    </>
  );
}
