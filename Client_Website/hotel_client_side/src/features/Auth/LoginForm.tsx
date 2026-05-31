import { useForm, type FieldErrors } from "react-hook-form";
import useLogin from "./useLogin";
import type { LoginValues } from "../../utils/AllInterfaces";
import {
  requiredPassowrd,
  validateEmailRule,
} from "../../utils/validationRules";
import Error from "../../ui/Error";

function LoginForm() {
  const { isPending, Login } = useLogin();
  const { register, handleSubmit, formState } = useForm<LoginValues>({
    defaultValues: { email: "salembenmofleh@gmail.com", password: "123wW123#" },
  });
  const { errors } = formState;

  const onSubmit = async (data: LoginValues) => {
    Login({
      email: data.email,
      password: data.password,
    });
  };

  function onError(errors: FieldErrors<LoginValues>) {
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          {...register("email", validateEmailRule())}
          placeholder="Enter your email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {errors?.email?.message && <Error>{errors?.email?.message}</Error>}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", requiredPassowrd())}
          placeholder="Enter your password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {errors?.password?.message && (
          <Error>{errors?.password?.message}</Error>
        )}
      </div>
      <button
        disabled={isPending}
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
