import type { FieldErrors, UseFormRegister } from "react-hook-form";
import Error from "../../ui/Error";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import type { Country } from "../../services/models/Country";
import type { VisitorFormValues } from "./VisitorValidation";

interface VisitorFieldsProps {
  register: UseFormRegister<VisitorFormValues>;
  errors: FieldErrors<VisitorFormValues>;
  countries: Country[];
  isPending: boolean;
}
export default function VisitorFields({
  countries,
  register,
  errors,
  isPending,
}: VisitorFieldsProps) {
  return (
    <>
      <div>
        <Label name="Full Name" />
        <Input
          type="text"
          nameRegister="fullName"
          register={register}
          placeholder="Enter your name"
          disabled={isPending}
        />
        {errors.fullName && <Error message={errors.fullName?.message} />}
      </div>

      <div>
        <Label name="Phone Number" />
        <Input
          type="tel"
          nameRegister="phone"
          register={register}
          placeholder="Enter phone"
          disabled={isPending}
        />
        {errors.phone && <Error message={errors.phone?.message} />}
      </div>

      <div>
        <Label name="Gender" />
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
          {...register("gender")}
          disabled={isPending}
        >
          <option value="">Select your gender</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
        </select>
        {errors.gender && <Error message={errors.gender?.message} />}
      </div>

      <div>
        <Label name="Country" />
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
          {...register("nationalityCountryId")}
          disabled={isPending}
        >
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c.countryId} value={c.countryId}>
              {c.countryName}
            </option>
          ))}
        </select>
        {errors.nationalityCountryId && (
          <Error message={errors.nationalityCountryId?.message} />
        )}
      </div>

      <div>
        <Label name="Birth Date" />
        <Input
          type="date"
          nameRegister="birthDate"
          register={register}
          disabled={isPending}
        />
        {errors.birthDate && <Error message={errors.birthDate?.message} />}
      </div>
    </>
  );
}
