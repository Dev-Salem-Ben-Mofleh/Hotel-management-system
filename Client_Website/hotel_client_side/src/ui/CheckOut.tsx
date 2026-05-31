import type { CheckProps } from "../utils/AllInterfaces";
import { TodayDate } from "../utils/helpers";
import { validCheckOutDateRule } from "../utils/validationRules";
import Error from "./Error";
import Label from "./Label";

function CheckOut({ register, error, getValues }: CheckProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={"checkout"}>
        <span>📅</span>
        <span>Check-out Date</span>
      </Label>
      <input
        id="checkOut"
        type="date"
        className="w-full p-3 border border-gray-300 rounded-md"
        {...register(
          "checkOut",
          validCheckOutDateRule(getValues?.("checkIn") || TodayDate)
        )}
      />
      {error && <Error>{error}</Error>}
    </div>
  );
}

export default CheckOut;
