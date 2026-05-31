import * as Yup from "yup";
import { visitorSchema } from "../Visitor/VisitorValidation";
import { UserRepository } from "../../services/Repository/UserRepository";

const userRepository = new UserRepository();

const userSchema = Yup.object({
  role: Yup.string()
    .oneOf(["Admin", "Employee", "Guest"], "Select role")
    .required("Role is required"),

  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required")
    .test("unique-email", "Email already exists", async function (value) {
      if (!value) return false;
      try {
        const exists = await userRepository.existsByEmail(value);

        return !exists;
      } catch {
        return true;
      }
    }),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const combinedSchema = userSchema.concat(visitorSchema);

export type CombinedFormValues = Yup.InferType<typeof combinedSchema>;
