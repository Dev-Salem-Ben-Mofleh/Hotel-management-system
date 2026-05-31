import type { CheckProps } from "../utils/AllInterfaces";
import { validateRoomTypeRule } from "../utils/validationRules";
import Error from "./Error";
import Label from "./Label";

function RoomType({ register, error, options = [] }: CheckProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={"roomType"}>Room Type</Label>
      <select
        id="roomType"
        className="w-full p-3 border border-gray-300 rounded-md"
        {...register("roomType", validateRoomTypeRule())}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <Error>{error}</Error>}
    </div>
  );
}

export default RoomType;
