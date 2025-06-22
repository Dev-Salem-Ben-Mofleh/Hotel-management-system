import type { ReactNode } from "react";

type LabelProps = {
  htmlFor: string;
  children: ReactNode;
};

function Label({ children, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="flex items-center space-x-2">
      {children}
    </label>
  );
}

export default Label;
