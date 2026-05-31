import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import Error from "../../ui/Error";
import Label from "../../ui/Label";
import type { BookingFormValues } from "./BookingValidation";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useAllVisitorName } from "../Visitor/VisitorHooks/useAllVisitorName";
import { useAllRoomNumbers } from "../Room/RoomHooks/useAllRoomNumbers";
import type { Person } from "../../services/models/Persons";
import type { Room } from "../../services/models/Room";
import Spinner from "../../ui/Spinner";
import { useModuleContext } from "../../context/Hook/useModuleContext";
import VisitorPortal from "../Visitor/VisitorPortal";
import { useEffect, useMemo, useState } from "react";
import { RoomTypeRepository } from "../../services/Repository/RoomTypeRepository";
interface BookingTypeFieldsProps {
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
  isPending: boolean;
  watch: UseFormRegister<BookingFormValues>;
  control: Control<BookingFormValues>;
  setValue: UseFormSetValue<BookingFormValues>;
}

export default function BookingFields({
  register,
  errors,
  isPending,
  watch,
  control,
  setValue,
}: BookingTypeFieldsProps) {
  const { isLoading, PersonNames } = useAllVisitorName();
  const { isLoading: isLoaddin2, RoomNumbers } = useAllRoomNumbers();
  const { setIsOpenNestedModal, isOpeNestedModal } = useModuleContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPersonId, setSelectedPersonId] = useState("");
  const [personName, setPersonName] = useState("");
  const roomTypeRepository = useMemo(() => new RoomTypeRepository(), []);
  const checkOut = watch("checkOutDate");
  const checkIn = watch("checkInDate");

  const roomTypeId =
    RoomNumbers?.find((r: Room) => r.roomId === Number(watch("roomId")))
      ?.roomTypeId || 0;

  useEffect(() => {
    const fetchData = async () => {
      if (!checkOut || !checkIn || !roomTypeId) return;
      const roomType = await roomTypeRepository.getById(
        "FindRoomType",
        roomTypeId,
      );
      const pricePerNight = roomType ? roomType.roomTypePricePerNight : 0;

      const nights =
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24);

      const totalPrice = nights * pricePerNight;

      setTotalPrice(totalPrice);
    };

    fetchData();
  }, [checkOut, checkIn, roomTypeId]);

  useEffect(() => {
    if (!selectedPersonId) return;

    setValue("personId", Number(selectedPersonId));

    setSelectedPersonId("");
  }, [selectedPersonId]);

  if (isLoading || isLoaddin2) return <Spinner />;

  const personOptions =
    PersonNames?.map((p: Person) => ({
      value: p.personId,
      label: p.fullName,
    })) || [];

  const roomOptions =
    RoomNumbers?.map((r: Room) => ({
      value: r.roomId,
      label: `Room ${r.roomNumber}`,
    })) || [];
  const handlePersonChange = (newValue: any, field: any) => {
    const existingOption = personOptions.find(
      (opt) => opt.value === Number(newValue?.value),
    );

    if (newValue && !existingOption) {
      setPersonName(newValue.label);
      setIsOpenNestedModal(true);
    } else {
      field.onChange(newValue ? newValue.value : "");
    }
  };

  return (
    <>
      <input type="hidden" {...register("bookingId")} />

      <div className="space-y-2">
        <Label name="Person Name" />

        <Controller
          name="personId"
          control={control}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              options={personOptions}
              isDisabled={isPending}
              isClearable
              placeholder="Search by name or add new person..."
              formatCreateLabel={(inputValue) =>
                `Add new person: "${inputValue}"`
              }
              value={
                personOptions.find(
                  (opt) => opt.value === Number(field.value),
                ) || null
              }
              onChange={(newValue) => handlePersonChange(newValue, field)}
              classNamePrefix="react-select"
              className="text-sm"
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "50px",
                  borderRadius: "14px",
                  borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                  boxShadow: state.isFocused
                    ? "0 0 0 2px rgba(59,130,246,0.2)"
                    : "none",
                  backgroundColor: "var(--select-bg)",
                  transition: "all 0.2s ease",
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: "14px",
                  overflow: "hidden",
                  zIndex: 9999,
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "#eff6ff"
                    : state.isSelected
                      ? "#3b82f6"
                      : "white",
                  color: state.isSelected ? "white" : "#111827",
                  padding: "12px",
                  cursor: "pointer",
                }),
              }}
            />
          )}
        />

        {isOpeNestedModal && (
          <VisitorPortal
            onSelect={setSelectedPersonId}
            personName={personName}
          />
        )}

        {errors.personId && <Error message={errors.personId?.message} />}
      </div>

      <div className="space-y-2">
        <Label name="Room Number" />

        <Controller
          name="roomId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={roomOptions}
              placeholder="Search for room number..."
              isClearable
              isDisabled={isPending}
              onChange={(val) => field.onChange(val ? val.value : "")}
              value={roomOptions.find(
                (c) => Number(c.value) === Number(field.value),
              )}
              classNamePrefix="react-select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "54px",
                  borderRadius: "16px",
                  border: state.isFocused
                    ? "1px solid #3b82f6"
                    : "1px solid #d1d5db",
                  boxShadow: state.isFocused
                    ? "0 0 0 3px rgba(59,130,246,0.15)"
                    : "0 1px 2px rgba(0,0,0,0.05)",
                  backgroundColor: document.documentElement.classList.contains(
                    "dark",
                  )
                    ? "#374151"
                    : "#ffffff",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }),

                valueContainer: (base) => ({
                  ...base,
                  padding: "0 14px",
                }),

                placeholder: (base) => ({
                  ...base,
                  color: "#9ca3af",
                  fontSize: "14px",
                }),

                singleValue: (base) => ({
                  ...base,
                  color: document.documentElement.classList.contains("dark")
                    ? "#ffffff"
                    : "#111827",
                  fontSize: "14px",
                  fontWeight: 500,
                }),

                menu: (base) => ({
                  ...base,
                  borderRadius: "16px",
                  overflow: "hidden",
                  marginTop: "8px",
                  zIndex: 9999,
                  backgroundColor: document.documentElement.classList.contains(
                    "dark",
                  )
                    ? "#1f2937"
                    : "#ffffff",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                }),

                option: (base, state) => ({
                  ...base,
                  padding: "12px 16px",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",

                  backgroundColor: state.isSelected
                    ? "#3b82f6"
                    : state.isFocused
                      ? document.documentElement.classList.contains("dark")
                        ? "#374151"
                        : "#eff6ff"
                      : "transparent",

                  color: state.isSelected
                    ? "#ffffff"
                    : document.documentElement.classList.contains("dark")
                      ? "#ffffff"
                      : "#111827",
                }),

                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#6b7280",
                }),

                indicatorSeparator: () => ({
                  display: "none",
                }),
              }}
            />
          )}
        />

        {errors.roomId && <Error message={errors.roomId?.message} />}
      </div>

      <div>
        <Label name="Check In" />
        <input
          type="date"
          {...register("checkInDate")}
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500$"
        />
        {errors.checkInDate && <Error message={errors.checkInDate?.message} />}
      </div>
      <div>
        <Label name="Check Out" />
        <input
          type="date"
          {...register("checkOutDate")}
          min={checkIn || undefined}
          disabled={!checkIn}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500$"
        />

        {errors.checkOutDate && (
          <Error message={errors.checkOutDate?.message} />
        )}
      </div>
      <div>
        <Label name="Status" />
        <select
          className="
  w-full
  rounded-xl
  border border-gray-300 dark:border-gray-600
  bg-white dark:bg-gray-700
  px-4 py-3
  text-sm
  text-gray-700 dark:text-white
  focus:ring-2 focus:ring-blue-500
  focus:border-transparent
  transition
"
          {...register("status")}
          disabled={isPending}
        >
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        {errors.status && <Error message={errors.status?.message} />}
      </div>
      <div>
        <Label name="Total Price" />
        <p className="text-xl font-bold text-green-700 dark:text-green-200">
          ${totalPrice.toFixed(2)}
        </p>
      </div>
    </>
  );
}
