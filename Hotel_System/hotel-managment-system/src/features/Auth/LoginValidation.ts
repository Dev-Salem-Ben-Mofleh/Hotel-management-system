import * as Yup from "yup";
export const loginSchema = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
