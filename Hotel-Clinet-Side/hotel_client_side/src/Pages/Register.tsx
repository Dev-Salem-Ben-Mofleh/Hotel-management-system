import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import RegisterForm from "../features/Auth/RegisterForm";
import BackToHome from "../ui/BackToHome";

function Register() {
  useScrollToTop();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 mt-[65px]">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join us today</p>
        </div>
        <RegisterForm />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-green-600 hover:text-green-500 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
        <BackToHome />
      </div>
    </div>
  );
}

export default Register;
