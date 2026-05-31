import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Error from "../../ui/Error";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CombinedFormValues } from "./UserValidation";
interface UserFieldsProps {
  register: UseFormRegister<CombinedFormValues>;
  errors: FieldErrors<CombinedFormValues>;
  isPending: boolean;
}
export default function UserFields({
  register,
  errors,
  isPending,
}: UserFieldsProps) {
  return (
    <>
      <div>
        <Label name="Email" />
        <input
          type="email"
          autoComplete="off"
          placeholder="Enter your email"
          disabled={isPending}
          {...register("email")}
          className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 
        focus:ring-blue-500${
          isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
        />
        {errors.email && <Error message={errors.email?.message} />}
      </div>
      <div>
        <Label name="Role" />
        <select
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          {...register("role")}
          disabled={isPending}
        >
          <option value="">Select the role</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
          <option value="Guest">Guest</option>
        </select>
        {errors.role && <Error message={errors.role?.message} />}
      </div>

      <div>
        <Label name="Password" />
        <input
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password"
          disabled={isPending}
          className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 
        focus:ring-blue-500${
          isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
          {...register("password")}
        />
        {errors.password && <Error message={errors.password?.message} />}
      </div>
      <div>
        <Label name="Confirm Password" />
        <Input
          type="password"
          nameRegister="confirmPassword"
          register={register}
          placeholder="Enter confirm password"
          disabled={isPending}
        />
        {errors.confirmPassword && (
          <Error message={errors.confirmPassword?.message} />
        )}
      </div>
    </>
  );
}
