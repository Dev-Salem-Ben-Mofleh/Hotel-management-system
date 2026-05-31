import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddingButton from "../../ui/AddingButton";
import CancelButton from "../../ui/CancelButton";
import { useEffect } from "react";
import { bookingSchema, type BookingFormValues } from "./BookingValidation";
import type { Booking } from "../../services/models/Booking";
import BookingFields from "./BookingFields";
import { formatDate2 } from "../../utils/helpers";

type BookingFormProps = {
  initialData?: Booking;
  onSubmit: (data: BookingFormValues) => void;
  isPending: boolean;
  onCancel: () => void;
  bookingId: number;
};

function BookingForm({
  initialData,
  onSubmit,
  isPending,
  onCancel,
  bookingId,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
  });

  useEffect(() => {
    if (initialData) {
      setValue("bookingId", bookingId);
      setValue("personId", initialData.personId);
      setValue("roomId", initialData.roomId);
      setValue("checkInDate", formatDate2(initialData.checkInDate));
      setValue("checkOutDate", formatDate2(initialData.checkOutDate));
      setValue("status", initialData.status);
    }
  }, [initialData, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BookingFields
          register={register}
          errors={errors}
          isPending={isPending}
          control={control}
          watch={watch}
          setValue={setValue}
        />
      </div>
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
        <CancelButton isPending={isPending} onCloseModule={onCancel} />
        <AddingButton
          isPending={isPending}
          nameOfItme={initialData ? "Update Booking" : "Add Booking"}
        />
      </div>
    </Form>
  );
}

export default BookingForm;
