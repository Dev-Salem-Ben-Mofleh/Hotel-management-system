import { useForm, type FieldErrors } from "react-hook-form";
import { useSearchRoom } from "../Rooms/useSearchRoom";
import CheckIn from "../../ui/CheckIn";
import CheckOut from "../../ui/CheckOut";
import GuestNumber from "../../ui/GuestNumber";
import RoomType from "../../ui/RoomType";
import { useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import type { FormValues } from "../../utils/AllInterfaces";
import { useAllRoomType } from "../RoomType/useAllRoomType";
import Spinner from "../../ui/Spinner";
import { TodayDate } from "../../utils/helpers";
import { useRoomMove } from "../../context/RoomContext";
import { useEffect } from "react";

function SearchBooking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, rooms, countRooms } = useSearchRoom();
  const { isLoading: isLoading2, roomTypes } = useAllRoomType();
  const { setRooms, setCount, setRoomType } = useRoomMove();
  const { register, handleSubmit, getValues, formState } = useForm<FormValues>({
    defaultValues: {
      checkIn: searchParams.get("checkIn") || TodayDate,
      checkOut: searchParams.get("checkOut") || TodayDate,
      guests: searchParams.get("guests") || "Select number of guests",
      roomType: searchParams.get("roomType") || "Select room type",
    },
  });
  const { errors } = formState;

  useEffect(() => {
    setRooms(rooms);
    setCount(countRooms);
    const myRoomType =
      roomTypes.find((r) => r.roomTypeTitle === getValues("roomType")) || null;
    setRoomType(myRoomType);
    localStorage.setItem("myRoomType", JSON.stringify(myRoomType));
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms, countRooms, setRooms, setCount, setRoomType]);

  function onSubmit(data: FormValues) {
    setSearchParams({
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      roomType: data.roomType,
      page: "1",
    });
    window.location.hash = "#rooms";
  }
  function onError(errors: FieldErrors<FormValues>) {
    console.log(errors);
  }

  if (isLoading || isLoading2) return <Spinner />;

  return (
    <div className="relative -mt-20 z-20 mx-auto max-w-6xl px-6" id="booking">
      <div className="glass-effect shadow-2xl rounded-lg">
        <div className="p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-yellow-700">
            Book Your Stay Now
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            id="bookingForm"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <CheckIn
                register={register}
                error={errors?.checkIn?.message}
                getValues={getValues}
              />
              <CheckOut
                register={register}
                error={errors?.checkOut?.message}
                getValues={getValues}
              />

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
                isBookingForm={false}
              />
              <RoomType
                register={register}
                options={[
                  {
                    value: "Select room type",
                    label: "Select room type",
                  },
                  {
                    value: roomTypes[0].roomTypeTitle,
                    label: roomTypes[0].roomTypeTitle,
                  },
                  {
                    value: roomTypes[1].roomTypeTitle,
                    label: roomTypes[1].roomTypeTitle,
                  },
                  {
                    value: roomTypes[2].roomTypeTitle,
                    label: roomTypes[2].roomTypeTitle,
                  },
                  {
                    value: roomTypes[3].roomTypeTitle,
                    label: roomTypes[3].roomTypeTitle,
                  },
                  {
                    value: roomTypes[4].roomTypeTitle,
                    label: roomTypes[4].roomTypeTitle,
                  },
                  {
                    value: roomTypes[5].roomTypeTitle,
                    label: roomTypes[5].roomTypeTitle,
                  },
                ]}
                error={errors?.roomType?.message}
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button disabled={false}>
                <span className="mr-2">🔍</span>
                Search Available Rooms
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBooking;
