import type { CheckProps } from "../utils/AllInterfaces";
import { TodayDate } from "../utils/helpers";
import { validCheckInDateRule } from "../utils/validationRules";
import Error from "./Error";
import Label from "./Label";

function CheckIn({ register, error, getValues }: CheckProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={"checkin"}>
        <span>📅</span>
        <span>Check-in Date</span>
      </Label>
      <input
        id="checkIn"
        type="date"
        className="w-full p-3 border border-gray-300 rounded-md"
        {...register(
          "checkIn",
          validCheckInDateRule(TodayDate, getValues?.("checkOut") || TodayDate)
        )}
      />
      {error && <Error>{error}</Error>}
    </div>
  );
}

export default CheckIn;
