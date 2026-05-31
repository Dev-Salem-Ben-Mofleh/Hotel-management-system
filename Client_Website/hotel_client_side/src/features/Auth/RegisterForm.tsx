import { useNavigate } from "react-router-dom";
import { useCountries } from "../../hooks/useCountries";
import usRegister from "./useRegister";
import type { RegisterValues } from "../../utils/AllInterfaces";
import { useForm, type FieldErrors } from "react-hook-form";
import { calculateDateRange } from "../../utils/dateUtils";
import Spinner from "../../ui/Spinner";
import Label from "../../ui/Label";
import {
  required,
  validateBirthdateRule,
  validateConfirmPasswordRule,
  validateCountryRule,
  validateEmailRuleForRegister,
  validateGenderRule,
  validatePasswordRule,
  validatePhoneRule,
} from "../../utils/validationRules";
import Error from "../../ui/Error";
import { TodayDate } from "../../utils/helpers";

function RegisterForm() {
  const { isLoading, countries } = useCountries();
  const { isPending, singUp } = usRegister();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<RegisterValues>();
  const { errors } = formState;

  function onSubmit(data: RegisterValues) {
    singUp(
      {
        newPerson: {
          personId: 0,
          fullName: data.fullName,
          gender: data.gender,
          birthDate: data.birthDate,
          phone: data.phone,
          nationalityCountryId: Number(data.country),
        },
        newUser: {
          personId: 0,
          email: data.email,
          password: data.password,
          role: "Guest",
        },
      },
      {
        onSuccess() {
          reset();
          navigate("/Login", { replace: true });
        },
      }
    );
  }
  function onError(errors: FieldErrors<RegisterValues>) {
    console.log(errors);
  }
  const { minDate, maxDate } = calculateDateRange(30, 18);
  if (isLoading || isPending) return <Spinner />;
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor={"fullName"}>Full Name</Label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              {...register("fullName", required("Full Name"))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
            {errors?.fullName?.message && (
              <Error>{errors?.fullName?.message}</Error>
            )}
          </div>

          <div>
            <Label htmlFor={"birthDate"}>Birth Date</Label>
            <input
              type="date"
              id="birthDate"
              defaultValue={TodayDate}
              {...register(
                "birthDate",
                validateBirthdateRule(minDate, maxDate)
              )}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>
          {errors?.birthDate?.message && (
            <Error>{errors?.birthDate?.message}</Error>
          )}
          <div>
            <Label htmlFor={"email"}>Email Address</Label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", validateEmailRuleForRegister())}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
            {errors?.email?.message && <Error>{errors?.email?.message}</Error>}
          </div>

          <div>
            <Label htmlFor={"password"}>Password</Label>
            <input
              type="password"
              id="password"
              placeholder="Enter a strong password"
              {...register("password", validatePasswordRule("Password"))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
            {errors?.password?.message && (
              <Error>{errors?.password?.message}</Error>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor={"gender"}>Gender</Label>
            <select
              id="gender"
              {...register("gender", validateGenderRule())}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            >
              <option key={"Select Gender"} value="Select Gender">
                Select Gender
              </option>
              <option key={"Male"} value="Male">
                Male
              </option>
              <option key={"Female"} value="Female">
                Female
              </option>
            </select>
            {errors?.gender?.message && (
              <Error>{errors?.gender?.message}</Error>
            )}
          </div>

          <div>
            <Label htmlFor={"country"}>Your Country</Label>
            <select
              id="country"
              {...register("country", validateCountryRule())}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            >
              <option value="Select Country">Select Country</option>
              {countries.map((country) => (
                <option value={country.countryId} key={country.countryId}>
                  {country.countryName}
                </option>
              ))}
            </select>
            {errors?.country?.message && (
              <Error>{errors?.country?.message}</Error>
            )}
          </div>

          <div>
            <Label htmlFor={"phone"}>Phone Number</Label>
            <input
              type="tel"
              id="phone"
              {...register("phone", validatePhoneRule())}
              placeholder="+967774279865"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
            {errors?.phone?.message && <Error>{errors?.phone?.message}</Error>}
          </div>

          <div>
            <Label htmlFor={"confirmPassword"}>Confirm Password</Label>
            <input
              type="password"
              id="confirmPassword"
              {...register(
                "confirmPassword",
                validateConfirmPasswordRule(getValues)
              )}
              placeholder="Re-enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
            {errors?.confirmPassword?.message && (
              <Error>{errors?.confirmPassword?.message}</Error>
            )}
          </div>
        </div>
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors mt-6"
      >
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;
