import { Link } from "react-router-dom";

function BackToHome() {
  return (
    <div className="mt-4 text-center">
      <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
        Back to homepage
      </Link>
    </div>
  );
}

export default BackToHome;
