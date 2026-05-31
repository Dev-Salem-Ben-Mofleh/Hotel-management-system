import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled: boolean;
};
function Button({ children, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="gradient-gold text-white px-12 py-3 text-lg font-semibold rounded-md hover:shadow-lg transition-all duration-300"
    >
      {children}
    </button>
  );
}

export default Button;
