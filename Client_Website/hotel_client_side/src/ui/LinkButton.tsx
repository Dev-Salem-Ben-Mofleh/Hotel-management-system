import { Link, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

type LinkButtonProps = {
  to: string;
  children: ReactNode;
};

function LinkButton({ children, to }: LinkButtonProps) {
  const navigate = useNavigate();
  const className =
    "gradient-gold text-white px-12 py-3 text-lg font-semibold rounded-md hover:shadow-lg transition-all duration-300";

  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
