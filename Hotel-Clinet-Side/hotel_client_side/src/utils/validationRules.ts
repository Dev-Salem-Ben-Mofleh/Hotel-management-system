import type { FieldValues, RegisterOptions } from "react-hook-form";
import { setMaxLength } from "./helpers";
import { validateEmail, validatePassword } from "./validatorUtils";
import type { FormValues, LoginValues, RegisterValues } from "./AllInterfaces";

export function required(
  field: string
): RegisterOptions<RegisterValues, "fullName"> {
  return {
    required: `${field} is required`,
  };
}
export function requiredPassowrd(): RegisterOptions<LoginValues, "password"> {
  return {
    required: `Password is required`,
  };
}
export function validatePasswordRule(
  field: string
): RegisterOptions<RegisterValues, "password"> {
  return {
    required: `${field} is required`,
    maxLength: setMaxLength(20, field),
    validate: (value: string) =>
      validatePassword(value.trim()) ||
      `${field} must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character`,
  };
}

export function validateConfirmPasswordRule(
  getValues: () => FieldValues
): RegisterOptions<RegisterValues, "confirmPassword"> {
  return {
    required: "Confirm Password is required",
    validate: (value: string) =>
      value.trim() === getValues()?.password?.trim() ||
      "Passwords do not match",
  };
}

export function validateGenderRule(): RegisterOptions<
  RegisterValues,
  "gender"
> {
  return {
    required: "Gender is required",
    validate: (value: string) =>
      value === "Male" || value === "Female" || "Invalid gender selection",
  };
}

export function validateBirthdateRule(
  minDate: string | Date,
  maxDate: string | Date
): RegisterOptions<RegisterValues, "birthDate"> {
  return {
    required: "Date of birth is required",
    min: {
      value:
        minDate instanceof Date ? minDate.toISOString().split("T")[0] : minDate,
      message: `Date of birth cannot be earlier than ${minDate}`,
    },
    max: {
      value:
        maxDate instanceof Date ? maxDate.toISOString().split("T")[0] : maxDate,
      message: `Date of birth cannot be later than ${maxDate}.`,
    },
  };
}

export function validatePhoneRule(): RegisterOptions<RegisterValues, "phone"> {
  return {
    required: "Phone is required",
    validate: (value: string) => {
      if (!isFinite(+value)) return "You should enter numbers only";
      if (value.length < 9 || value.length > 13) {
        return "Phone number should be between 9 and 13 digits";
      }
      return true;
    },
  };
}

export function validateEmailRuleForRegister(): RegisterOptions<
  RegisterValues,
  "email"
> {
  return {
    required: "Email is required",
    validate: (value: string) =>
      validateEmail(value.trim()) || "Email is not valid",
  };
}
export function validateEmailRule(): RegisterOptions<LoginValues, "email"> {
  return {
    required: "Email is required",
    validate: (value: string) =>
      validateEmail(value.trim()) || "Email is not valid",
  };
}
export function validCheckInDateRule(
  today: string | Date,
  checkOut: string | Date
): RegisterOptions<FormValues, "checkIn"> {
  const parsedToday =
    typeof today === "string" ? today : today.toISOString().split("T")[0];

  const parsedCheckOut =
    typeof checkOut === "string"
      ? checkOut
      : checkOut.toISOString().split("T")[0];

  return {
    min: {
      value: parsedToday,
      message: `Check-in date cannot be earlier than today's date (${parsedToday}).`,
    },
    max: {
      value: parsedCheckOut,
      message: `Check-in date cannot be later than the check-out date (${parsedCheckOut}).`,
    },
  };
}

export function validCheckOutDateRule(
  checkIn: string | Date
): RegisterOptions<FormValues, "checkOut"> {
  const parsedcheckIn =
    typeof checkIn === "string" ? checkIn : checkIn.toISOString().split("T")[0];

  return {
    min: {
      value: parsedcheckIn,
      message: `Check-Out date cannot be earlier than date (${parsedcheckIn}).`,
    },
  };
}

export function validateGuestNumberRule(): RegisterOptions<
  FormValues,
  "guests"
> {
  return {
    validate: (value: string) =>
      value.trim() === "Select number of guests"
        ? "You must choice the number of guests"
        : true,
  };
}

export function validateGuestNumberRuleForBookingForm(
  roomTypeCapacity: number
): RegisterOptions<FormValues, "guests"> {
  return {
    validate: (value: string) => {
      const trimmed = value.trim();
      if (trimmed === "Select number of guests") {
        return "You must choose the number of guests";
      }
      const numberValue = Number(trimmed);
      if (numberValue <= roomTypeCapacity) {
        return true;
      }
      return `Number of guests must not exceed room capacity (${roomTypeCapacity})`;
    },
  };
}

export function validateRoomTypeRule(): RegisterOptions<
  FormValues,
  "roomType"
> {
  return {
    validate: (value: string) =>
      value.trim() === "Select room type"
        ? "You must choice the Type of rooms"
        : true,
  };
}
export function validateCountryRule(): RegisterOptions<
  RegisterValues,
  "country"
> {
  return {
    validate: (value: string) =>
      value.trim() === "Select Country" ? "You must choice your country" : true,
  };
}
