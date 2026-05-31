import type { FieldValues, UseFormRegister } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  type: string;
  nameRegister: string;
  register: UseFormRegister<T>;
  placeholder?: string;
  disabled: boolean;
}

export default function Input<T extends FieldValues>({
  type,
  nameRegister,
  register,
  placeholder,
  disabled,
}: InputFieldProps<T>) {
  return (
    <input
      type={type}
      className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 
        focus:ring-blue-500${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
      placeholder={placeholder}
      {...register(nameRegister)}
      disabled={disabled}
    />
  );
}
