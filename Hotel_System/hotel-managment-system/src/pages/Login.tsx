import { useForm } from "react-hook-form";
import useLogin from "../features/Auth/useLogin";
import { useTheme } from "../context/Hook/useThemeContext";
import {
  loginSchema,
  type LoginFormValues,
} from "../features/Auth/LoginValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, useNavigate } from "react-router-dom";
import Label from "../ui/Label";

export default function Login() {
  const navigate = useNavigate();
  const { Login } = useLogin();
  const { theme, toggleTheme } = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    const { email, password } = data;
    Login(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  }

  return (
    <div
      className="
        relative
        flex min-h-screen items-center justify-center
        overflow-hidden
        bg-gradient-to-br
        from-blue-50
        via-white
        to-indigo-100
        px-4
        dark:from-gray-900
        dark:via-gray-950
        dark:to-gray-800
      "
    >
      <div
        className="
          absolute -top-20 -left-20
          h-72 w-72 rounded-full
          bg-blue-400/20 blur-3xl
        "
      />

      <div
        className="
          absolute -bottom-24 -right-20
          h-80 w-80 rounded-full
          bg-indigo-500/20 blur-3xl
        "
      />

      <button
        onClick={toggleTheme}
        className="
          absolute right-4 top-4
          flex h-11 w-11 items-center justify-center
          rounded-2xl
          border border-gray-200 dark:border-gray-700
          bg-white/80 dark:bg-gray-800/80
          backdrop-blur
          transition
          hover:scale-105
          hover:shadow-lg
        "
      >
        {theme === "light" ? (
          <i className="fas fa-moon text-gray-700"></i>
        ) : (
          <i className="fas fa-sun text-yellow-400"></i>
        )}
      </button>

      <div
        className="
          relative
          w-full max-w-md
          overflow-hidden
          rounded-3xl
          border border-white/20 dark:border-gray-700
          bg-white/80 dark:bg-gray-800/90
          p-8
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <div className="mb-10 text-center">
          <div
            className="
              mx-auto mb-5
              flex h-24 w-24 items-center justify-center
              rounded-3xl
              bg-gradient-to-r
              from-blue-500
              to-indigo-600
              shadow-lg
            "
          >
            <i className="fas fa-hotel text-3xl text-white"></i>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Grand Hotel
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Hotel Management System
          </p>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label name="Email" />
              <input
                type="email"
                autoComplete="off"
                placeholder="Enter your email"
                disabled={isSubmitting}
                {...register("email")}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 
                      focus:ring-blue-500${
                        isSubmitting
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
              />

              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label name="Password" />
              <input
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 
                      focus:ring-blue-500${
                        isSubmitting
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                {...register("password")}
              />

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              flex w-full items-center justify-center gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-indigo-600
              py-3
              text-sm font-semibold text-white
              shadow-lg
              transition-all duration-200
              hover:scale-[1.02]
              hover:from-blue-600
              hover:to-indigo-700
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            <i className="fas fa-sign-in-alt"></i>

            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </Form>
      </div>
    </div>
  );
}
