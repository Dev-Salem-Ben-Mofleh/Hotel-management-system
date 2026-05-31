import * as Yup from "yup";
import { calculateDateRange } from "../../utils/dateUtils";

const { minDate, maxDate } = calculateDateRange(60, 18);

export const visitorSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  phone: Yup.string()
    .matches(/^\+?\d{7,15}$/, "Phone number is invalid")
    .required("Phone number is required"),
  gender: Yup.string()
    .oneOf(["0", "1"], "Select Male or Female")
    .required("Gender is required"),
  nationalityCountryId: Yup.string().required("Country is required"),
  birthDate: Yup.date()
    .min(minDate, "Birth Date is too old")
    .max(maxDate, "You must be at least 18 years old")
    .required("Birth Date is required"),
});

export type VisitorFormValues = Yup.InferType<typeof visitorSchema>;
