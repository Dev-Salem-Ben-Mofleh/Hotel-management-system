import { useForm, type FieldErrors } from "react-hook-form";
import CheckIn from "../../ui/CheckIn";
import CheckOut from "../../ui/CheckOut";
import GuestNumber from "../../ui/GuestNumber";
import { useNavigate, useNavigation } from "react-router-dom";
import type {
  CreateBookingDto,
  FormValues,
  UserDto,
} from "../../utils/AllInterfaces";
import {
  formatCurrency,
  getDifferenceInDays,
  TodayDate,
} from "../../utils/helpers";
import store from "../../store";
import { addBooking } from "./BookingSlice";
import { useEffect, useState } from "react";
import { useRoomMove } from "../../context/RoomContext";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

type BookingFormData = {
  roomId: number;
};
function BookingForm({ roomId }: BookingFormData) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { roomType } = useRoomMove();
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState, watch } =
    useForm<FormValues>({
      defaultValues: {
        checkIn: TodayDate,
        checkOut: TodayDate,
        guests: "Select number of guests",
      },
    });
  const [checkIn, checkOut] = watch(["checkIn", "checkOut"]);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { errors } = formState;

  useEffect(() => {
    if (checkIn && checkOut) {
      const days = getDifferenceInDays(checkIn, checkOut);
      setTotalPrice((roomType?.roomTypePricePerNight || 200) * days);
    }
  }, [checkIn, checkOut, roomType]);

  const curruentUserjson = localStorage.getItem("user") || "";
  const curruentUser: UserDto = JSON.parse(curruentUserjson);
  async function onSubmit(data: FormValues) {
    const newBooking: CreateBookingDto = {
      personId: curruentUser.personId,
      roomId: roomId,
      checkInDate: data.checkIn,
      checkOutDate: data.checkOut,
      status: "confirme",
    };
    const resultAction = await store.dispatch(addBooking(newBooking));

    if (addBooking.fulfilled.match(resultAction)) {
      toast.success("The booking Created Succesfuly.");
      navigate("/");
    } else {
      toast.error("The room in this date is booking.");
      throw new Error("Failed to create booking");
    }
  }
  function onError(errors: FieldErrors<FormValues>) {
    console.log(errors);
  }

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book This Room</h2>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CheckIn
              register={register}
              error={errors?.checkIn?.message}
              getValues={getValues}
            />
          </div>
          <div>
            <CheckOut
              register={register}
              error={errors?.checkOut?.message}
              getValues={getValues}
            />
          </div>
        </div>
        <div>
          <GuestNumber
            register={register}
            options={[
              {
                value: "Select number of guests",
                label: "Select number of guests",
              },
              {
                value: "1",
                label: "1 Guest",
              },
              {
                value: "2",
                label: "2 Guest",
              },
              {
                value: "3",
                label: "3 Guest",
              },
              {
                value: "4",
                label: "4 Guest",
              },
            ]}
            error={errors?.guests?.message}
            isBookingForm={true}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            The Total
          </label>
          <p className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-100">
            {formatCurrency(totalPrice)}
          </p>
        </div>

        <Button disabled={isSubmitting}>
          {isSubmitting ? "Create Booking...." : "Confirme Booking"}
        </Button>
      </form>
    </div>
  );
}

export default BookingForm;
