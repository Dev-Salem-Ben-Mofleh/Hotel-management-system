import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import LoginForm from "../features/Auth/LoginForm";
import BackToHome from "../ui/BackToHome";

function Login() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 mt-[65px]">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-600">Welcome back</p>
        </div>
        <LoginForm />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Create new account
            </Link>
          </p>
        </div>
        <BackToHome />
      </div>
    </div>
  );
}

export default Login;
