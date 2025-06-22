import type { ReactNode } from "react";

type ErrorProps = {
  children: ReactNode;
};

function Error({ children }: ErrorProps) {
  return <span className="text-[0.8rem] text-red-700">{children}</span>;
}

export default Error;
