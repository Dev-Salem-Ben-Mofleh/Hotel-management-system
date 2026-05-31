import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import Error from "../../ui/Error";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import type { RoomFormValues } from "./RoomValidation";
import { useAllRoomTypeTitles } from "../RoomTypes/RoomTypeHooks/useAllRoomTypeTitles";

interface RoomTypeFieldsProps {
  register: UseFormRegister<RoomFormValues>;
  errors: FieldErrors<RoomFormValues>;
  isPending: boolean;
  setValue: UseFormSetValue<RoomFormValues>;
  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}
export default function RoomFields({
  register,
  errors,
  isPending,
  setValue,
  previewUrl,
  setPreviewUrl,
  fileInputRef,
}: RoomTypeFieldsProps) {
  const { RoomTitles } = useAllRoomTypeTitles();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setValue("roomImageUrl", file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setValue("roomImageUrl", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input type="hidden" {...register("roomId")} />
      <input type="hidden" {...register("oldImageUrl")} />

      <div>
        <Label name="room Type" />
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
          {...register("roomTypeId")}
          disabled={isPending}
        >
          <option value="">Select room type</option>
          {RoomTitles.map((r) => (
            <option key={r.roomTypeId} value={r.roomTypeId}>
              {r.roomTypeTitle}
            </option>
          ))}
        </select>
        {errors.roomTypeId && <Error message={errors.roomTypeId?.message} />}
      </div>

      <div>
        <Label name="RoomNumber" />
        <Input
          type="text"
          nameRegister="roomNumber"
          register={register}
          disabled={isPending}
        />
        {errors.roomNumber && <Error message={errors.roomNumber?.message} />}
      </div>

      <div>
        <Label name="Room Floor" />
        <Input
          type="number"
          nameRegister="roomFloor"
          register={register}
          disabled={isPending}
        />
        {errors.roomFloor && <Error message={errors.roomFloor?.message} />}
      </div>

      <div>
        <Label name="Availability Status" />
        <select
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          {...register("availabilityStatus")}
          disabled={isPending}
        >
          <option value="">Select availability status</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        {errors.availabilityStatus && (
          <Error message={errors.availabilityStatus?.message} />
        )}
      </div>
      <div>
        <Label name="Is Smoking Allowed" />
        <select
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          {...register("isSmokingAllowed")}
          disabled={isPending}
        >
          <option value="">Select is smoking allowed</option>
          <option value="0">Not Allowed</option>
          <option value="1">Allowed</option>
        </select>
        {errors.isSmokingAllowed && (
          <Error message={errors.isSmokingAllowed?.message} />
        )}
      </div>
      <div>
        <Label name="Is Pet Friendly" />
        <select
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          {...register("isPetFriendly")}
          disabled={isPending}
        >
          <option value="">Select is pet friendly</option>
          <option value="0">Not Allowed</option>
          <option value="1">Allowed</option>
        </select>
        {errors.isPetFriendly && (
          <Error message={errors.isPetFriendly?.message} />
        )}
      </div>
      <div className="space-y-2">
        <Label name="Additional Notes" />

        <textarea
          {...register("additionalNotes")}
          disabled={isPending}
          rows={4}
          className="
    w-full
    min-h-[130px]
    rounded-2xl
    border border-gray-300 dark:border-gray-600
    bg-white dark:bg-gray-700
    px-4 py-3
    text-sm
    text-gray-700 dark:text-white
    resize-y
    transition
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
  "
          placeholder="Write any additional notes about the room..."
        />

        {errors.additionalNotes && (
          <Error message={errors.additionalNotes?.message} />
        )}
      </div>

      <div className="space-y-3">
        <Label name="Room Image" />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isPending}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          className="
      inline-flex items-center gap-2
      rounded-xl
      bg-blue-500 hover:bg-blue-600
      px-4 py-3
      text-sm font-medium text-white
      transition
      disabled:opacity-50
    "
        >
          <i className="fas fa-image"></i>

          {previewUrl ? "Change Image" : "Upload Image"}
        </button>

        {previewUrl && (
          <div className="space-y-3">
            <div
              className="
          overflow-hidden
          rounded-2xl
          border border-gray-200 dark:border-gray-700
          bg-gray-100 dark:bg-gray-700
        "
            >
              <img
                src={previewUrl}
                alt="Room preview"
                className="
            h-52 w-full
            object-cover
          "
              />
            </div>

            <button
              type="button"
              onClick={handleRemove}
              disabled={isPending}
              className="
          rounded-xl
          bg-red-500 hover:bg-red-600
          px-4 py-2
          text-sm font-medium text-white
          transition
          disabled:opacity-50
        "
            >
              Remove Image
            </button>
          </div>
        )}

        {errors.roomImageUrl && (
          <Error message={errors.roomImageUrl?.message} />
        )}
      </div>
    </>
  );
}
